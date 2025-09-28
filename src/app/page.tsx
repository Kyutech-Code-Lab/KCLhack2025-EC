"use client"; // クライアントコンポーネントとして指定（イベントハンドラーを使うため）

import { useState, useEffect } from "react"; // React hooks
import styles from "./page.module.css";
import ProductList from "@/components/ProductList";
import { getAllProducts } from "@/server/actions/products";
import { Product } from "@/server/types";

export default function Home() {
  // 検索キーワードの状態管理
  const [searchKeyword, setSearchKeyword] = useState("");
  const [mockProducts, setMockProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Server Actionで商品データを取得
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await /* task2 ここで適切な関数を呼び出す */;
      if (response.data) {
        console.log(response)
        setMockProducts(response.data);
        setFilteredProducts(response.data);
      }
    };
    fetchProducts();
  }, []);

  // 検索結果のフィルタリング
  useEffect(() => {
    const lowerCaseKeyword = searchKeyword.toLowerCase();
    const results = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseKeyword) ||
        (product.category &&
          product.category.toLowerCase().includes(lowerCaseKeyword))
    );
    setFilteredProducts(results);
  }, [searchKeyword]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>
            <h1>ShopHub</h1>
          </div>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="商品を検索..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div className={styles.headerActions}>
            <button className={styles.cartButton}>🛒 カート (0)</button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        {/* ProductListコンポーネントを使用（フィルタリングされた商品を渡す） */}
        <ProductList products={filteredProducts} />
      </main>
    </div>
  );
}
