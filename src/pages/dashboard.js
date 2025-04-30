import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};


export default function DashboardPage({ taskData }) {
  const tasks = JSON.parse(taskData);
  // console.log(tasks);
  let buttonClasses = 'bg-green-600 hover:bg-green-700 text-white font-semibold w-[90%]';
  
  return (
    <div className="min-h-screen bg-[#FBE7B1] p-8 text-[#333] exo-2-default">
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital@0;1&display=swap" rel="stylesheet"></link>
      
      <h1 className="text-3xl font-bold text-center mb-8">Your Tasks</h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {tasks.map((task) => (
          <motion.div key={task.treeId} variants={itemVariants}>
          <Link key={task.treeId} href={`/task/${task.treeId}`}>
            <Card className="h-44 flex flex-col hover:shadow-lg transition-shadow bg-[#f5f5dc] text-[#A18C53]">
              <CardHeader>
                <CardTitle>{task.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-0.5">{/* fills middle */}</CardContent>
              <div className="mt-auto mb-0 px-4 flex justify-center" >
                <Button className={buttonClasses}>View Bonsai</Button>
              </div>
            </Card>
          </Link>
          </motion.div>
        ))}
        <motion.div variants={itemVariants}>
        <Link href="/new-tree">
        <Card className="h-44 flex flex-col hover:shadow-lg transition-shadow border-dashed border-2 border-gray-400">
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent className="flex-0.5 flex items-center justify-center">
              <p className="text-center text-sm text-gray-600">
                Click to create a new task tree
              </p>
            </CardContent>
            <div className="mt-auto mb-0 px-4 flex justify-center">
              <Button className="w-[90%]" >
                New Task
              </Button>
            </div>
          </Card>
        </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

DashboardPage.getInitialProps = async ({ query }) => {
  return { taskData: query.taskData || "[]" };
};