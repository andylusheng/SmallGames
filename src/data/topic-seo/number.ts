import type { TopicSeoConfig } from "@/data/topic-seo";

export const NUMBER_TOPIC_SEO: TopicSeoConfig = {
  key: "number",
  path: "/number-games",
  primaryKeyword: "number games",
  secondaryKeywords: ["number games online", "number puzzle game", "math games online", "2048 number game", "6x6 sudoku"],
  updatedAt: "2026-08-07",
  content: {
    en: {
      label: "Number Games",
      metaTitle: "Number Games – Free 2048, Math, Sudoku & Number Puzzles",
      metaDescription: "Play 5 number games online: 2048, Number Puzzle, Speed Math, 6×6 Sudoku Lite and Hex Merge. Merge, calculate, slide and solve number-based rules.",
      h1: "Free Number Games – Merge, Math, Sudoku & Sliding Puzzles",
      intro: "Use numbers in five different ways: merge equal values, restore a 15-puzzle, solve 30-second mental math, complete a 6×6 Sudoku or combine adjacent hex numbers.",
      about: [
        "Number games can be arithmetic, logic or spatial puzzles. Speed Math asks for fast calculation, Sudoku Lite uses row/column/box constraints, Number Puzzle uses ordered sliding positions, and 2048/Hex Merge turn equal numbers into larger values.",
        "This hub groups them by the role numbers play in the actual mechanic rather than by broad Puzzle or Strategy categories.",
      ],
      playStylesTitle: "Choose a Number Game by Number Mechanic",
      playStyles: [
        { gameSlug: "2048", title: "Sliding number merge", description: "Slide a 4×4 board, combine equal values and add the resulting tile value directly to score." },
        { gameSlug: "number-puzzle", title: "Ordered sliding puzzle", description: "Restore 1–15 on a 4×4 board. Shuffle performs 200 legal moves so the generated state stays solvable." },
        { gameSlug: "speed-math", title: "30-second mental math", description: "Answer addition, subtraction and multiplication questions from four choices. Correct answers are +1; wrong answers do not subtract score." },
        { gameSlug: "sudoku", title: "6×6 Sudoku Lite", description: "Fill digits 1–6 so every row, column and 2×3 box is valid. The generator removes 16 cells from a solved 36-cell grid." },
        { gameSlug: "hex-merge", title: "Adjacent hex number merge", description: "Merge equal neighboring values on a 5×5 hex board and score new level × 2 while new tiles refill empty space." },
      ],
      howItWorksTitle: "How Number Games Use Numbers Differently",
      howItWorks: [
        "Arithmetic games make the number itself the question and reward calculation speed.",
        "Constraint puzzles use digits as symbols that must satisfy row, column or box rules rather than arithmetic equations.",
        "Sliding puzzles attach numbers to physical positions and ask you to restore an ordered layout.",
        "Merge games use equality and growth: matching values combine into a larger tile and reshape future board options.",
      ],
      faq: [
        { q: "Which number game is timed?", a: "Speed Math runs for 30 seconds and scores one point per correct answer." },
        { q: "Is Sudoku Lite a normal 9×9 Sudoku?", a: "No. This version is 6×6, uses digits 1–6 and 2×3 boxes." },
        { q: "Which number game is a 15-puzzle?", a: "Number Puzzle uses a 4×4 board with tiles 1–15 and one empty cell." },
        { q: "Which number games use merging?", a: "2048 merges equal values during full-board slides, while Hex Merge requires equal adjacent hexes." },
      ],
    },
    zh: {
      label: "数字类游戏",
      metaTitle: "数字类游戏 – 免费2048、心算、数独与数字滑块",
      metaDescription: "在线玩5款数字类游戏：2048、Number Puzzle、Speed Math、6×6 Sudoku Lite 和 Hex Merge，通过合并、计算、滑块与逻辑解题。",
      h1: "免费数字类游戏 – 合并、心算、数独与滑块",
      intro: "体验5种数字玩法：合并相同数值、还原十五数字滑块、30秒心算、完成6×6数独，或合并相邻六边形数字。",
      about: [
        "数字类游戏可以是算术、逻辑或空间问题。Speed Math强调快速计算；Sudoku Lite依赖行列宫约束；Number Puzzle要求恢复位置顺序；2048和Hex Merge则把相同数字合成更大值。",
        "这个Hub按数字在真实玩法里的作用组织，而不是简单归到Puzzle或Strategy大类。",
      ],
      playStylesTitle: "按数字机制选择游戏",
      playStyles: [
        { gameSlug: "2048", title: "滑动数字合并", description: "滑动4×4棋盘合并相同数字，合并后的新数字值直接加入Score。" },
        { gameSlug: "number-puzzle", title: "顺序滑块", description: "4×4棋盘还原1–15；Shuffle通过200次合法移动打乱，因此生成状态保持可解。" },
        { gameSlug: "speed-math", title: "30秒心算", description: "从4个选项回答加减乘；答对+1分，答错不扣分。" },
        { gameSlug: "sudoku", title: "6×6 Sudoku Lite", description: "用1–6填满行、列和2×3宫；生成器从36格完整答案中移除16格。" },
        { gameSlug: "hex-merge", title: "相邻六边形数字合并", description: "5×5六边形棋盘合并相邻同值，新等级×2计分，并持续补入新格。" },
      ],
      howItWorksTitle: "数字在不同玩法里起什么作用",
      howItWorks: [
        "心算游戏把数字本身变成问题，核心是计算速度和准确性。",
        "约束谜题把数字当作符号，需要满足行、列或宫格规则，并不强调算术。",
        "滑块游戏把数字绑定到物理位置，目标是恢复顺序。",
        "合并游戏利用相等关系和数值成长，相同元素结合后改变后续棋盘选择。",
      ],
      faq: [
        { q: "哪款数字游戏有倒计时？", a: "Speed Math固定30秒，每答对1题+1分。" },
        { q: "Sudoku Lite 是标准9×9吗？", a: "不是，本版本是6×6、数字1–6、2×3宫。" },
        { q: "哪款是十五数字滑块？", a: "Number Puzzle使用4×4棋盘、1–15和1个空格。" },
        { q: "哪些数字游戏有合并？", a: "2048在整盘滑动时合并相同数值；Hex Merge要求两个相邻同数字六边形。" },
      ],
    },
  },
};
