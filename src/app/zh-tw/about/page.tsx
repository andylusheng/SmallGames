import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "關於 ZeroPlay Games",
  description: "了解 ZeroPlay Games：100 款免費 HTML5 瀏覽器遊戲，無需下載或註冊。",
  alternates: buildAlternates("/about", "zh-tw"),
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-gray-300">
      <h1 className="text-3xl font-bold text-white">關於 ZeroPlay Games</h1>
      <div className="mt-6 space-y-5 leading-relaxed">
        <p>ZeroPlay Games 是一個以瀏覽器即開即玩為核心的免費 HTML5 遊戲站。目前收錄 100 款遊戲，涵蓋益智、街機、動作、賽車、體育、射擊、策略、休閒與放置類型。</p>
        <p>每款遊戲都有獨立頁面，整理實際玩法、操作方式、計分規則、結束條件、技巧與常見問題。內容以站內 Runtime 的真實機制為基礎，不使用虛構評分、遊玩次數或評論。</p>
        <p>遊戲不需要下載應用程式或建立帳號即可開始。不同遊戲的鍵盤、滑鼠與觸控支援可能不同，請以個別遊戲頁面的操作說明為準。</p>
        <p>繁體中文版本位於 <strong>/zh-tw/</strong>，與英文及既有中文路由分開維護。</p>
      </div>
    </div>
  );
}
