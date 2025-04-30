import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { Home } from 'lucide-react';

export default function NewTreePage() {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [treeStatus, setTreeStatus] = useState('READY');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTreeStatus('GENERATING');
    const res = await fetch('/new-tree', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskName, description, treeStatus: 'GENERATING' }),
    });
    console.log('Generating tree...');

    if (res.ok) {
      const data = await res.json();
      window.location.href = data.redirect;
    } else {
      console.error('Error planting bonsai');
    }
  };

  let buttonLabel = 'Plant Bonsai';
  let buttonClasses = 'bg-green-600 hover:bg-green-700 text-white font-semibold';
  let isDisabled = false;

  if (treeStatus === 'GENERATING') {
    buttonLabel = 'Generating Tree...';
    buttonClasses = 'bg-green-300 text-white font-semibold cursor-not-allowed';
    isDisabled = true;
  } else if (treeStatus === 'MINTING') {
    buttonLabel = 'Minting Tree...';
    buttonClasses = 'bg-green-300 text-white font-semibold cursor-not-allowed';
    isDisabled = true;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0., ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center bg-[#FBE7B1] p-4 exo-2-default"
    >
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital@0;1&display=swap" rel="stylesheet"></link>
      <motion.h1 variants={itemVariants} className="flex items-center space-x-0 text-3xl md:text-4xl font-bold mb-4 text-[#A18C53]">
        Plant Your New <span className="text-green-700 pl-3 pr-1">Bonsai</span><motion.img
        variants={itemVariants}
        src="/bonsai.svg"
        alt="Bonsai icon"
        className="w-8 h-8 ml-2"
      />
      </motion.h1>

      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-4 bg-transparent p-4"
      >
        <Label htmlFor="taskName" className="text-lg text-[#A18C53]">
          Task Name
        </Label>
        <Input
          id="taskName"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="bg-white text-black"
          required
        />

        <Label htmlFor="description" className="text-lg text-[#A18C53]">
          Description (Optional)
        </Label>
        <Textarea
          id="description"
          placeholder="Describe your bonsai..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-white text-black"
        />

        <Button type="submit" className={buttonClasses} disabled={isDisabled}>
          {buttonLabel}
        </Button>
      </motion.form>

      <motion.div variants={itemVariants} className="mt-8">
        <Link href="/" className="text-green-700 flex items-center gap-2">
          <Home className="w-5 h-5" />
          <span className="hidden md:inline">Go Home</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
