"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Todo } from "@/types/todo"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const groupTodosByCategory = (todos: Todo[]) => {
  const grouped = todos.reduce((acc, todo) => {
    const category = todo.category || 'OTHER'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(todo)
    return acc
  }, {} as Record<string, Todo[]>)

  const sortedCategories = Object.keys(grouped).sort()
  return sortedCategories.map(category => ({
    category,
    todos: grouped[category]
  }))
}

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  const groupedTodos = groupTodosByCategory(todos)

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-6">
          <span className="text-3xl">✨</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          No tasks for this day
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Start your day by adding your first task. Every great achievement begins with a single step!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {groupedTodos.map(({ category, todos: categoryTodos }) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              {category}
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-muted-foreground/20 to-transparent" />
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {categoryTodos.length}
            </span>
          </div>
          <div className="space-y-3">
            {categoryTodos.map((todo, index) => (
              <div
                key={todo.id}
                className="group relative"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`
                  flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-300 ease-in-out
                  bg-card hover:bg-card/80 hover:shadow-lg hover:scale-[1.02]
                  ${todo.completed 
                    ? 'border-muted/50 bg-muted/30 opacity-75' 
                    : 'border-border hover:border-primary/30'
                  }
                `}>
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => onToggle(todo.id)}
                    className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`
                      text-base leading-relaxed font-medium
                      ${todo.completed 
                        ? 'line-through text-muted-foreground' 
                        : 'text-foreground'
                      }
                    `}>
                      {todo.title}
                    </p>
                    {todo.description && (
                      <p className={`
                        text-sm mt-2 text-muted-foreground leading-relaxed
                        ${todo.completed ? 'line-through' : ''}
                      `}>
                        {todo.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 
                             text-muted-foreground hover:text-destructive hover:scale-110 p-2 rounded-full hover:bg-destructive/10"
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 