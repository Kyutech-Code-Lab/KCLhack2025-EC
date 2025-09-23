/**
 * 商品一覧コンポーネント
 *
 * このコンポーネントの学習ポイント：
 * 1. propsでデータを受け取る
 * 2. mapメソッドでのリスト表示
 * 3. onClick イベントハンドラーの実装
 * 4. コンポーネントの分割による再利用性
 */

"use client";

import Link from "next/link";
import styles from "./index.module.css";
import { Product } from "@/server/types";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className={styles.productLink}
        >
          <div className={styles.productCard}>
            <div className={styles.productImage}></div>

            <div className={styles.productInfo}>
              {product.category && (
                <span className={styles.categoryBadge}>{product.category}</span>
              )}

              <h3 className={styles.productName}>{product.name}</h3>

              <p className={styles.productPrice}>
                ¥{product.price.toLocaleString()}
              </p>

              <div className={styles.productActions}>
                <button
                  className={styles.addToCartBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`${product.name} をカートに追加しました！`);
                  }}
                >
                  カートに追加
                </button>
                <button
                  className={styles.wishlistBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`${product.name} をお気に入りに追加しました！`);
                  }}
                >
                  ♡
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
