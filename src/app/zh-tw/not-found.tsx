import NextLink from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl">🎮</div>
      <h1 className="mt-5 text-3xl font-bold text-white">找不到這個頁面</h1>
      <p className="mt-3 text-gray-400">這個遊戲或頁面不存在，或網址已經變更。</p>
      <NextLink href="/zh-tw" className="mt-6 rounded-lg bg-primary px-5 py-2.5 font-medium text-white hover:opacity-90">
        回到首頁
      </NextLink>
    </div>
  );
}
