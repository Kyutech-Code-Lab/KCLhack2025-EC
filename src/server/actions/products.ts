"use server";

import { promises as fs } from "fs";
import path from "path";
import { Product, DatabaseResponse, SingleDatabaseResponse } from "../types";
import { createClient } from "@/lib/supabase/server";

// 全商品を取得するServer Action
export async function getAllProducts(): Promise<DatabaseResponse<Product>> {
  try {
    
    // DBから商品データを取得
    const supabase = await createClient();
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    // 全商品のデータを返す
    return {
      data: products,
      error: null,
      count: products?.length || 0,
      status: 200,
      statusText: "OK"
    };
  // エラーが発生した場合
  } catch (error) {
    console.error("商品一覧の取得に失敗しました:", error);

    return {
      data: null,
      error: {
        message: "商品一覧の取得に失敗しました",
        details: error instanceof Error ? error.message : "不明なエラー",
        hint: "しばらく時間をおいて再試行してください",
        code: "FETCH_ERROR"
      },
      count: null,
      status: 500,
      statusText: "Internal Server Error"
    };
  }
}

// 指定されたIDの商品を取得するServer Action
export async function getProductById(id: number): Promise<SingleDatabaseResponse<Product>> {
  try {

    // DBから商品データを取得
    const supabase = await createClient();
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    // 指定された商品データを返す
    return {
      data: product,
      error: null,
      status: 200,
      statusText: "OK"
    };
  // エラーが起きたとき
  } catch (error) {
    console.error("商品の取得に失敗しました:", error);

    return {
      data: null,
      error: {
        message: "商品の取得に失敗しました",
        details: error instanceof Error ? error.message : "不明なエラー",
        hint: "しばらく時間をおいて再試行してください",
        code: "FETCH_ERROR"
      },
      status: 500,
      statusText: "Internal Server Error"
    };
  }
}

