import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "ZeroPlay Games 繁體中文隱私權政策。",
  alternates: buildAlternates("/privacy", "zh-tw"),
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-gray-300">
      <h1 className="text-3xl font-bold text-white">隱私權政策</h1>
      <div className="mt-6 space-y-6 leading-relaxed">
        <section><h2 className="text-xl font-semibold text-white">我們收集的資料</h2><p className="mt-2">ZeroPlay Games 不要求建立帳號。網站可能透過 GA4 等分析工具收集裝置、瀏覽器、頁面瀏覽、互動事件與概略地區等彙總資訊，用於改善網站與遊戲體驗。</p></section>
        <section><h2 className="text-xl font-semibold text-white">瀏覽器儲存空間</h2><p className="mt-2">部分遊戲會使用 localStorage 儲存最高分、進度或遊戲狀態。這些資料通常保留在你的瀏覽器中；清除網站資料後可能一併刪除。</p></section>
        <section><h2 className="text-xl font-semibold text-white">廣告與第三方服務</h2><p className="mt-2">網站在設定有效的廣告服務後可能顯示第三方廣告。第三方服務可能依其自身政策使用 Cookie 或類似技術。ZeroPlay Games 不出售使用者的個人資料。</p></section>
        <section><h2 className="text-xl font-semibold text-white">外部連結</h2><p className="mt-2">網站可能包含第三方網站連結。離開 ZeroPlay Games 後，資料處理由該第三方的政策負責。</p></section>
        <section><h2 className="text-xl font-semibold text-white">政策更新</h2><p className="mt-2">若網站功能、分析或廣告方式有重大變更，本政策會同步更新。</p></section>
      </div>
    </div>
  );
}
