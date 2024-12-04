
export interface User {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export interface Permission {
  id: string;
  name: string;
}

  