"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  todos: Array<{ dueDate: Date }>
}

const getDaysInWeek = (date: Date): Date[] => {
  const days: Date[] = []
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay())
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    days.push(day)
  }
  
  return days
}

const formatDayName = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date).toUpperCase()
}

const formatDayNumber = (date: Date): string => {
  return date.getDate().toString()
}

const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isSelected = (date: Date, selectedDate: Date): boolean => {
  return date.toDateString() === selectedDate.toDateString()
}

const hasTodos = (date: Date, todos: Array<{ dueDate: Date }>): boolean => {
  return todos.some(todo => {
    if (!todo.dueDate) return false
    return todo.dueDate.toDateString() === date.toDateString()
  })
}

export const Calendar = ({ selectedDate, onDateSelect, todos }: CalendarProps) => {
  const [currentWeek, setCurrentWeek] = useState(new Date())

  useEffect(() => {
    setCurrentWeek(selectedDate)
  }, [selectedDate])

  const days = getDaysInWeek(currentWeek)

  const handlePreviousWeek = () => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() - 7)
    setCurrentWeek(newWeek)
  }

  const handleNextWeek = () => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() + 7)
    setCurrentWeek(newWeek)
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentWeek(today)
    onDateSelect(today)
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Today
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePreviousWeek}
            className="h-9 w-9 p-0 rounded-full hover:bg-muted/80"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleToday}
            className="text-xs rounded-full px-4 py-2 bg-primary hover:bg-primary/90"
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextWeek}
            className="h-9 w-9 p-0 rounded-full hover:bg-muted/80"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-6 px-2 scrollbar-hide">
        {days.map((day) => (
          <div key={day.toISOString()} className="flex-shrink-0 py-2">
            <button
              onClick={() => onDateSelect(day)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[70px] h-20 rounded-xl border-2 transition-all duration-300 ease-in-out",
                "hover:scale-105 hover:shadow-lg hover:z-10 relative",
                isSelected(day, selectedDate) && "bg-primary text-primary-foreground border-primary shadow-lg scale-105 z-10",
                !isSelected(day, selectedDate) && "bg-card border-border hover:border-primary/50",
                hasTodos(day, todos) && !isSelected(day, selectedDate) && "border-primary/40 shadow-md",
                isToday(day) && !isSelected(day, selectedDate) && "border-primary/60 bg-primary/5"
              )}
            >
            <span className={cn(
              "text-xs font-semibold uppercase tracking-wide",
              isToday(day) && !isSelected(day, selectedDate) && "text-primary"
            )}>
              {formatDayName(day)}
            </span>
            <span className={cn(
              "text-xl font-bold mt-1",
              isToday(day) && !isSelected(day, selectedDate) && "text-primary"
            )}>
              {formatDayNumber(day)}
            </span>
            {hasTodos(day, todos) && (
              <div className={cn(
                "w-2 h-2 rounded-full mt-2 animate-pulse",
                isSelected(day, selectedDate) ? "bg-primary-foreground" : "bg-primary"
              )} />
            )}
          </button>
        </div>
        ))}
      </div>
    </div>
  )
} 