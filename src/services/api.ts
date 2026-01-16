import axios, { type AxiosInstance, AxiosError } from "axios";
import type {
  Bulletin,
  LoginCredentials,
  Product,
  RegisterData,
  User,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired, clear auth and redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth APIs
  async register(data: RegisterData) {
    const response = await this.api.post("/auth/register", data);
    return response.data;
  }

  async login(credentials: LoginCredentials) {
    const response = await this.api.post("/auth/login", credentials);
    return response.data;
  }

  async logout() {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await this.api.post("/auth/logout", { refreshToken });
    return response.data;
  }

  // User APIs
  async getUsers(params?: {
    role?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    const response = await this.api.get("/users", { params });
    return response.data;
  }

  async getUserById(id: number) {
    const response = await this.api.get(`/users/${id}`);
    return response.data;
  }

  async createUser(data: Partial<User> & { password: string }) {
    const response = await this.api.post("/users", data);
    return response.data;
  }

  async updateUser(id: number, data: Partial<User>) {
    const response = await this.api.put(`/users/${id}`, data);
    return response.data;
  }

  async deleteUser(id: number) {
    const response = await this.api.delete(`/users/${id}`);
    return response.data;
  }

  // Product APIs
  async getProducts(params?: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const response = await this.api.get("/products", { params });
    return response.data;
  }

  async getProductById(id: number) {
    const response = await this.api.get(`/products/${id}`);
    return response.data;
  }

  async createProduct(data: Partial<Product>) {
    const response = await this.api.post("/products", data);
    return response.data;
  }

  async updateProduct(id: number, data: Partial<Product>) {
    const response = await this.api.put(`/products/${id}`, data);
    return response.data;
  }

  async deleteProduct(id: number) {
    const response = await this.api.delete(`/products/${id}`);
    return response.data;
  }

  async getProductCategories() {
    const response = await this.api.get("/products/categories");
    return response.data;
  }

  // Bulletin APIs
  async getBulletins(params?: {
    type?: string;
    limit?: number;
    offset?: number;
  }) {
    const response = await this.api.get("/bulletins", { params });
    return response.data;
  }

  async getBulletinById(id: number) {
    const response = await this.api.get(`/bulletins/${id}`);
    return response.data;
  }

  async createBulletin(data: Partial<Bulletin>) {
    const response = await this.api.post("/bulletins", data);
    return response.data;
  }

  async updateBulletin(id: number, data: Partial<Bulletin>) {
    const response = await this.api.put(`/bulletins/${id}`, data);
    return response.data;
  }

  async deleteBulletin(id: number) {
    const response = await this.api.delete(`/bulletins/${id}`);
    return response.data;
  }
}

export default new ApiService();
