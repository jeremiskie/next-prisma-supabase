"use client"

import type { UserTableProps } from "@/types/user"

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full border-collapse text-left">
        <thead className="border-b bg-gray-100">
          <tr>
            <th className="p-3 text-sm font-semibold">ID</th>
            <th className="p-3 text-sm font-semibold">Name</th>
            <th className="p-3 text-sm font-semibold">Email</th>
            <th className="p-3 text-sm font-semibold">Age</th>
            <th className="p-3 text-center text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-sm text-gray-500">
                No users found. Try creating one above!
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b text-sm hover:bg-gray-50">
                <td className="p-3 font-mono">{user.id}</td>
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3 text-gray-600">{user.email}</td>
                <td className="p-3 font-mono">{user.age}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="rounded bg-yellow-500 px-3 py-1 text-xs text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}