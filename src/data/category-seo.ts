/**
 * Category SEO content — rich content blocks for each category page (en + zh)
 * Used by CategoryPageView to render hook / intro / benefits / why / FAQ
 */
export interface CategoryBenefit {
  icon: string; // lucide icon key
  title: string;
  desc: string;
}
export interface CategoryFaq {
  q: string;
  a: string;
}
export interface CategorySeoLocale {
  hook: string;
  intro: string[]; // paragraphs
  benefits: CategoryBenefit[];
  why: string[];
  faq: CategoryFaq[];
}
export interface CategorySeo {
  en: CategorySeoLocale;
  zh: CategorySeoLocale;
}

export const categorySeo: Record<string, CategorySeo> = {
  puzzle: {
    en: {
      hook: "Looking for a brain teaser that actually makes you think? You're in the right place. Our free puzzle games challenge your logic, memory, and strategy — no downloads, no sign-ups, just pure problem-solving fun.",
      intro: [
        "Puzzle games are the perfect workout for your brain. Whether you love sliding numbers into place, matching colorful gems, untangling pipes, or cracking logic grids, every puzzle you solve strengthens your memory, sharpens your focus, and gives you that unbeatable 'aha!' moment.",
        "What makes puzzle games so addictive is the balance of challenge and reward. They're easy to learn but hard to master — you can finish a quick round in two minutes, or lose an entire afternoon chasing the perfect solution. And because there's no time pressure in most of our puzzles, you can think through every move at your own pace.",
        "Every puzzle game on this page runs instantly in your browser using HTML5. That means no app store downloads, no waiting for installations, and no giving up your email address. Your progress is saved automatically, so you can pick up right where you left off on any device.",
      ],
      benefits: [
        { icon: "brain", title: "Train Your Brain", desc: "Puzzles improve memory, concentration, and logical reasoning while you play." },
        { icon: "clock", title: "Play at Your Own Pace", desc: "No timers, no pressure. Think through every move as long as you need." },
        { icon: "layers", title: "Hundreds of Levels", desc: "From beginner-friendly to expert-level, there's always a new challenge waiting." },
        { icon: "smartphone", title: "Works Everywhere", desc: "Play on desktop, tablet, or phone — your progress syncs in your browser." },
      ],
      why: [
        "100% free — no downloads, no sign-ups, no in-app purchases",
        "Instant play in any modern browser on any device",
        "New puzzles added regularly to keep things fresh",
        "Clean, distraction-free interface built for focus",
      ],
      faq: [
        { q: "Are these puzzle games really free?", a: "Yes, every puzzle game on this page is completely free to play. There are no downloads, no sign-ups, no hidden fees, and no in-app purchases. Just click a game and start solving." },
        { q: "Can I play puzzle games on my phone?", a: "Absolutely. All our puzzle games are built with HTML5 and fully optimized for mobile. They work great on iPhone, iPad, and Android devices with native touch controls." },
        { q: "Do puzzle games actually improve your brain?", a: "Studies suggest that regular puzzle-solving can improve memory, concentration, and problem-solving skills. Our puzzles cover logic, memory, spatial reasoning, and pattern recognition — a well-rounded mental workout." },
        { q: "Is my progress saved?", a: "Yes. Your best scores and completed levels are saved automatically in your browser using localStorage, so you won't lose progress when you come back on the same device." },
      ],
    },
    zh: {
      hook: "想找一款真正动脑的益智游戏？你来对地方了。我们的免费益智游戏挑战你的逻辑、记忆和策略——无需下载、无需注册，纯粹享受解谜的乐趣。",
      intro: [
        "益智游戏是大脑最好的锻炼方式。无论你喜欢滑动数字、消除宝石、连接水管还是破解逻辑网格，每解开一个谜题都能增强记忆力、提升专注力，并带给你无与伦比的'顿悟'时刻。",
        "益智游戏之所以让人上瘾，在于挑战与成就感的完美平衡。它们上手简单但难以精通——你可以两分钟完成一局，也可以为一个完美解法沉浸整个下午。而且大多数谜题没有时间压力，你可以按自己的节奏思考每一步。",
        "本页所有益智游戏都基于HTML5在浏览器中即开即玩。无需去应用商店下载，无需等待安装，更不用交出你的邮箱。进度自动保存，在任何设备上都能接着玩。",
      ],
      benefits: [
        { icon: "brain", title: "锻炼大脑", desc: "解谜过程中提升记忆力、专注力和逻辑推理能力。" },
        { icon: "clock", title: "按自己的节奏玩", desc: "没有计时、没有压力，想多久就思考多久。" },
        { icon: "layers", title: "海量关卡", desc: "从新手友好到专家难度，永远有新挑战等着你。" },
        { icon: "smartphone", title: "随时随地玩", desc: "支持电脑、平板、手机，进度保存在浏览器中。" },
      ],
      why: [
        "100%免费——无需下载、无需注册、无内购",
        "任何设备的现代浏览器即开即玩",
        "定期新增谜题，保持新鲜感",
        "简洁无干扰的界面，专为专注设计",
      ],
      faq: [
        { q: "这些益智游戏真的免费吗？", a: "是的，本页所有益智游戏完全免费。没有下载、没有注册、没有隐藏收费、没有内购。点击游戏即可开始解谜。" },
        { q: "手机上能玩益智游戏吗？", a: "当然可以。所有益智游戏基于HTML5开发，完美适配移动端，支持iPhone、iPad和安卓设备，原生触屏操作。" },
        { q: "益智游戏真的能锻炼大脑吗？", a: "研究表明，经常解谜可以提升记忆力、专注力和解决问题的能力。我们的谜题覆盖逻辑、记忆、空间推理和模式识别——全面的大脑锻炼。" },
        { q: "我的进度会保存吗？", a: "会的。你的最高分和已通关进度通过localStorage自动保存在浏览器中，同一设备下次访问不会丢失。" },
      ],
    },
  },
  arcade: {
    en: {
      hook: "Miss that classic 'one more try' feeling? Our free arcade games bring back the golden age of gaming — fast, flashy, and impossible to put down. No coins needed, no downloads required.",
      intro: [
        "Arcade games are pure, distilled fun. Jump, dodge, slice, and bounce your way through fast-paced action that tests your reflexes and rewards your skill. From endless runners to precision jumpers, every game is designed to be picked up in seconds and mastered over hours.",
        "The magic of arcade games is their 'easy to learn, hard to master' design. Your first run might last ten seconds, but every attempt teaches you something new — a timing trick, a pattern, a shortcut. That constant loop of failure and improvement is what keeps players coming back for one more try.",
        "All our arcade games run directly in your browser with smooth 60fps performance. No downloads, no installs, no accounts. Your high scores are saved automatically so you can chase your personal best anywhere, anytime.",
      ],
      benefits: [
        { icon: "zap", title: "Instant Action", desc: "Games load in seconds and drop you straight into the action." },
        { icon: "trophy", title: "Chase High Scores", desc: "Beat your best and climb toward the top with every run." },
        { icon: "repeat", title: "Endless Replay", desc: "Procedural difficulty means no two runs are ever the same." },
        { icon: "gamepad", title: "Classic Feel, Modern Polish", desc: "Retro-inspired gameplay with smooth modern controls." },
      ],
      why: [
        "100% free — no coins, no downloads, no sign-ups",
        "Smooth 60fps performance in any browser",
        "High scores saved automatically to your device",
        "Perfect for quick breaks or long sessions",
      ],
      faq: [
        { q: "Are these arcade games free to play?", a: "Yes, all arcade games are completely free. No coins, no downloads, no sign-ups, no in-app purchases. Open the page and play instantly." },
        { q: "Do I need a powerful device to play?", a: "No. Our arcade games are lightweight HTML5 games that run smoothly on almost any device — old laptops, tablets, and smartphones included." },
        { q: "Can I play arcade games on mobile?", a: "Yes! All arcade games support touch controls and are optimized for mobile browsers on iPhone and Android." },
        { q: "How are high scores saved?", a: "Your best score is saved automatically in your browser via localStorage. It persists between visits on the same device." },
      ],
    },
    zh: {
      hook: "怀念那种'再来一局'的感觉？我们的免费街机游戏带你回到游戏黄金年代——快节奏、炫目、让人欲罢不能。不用投币，无需下载。",
      intro: [
        "街机游戏是纯粹的快乐。跳跃、躲避、切割、弹跳，在快节奏的动作中考验反应、奖励技巧。从无尽奔跑到精准跳跃，每款游戏都能让你几秒上手、数小时精通。",
        "街机游戏的魔力在于'易上手、难精通'的设计。第一次可能只坚持十秒，但每次尝试都能学到新东西——一个时机技巧、一个规律、一条捷径。正是这种失败与进步的循环，让玩家不断'再来一局'。",
        "所有街机游戏都在浏览器中以60fps流畅运行。无需下载、无需安装、无需账号。最高分自动保存，随时随地冲击个人纪录。",
      ],
      benefits: [
        { icon: "zap", title: "即刻开玩", desc: "游戏秒速加载，直接进入战斗。" },
        { icon: "trophy", title: "冲击高分", desc: "每一局都在超越自己的最好成绩。" },
        { icon: "repeat", title: "无限重玩", desc: "动态难度让每一局都与众不同。" },
        { icon: "gamepad", title: "经典手感，现代打磨", desc: "复古玩法搭配流畅的现代操控。" },
      ],
      why: [
        "100%免费——不用投币、无需下载、无需注册",
        "任何浏览器都能60fps流畅运行",
        "最高分自动保存到设备",
        "碎片时间或长时间游玩都合适",
      ],
      faq: [
        { q: "这些街机游戏免费吗？", a: "是的，所有街机游戏完全免费。不用投币、无需下载、无需注册、没有内购。打开页面即可游玩。" },
        { q: "需要高配置设备吗？", a: "不需要。我们的街机游戏是轻量级HTML5游戏，旧笔记本、平板、手机都能流畅运行。" },
        { q: "手机上能玩街机游戏吗？", a: "可以！所有街机游戏支持触屏操作，完美适配iPhone和安卓手机浏览器。" },
        { q: "最高分怎么保存？", a: "最高分通过localStorage自动保存在浏览器中，同一设备下次访问仍然保留。" },
      ],
    },
  },
  shooting: {
    en: {
      hook: "Ready to lock and load? Our free shooting games put your aim, reflexes, and survival instincts to the test — from alien invasions to zombie hordes. No downloads, just pure firepower in your browser.",
      intro: [
        "Shooting games are all about precision under pressure. Dodge waves of enemies, grab powerful upgrades, and unleash devastating boss battles in action-packed combat that keeps your heart racing. Every wave is harder than the last — how long can you survive?",
        "What sets great shooting games apart is the feeling of progression. You start with a basic weapon and end each run stronger, unlocking new firepower and learning enemy patterns. The combination of fast reflexes and smart positioning makes every session feel rewarding.",
        "Every shooter on this page runs instantly in your browser with crisp controls and explosive particle effects. No downloads, no installs, no accounts — your best scores are saved automatically so you can keep pushing your limits.",
      ],
      benefits: [
        { icon: "target", title: "Test Your Aim", desc: "Precision shooting mechanics that reward skill and timing." },
        { icon: "shield", title: "Epic Boss Fights", desc: "Face massive bosses that demand dodging and strategy." },
        { icon: "trending-up", title: "Power-Up Progression", desc: "Collect upgrades and grow stronger with every wave." },
        { icon: "flame", title: "Explosive Effects", desc: "Particle explosions and screen shake for maximum impact." },
      ],
      why: [
        "100% free — no downloads, no sign-ups, no in-app purchases",
        "Crisp, responsive controls in any browser",
        "New enemies and waves keep the challenge fresh",
        "High scores saved automatically to your device",
      ],
      faq: [
        { q: "Are these shooting games free?", a: "Yes, every shooting game is completely free to play in your browser. No downloads, no sign-ups, no hidden costs." },
        { q: "Are the shooting games violent or gory?", a: "No. Our shooting games are stylized and family-friendly — think alien ships, robots, and zombies in a cartoon style, not realistic violence." },
        { q: "Can I play shooting games on mobile?", a: "Yes. All our shooters support touch controls and are optimized for mobile browsers, though a desktop gives you the best aiming precision." },
        { q: "How do I get better at shooting games?", a: "Focus on movement first — staying alive beats chasing kills. Learn enemy patterns, prioritize power-ups, and save your strongest weapons for bosses." },
      ],
    },
    zh: {
      hook: "准备好战斗了吗？我们的免费射击游戏考验你的瞄准、反应和生存本能——从外星入侵到僵尸潮。无需下载，浏览器里就是战场。",
      intro: [
        "射击游戏的核心是压力下的精准。躲避成波的敌人、拾取强力升级、在惊心动魄的战斗中击败Boss。每一波都比上一波更难——你能坚持多久？",
        "优秀射击游戏的关键在于成长感。你从基础武器开始，每局结束都变得更强，解锁新火力、摸清敌人规律。快速反应与聪明走位的结合，让每一局都充满成就感。",
        "本页所有射击游戏都在浏览器中即开即玩，操控灵敏、特效炸裂。无需下载、无需安装、无需账号——最高分自动保存，助你不断突破极限。",
      ],
      benefits: [
        { icon: "target", title: "考验瞄准", desc: "精准射击机制，奖励技巧与时机。" },
        { icon: "shield", title: "史诗Boss战", desc: "面对需要走位与策略的巨型Boss。" },
        { icon: "trending-up", title: "道具成长", desc: "收集升级，每一波都变得更强。" },
        { icon: "flame", title: "炸裂特效", desc: "粒子爆炸与震屏效果，打击感十足。" },
      ],
      why: [
        "100%免费——无需下载、无需注册、无内购",
        "任何浏览器都有灵敏的操控",
        "新敌人和新波次保持挑战新鲜感",
        "最高分自动保存到设备",
      ],
      faq: [
        { q: "这些射击游戏免费吗？", a: "是的，所有射击游戏都可以在浏览器中完全免费游玩。无需下载、无需注册、没有隐藏收费。" },
        { q: "射击游戏会很暴力吗？", a: "不会。我们的射击游戏是风格化、适合全家的——外星飞船、机器人、卡通僵尸，没有写实暴力。" },
        { q: "手机上能玩射击游戏吗？", a: "可以。所有射击游戏支持触屏操作并适配移动端，不过桌面端瞄准更精准。" },
        { q: "怎么提高射击游戏水平？", a: "先练走位——活着比击杀更重要。摸清敌人规律，优先拾取道具，把最强武器留给Boss。" },
      ],
    },
  },
  casual: {
    en: {
      hook: "Just want to relax and have some easy fun? Our free casual games are perfect for those moments — simple one-touch controls, satisfying gameplay, and zero stress. No downloads, no learning curve.",
      intro: [
        "Casual games are the perfect way to unwind. Whether you have two minutes between tasks or want to zone out for a while, these games are designed to be picked up instantly and enjoyed without any pressure. One tap, one swipe — that's all it takes.",
        "The best casual games are deceptively simple. The controls take seconds to learn, but the gameplay loop is so satisfying you'll keep coming back. Pop bubbles, catch falling objects, spin, tap, and slice your way through cheerful, colorful fun.",
        "All our casual games run right in your browser and work beautifully on any device. No downloads, no sign-ups, no tutorials needed. It's instant, stress-free entertainment whenever you need a break.",
      ],
      benefits: [
        { icon: "smile", title: "Instantly Relaxing", desc: "Simple, satisfying gameplay that melts away stress." },
        { icon: "hand", title: "One-Touch Controls", desc: "Anyone can learn to play in seconds — kids and adults alike." },
        { icon: "palette", title: "Cheerful & Colorful", desc: "Bright visuals and delightful effects that make you smile." },
        { icon: "infinity", title: "Endless Fun", desc: "No levels to run out of — play as long as you like." },
      ],
      why: [
        "100% free — no downloads, no sign-ups, no in-app purchases",
        "Perfect for quick breaks anywhere, anytime",
        "Family-friendly fun for all ages",
        "Works on desktop, tablet, and mobile",
      ],
      faq: [
        { q: "Are casual games really free?", a: "Yes, all our casual games are completely free. No downloads, no sign-ups, no hidden fees. Just open and play." },
        { q: "Are these games good for kids?", a: "Absolutely. Our casual games are family-friendly with simple controls and cheerful content — perfect for kids and adults alike." },
        { q: "Do I need gaming experience to play?", a: "Not at all. Casual games are designed for everyone. If you can tap or swipe, you can play." },
        { q: "Can I play casual games offline?", a: "The games need an internet connection to load, but once loaded they run entirely in your browser with no further connection needed." },
      ],
    },
    zh: {
      hook: "只想放松一下、轻松玩玩？我们的免费休闲游戏正是为此而生——简单的一指操控、令人满足的玩法、零压力。无需下载，没有学习成本。",
      intro: [
        "休闲游戏是放松的最佳方式。无论你是任务间隙有两分钟，还是想放空一会儿，这些游戏都能让你即刻上手、毫无压力地享受。一次点击、一次滑动——就这么简单。",
        "最好的休闲游戏往往'简单得不简单'。操作几秒就会，但玩法循环令人欲罢不能。戳泡泡、接东西、旋转、点击、切割，在明快多彩的乐趣中释放压力。",
        "所有休闲游戏都在浏览器中运行，任何设备都能完美游玩。无需下载、无需注册、无需教程。随时随地，即刻开启无压力的快乐。",
      ],
      benefits: [
        { icon: "smile", title: "即刻放松", desc: "简单满足的玩法，融化你的压力。" },
        { icon: "hand", title: "一指操控", desc: "大人小孩都能在几秒内学会。" },
        { icon: "palette", title: "明快多彩", desc: "明亮的画面和可爱的特效让人会心一笑。" },
        { icon: "infinity", title: "无限乐趣", desc: "没有玩完的关卡——想玩多久玩多久。" },
      ],
      why: [
        "100%免费——无需下载、无需注册、无内购",
        "随时随地，碎片时间的完美选择",
        "适合全年龄的家庭友好内容",
        "支持电脑、平板、手机",
      ],
      faq: [
        { q: "休闲游戏真的免费吗？", a: "是的，所有休闲游戏完全免费。无需下载、无需注册、没有隐藏收费。打开即玩。" },
        { q: "这些游戏适合孩子吗？", a: "非常适合。我们的休闲游戏内容健康、操作简单，大人小孩都适合。" },
        { q: "需要游戏经验吗？", a: "完全不需要。休闲游戏为所有人设计，会点击或滑动就能玩。" },
        { q: "可以离线玩吗？", a: "游戏需要网络加载，但加载完成后完全在浏览器中运行，无需持续联网。" },
      ],
    },
  },
  sports: {
    en: {
      hook: "Love sports but can't always get to the field? Our free sports games bring basketball, soccer, golf, bowling, and more right to your browser — realistic physics, no downloads required.",
      intro: [
        "Sports games let you experience the thrill of competition anytime, anywhere. Sink three-pointers, bend penalty kicks into the top corner, line up the perfect putt, or roll a strike — all powered by realistic physics that make every shot feel authentic.",
        "What makes our sports games special is the skill-based gameplay. There are no button-mashing shortcuts here — you'll need to master timing, angle, and power to consistently score. That's what makes beating your personal record feel genuinely earned.",
        "Every sports game on this page runs instantly in your browser on any device. No downloads, no installs, no accounts. Your best scores are saved automatically, so the competition against yourself never stops.",
      ],
      benefits: [
        { icon: "dribbble", title: "Realistic Physics", desc: "Authentic ball movement and trajectories powered by real physics." },
        { icon: "medal", title: "Beat Your Record", desc: "Chase personal bests and feel the rush of a new record." },
        { icon: "sliders", title: "Master Timing & Power", desc: "Skill-based controls that reward practice and precision." },
        { icon: "list", title: "Many Sports", desc: "Basketball, soccer, golf, bowling, archery, and more." },
      ],
      why: [
        "100% free — no downloads, no sign-ups, no in-app purchases",
        "Realistic physics for an authentic sports feel",
        "Play on desktop, tablet, or mobile",
        "Personal records saved automatically",
      ],
      faq: [
        { q: "Are these sports games free?", a: "Yes, all sports games are completely free to play. No downloads, no sign-ups, no hidden fees — just instant play in your browser." },
        { q: "Do I need to know real sports rules to play?", a: "No. Our sports games simplify the rules down to the core fun — aim, time your shot, and score. Anyone can pick them up instantly." },
        { q: "Can I play sports games on mobile?", a: "Yes! All sports games support touch controls and work great on iPhone and Android browsers." },
        { q: "Which sports games are the most popular?", a: "Basketball shooting, penalty kicks, and bowling are fan favorites — but try them all and find your own favorite." },
      ],
    },
    zh: {
      hook: "热爱运动却没时间上场？我们的免费体育游戏把篮球、足球、高尔夫、保龄球等直接搬进你的浏览器——真实物理引擎，无需下载。",
      intro: [
        "体育游戏让你随时随地体验竞技的快感。投进三分、踢出死角任意球、推出完美一杆、打出全中——真实物理引擎让每一次出手都无比真实。",
        "我们体育游戏的特别之处在于技巧导向。这里没有乱按一通的捷径——你需要掌握时机、角度和力度才能稳定得分。正因如此，打破个人纪录才格外有成就感。",
        "本页所有体育游戏都在浏览器中即开即玩，支持任何设备。无需下载、无需安装、无需账号。最好成绩自动保存，与自己的较量永不停止。",
      ],
      benefits: [
        { icon: "dribbble", title: "真实物理", desc: "真实物理引擎驱动的球体运动轨迹。" },
        { icon: "medal", title: "超越纪录", desc: "冲击个人最好成绩，感受破纪录的快感。" },
        { icon: "sliders", title: "掌握时机与力度", desc: "技巧导向操控，奖励练习与精准。" },
        { icon: "list", title: "多种运动", desc: "篮球、足球、高尔夫、保龄球、射箭等。" },
      ],
      why: [
        "100%免费——无需下载、无需注册、无内购",
        "真实物理引擎带来 authentic 运动手感",
        "支持电脑、平板、手机",
        "个人纪录自动保存",
      ],
      faq: [
        { q: "这些体育游戏免费吗？", a: "是的，所有体育游戏完全免费。无需下载、无需注册、没有隐藏收费——浏览器即开即玩。" },
        { q: "需要懂真实体育规则吗？", a: "不需要。我们的体育游戏把规则简化为核心乐趣——瞄准、把握时机、得分。任何人都能立刻上手。" },
        { q: "手机上能玩体育游戏吗？", a: "可以！所有体育游戏支持触屏操作，在iPhone和安卓浏览器上都能流畅游玩。" },
        { q: "哪些体育游戏最受欢迎？", a: "篮球投篮、点球大战和保龄球是人气之王——不过全都试试，找到你的最爱。" },
      ],
    },
  },
  strategy: {
    en: {
      hook: "Do you think three moves ahead? Our free strategy games reward smart planning, resource management, and tactical brilliance — outthink your opponents and claim victory. No downloads, just pure strategy.",
      intro: [
        "Strategy games are for players who love to think. Build defenses, manage resources, position your pieces, and outmaneuver the opposition. Every decision matters, and every victory is earned through superior planning — not luck.",
        "From tower defense and merge mechanics to classic board games like Gomoku and chess puzzles, our strategy collection covers every style of tactical thinking. Some games reward patient long-term planning, others demand quick tactical decisions under pressure.",
        "All strategy games run instantly in your browser with no downloads or sign-ups. Your progress is saved automatically, so you can return to your empire, your board, or your defense line whenever inspiration strikes.",
      ],
      benefits: [
        { icon: "brain", title: "Deep Tactical Play", desc: "Every decision matters — outthink, don't outclick." },
        { icon: "coins", title: "Resource Management", desc: "Build economies and allocate resources wisely." },
        { icon: "git-branch", title: "Multiple Strategies", desc: "Many viable paths to victory — find your style." },
        { icon: "bot", title: "Adaptive Opponents", desc: "AI that challenges you and adapts to your play." },
      ],
      why: [
        "100% free — no downloads, no sign-ups, no in-app purchases",
        "From quick tactical puzzles to deep empire building",
        "Progress saved automatically in your browser",
        "Perfect for players who love to think ahead",
      ],
      faq: [
        { q: "Are strategy games free to play?", a: "Yes, all our strategy games are completely free. No downloads, no sign-ups, no in-app purchases. Play instantly in your browser." },
        { q: "Are strategy games hard to learn?", a: "Our strategy games range from beginner-friendly board games to deep tactical challenges. Each game includes clear instructions, so you can start at your comfort level." },
        { q: "Can I play strategy games on mobile?", a: "Yes. All strategy games work on mobile browsers with touch controls — perfect for planning your next move on the go." },
        { q: "What's a good strategy game for beginners?", a: "Start with Tic Tac Toe or Connect Four for quick tactical fun, then graduate to Tower Defense or Gomoku for deeper strategy." },
      ],
    },
    zh: {
      hook: "你会未雨绸缪、走一步看三步吗？我们的免费策略游戏奖励聪明的规划、资源管理和战术才华——用智慧战胜对手。无需下载，纯粹的策略较量。",
      intro: [
        "策略游戏属于爱思考的玩家。建造防御、管理资源、布置棋子、运筹帷幄。每个决策都至关重要，每次胜利都来自更高明的规划——而非运气。",
        "从塔防、合并玩法到五子棋、国际象棋残局等经典棋类，我们的策略合集覆盖各种战术思维风格。有的游戏奖励耐心的长期规划，有的则要求压力下的快速战术决策。",
        "所有策略游戏都在浏览器中即开即玩，无需下载和注册。进度自动保存，灵感来了随时回到你的帝国、棋盘或防线。",
      ],
      benefits: [
        { icon: "brain", title: "深度战术", desc: "每个决策都有意义——靠智慧而非手速取胜。" },
        { icon: "coins", title: "资源管理", desc: "建设经济，明智分配资源。" },
        { icon: "git-branch", title: "多元策略", desc: "多条通往胜利的路线——找到你的风格。" },
        { icon: "bot", title: "智能对手", desc: "会挑战你并适应你打法的AI。" },
      ],
      why: [
        "100%免费——无需下载、无需注册、无内购",
        "从快速战术谜题到深度帝国建设",
        "进度自动保存在浏览器",
        "适合喜欢深谋远虑的玩家",
      ],
      faq: [
        { q: "策略游戏免费吗？", a: "是的，所有策略游戏完全免费。无需下载、无需注册、无内购。浏览器即开即玩。" },
        { q: "策略游戏难上手吗？", a: "我们的策略游戏从新手友好的棋类到深度战术挑战应有尽有。每款游戏都有清晰说明，你可以从舒适区开始。" },
        { q: "手机上能玩策略游戏吗？", a: "可以。所有策略游戏支持触屏操作，随时随地规划你的下一步。" },
        { q: "新手适合什么策略游戏？", a: "从井字棋或四子棋开始体验快速战术乐趣，再进阶到塔防或五子棋进行更深入的策略较量。" },
      ],
    },
  },
  action: {
    en: {
      hook: "Craving some adrenaline? Our free action games deliver fast combat, tight controls, and thrilling boss battles — jump, dodge, and fight your way to victory. No downloads, instant action.",
      intro: [
        "Action games are pure adrenaline. Dash through dangerous levels, dodge enemy attacks, chain combos, and face off against bosses that demand everything you've got. Every second is intense, and every victory feels earned.",
        "What makes great action games is the feel — responsive controls that make every jump, slash, and dodge land exactly when you intend. Our action games are tuned for that tight, satisfying gameplay loop where skill genuinely determines success.",
        "Every action game runs instantly in your browser with smooth performance and no downloads. Your progress and best scores are saved automatically, so you can jump back into the fight anytime.",
      ],
      benefits: [
        { icon: "sword", title: "Tight Combat", desc: "Responsive controls for precise attacks and dodges." },
        { icon: "skull", title: "Epic Boss Battles", desc: "Challenging bosses that test your reflexes and timing." },
        { icon: "map", title: "Levels with Secrets", desc: "Hidden shortcuts and secrets reward exploration." },
        { icon: "zap", title: "Fast-Paced Fun", desc: "High-energy gameplay that keeps you on the edge." },
      ],
      why: [
        "100% free — no downloads, no sign-ups, no in-app purchases",
        "Tight, responsive controls in any browser",
        "Progress and high scores saved automatically",
        "New challenges for every skill level",
      ],
      faq: [
        { q: "Are action games free to play?", a: "Yes, all action games are completely free. No downloads, no sign-ups, no hidden fees — instant play in your browser." },
        { q: "Are action games hard?", a: "They range from accessible to challenging. Most games ease you in with early levels, then ramp up the difficulty as your skills improve." },
        { q: "Can I play action games on mobile?", a: "Yes. All action games support touch controls, though fast-paced combat is especially satisfying with keyboard controls on desktop." },
        { q: "How do I get better at action games?", a: "Learn enemy attack patterns before going on the offensive, use positioning to your advantage, and remember that well-timed attacks beat button mashing." },
      ],
    },
    zh: {
      hook: "渴望肾上腺素飙升？我们的免费动作游戏带来畅快战斗、紧凑操控和刺激的Boss战——跳跃、闪避、战斗，杀向胜利。无需下载，即刻开战。",
      intro: [
        "动作游戏是纯粹的肾上腺素。冲刺穿越危险关卡、躲避敌人攻击、连击combo、对抗倾尽全力的Boss。每一秒都紧张刺激，每次胜利都来之不易。",
        "优秀动作游戏的关键在于'手感'——灵敏的操控让每次跳跃、挥砍、闪避都精准如意。我们的动作游戏专为这种紧凑爽快的玩法循环调校，技巧真正决定成败。",
        "所有动作游戏都在浏览器中流畅运行，无需下载。进度和最高分自动保存，随时重返战场。",
      ],
      benefits: [
        { icon: "sword", title: "紧凑战斗", desc: "灵敏操控，精准攻击与闪避。" },
        { icon: "skull", title: "史诗Boss战", desc: "考验反应与时机的挑战Boss。" },
        { icon: "map", title: "暗藏秘密的关卡", desc: "隐藏捷径与秘密奖励探索。" },
        { icon: "zap", title: "快节奏乐趣", desc: "高能玩法让你全程紧绷。" },
      ],
      why: [
        "100%免费——无需下载、无需注册、无内购",
        "任何浏览器都有紧凑灵敏的操控",
        "进度与最高分自动保存",
        "适合各种水平的新挑战",
      ],
      faq: [
        { q: "动作游戏免费吗？", a: "是的，所有动作游戏完全免费。无需下载、无需注册、没有隐藏收费——浏览器即开即玩。" },
        { q: "动作游戏难吗？", a: "难度从易到难都有。大多数游戏前期关卡友好，随着你技巧提升逐渐加难。" },
        { q: "手机上能玩动作游戏吗？", a: "可以。所有动作游戏支持触屏操作，不过快节奏战斗在桌面端用键盘更爽。" },
        { q: "怎么提高动作游戏水平？", a: "先观察敌人攻击模式再进攻，善用地形站位，记住精准出招胜过乱按。" },
      ],
    },
  },
  idle: {
    en: {
      hook: "Want a game that grows even while you relax? Our free idle games let you build empires one click at a time — satisfying progression, smart upgrades, and numbers that just keep climbing. No downloads needed.",
      intro: [
        "Idle games are the most satisfying way to watch your progress grow. Click to earn, buy upgrades, unlock new income sources, and watch your numbers climb from dozens to millions to astronomical heights. It's the perfect background companion for your day.",
        "The secret of great idle games is meaningful choice. Which upgrade gives the best value? When should you unlock a new income stream? When do you prestige and start fresh for permanent bonuses? These decisions make idle games far more engaging than they look.",
        "All our idle games run in your browser and save your progress automatically. Come back anytime to collect your earnings and keep building — no downloads, no sign-ups, no pressure.",
      ],
      benefits: [
        { icon: "trending-up", title: "Satisfying Growth", desc: "Watch your numbers climb from dozens to astronomical heights." },
        { icon: "wrench", title: "Smart Upgrades", desc: "Meaningful choices with real cost-to-benefit decisions." },
        { icon: "moon", title: "Earn While Away", desc: "Your empire keeps producing even while you take a break." },
        { icon: "refresh-cw", title: "Prestige Systems", desc: "Reset for permanent bonuses and long-term replayability." },
      ],
      why: [
        "100% free — no downloads, no sign-ups, no in-app purchases",
        "Perfect background game for work or study breaks",
        "Progress saved automatically in your browser",
        "Satisfying progression with zero pressure",
      ],
      faq: [
        { q: "Are idle games really free?", a: "Yes, all our idle games are completely free. No downloads, no sign-ups, no in-app purchases. Your empire is built purely through play." },
        { q: "Do idle games keep running when I close the page?", a: "Your progress is saved when you leave. When you return, you can collect the resources you would have earned while away in most of our idle games." },
        { q: "Are idle games just clicking?", a: "Clicking is just the start. The real fun is optimizing your upgrade path, balancing income sources, and deciding when to prestige for permanent multipliers." },
        { q: "Can I play idle games on mobile?", a: "Yes! All idle games work great on mobile browsers — perfect for checking on your empire anywhere." },
      ],
    },
    zh: {
      hook: "想要一款连放松时都在成长的游戏？我们的免费放置游戏让你一次点击一步建立帝国——满足的成长感、聪明的升级、不断飙升的数字。无需下载。",
      intro: [
        "放置游戏是看着自己成长最满足的方式。点击赚取、购买升级、解锁新收入来源，看着数字从几十涨到几百万再到天文数字。它是你一天中最完美的背景伴侣。",
        "优秀放置游戏的秘密在于有意义的选择。哪个升级性价比最高？何时解锁新收入流？何时转生重开换取永久加成？这些决策让放置游戏远比表面更有深度。",
        "所有放置游戏都在浏览器中运行并自动保存进度。随时回来收取收益继续建设——无需下载、无需注册、毫无压力。",
      ],
      benefits: [
        { icon: "trending-up", title: "满足的成长", desc: "看着数字从几十飙升到天文级别。" },
        { icon: "wrench", title: "聪明升级", desc: "有意义的选择，真实的性价比决策。" },
        { icon: "moon", title: "离线也产出", desc: "休息时帝国仍在持续生产。" },
        { icon: "refresh-cw", title: "转生系统", desc: "重置换取永久加成，长期可玩。" },
      ],
      why: [
        "100%免费——无需下载、无需注册、无内购",
        "工作学习间隙的完美背景游戏",
        "进度自动保存在浏览器",
        "零压力的满足成长体验",
      ],
      faq: [
        { q: "放置游戏真的免费吗？", a: "是的，所有放置游戏完全免费。无需下载、无需注册、无内购。帝国完全靠游玩建立。" },
        { q: "关闭页面后游戏还在运行吗？", a: "离开时进度会保存。回来时大多数放置游戏可以收取你离线期间应得的资源。" },
        { q: "放置游戏只是点点点吗？", a: "点击只是开始。真正的乐趣在于优化升级路线、平衡收入来源、决定何时转生换取永久加成。" },
        { q: "手机上能玩放置游戏吗？", a: "可以！所有放置游戏在移动端表现出色——随时随地查看你的帝国。" },
      ],
    },
  },
  racing: {
    en: {
      hook: "Need for speed? Our free racing games put you in the driver's seat — weave through traffic, hit nitro boosts, and chase the best lap times. No downloads, just pure velocity in your browser.",
      intro: [
        "Racing games are all about speed, precision, and nerve. Dodge through dense traffic at breakneck speeds, drift around corners, and time your nitro boosts perfectly. One wrong move and it's over — that's what makes crossing the finish line feel so good.",
        "Our racing collection covers every style: highway dodging, hill climbing, drifting, motorcycle trials, and boat racing. Each one demands quick reflexes and smooth steering, with difficulty that ramps up as your speed increases.",
        "Every racing game runs at smooth 60fps in your browser with no downloads or sign-ups. Your best distances and lap times are saved automatically, so the race against your personal record never ends.",
      ],
      benefits: [
        { icon: "gauge", title: "High-Speed Thrills", desc: "Smooth 60fps gameplay at breakneck speeds." },
        { icon: "navigation", title: "Precision Steering", desc: "Tight controls that reward smooth, anticipatory driving." },
        { icon: "flame", title: "Nitro & Boosts", desc: "Strategic boost systems for extra speed bursts." },
        { icon: "flag", title: "Chase Records", desc: "Beat your best distance and lap times." },
      ],
      why: [
        "100% free — no downloads, no sign-ups, no in-app purchases",
        "Smooth 60fps performance in any browser",
        "Multiple racing styles to master",
        "Personal records saved automatically",
      ],
      faq: [
        { q: "Are racing games free to play?", a: "Yes, all racing games are completely free. No downloads, no sign-ups, no hidden fees — just instant speed in your browser." },
        { q: "Can I play racing games on mobile?", a: "Yes! All racing games support touch controls and are optimized for mobile browsers on iPhone and Android." },
        { q: "What's the best way to get a high score?", a: "Look ahead instead of at your vehicle, make small steering inputs at high speed, and save your nitro for clear straightaways." },
        { q: "Do racing games need a good device?", a: "No. Our racing games are lightweight and run smoothly on most devices, including older phones and laptops." },
      ],
    },
    zh: {
      hook: "渴望速度？我们的免费竞速游戏让你坐进驾驶座——在车流中穿梭、点燃氮气加速、冲击最佳圈速。无需下载，浏览器里就是极速世界。",
      intro: [
        "竞速游戏的核心是速度、精准和胆量。在极速中穿过密集车流、漂移过弯、精准把握氮气时机。一步失误就满盘皆输——这正是冲过终点线如此爽快的原因。",
        "我们的竞速合集覆盖各种风格：公路躲避、登山越野、漂移过弯、摩托特技、快艇竞赛。每一款都需要快速反应和平稳操控，难度随速度不断提升。",
        "所有竞速游戏都以60fps流畅运行，无需下载和注册。最远距离和圈速自动保存，与个人纪录的较量永无止境。",
      ],
      benefits: [
        { icon: "gauge", title: "高速刺激", desc: "极速下依然流畅的60fps画面。" },
        { icon: "navigation", title: "精准操控", desc: "紧凑操控，奖励平稳预判驾驶。" },
        { icon: "flame", title: "氮气加速", desc: "策略性加速系统带来爆发快感。" },
        { icon: "flag", title: "冲击纪录", desc: "超越最远距离和最佳圈速。" },
      ],
      why: [
        "100%免费——无需下载、无需注册、无内购",
        "任何浏览器都有60fps流畅表现",
        "多种竞速风格等你精通",
        "个人纪录自动保存",
      ],
      faq: [
        { q: "竞速游戏免费吗？", a: "是的，所有竞速游戏完全免费。无需下载、无需注册、没有隐藏收费——浏览器即刻体验极速。" },
        { q: "手机上能玩竞速游戏吗？", a: "可以！所有竞速游戏支持触屏操作，完美适配iPhone和安卓浏览器。" },
        { q: "怎么拿高分？", a: "目光看远方而不是盯着车，高速时小幅转向，把氮气留到开阔直道。" },
        { q: "竞速游戏需要好设备吗？", a: "不需要。我们的竞速游戏轻量流畅，旧手机和笔记本也能玩。" },
      ],
    },
  },
};

export function getCategorySeo(slug: string, locale: string): CategorySeoLocale | null {
  const cat = categorySeo[slug];
  if (!cat) return null;
  return locale === "zh" ? cat.zh : cat.en;
}

/** Conversational second-person hook shown at the top of each game page */
const gameHooks: Record<string, { en: (t: string) => string; zh: (t: string) => string }> = {
  puzzle: {
    en: (t) => `Looking for a quick brain teaser? ${t} is perfect for those moments when you want to challenge your mind — no downloads, no sign-ups, just pure problem-solving fun right in your browser.`,
    zh: (t) => `想来一场快速脑力挑战？${t}正是为此而生——无需下载、无需注册，浏览器里就能享受纯粹的解谜乐趣。`,
  },
  arcade: {
    en: (t) => `Ready for some fast-paced fun? ${t} delivers that classic 'one more try' arcade feeling — easy to pick up, hard to put down, and completely free to play in your browser.`,
    zh: (t) => `准备好快节奏的乐趣了吗？${t}带给你经典的'再来一局'街机体验——上手简单、欲罢不能，浏览器里完全免费。`,
  },
  shooting: {
    en: (t) => `Ready to lock and load? ${t} puts your aim and reflexes to the test — dodge, shoot, and survive as long as you can. Free to play instantly, no download required.`,
    zh: (t) => `准备好战斗了吗？${t}考验你的瞄准与反应——躲避、射击、坚持到最后。即开即玩，无需下载。`,
  },
  casual: {
    en: (t) => `Just want to relax and unwind? ${t} is the perfect low-stress game — simple controls, satisfying gameplay, and zero pressure. Play free in your browser, no download needed.`,
    zh: (t) => `只想放松一下？${t}是完美的解压游戏——操作简单、玩法治愈、零压力。浏览器免费玩，无需下载。`,
  },
  sports: {
    en: (t) => `Love sports but can't get to the field right now? ${t} brings the game to you — realistic physics, skill-based scoring, and instant free play in your browser.`,
    zh: (t) => `热爱运动但现在没法上场？${t}把比赛带到你面前——真实物理、技巧计分，浏览器即开即玩。`,
  },
  strategy: {
    en: (t) => `Do you think three moves ahead? ${t} rewards smart planning and tactical brilliance — outthink your opponents and claim victory. Free to play, no download required.`,
    zh: (t) => `你会走一步看三步吗？${t}奖励聪明的规划与战术才华——用智慧战胜对手。免费游玩，无需下载。`,
  },
  action: {
    en: (t) => `Craving some adrenaline? ${t} delivers fast combat and thrilling action — jump, dodge, and fight your way to the top. Play free in your browser, no download needed.`,
    zh: (t) => `渴望肾上腺素飙升？${t}带来畅快战斗与刺激动作——跳跃、闪避、一路杀到顶端。浏览器免费玩，无需下载。`,
  },
  idle: {
    en: (t) => `Want a game that grows even while you relax? ${t} lets you build your empire one click at a time — satisfying progression with zero pressure. Free to play, no download required.`,
    zh: (t) => `想要一款连放松时都在成长的游戏？${t}让你一次点击一步建立帝国——满足的成长感，零压力。免费游玩，无需下载。`,
  },
  racing: {
    en: (t) => `Need for speed? ${t} puts you in the driver's seat — dodge traffic, hit the nitro, and chase your best score. Free to play instantly in your browser, no download needed.`,
    zh: (t) => `渴望速度？${t}让你坐进驾驶座——穿梭车流、点燃氮气、冲击最高分。浏览器即开即玩，无需下载。`,
  },
};

export function getGameHook(category: string, title: string, locale: string): string {
  const h = gameHooks[category] || gameHooks.casual;
  return locale === "zh" ? h.zh(title) : h.en(title);
}
