"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Button from "@/components/Button";

export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setError("確認メールを送信しました。メールをご確認ください。");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          {isSignUp ? "アカウント作成" : "サインイン"}
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <Button disabled={loading}>
            {loading ? "処理中..." : isSignUp ? "アカウント作成" : "サインイン"}
          </Button>
        </form>

        <div className={styles.switchMode}>
          <p>
            {isSignUp
              ? "既にアカウントをお持ちですか？"
              : "アカウントをお持ちでない方"}
            <Button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "サインイン" : "アカウント作成"}
            </Button>
          </p>
        </div>

        <div className={styles.backLink}>
          <Button onClick={() => router.push("/")}>← ホームに戻る</Button>
        </div>
      </div>
    </div>
  );
}
