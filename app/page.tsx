"use client"

import { useState, useEffect } from "react"
import type { User, UserFormValues, UserSubmitPayload } from "@/types/user"
import UserForm from "@/components/UserForm"
import UserTable from "@/components/UserTable"

export default function Page() {
  const [users, setUsers] = useState<User[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formValues, setFormValues] = useState<UserFormValues>({
    name: "",
    email: "",
    age: "",
  })
  const [message, setMessage] = useState("")

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users")
      const data = await res.json()
      if (res.ok) setUsers(data)
    } catch (err) {
      setMessage("Failed to fetch users")
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleFormSubmit = async (payload: UserSubmitPayload) => {
    setMessage("")
    try {
      const url = editingId ? `/api/users/${editingId}` : "/api/users"
      const method = editingId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setMessage(
          editingId
            ? "User updated successfully!"
            : "User created successfully!"
        )
        handleCancelEdit()
        fetchUsers()
      }
    } catch (err) {
      setMessage("An error occurred.")
    }
  }

  const handleEditClick = (user: User) => {
    setEditingId(user.id)
    setFormValues({
      name: user.name,
      email: user.email,
      age: user.age.toString(),
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormValues({ name: "", email: "", age: "" })
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Sigurado ka ba na gusto mo 'tong burahin?")) return
    setMessage("")

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" })
      if (res.ok) {
        setMessage("User deleted successfully!")
        fetchUsers()
      }
    } catch (err) {
      setMessage("Failed to delete user")
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <h1 className="border-b pb-2 text-2xl font-bold">
        API Route Testing Dashboard
      </h1>

      {message && (
        <div className="rounded bg-blue-100 p-3 text-sm font-medium text-blue-800">
          Status Note: {message}
        </div>
      )}

      <UserForm
        editingId={editingId}
        initialValues={formValues}
        onSubmit={handleFormSubmit}
        onCancelEdit={handleCancelEdit}
      />

      <UserTable
        users={users}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
    </div>
  )
}
