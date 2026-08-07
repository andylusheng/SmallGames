import type { GameSeoProfile } from "@/data/game-profiles";
import { reviewedProfile } from "@/data/game-profiles/factory";

export const MEMORY_GAME_PROFILES: Record<string, GameSeoProfile> = {
  "memory-cards": reviewedProfile({
    slug: "memory-cards",
    primaryKeyword: "memory card game",
    secondaryKeywords: ["memory matching game", "matching pairs game", "memory cards online", "free memory game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Find all eight matching emoji pairs among 16 face-down cards using as few two-card moves as possible.", zh: "在16张背面朝上的卡牌中找出8对相同emoji，并尽量用更少的两牌翻动次数完成。" },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Memory Cards Progress", zh: "Memory Cards 进度" },
      scoringValueLabel: { en: "Measure", zh: "指标" },
      scoring: [
        { id: "cards", label: { en: "Cards", zh: "卡牌" }, value: { en: "16 total", zh: "共16张" }, note: { en: "Eight emoji are duplicated to form eight pairs.", zh: "8种emoji各出现2次，组成8对。" } },
        { id: "move", label: { en: "One move", zh: "1次Move" }, value: { en: "2 revealed cards", zh: "翻开2张牌" }, note: { en: "Moves increase when the second card is revealed, whether the pair matches or not.", zh: "每翻开第2张牌就计1次Move，无论是否配对成功。" } },
        { id: "win", label: { en: "Win condition", zh: "完成条件" }, value: { en: "8 matched pairs", zh: "配对8组" } },
      ],
      specialMechanics: [
        { en: "A new game randomly chooses eight emoji from a pool of sixteen, duplicates them and shuffles all sixteen cards.", zh: "新游戏会从16种emoji里随机选8种，各复制1份后打乱成16张牌。" },
        { en: "Matching cards stay revealed. A wrong pair flips back after 800ms; a correct pair is marked after 400ms.", zh: "配对成功会保持翻开；错误组合800ms后翻回，正确组合约400ms后锁定。" },
        { en: "The displayed Best is the lowest move count achieved during the current page session only.", zh: "Best 表示当前页面会话中完成游戏所用的最低Move数。" },
      ],
      endCondition: { en: "The round ends when all eight pairs are matched.", zh: "8对卡牌全部配对成功后本局结束。" },
      progress: { en: "Best move count is held only in JavaScript memory and resets when the page reloads; it is not written to localStorage.", zh: "最低Move纪录只保存在当前JavaScript内存，刷新页面后重置，不写入 localStorage。" },
      gameplayTopics: ["memory", "matching"],
    },
    content: {
      en: {
        metaTitle: "Memory Card Game – Match 8 Pairs in 16 Cards",
        metaDescription: "Play a 16-card memory matching game online. Find 8 emoji pairs, count every two-card reveal as one move and try to finish in fewer moves.",
        h1: "Memory Cards – Match 8 Pairs with Fewer Moves",
        intro: "Flip two cards at a time, remember their positions and clear all eight emoji pairs from a shuffled 4×4 board.",
        about: ["Memory Cards uses a 4×4 board with sixteen cards and eight matching pairs. The challenge is measured by moves rather than a timer: every second card you reveal completes one move.", "Wrong pairs turn back after a short delay, while correct pairs stay revealed, letting remembered locations reduce the number of future guesses."],
        howToPlay: ["Tap or click one face-down card, then reveal a second card.", "If the emoji match, the pair stays open; if not, both cards turn back.", "Use the visible information to remember locations and continue until all eight pairs are matched.", "Compare your move count with the Best shown for the current page session."],
        rules: ["There are 16 cards and exactly 8 pairs.", "One move is counted every time a second card is revealed.", "Matched cards cannot be selected again.", "The game ends only after all 8 pairs are found."],
        tips: ["When two cards fail to match, memorize both positions before they flip back.", "Prioritize known pairs instead of opening fresh cards once both positions of a pair have been seen.", "The Best score is lower-is-better because it records the fewest moves needed to clear the board."],
        faq: [
          { q: "How many cards are in Memory Cards?", a: "There are 16 cards arranged as eight matching emoji pairs." },
          { q: "What counts as one move?", a: "A move is counted when you reveal the second card of a pair attempt, whether the cards match or not." },
          { q: "How do you win Memory Cards?", a: "Match all eight pairs. Correct pairs stay revealed and become inactive." },
          { q: "Does Memory Cards save the best move count?", a: "Only for the current page session. The Best value is not stored in localStorage and resets after a reload." },
        ],
      },
      zh: {
        metaTitle: "Memory Cards 记忆配对游戏 – 16张牌找8对",
        metaDescription: "在线玩16张牌的记忆配对游戏：找出8对emoji。每翻开第2张牌计1次Move，用更少次数完成全部配对。",
        h1: "Memory Cards – 用更少Move找出8对卡牌",
        intro: "每次翻开2张牌，记住它们的位置，在4×4打乱棋盘中配对全部8组emoji。",
        about: ["Memory Cards 使用4×4棋盘，共16张牌和8组配对。这里没有倒计时，主要成绩指标是Move：每次翻开第2张牌就完成一次Move。", "错误组合会短暂展示后翻回，正确组合会保持翻开，因此记住已经出现过的位置能显著减少后续尝试次数。"],
        howToPlay: ["点击一张背面卡牌，再翻开第二张。", "emoji相同则配对成功并保持翻开；不同则两张牌会翻回。", "记住已经看过的位置，持续寻找配对，直到8组全部完成。", "用本局Move数和当前页面会话中的Best比较。"],
        rules: ["棋盘共16张牌，正好8组配对。", "每次翻开第2张牌都会增加1次Move。", "已配对卡牌不能再次选择。", "找齐8组配对才结束。"],
        tips: ["错误配对翻回之前同时记住两张牌的位置。", "一旦已经知道某组配对的两个位置，就优先完成它，而不是继续翻未知牌。", "Best 越低越好，因为它记录的是完成棋盘所需最少Move数。"],
        faq: [
          { q: "Memory Cards 一共有多少张牌？", a: "共16张牌，由8种emoji各出现2次组成8组配对。" },
          { q: "什么算1次Move？", a: "每次翻开第二张牌就计1次Move，无论最终是否配对成功。" },
          { q: "怎么完成 Memory Cards？", a: "找出全部8组配对。正确配对会保持翻开并停止响应点击。" },
          { q: "Best 会保存吗？", a: "只在当前页面会话中保留。刷新页面后会重置，因为它没有写入 localStorage。" },
        ],
      },
    },
  }),

  "memory-sequence": reviewedProfile({
    slug: "memory-sequence",
    primaryKeyword: "memory sequence game",
    secondaryKeywords: ["sequence memory game", "simon memory game online", "pattern memory game", "free memory sequence"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Watch an expanding sequence across four colored pads, then repeat the entire pattern in the same order without a mistake.", zh: "观察4个彩色按键上不断增长的序列，再按完全相同顺序复现整段模式且不能出错。" },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Memory Sequence Levels", zh: "Memory Sequence 等级" },
      scoringValueLabel: { en: "Rule", zh: "规则" },
      scoring: [
        { id: "level", label: { en: "Each new level", zh: "每个新等级" }, value: { en: "+1 random pad", zh: "序列+1个随机按键" }, note: { en: "The complete previous sequence remains and one new value is appended.", zh: "保留之前完整序列，并在末尾增加1个随机值。" } },
        { id: "show", label: { en: "Playback interval", zh: "播放间隔" }, value: { en: "600ms per step", zh: "每步600ms" }, note: { en: "Each pad is lit for about 500ms during playback.", zh: "播放时每个按键亮起约500ms。" } },
      ],
      specialMechanics: [
        { en: "The game starts automatically at level 1 and uses four colored pads.", zh: "游戏自动从Level 1开始，共使用4个彩色按键。" },
        { en: "You cannot enter input while the sequence is being shown; input is enabled only when the status changes to Your turn.", zh: "序列播放期间不能输入，只有状态切换到 Your turn 后才接受点击。" },
        { en: "A wrong pad immediately ends the attempt, shows a red error state and restarts from level 1 after about 1.5 seconds.", zh: "点错按键会立即结束当前尝试、显示错误状态，并约1.5秒后从Level 1重新开始。" },
      ],
      endCondition: { en: "There is no final level. A run ends on the first incorrect input, then a new sequence starts from level 1.", zh: "没有最终关卡；第一次输入错误就结束当前连续挑战，然后从Level 1开始新序列。" },
      progress: { en: "Best completed level is saved in localStorage under memseq_best.", zh: "最高完成等级保存在 localStorage 的 memseq_best。" },
      gameplayTopics: ["memory", "sequence"],
    },
    content: {
      en: {
        metaTitle: "Memory Sequence Game – Repeat an Expanding 4-Pad Pattern",
        metaDescription: "Play Memory Sequence online: watch a four-color pattern, repeat it in order and add one new step every level. Best completed level is saved locally.",
        h1: "Memory Sequence – Repeat a Pattern That Grows Every Level",
        intro: "Watch four colored pads light up in order, repeat the complete pattern, then handle one extra random step on every new level.",
        about: ["Memory Sequence is a pure order-memory challenge. It never replaces the old pattern: each successful level keeps the full sequence and appends one new random pad.", "The game separates observation and input. During playback the pads are locked; after the sequence finishes, Your turn appears and every tap is checked immediately against the expected position."],
        howToPlay: ["Watch the colored pads while the game displays the sequence.", "Wait for Your turn before tapping.", "Repeat every pad in the exact order shown.", "Complete the whole sequence to advance one level and append a new random step."],
        rules: ["Level 1 contains one pad and every successful level adds one more.", "A wrong pad ends the current run immediately.", "There is no fixed final level.", "Best completed level is stored in the current browser."],
        tips: ["Group longer sequences into short chunks rather than treating every color as an isolated item.", "Do not tap during Watch; the game intentionally ignores input until playback finishes.", "Use the Best level as the progress target because a single mistake resets the active sequence to level 1."],
        faq: [
          { q: "How does Memory Sequence get harder?", a: "Every successful level appends one random pad to the existing sequence, so the number of steps you must remember increases by one each level." },
          { q: "How fast is the sequence shown?", a: "Playback advances every 600ms and each selected pad stays lit for roughly 500ms." },
          { q: "What happens after a wrong tap?", a: "The run ends immediately and restarts from level 1 after a short delay." },
          { q: "Does Memory Sequence save progress?", a: "It saves the best completed level in localStorage, but the active sequence itself is not restored after a reload." },
        ],
      },
      zh: {
        metaTitle: "Memory Sequence 序列记忆游戏 – 复现不断增长的4色模式",
        metaDescription: "在线玩 Memory Sequence：观察4色按键序列，按原顺序复现，每过1级增加1步。最高完成等级会保存在本地。",
        h1: "Memory Sequence – 每过1级序列增加1步",
        intro: "观察4个彩色按键按顺序亮起，完整复现模式；每成功1级，原序列末尾再增加1个随机按键。",
        about: ["Memory Sequence 是纯粹的顺序记忆挑战。成功后不会换成全新模式，而是保留原序列并在末尾追加1个随机按键，因此记忆负担会连续增长。", "游戏把观察和输入严格分开：播放期间按键不接受输入；序列结束出现 Your turn 后，每次点击都会立刻和正确位置比较。"],
        howToPlay: ["观察游戏自动播放的彩色按键序列。", "等待状态变成 Your turn 再开始输入。", "严格按照刚才看到的顺序点击全部按键。", "完整输入正确即可升1级，并在序列末尾新增1步。"],
        rules: ["Level 1 只有1步，每成功1级增加1步。", "任何一次点错都会立即结束当前连续挑战。", "游戏没有固定最终关卡。", "最高完成等级会保存在当前浏览器。"],
        tips: ["序列变长后可以把连续颜色分成几个小段来记，而不是逐个孤立记忆。", "Watch 阶段不要抢点；游戏只有播放结束后才接受输入。", "把 Best Level 当成主要进度目标，因为一次错误会让当前序列从Level 1重开。"],
        faq: [
          { q: "Memory Sequence 怎么变难？", a: "每成功1级，就在已有完整序列末尾增加1个随机按键，因此需要记住的步骤逐级增加。" },
          { q: "序列播放速度是多少？", a: "每600ms播放下一步，每个按键亮起约500ms。" },
          { q: "点错以后会怎样？", a: "当前挑战立即结束，短暂显示错误后从Level 1重新开始。" },
          { q: "会保存进度吗？", a: "会保存最高完成等级到 localStorage，但当前正在进行的具体序列不会在刷新后恢复。" },
        ],
      },
    },
  }),
};
