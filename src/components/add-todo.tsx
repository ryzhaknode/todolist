"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TodoFormData } from "@/types/todo"

interface AddTodoProps {
  onAdd: (data: TodoFormData) => void
  selectedDate: Date
}

const categories = [
  'WORK', 'LEARNING', 'PERSONAL', 'HEALTH', 'FINANCE', 'HOUSE'
]

export const AddTodo = ({ onAdd, selectedDate }: AddTodoProps) => {
  const [taskText, setTaskText] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("PERSONAL")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!taskText.trim()) {
      return
    }

    const formData: TodoFormData = {
      title: taskText.trim(),
      description: description.trim() || undefined,
      priority: 'medium',
      category: category,
      dueDate: selectedDate,
    }

    onAdd(formData)
    setTaskText("")
    setDescription("")
    setCategory("PERSONAL")
    setIsOpen(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4 z-50">
      <div className="bg-card/95 backdrop-blur-sm border-2 border-border/50 rounded-2xl shadow-2xl p-4 animate-slide-up">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              placeholder="What needs to be done?"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-20 h-12 text-base border-2 border-border/50 focus:border-primary/50 rounded-xl bg-background/50 backdrop-blur-sm"
            />
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                >
                  <span className="text-lg">⚙️</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-6 bg-card/95 backdrop-blur-sm border-2 border-border/50 rounded-2xl shadow-2xl" align="end">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold mb-3 block text-foreground">
                      Description (optional)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add more details about this task..."
                      className="w-full p-3 border-2 border-border/50 focus:border-primary/50 rounded-xl text-sm resize-none bg-background/50 backdrop-blur-sm"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-3 block text-foreground">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 border-2 border-border/50 focus:border-primary/50 rounded-xl text-sm bg-background/50 backdrop-blur-sm"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    📅 Task will be added to <span className="font-semibold">{selectedDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Button 
            type="submit" 
            disabled={!taskText.trim()}
            className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Task
          </Button>
        </form>
      </div>
    </div>
  )
} 