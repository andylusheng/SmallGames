export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">关于 ZeroPlay Games</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">我们的目标</h2>
          <p>
            ZeroPlay Games 提供无需账号、无需安装即可开始的轻量浏览器游戏。我们的目标是让原创小游戏更容易被发现和游玩。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">现有内容</h2>
          <p>
            目前游戏目录包含 100+ 款 HTML5 游戏，覆盖动作、益智、街机、赛车、体育、策略和休闲等分类。不同游戏的设备与操作支持可能不同，我们会逐款测试并持续完善。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">联系我们</h2>
          <p>
            一般咨询：info@zeroplaygames.com
            <br />
            游戏投稿：developers@zeroplaygames.com
            <br />
            广告合作：ads@zeroplaygames.com
          </p>
        </section>
      </div>
    </div>
  );
}
