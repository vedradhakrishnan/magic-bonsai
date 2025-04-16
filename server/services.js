import OpenAI from "openai";
import { Tree, Garden } from './db.js';
import { v4 as uuidv4 } from 'uuid'; 
import 'dotenv/config';


export function requireWallet(req, res, next) {
    if (
        req.path === '/connect' ||
        req.path.startsWith('/_next') ||
        req.path === '/favicon.ico' ||
        req.path === '/api/auth' ||
        req.session.wallet
      ) {
        return next();
    }
      
    return res.redirect('/connect');
}

export async function generateTaskTree(prompt) {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        max_tokens: 1000,
        temperature: 0.7,
    });

    let output = response.choices[0].message.content.trim();

    if (output.startsWith("```")) {
      output = output.substring(output.indexOf("\n")).trim();
      if (output.endsWith("```")) {
        output = output.slice(0, -3).trim();
      }
    }

    const tree = JSON.parse(output);  
    
    tree.completed = false;
    tree.subtasks.forEach(child => { 
        child.completed = false;
        child.subtasks.forEach(grandchild => {
            grandchild.completed = false;
        });
    });

    return tree;
}


function randomSpecimen() {
  return "Willow";
}

async function randomCoords(owner) {
  let garden = await Garden.findOne({ owner });
  if (!garden) {
    garden = await Garden.create({ owner });
  }

  const grid = garden.grid;

  const empty = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === null) {
        empty.push({ row, col });
      }
    }
  }

  if (empty.length === 0) {
    throw new Error("The garden is full!");
  }

  const ri = Math.floor(Math.random() * empty.length);
  return empty[ri];
}

export async function saveNewTree(taskTree, owner) {
    const treeId = uuidv4();
    const { row, col } = await randomCoords(owner);
    const species = randomSpecimen();

    const tree = new Tree({
        owner,
        treeId,
        species,
        row,
        col,
        assignedTask: JSON.stringify(taskTree)
    });

    await tree.save();

    await Garden.findOneAndUpdate(
      { owner },
      { $set: { [`grid.${row}.${col}`]: tree._id } }
    );
      
    return treeId;

}

