import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "服務條款",
  description: "ZeroPlay Games 繁體中文服務條款。",
  alternates: buildAlternates("/terms", "zh-tw"),
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-gray-300">
      <h1 className="text-3xl font-bold text-white">服務條款</h1>
      <div className="mt-6 space-y-6 leading-relaxed">
        <section><h2 className="text-xl font-semibold text-white">使用網站</h2><p className="mt-2">使用 ZeroPlay Games 即表示你同意遵守本服務條款。本站提供免費瀏覽器遊戲與相關說明內容，功能可能因維護、瀏覽器限制或第三方服務而變更。</p></section>
        <section><h2 className="text-xl font-semibold text-white">遊戲與內容</h2><p className="mt-2">網站上的遊戲頁面、說明、介面與原始遊戲內容受其適用的權利與授權條款約束。未經授權不得將本站內容用於侵權、惡意或違法用途。</p></section>
        <section><h2 className="text-xl font-semibold text-white">服務可用性</h2><p className="mt-2">我們會盡力維持網站可用，但不保證所有遊戲在每一種裝置、瀏覽器或網路環境中都能完全相同地運作。</p></section>
        <section><h2 className="text-xl font-semibold text-white">禁止行為</h2><p className="mt-2">不得以自動化濫用、攻擊、繞過安全機制、散布惡意程式或其他方式干擾網站與其他使用者。</p></section>
        <section><h2 className="text-xl font-semibold text-white">條款更新</h2><p className="mt-2">網站功能或法律要求變更時，我們可能更新本條款。更新內容會發布於此頁面。</p></section>
      </div>
    </div>
  );
}
