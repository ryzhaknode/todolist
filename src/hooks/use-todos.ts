"use client"

import { useState, useEffect, useCallback } from 'react'
import { Todo, TodoFormData } from '@/types/todo'
import { toast } from 'sonner'

const STORAGE_KEY = 'todos'

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  const saveTodos = useCallback((newTodos: Todo[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
    } catch (error) {
      console.error('Ошибка сохранения todos:', error)
      toast.error('Ошибка сохранения задач')
    }
  }, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedTodos = JSON.parse(stored).map((todo: Record<string, unknown>) => ({
          ...todo,
          createdAt: new Date(todo.createdAt as string),
          updatedAt: new Date(todo.updatedAt as string),
          dueDate: todo.dueDate ? new Date(todo.dueDate as string) : new Date(),
        }))
        setTodos(parsedTodos)
      } else {
        const demoTodos: Todo[] = [
          {
            id: '1',
            title: 'Зробити задачу після співбесіди',
            description: 'Виконати тестове завдання, яке дали після технічної співбесіди',
            completed: false,
            priority: 'high',
            category: 'WORK',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
          },
          {
            id: '2',
            title: 'Написати туду лист на Next',
            description: 'Створити повноцінний todo list додаток з використанням Next.js',
            completed: false,
            priority: 'high',
            category: 'WORK',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
          },
          {
            id: '3',
            title: 'Задеплоїти проект',
            description: 'Розгорнути готовий проект на хостингу (Vercel/Netlify)',
            completed: false,
            priority: 'medium',
            category: 'WORK',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
          },
          {
            id: '4',
            title: 'Відправити на перевірку',
            description: 'Надіслати готовий проект на ревью ментору або в команду',
            completed: false,
            priority: 'medium',
            category: 'WORK',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
          },
          {
            id: '5',
            title: 'Вивчити TypeScript',
            description: 'Пройти курс з TypeScript та практикуватися на реальних проектах',
            completed: false,
            priority: 'medium',
            category: 'LEARNING',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          },
          {
            id: '6',
            title: 'Оновити портфоліо',
            description: 'Додати нові проекти та оновити інформацію в портфоліо',
            completed: false,
            priority: 'low',
            category: 'WORK',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          },
          {
            id: '7',
            title: 'Підготуватися до співбесіди',
            description: 'Повторити алгоритми, структури даних та системний дизайн',
            completed: false,
            priority: 'high',
            category: 'WORK',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
          },
          {
            id: '8',
            title: 'Вивчити React Query',
            description: 'Освоїти бібліотеку для управління станом серверних даних',
            completed: false,
            priority: 'medium',
            category: 'LEARNING',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          },
        ]
        setTodos(demoTodos)
        saveTodos(demoTodos)
      }
    } catch (error) {
      console.error('Ошибка загрузки todos:', error)
      toast.error('Ошибка загрузки задач')
    } finally {
      setLoading(false)
    }
  }, [saveTodos])

  const addTodo = useCallback((formData: TodoFormData) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      description: formData.description?.trim(),
      completed: false,
      priority: formData.priority,
      category: formData.category?.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: formData.dueDate || new Date(),
    }

    setTodos(prev => {
      const newTodos = [newTodo, ...prev]
      saveTodos(newTodos)
      return newTodos
    })

    toast.success('Задача добавлена')
  }, [saveTodos])

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prev => {
      const newTodos = prev.map(todo =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date() }
          : todo
      )
      saveTodos(newTodos)
      return newTodos
    })

    toast.success('Задача обновлена')
  }, [saveTodos])

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => {
      const newTodos = prev.filter(todo => todo.id !== id)
      saveTodos(newTodos)
      return newTodos
    })

    toast.success('Задача удалена')
  }, [saveTodos])

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => {
      const newTodos = prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
      saveTodos(newTodos)
      return newTodos
    })
  }, [saveTodos])

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  }
}

export default useTodos 