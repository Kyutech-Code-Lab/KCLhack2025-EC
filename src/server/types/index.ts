// 商品データの型定義
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseError {
  message: string;
  details: string;
  hint: string;
  code: string;
}

// データベースレスポンス型（複数件取得用）
export interface DatabaseResponse<T> {
  data: T[] | null;
  error: DatabaseError | null;
  count?: number | null;
  status: number;
  statusText: string;
}

// データベースレスポンス型（単一件取得用）
export interface SingleDatabaseResponse<T> {
  data: T | null;
  error: DatabaseError | null;
  status: number;
  statusText: string;
}