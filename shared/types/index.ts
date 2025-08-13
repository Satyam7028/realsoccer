// shared/types/index.ts

/**
 * Common TypeScript types and interfaces for the Real Soccer application.
 * These types can be used by both the frontend and backend.
 */

// --- User Types ---
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
}

// --- Player Types ---
export interface PlayerStatistics {
  matchesPlayed?: number;
  goals?: number;
  assists?: number;
  cleanSheets?: number;
  redCards?: number;
  yellowCards?: number;
}

export interface Player {
  _id: string;
  name: string;
  team: string;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  nationality: string;
  dateOfBirth: string; // ISO Date string
  height?: number; // in cm
  weight?: number; // in kg
  jerseyNumber?: number;
  profileImage?: string;
  statistics?: PlayerStatistics;
  biography?: string;
  createdAt: string;
  updatedAt: string;
}

// --- League Types ---
export interface League {
  _id: string;
  name: string;
  country: string;
  logo?: string;
  description?: string;
  season?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Fixture Types ---
export interface FixtureScore {
  home: number;
  away: number;
}

export interface FixtureEvent {
  type: 'goal' | 'yellow card' | 'red card' | 'substitution';
  minute: number;
  player?: string; // Player ID
  description?: string;
}

export interface Fixture {
  _id: string;
  homeTeam: string;
  awayTeam: string;
  league: string | League; // Can be ID or populated League object
  date: string; // ISO Date string
  location: string;
  status: 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';
  score?: FixtureScore;
  events?: FixtureEvent[];
  createdAt: string;
  updatedAt: string;
}

// --- News Article Types ---
export interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  author: string;
  category?: 'match report' | 'transfer news' | 'injury update' | 'interview' | 'general';
  imageUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// --- Product Types (for Shop) ---
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'jersey' | 'ball' | 'boots' | 'accessories' | 'fan gear' | 'training';
  brand?: string;
  imageUrl?: string;
  stock: number;
  rating?: number;
  numReviews?: number;
  createdAt: string;
  updatedAt: string;
}

// --- Order Types ---
export interface OrderItem {
  name: string;
  qty: number;
  imageUrl: string;
  price: number;
  product: string; // Product ID
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface Order {
  _id: string;
  user: string | User; // Can be User ID or populated User object
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string; // ISO Date string
  isDelivered: boolean;
  deliveredAt?: string; // ISO Date string
  createdAt: string;
  updatedAt: string;
}

// --- Payment Types ---
export interface Payment {
  _id: string;
  user: string | User; // User ID
  order: string | Order; // Order ID
  paymentGateway: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paidAt: string; // ISO Date string
  createdAt: string;
  updatedAt: string;
}

// --- API Response Types ---
export interface ErrorResponse {
  message: string;
  stack?: string; // Only in development
}

export interface ValidationErrorResponse {
  errors: Array<{
    value: string;
    msg: string;
    param: string;
    location: string;
  }>;
}

// --- Pagination Types ---
export interface PaginationMeta {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}