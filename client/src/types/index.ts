// client/src/types/index.ts

/**
 * Client-specific TypeScript types and interfaces for the Real Soccer application.
 * These extend or refine the shared types as needed for the frontend.
 */

// Import shared types to extend or use them
import {
  User,
  Player,
  League,
  Fixture,
  NewsArticle,
  Product,
  Order,
  Payment,
  AuthResponse,
  ShippingAddress,
  OrderItem,
  PaymentResult,
} from '../../shared/types';

// --- Client-specific UI/Component Props Types ---

// Example: Props for a generic list component
export interface ListProps<T> {
  data: T[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

// Example: Props for a form component (e.g., for admin)
export interface FormProps<T> {
  initialData?: T | null;
  onSuccess: (data: T) => void;
  onCancel?: () => void;
}

// --- Extended/Refined Types (if client needs more specific fields) ---

// Example: If client-side user object has additional fields
export interface ClientUser extends User {
  // Add client-specific fields here, e.g., uiSettings, lastLoginDateClient
}

// Example: Cart Item might have more client-side details than OrderItem
export interface CartItem extends OrderItem {
  stock: number; // Important for client-side quantity validation
}

// --- State Management Types (e.g., for Redux slices or Context state) ---

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

export interface CartState {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress | null;
  paymentMethod: string | null;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

// --- API Response Types (if different from shared or more detailed for client) ---

// Example: A paginated API response structure for the client
export interface ClientPaginatedResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

// Re-export shared types for convenience if desired
export type { User, Player, League, Fixture, NewsArticle, Product, Order, Payment, AuthResponse, ShippingAddress, OrderItem, PaymentResult };