import React from 'react';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Canvas } from '@react-three/fiber'  



export async function getServerSideProps(context) {
  const { taskTree } = context.query;

  let parsedTaskTree = null;
  try {
    parsedTaskTree = taskTree ? JSON.parse(taskTree) : null;
  } catch (error) {
    console.error('Error parsing taskTree:', error);
  }

  // console.log(JSON.parse(parsedTaskTree.assignedTask));
  const editableRootNode = convertToEditable(JSON.parse(parsedTaskTree.assignedTask));

  return {
    props: {
        taskTree: parsedTaskTree,
        root: editableRootNode,
    },
  };
}



function convertToEditable(taskTree) {
  if (!taskTree) return null;

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
  // console.log(editableTaskTree);
  return editableTaskTree;
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
    }
  });

  return schemaTaskTree;
}

export default function TaskPage({ taskTree, root }) {
  const [eRoot, setERoot] = useState(root);
  
  if (!taskTree || !root) return <p>Loading...</p>;
  
    const handleToggle = (id) => {

      // console.log("toggle " + id );
      const newRoot = {...eRoot};
      
      if (newRoot.nodeId == id) {
        newRoot.completed = !newRoot.completed
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
        if (child.nodeId == id) {
          child.completed = !child.completed
          child.subtasks.forEach((grandchild) => {
            grandchild.completed = child.completed;
          });
          setERoot(newRoot);
          return;
        }
      });

      newRoot.subtasks.forEach((child) => {
        child.subtasks.forEach((grandchild) => {
          if (grandchild.nodeId == id) {
            grandchild.completed = !grandchild.completed
            setERoot(newRoot);
            return;
          }
        });
      });
    };
  
    return (

      
      <div
      style={{
        display: 'flex',
        padding: '20px',
        fontFamily: 'sans-serif',
        backgroundColor: '#f5f5dc',
        minHeight: '100vh',
        color: '#333'
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital@0;1&display=swap" rel="stylesheet"></link>
      <div className="w-[50%] h-full">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </Canvas>
      </div>
        <div className="tree-root w-[50%] bg-[#FBE7B1] px-4 py-4 exo-2-default">
          
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
                            style={{borderColor: "#000"}}
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
            
          <Button
            className={"mx-6 my-4"}
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
        </div>
      </div>
    );
  }
  
  