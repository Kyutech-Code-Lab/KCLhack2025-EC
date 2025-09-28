'use client'; // クライアントコンポーネントとして指定（イベントハンドラーを使うため）

import styles from './index.module.css';

// ButtonコンポーネントのProps（プロパティ）の型を定義
interface ButtonProps {
  children: React.ReactNode; // ボタン内に表示するテキストや要素
  variant?: 'primary' | 'secondary' | 'danger'; // ボタンの種類（オプション）
  size?: 'small' | 'medium' | 'large'; // ボタンのサイズ（オプション）
  disabled?: boolean; // 無効状態かどうか（オプション）
  onClick?: () => void; // クリック時の処理（オプション）
  className?: string; // 追加のCSSクラス（オプション）
}

export default function Button({ 
  children, 
  variant = 'primary', // デフォルトは'primary'
  size = 'medium', // デフォルトは'medium'
  disabled = false, // デフォルトはfalse
  onClick,
  className = ''
}: ButtonProps) {
  
  // CSS Modulesのクラス名を組み合わせる
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses}
      onClick={disabled ? undefined : onClick} // 無効時はクリック処理を無効化
      disabled={disabled}
    >
      {children}
    </button>
  );
}