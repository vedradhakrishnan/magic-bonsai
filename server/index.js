import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import next from 'next';
import { readFileSync } from 'fs';
import 'dotenv/config';
import mongoose from 'mongoose';

import { 
  requireWallet, 
  generateTaskTree,
  saveNewTree 
} from './services.js';
import { Tree } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const promptFilePath = path.join(__dirname, '../public/prompt.txt');
const rawPrompt = readFileSync(promptFilePath, 'utf-8');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

await mongoose.connect(process.env.MONGO_URI);

nextApp.prepare().then(() => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
  }));

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(requireWallet);

  app.get('/', (req, res) => {
    res.redirect('/dashboard');
  });

  app.get('/connect', (req, res) => {
    if (req.session.wallet) {
      return res.redirect('/dashboard');
    }
    return nextApp.render(req, res, '/connect');
  });

  app.post('/connect', (req, res) => {
    const { wallet } = req.body;
  
    if (!wallet) {
      console.log("No wallet provided");
      return res.status(400).json({ error: 'Missing wallet' });
    }
  
    req.session.wallet = wallet;
    console.log("Received wallet:", wallet);
    return res.redirect('/dashboard');
  });

  app.get('/new-tree', (req, res) => {
    return nextApp.render(req, res, '/new-tree');
  });

  app.post('/new-tree', async (req, res) => {
    const { taskName, description, treeStatus } = req.body;
    console.log("Received new tree request:", taskName, description, treeStatus);

    if ( treeStatus === "GENERATING" ) {
      console.log("Generating tree...");
      const prompt = `${rawPrompt} ${taskName} ${description}`;
      const newTaskTree = await generateTaskTree(prompt);
      const treeId = await saveNewTree(newTaskTree, req.session.wallet); 
      return res.status(200).json({ redirect: '/task/' + treeId });
    } else if ( treeStatus === "MINTING" ) {
      console.log("Minting tree...");
    }
    return res.status(200).json({ success: true });
    // return res.redirect('/task/' + );
  });

  app.get('/dashboard', async (req, res) => {
    console.log("Dashboard request");
    const tasks = await Tree.find({ owner: req.session.wallet });
    const taskData = tasks.map(task => {
      const name = JSON.parse(task.assignedTask).task;
      return {
        name,
        treeId: task.treeId
      }
    });

    // console.log(taskData);
    // return res.send('Dashboard');
    return nextApp.render(req, res, '/dashboard', { taskData: JSON.stringify(taskData) });
  });

  app.get('/task/:treeId', async (req, res) => {
    const { treeId } = req.params;
    
    const taskTree = await Tree.findOne({ treeId });
    if (!taskTree) {
      return res.status(404).send('Task tree not found');
    }
    return nextApp.render(req, res, '/task', { taskTree: JSON.stringify(taskTree) });
  });

  app.post('/task/:treeId', async (req, res) => {
    const { treeId } = req.params;
    const updatedTaskTree = req.body.newTree;

    try {
      const existingTree = await Tree.findOne({ treeId });
      console.log(treeId);
      existingTree.assignedTask = JSON.stringify(updatedTaskTree);
      await existingTree.save();

      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error updating task tree:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  });

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });  
});
