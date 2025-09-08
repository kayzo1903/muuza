// types/user.ts
export interface UserStats {
  orders: number;
  wishlist: number;
  addresses: number;
}

export interface UserStore {
  id: string;
  name: string;
  pendingOrders: number;
  rating: number;
  totalSales: number;
  isActive: boolean;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  phone: string;
  stats: UserStats;
  store: UserStore | null; // Allow store to be null
}