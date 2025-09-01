"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { ThemeToggleIOS } from "@/components/theme-toggle-ios"
import { Calendar } from "@/components/calendar"
import { TodoList } from "@/components/todo-list"
import { AddTodo } from "@/components/add-todo"
import useTodos from "@/hooks/use-todos"

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const {
    todos,
    loading,
    addTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos()

  const filteredTodos = todos.filter(todo => {
    if (!todo.dueDate) return false
    return todo.dueDate.toDateString() === selectedDate.toDateString()
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex justify-end mb-4">
          <ThemeToggleIOS />
        </div>

        <Calendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          todos={todos}
        />

        <div className="mb-24">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>

        <AddTodo
          onAdd={addTodo}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  )
}
