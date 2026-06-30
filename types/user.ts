export interface UserFilter {
  search?: string;
  page?: number;
  limit?: number;
}

export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

// Form values structure used by the state and component
export interface UserFormValues {
  name: string;
  email: string;
  age: string;
}

// Payload structure submitted to the API (age converted to number)
export interface UserSubmitPayload {
  name: string;
  email: string;
  age: number;
}

// Props for the UserForm component
export interface UserFormProps {
  editingId: number | null;
  initialValues: UserFormValues;
  onSubmit: (payload: UserSubmitPayload) => void;
  onCancelEdit: () => void;
}

// Props for the UserTable component
export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}