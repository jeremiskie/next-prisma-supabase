"use client"

import { useEffect, useState } from "react"
import type { UserFormProps } from "@/types/user"

export default function UserForm({ editingId, initialValues, onSubmit, onCancelEdit }: UserFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")

  useEffect(() => {
    setName(initialValues.name)
    setEmail(initialValues.email)
    setAge(initialValues.age)
  }, [initialValues])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, age: Number(age) })
  }

  const handleCancel = () => {
    setName("")
    setEmail("")
    setAge("")
    onCancelEdit()
  }

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h2 className="mb-3 text-lg font-semibold">
        {editingId ? `✏️ Edit User Mode (ID: ${editingId})` : "➕ Create User Form"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-xs font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="Juan Dela Cruz"
            required
          />
        </div>
        
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-xs font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="juan@email.com"
            required
          />
        </div>

        <div className="w-[100px]">
          <label className="mb-1 block text-xs font-medium text-gray-700">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="25"
            required
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            {editingId ? "Update" : "Submit"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}