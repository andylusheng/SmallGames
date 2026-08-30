import type { GameSeoProfile } from "@/data/game-profiles";

export const COLOR_PUZZLE_GAME_PROFILES: Record<string, GameSeoProfile> = {
  "bus-queue-sort": {
    slug: "bus-queue-sort",
    primaryKeyword: "bus queue sort game",
    secondaryKeywords: [
      "bus sort game online",
      "color passenger sorting game",
      "queue sorting puzzle",
      "color sort bus game",
    ],
    publishedAt: "2026-08-30",
    updatedAt: "2026-08-30",
    seoStatus: "optimized",
    testedMobile: true,
    containsViolence: false,
    mechanics: {
      objective: {
        en: "Clear every passenger by boarding each color onto a matching bus while keeping the limited waiting area from filling up.",
        zh: "把所有乘客按颜色送上对应巴士，并避免有限的候车位被占满，从而清空站台。",
      },
      controls: ["touch", "mouse"],
      scoring: [
        {
          id: "board",
          label: { en: "Passenger boarded", zh: "乘客上车" },
          value: { en: "Advances level progress", zh: "推进关卡进度" },
        },
        {
          id: "combo",
          label: { en: "Consecutive matching boards", zh: "连续同色上车" },
          value: { en: "Builds combo feedback", zh: "累积连击反馈" },
        },
      ],
      specialMechanics: [
        {
          en: "Only the front passenger of each queue can be selected, so every move changes the next available choices.",
          zh: "每条队伍只能选择最前面的乘客，因此每一步都会改变下一步可选对象。",
        },
        {
          en: "A matching passenger boards immediately; a non-matching passenger occupies one of the limited waiting slots.",
          zh: "颜色匹配的乘客会直接上车；不匹配的乘客会占用有限候车位。",
        },
        {
          en: "A full bus departs and opens the flow for the remaining passenger colors.",
          zh: "巴士坐满后会发车，为剩余颜色的乘客继续腾出流程空间。",
        },
      ],
      endCondition: {
        en: "Win by clearing all target passengers. Lose if the waiting area fills or the move budget expires before the target is cleared.",
        zh: "清空目标乘客即可获胜；候车位占满或步数耗尽且目标未完成则失败。",
      },
      progress: {
        en: "The runtime contains 30 levels and stores the next unlocked level in localStorage on the same browser.",
        zh: "游戏包含30个关卡，并会在同一浏览器的 localStorage 中保存下一关进度。",
      },
      gameplayTopics: ["color-sort", "queue", "matching", "casual-puzzle"],
    },
    content: {
      en: {
        metaTitle: "Bus Queue Sort Game – Match Passengers to Color Buses",
        metaDescription: "Play Bus Queue Sort online. Match front passengers to the same-color bus, manage limited waiting slots, fill buses and clear 30 increasingly tight puzzle levels.",
        h1: "Bus Queue Sort – Match Passengers to the Right Bus",
        intro: "Pick only the passenger at the front of a queue, match colors to buses, and protect your limited waiting slots while the station gets more crowded.",
        about: [
          "Bus Queue Sort combines color matching with queue-order planning. A passenger who matches the current bus flow can board immediately, while a mismatched passenger must wait and consumes scarce platform space.",
          "The puzzle becomes more demanding as levels reduce waiting capacity and tighten move budgets. Full buses depart, queues advance, and each exposed passenger changes the next decision.",
        ],
        howToPlay: [
          "Tap or click the front passenger in any available queue.",
          "If that passenger matches an active bus color, they board immediately; otherwise they move into a waiting slot.",
          "Keep boarding passengers, empty full buses, and clear the target before waiting slots or moves run out.",
        ],
        rules: [
          "Only the front passenger in each queue can be selected.",
          "A mismatched passenger uses a waiting slot, and a full waiting area ends the level.",
          "Complete the passenger target before the move counter reaches zero to clear the level.",
          "Shuffle, Extra Slot, and Refresh Bus are limited-use rescue tools within a level.",
        ],
        tips: [
          "Scan every queue front before tapping; direct matches preserve waiting space for later conflicts.",
          "Avoid filling the final waiting slot unless the next exposed passenger can immediately unblock a bus color.",
          "Use boosters to recover from a real bottleneck rather than spending them on the first awkward move.",
        ],
        faq: [
          {
            q: "How do you play Bus Queue Sort?",
            a: "Choose only front-of-line passengers. Matching colors board a bus immediately, while mismatches occupy waiting slots. Clear the passenger target before space or moves run out.",
          },
          {
            q: "What happens when the waiting slots are full?",
            a: "If another mismatched passenger needs a slot when the waiting area is already full, the level fails and can be restarted.",
          },
          {
            q: "Does Bus Queue Sort save progress?",
            a: "Yes. Completing a level stores the next unlocked level in localStorage on the same browser and device.",
          },
          {
            q: "Can Bus Queue Sort be played on mobile?",
            a: "Yes. The game supports touch input and uses a portrait layout designed to fit phone screens as well as desktop browsers.",
          },
        ],
      },
      zh: {
        metaTitle: "Bus Queue Sort 巴士排队分类 – 按颜色匹配乘客上车",
        metaDescription: "在线玩 Bus Queue Sort：只能选择队首乘客，按颜色送上对应巴士，管理有限候车位，在步数耗尽前完成30个逐渐变难的分类关卡。",
        h1: "Bus Queue Sort – 按颜色把乘客送上正确巴士",
        intro: "每条队伍只能选择最前面的乘客。匹配巴士颜色、控制有限候车位，并在站台越来越拥挤时保持队列流动。",
        about: [
          "Bus Queue Sort 把颜色匹配和队列顺序结合起来。颜色匹配的乘客可以直接上车，不匹配的乘客必须进入候车位，因此错误顺序会迅速压缩操作空间。",
          "随着关卡推进，候车位更少、步数预算更紧。巴士坐满后发车，队首不断变化，每次点击都会影响后续选择。",
        ],
        howToPlay: [
          "点击任意队伍最前面的乘客。",
          "颜色与当前巴士匹配时乘客直接上车，否则进入一个候车位。",
          "持续完成匹配、让满员巴士发车，并在候车位或步数耗尽前清空目标乘客。",
        ],
        rules: [
          "每条队伍只能选择最前面的乘客。",
          "颜色不匹配的乘客会占用候车位，候车区无法继续容纳乘客时关卡失败。",
          "必须在步数归零前完成本关乘客目标。",
          "打乱顺序、增加位置和刷新巴士都是每关次数有限的救场工具。",
        ],
        tips: [
          "点击前先查看所有队首，优先直接匹配可以为后续冲突保留候车空间。",
          "除非下一位乘客能马上解锁巴士颜色，否则尽量不要提前占满最后一个候车位。",
          "把道具留给真正形成堵塞的局面，而不是遇到第一次不顺就使用。",
        ],
        faq: [
          {
            q: "Bus Queue Sort 怎么玩？",
            a: "只能选择每条队伍最前面的乘客。颜色匹配就直接上车，不匹配则进入候车位；在空间或步数耗尽前清空目标即可通关。",
          },
          {
            q: "候车位满了会怎样？",
            a: "候车区已经占满时，如果新的不匹配乘客还需要候车位，本关就会失败，可以立即重新开始。",
          },
          {
            q: "Bus Queue Sort 会保存进度吗？",
            a: "会。通关后会在同一浏览器和设备的 localStorage 中记录下一关进度。",
          },
          {
            q: "手机可以玩 Bus Queue Sort 吗？",
            a: "可以。游戏支持触屏，并采用适合手机竖屏的布局，同时也可以在桌面浏览器中游玩。",
          },
        ],
      },
    },
  },
};
