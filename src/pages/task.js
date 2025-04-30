import React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Canvas } from '@react-three/fiber';  
import { color, motion } from 'framer-motion';
import { Shovel } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// let buttonClasses = 'bg-green-600 hover:bg-green-700 text-white font-semibold ml-6 my-4';
// let shovelButtonClasses = 'bg-red-600 hover:bg-red-700 text-white font-semibold mx-0 mb-4';
let saveButtonClasses   = "bg-green-600 hover:bg-green-700 text-white font-semibold"
let shovelButtonClasses = "bg-red-600   hover:bg-red-700   text-white font-semibold"


function convertToEditable(taskTree) {
  if (!taskTree) {return null;}

  const editableTaskTree = {...taskTree};
  let count = 0;
  editableTaskTree.unravel = true;
  editableTaskTree.nodeId = (count++);
  editableTaskTree.subtasks.forEach(child => {
    child.unravel = false;
    child.nodeId = (count++);
    child.subtasks.forEach(grandchild => {
      grandchild.unravel = false;
      grandchild.nodeId = (count++);
    });
  });

  return editableTaskTree;
}

export async function getServerSideProps(context) {
  const { taskTree } = context.query;
  
  let parsedTaskTree = null;
  try {
    parsedTaskTree = taskTree ? JSON.parse(taskTree) : null;
  } catch (error) {
    console.error('Error parsing taskTree:', error);
  }

  
  const editableRootNode = convertToEditable(JSON.parse(parsedTaskTree.assignedTask));

  return {
    props: {
        taskTree: parsedTaskTree,
        root: editableRootNode,
    },
  };
}

function convertToSchema(taskTree) {
  const schemaTaskTree = {};
  schemaTaskTree.task = taskTree.task;
  schemaTaskTree.completed = taskTree.completed;

  schemaTaskTree.subtasks = taskTree.subtasks.map(child => {
    return {
      task: child.task,
      completed: child.completed,
      subtasks: child.subtasks.map(grandchild => {
        return {
          task: grandchild.task,
          completed: grandchild.completed,
          subtasks: []
        };
      }),
    };
  });

  return schemaTaskTree;
}

export default function TaskPage({ taskTree, root }) {
  const [eRoot, setERoot] = useState(root);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  
  if (!taskTree || !root) {return <p>Loading...</p>;}
  
    const handleToggle = (id) => {

      // console.log("toggle " + id );
      const newRoot = {...eRoot};
      
      if (newRoot.nodeId === id) {
        newRoot.completed = !newRoot.completed;
        newRoot.subtasks.forEach((child) => {
          child.completed = newRoot.completed;
          child.subtasks.forEach((grandchild) => {
            grandchild.completed = newRoot.completed;
          });
        });
        setERoot(newRoot);
        return;
      } 
       
      newRoot.subtasks.forEach((child) => {
        if (child.nodeId === id) {
          child.completed = !child.completed;
          child.subtasks.forEach((grandchild) => {
            grandchild.completed = child.completed;
          });
          setERoot(newRoot);
          return;
        }
      });

      newRoot.subtasks.forEach((child) => {
        child.subtasks.forEach((grandchild) => {
          if (grandchild.nodeId === id) {
            grandchild.completed = !grandchild.completed;
            setERoot(newRoot);
            return;
          }
        });
      });
    };
  
    const handleDelete = async () => {
      try {
        const res = await fetch(`/task/${taskTree.treeId}`, { method: 'DELETE' });
        if (res.ok) {
          window.location.href = '/dashboard';
        }
      } catch (err) {
        console.error('Delete failed:', err);
      } finally {
        setIsDialogOpen(false);
      }
    }

    return (

      
      <div
      style={{
        display: 'flex',
        padding: '20px',
        fontFamily: 'sans-serif',
        backgroundColor: '#FBE7B1',
        minHeight: '100vh',
        color: '#333'
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital@0;1&display=swap" rel="stylesheet"></link>
      <div className="w-[50%] flex h-screen border-2 border-red-500">
        <Canvas
          camera={{
            position: [0, 10, 20],  // move back along Z
            fov: 60               // widen the field of view (default is 50)
          }}
          className="w-full h-full"
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]}/>
          <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[5, 1, 5]} />
            <meshStandardMaterial color="#388E3C" />
          </mesh>

          <mesh position={[0, 3, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 5, 1]} />
            <meshStandardMaterial color="brown" />
          </mesh>

          <mesh position={[0, 5.5, 0]} rotation={[0, 0, 0]}>
            <tetrahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="red" />
          </mesh>
          <mesh position={[0, 5.5, 0]} rotation={[0, 180, 0]}>
            <tetrahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="red" />
          </mesh>

        </Canvas>
      </div>
        {/* <div className="tree-root w-[50%] bg-[#FBE7B1] px-4 py-4 exo-2-default"> */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="tree-root w-[50%] bg-[#f5f5dc] text-[#A18C53] px-4 py-4 exo-2-default"
        >
          
          <h2>{eRoot.task}</h2>
          <Accordion type="single" collapsible className="">
              {eRoot.subtasks && eRoot.subtasks.length > 0 && (
                <div className="">
                  {eRoot.subtasks.map(child => (
                    <div key={child.nodeId} className="accordion-node" >
                      <AccordionItem value={`item-${child.nodeId}`} >
                        <div className="flex items-center">
                          <Checkbox
                            id={`checkbox-${child.nodeId}`}
                            checked={child.completed}
                            onClick={(e) => e.stopPropagation()} // Prevents bubbling to the trigger
                            onCheckedChange={() => handleToggle(child.nodeId)}
                            style={{borderColor: "#000", }}
                          />
                          <AccordionTrigger className="pt-5 pb-3 mb-0">
                            <span style={{ marginLeft: '8px' }}>{child.task}</span>
                          </AccordionTrigger>
                        </div>

                    <AccordionContent className="py-0 my-0">
                      {child.subtasks && child.subtasks.length > 0 && (

                        <ul>
                          {child.subtasks.map(grandchild => (
                            <li key={grandchild.nodeId}>
                              <div>
                                <Checkbox
                                  id={`checkbox-${grandchild.nodeId}`}
                                  checked={grandchild.completed}
                                  onCheckedChange={() => handleToggle(grandchild.nodeId)} 
                                  className="my-3 py-0 mr-2"
                                  style={{borderColor: "#000"}}
                                />
                                <span >{grandchild.task}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      </AccordionContent>
                    </AccordionItem>
                    </div>
                    
                  ))}
                </div>
              )}
          </Accordion>
           <div className="mt-4 ml-2 space-x-3 mr-0 mb-0 px-4 flex"> 
          <Button
            className={saveButtonClasses}
            onClick={() => {
              fetch(`/task/${taskTree.treeId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newTree: convertToSchema(eRoot) }),
              })
              .then(
                window.location.href = '/dashboard'
              )
              .catch((err) => {
                console.error('Task POST failed:', err);
              });

              
            }}
          >Save Changes and Exit</Button>
          <Button
            className={shovelButtonClasses}
            onClick={() => setIsDialogOpen(true)}

          ><Shovel className="w-4 h-6"/>
          </Button>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="exo-2-default">
            <DialogHeader>
              <DialogTitle>Delete Task</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this task?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="space-x-2">
              <Button variant="destructive" onClick={handleDelete}>
                Confirm
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </motion.div>

      </div>
    );
  }
  
  