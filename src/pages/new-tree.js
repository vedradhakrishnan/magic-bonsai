import { useState } from 'react'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { Home } from 'lucide-react'

  
export default function NewTreePage() {
    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')
    const [treeStatus, setTreeStatus] = useState("READY")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTreeStatus("GENERATING")
    const res = await fetch('/new-tree', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        taskName,
        description,
        treeStatus: "GENERATING"
      }),
    })
    console.log('Generating tree...')

    if (res.ok) {
      const data = await res.json(); 
      window.location.href = data.redirect; 
    } else {
      console.error('Error planting bonsai');
    }
    
  }

  let buttonLabel = 'Plant Bonsai'
  let buttonClasses = 'bg-green-600 hover:bg-green-700 text-white font-semibold'
  let isDisabled = false

  if (treeStatus === "GENERATING") {
    buttonLabel = 'Generating Tree...'
    buttonClasses = 'bg-green-300 text-white font-semibold cursor-not-allowed'
    isDisabled = true
  } else if (treeStatus === "MINTING") {
    buttonLabel = 'Minting Tree...'
    buttonClasses = 'bg-green-300 text-white font-semibold cursor-not-allowed'
    isDisabled = true
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBE7B1] p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#A18C53]">
        Plant Your New <span className="text-green-700">Bonsai</span>
      </h1>

      <form
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

        <Button
          type="submit"
          className={buttonClasses}
          disabled={isDisabled}
        >
          {buttonLabel}
        </Button>
      </form>

      <Link href="/" className="mt-8 text-green-700 flex items-center gap-2">
        <Home className="w-5 h-5" />
        <span className="hidden md:inline">Go Home</span>
      </Link>
    </div>
  )

}
