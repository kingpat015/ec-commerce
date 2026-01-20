export type UserRole =
  | "admin"
  | "hr_user"
  | "sales_user"
  | "user"
  | "customer_user";

export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  short_description?: string;
  price?: number;
  stock?: number;
  category_id?: number;
  category_name?: string;
  image_url?: string;
  status?: string;
  created_by?: number;
  created_by_name?: string;
  created_at?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export type BulletinType = "event" | "hiring" | "announcement";

export interface Bulletin {
  id: number;
  type: BulletinType;
  title: string;
  description?: string;
  short_description?: string;
  event_date?: string;
  location?: string;
  status?: string;
  created_by?: number;
  created_by_name?: string;
  created_at?: string;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Dashboard Types
export interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalBulletins: number;
  contactSubmissions: number;
  activeProducts: number;
  activeUsers: number;
}

export interface Activity {
  icon: any;
  title: string;
  description: string;
  time: string;
  color: string;
}

export interface ContactSubmission {
  id: number;
  status?: string;
  subject?: string;
  full_name?: string;
  email?: string;
  message?: string;
  created_at?: string;
}
