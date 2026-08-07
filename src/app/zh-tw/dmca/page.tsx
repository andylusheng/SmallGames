import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "DMCA 與著作權通知",
  description: "ZeroPlay Games 的 DMCA 與著作權申訴說明。",
  alternates: buildAlternates("/dmca", "zh-tw"),
};

export default function DmcaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-gray-300">
      <h1 className="text-3xl font-bold text-white">DMCA 與著作權通知</h1>
      <div className="mt-6 space-y-6 leading-relaxed">
        <p>ZeroPlay Games 尊重智慧財產權。如果你認為本站內容侵犯你的著作權，可提交移除通知，並提供足以讓我們辨識作品與爭議內容的資訊。</p>
        <section><h2 className="text-xl font-semibold text-white">通知應包含</h2><ul className="mt-2 list-disc space-y-2 pl-6"><li>著作權所有人或授權代理人的聯絡資訊。</li><li>受保護作品的說明。</li><li>本站涉嫌侵權內容的確切 URL。</li><li>你基於善意相信該使用未獲權利人、代理人或法律授權的聲明。</li><li>所提供資訊正確，且你有權代表權利人提出通知的聲明。</li></ul></section>
        <section><h2 className="text-xl font-semibold text-white">處理方式</h2><p className="mt-2">收到具體且可驗證的通知後，我們會檢視相關內容，必要時移除或限制存取。對於內容權利有爭議的情況，可能要求進一步資料。</p></section>
      </div>
    </div>
  );
}
