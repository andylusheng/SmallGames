import { catalogProfile } from "@/data/game-profiles/catalog-factory";
import type { GameSeoProfile, LocalizedText } from "@/data/game-profiles";

const pair = (en: string, zh: string): LocalizedText => ({ en, zh });

type DemandSeed = {
  slug: string;
  title: string;
  zhTitle: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  controls: string[];
  objective: LocalizedText;
  mechanic: LocalizedText;
  rule: LocalizedText;
  tip: LocalizedText;
  progress: LocalizedText;
  gameplayTopics?: string[];
  containsViolence?: boolean | null;
};

function demandProfile(seed: DemandSeed): GameSeoProfile {
  const noViolence = seed.containsViolence ?? false;
  const metaDescription = pair(
    `${seed.objective.en} Play ${seed.title} free in your browser with clear controls and instant restart.`,
    `${seed.objective.zh} 直接在浏览器免费游玩${seed.zhTitle}，操作清晰，可随时重新开始。`,
  );
  return catalogProfile({
    slug: seed.slug,
    title: seed.title,
    zhTitle: seed.zhTitle,
    primaryKeyword: seed.primaryKeyword,
    secondaryKeywords: seed.secondaryKeywords,
    containsViolence: noViolence,
    controls: seed.controls,
    gameplayTopics: seed.gameplayTopics ?? [],
    objective: seed.objective,
    metaTitle: pair(`Play ${seed.title} Free Online | ZeroPlay`, `在线玩${seed.zhTitle} - 免费小游戏 | ZeroPlay`),
    metaDescription,
    h1: pair(`${seed.title} - Free Online Game`, `${seed.zhTitle} - 免费在线游戏`),
    intro: pair(
      `${seed.title} is an original ZeroPlay take on a familiar browser-game format. ${seed.objective.en}`,
      `${seed.zhTitle}是 ZeroPlay 基于经典浏览器小游戏玩法制作的原创版本。${seed.objective.zh}`,
    ),
    facts: [
      seed.mechanic,
      seed.rule,
      pair("The runtime is designed around short sessions with an immediate restart path.", "游戏以短局体验为主，并提供直接重新开始的流程。"),
    ],
    howToPlay: [
      pair(`Start a new ${seed.title} run and read the on-screen objective.`, `开始一局${seed.zhTitle}并查看画面中的目标提示。`),
      pair(`Use ${seed.controls.join(" / ")} controls to make each move.`, `使用${seed.controls.join(" / ")}完成主要操作。`),
      pair("Keep applying the core rule until the board is cleared, the target is reached, or the run ends.", "持续按照核心规则操作，直到清空棋盘、达到目标或本局结束。"),
    ],
    rules: [
      seed.rule,
      seed.mechanic,
      pair("Only actions accepted by the runtime advance the current run; restart begins a fresh run.", "只有游戏允许的有效操作会推进当前局；重新开始会创建一局新的游戏。"),
    ],
    tips: [
      seed.tip,
      pair("Protect future options instead of using every safe move immediately.", "不要只看当前一步，尽量保留后续可操作空间。"),
    ],
    progress: seed.progress,
  });
}

export const SEARCH_TOP20_GAME_PROFILES: Record<string, GameSeoProfile> = {
  "aurora-solitaire": demandProfile({
    slug: "aurora-solitaire", title: "Aurora Solitaire", zhTitle: "极光纸牌",
    primaryKeyword: "free solitaire game", secondaryKeywords: ["solitaire online", "browser card game"],
    controls: ["mouse", "touch"], gameplayTopics: ["classic"],
    objective: pair("Build descending alternating-color tableau runs and move every suit from Ace to King onto the four foundations.", "在桌面列中按红黑交替降序整理纸牌，并把四个花色从 A 到 K 移入基础区。"),
    mechanic: pair("Exposed tableau cards and the stock/waste card can move to legal tableau lanes or matching suit foundations.", "桌面顶部牌和牌堆翻出的牌可以移动到合法桌面列或对应花色的基础区。"),
    rule: pair("Tableau cards stack one rank lower in alternating colors; foundations build upward by suit from Ace.", "桌面按红黑交替且点数递减一位叠放；基础区按同花色从 A 向上叠放。"),
    tip: pair("Open empty tableau space and expose useful low cards before committing long stacks.", "优先腾出桌面空间并露出低点数牌，再处理较长牌列。"),
    progress: pair("The current deal resets on restart; the completed-foundation count shows run progress.", "重新开始会重置当前牌局；已进入基础区的牌数表示本局进度。"),
  }),
  "neon-snake": demandProfile({
    slug: "neon-snake", title: "Neon Snake", zhTitle: "霓虹贪吃蛇",
    primaryKeyword: "snake game online", secondaryKeywords: ["free snake game", "browser snake game"],
    controls: ["keyboard", "touch"], gameplayTopics: ["reaction", "classic"],
    objective: pair("Collect energy nodes to grow the neon snake and survive without colliding with the arena edge or your own trail.", "收集能量点让霓虹蛇不断变长，同时避免撞到场地边缘或自己的身体。"),
    mechanic: pair("Each collected node extends the trail, increasing both score and the space needed for safe turns.", "每收集一个能量点都会增加身体长度和得分，也会提高转向所需空间。"),
    rule: pair("The run ends immediately when the snake hits a wall or its own body.", "蛇撞到墙壁或自己的身体时，本局立即结束。"),
    tip: pair("Turn early near the arena edge and keep a wide escape lane as the snake grows.", "接近边缘时提前转向，并在身体变长后保留宽一些的逃生通道。"),
    progress: pair("Best score is kept locally when supported by the runtime.", "运行环境支持时会在本地保存最高分。"),
  }),
  "pulse-jumper": demandProfile({
    slug: "pulse-jumper", title: "Pulse Jumper", zhTitle: "脉冲跳跃",
    primaryKeyword: "one button platform game", secondaryKeywords: ["jump game online", "reaction platformer"],
    controls: ["keyboard", "mouse", "touch"], gameplayTopics: ["reaction"],
    objective: pair("Time single-button jumps to clear an accelerating sequence of neon hazards.", "通过单键控制跳跃时机，连续越过不断加速出现的霓虹障碍。"),
    mechanic: pair("The runner advances automatically, so the player's main decision is when to jump and when to stay grounded.", "角色会自动前进，玩家的核心决策是何时跳跃、何时保持落地。"),
    rule: pair("Touching a hazard ends the run and returns the player to the restart state.", "碰到障碍物会结束本局并进入重新开始状态。"),
    tip: pair("Watch obstacle spacing rather than the character itself; jump timing matters more as speed rises.", "重点观察障碍间距而不是角色本身；速度越快，起跳时机越重要。"),
    progress: pair("Distance and best-run score measure progress across attempts.", "通过本局距离和历史最佳成绩衡量多次挑战的进度。"),
  }),
  "zen-sudoku": demandProfile({
    slug: "zen-sudoku", title: "Zen Sudoku", zhTitle: "禅意数独",
    primaryKeyword: "sudoku game online", secondaryKeywords: ["free sudoku", "browser sudoku puzzle"],
    controls: ["mouse", "touch", "keyboard"], gameplayTopics: ["number", "classic"],
    objective: pair("Fill the 9×9 grid so every row, column and 3×3 box contains digits 1 through 9 exactly once.", "填写 9×9 数字盘，使每行、每列和每个 3×3 宫都恰好包含 1 到 9。"),
    mechanic: pair("Given cells stay fixed while editable cells accept digits and show conflicts against Sudoku constraints.", "题目给定数字保持固定，可编辑格接受数字并按照数独规则提示冲突。"),
    rule: pair("A solution is complete only when all 81 cells are filled without duplicate digits in any row, column or box.", "只有 81 个格子全部填写且任意行、列、宫都没有重复数字时才算完成。"),
    tip: pair("Start with rows, columns or boxes that already contain the most given digits.", "优先处理已经给出数字最多的行、列或宫。"),
    progress: pair("Filled cells show current puzzle progress; restarting reloads the current puzzle state from the beginning.", "已填写格数体现当前解题进度；重新开始会从该题初始状态开始。"),
  }),
  "cascade-solitaire": demandProfile({
    slug: "cascade-solitaire", title: "Cascade Solitaire", zhTitle: "瀑布纸牌",
    primaryKeyword: "spider style solitaire", secondaryKeywords: ["solitaire stacking game", "browser card puzzle"],
    controls: ["mouse", "touch"], gameplayTopics: ["classic"],
    objective: pair("Reorder the tableau into complete same-suit descending runs and clear finished King-to-Ace sequences.", "重新整理桌面牌列，组成同花色的连续降序牌，并清除完整的 K 到 A 序列。"),
    mechanic: pair("Only exposed cards can move, and a completed same-suit King-to-Ace run is removed from the board.", "只有每列顶部可见牌可以移动；完整同花色 K 到 A 序列会从桌面清除。"),
    rule: pair("Cards build downward by rank, with same-suit ordering required for a sequence to clear.", "纸牌按点数降序叠放，只有同花色连续序列才能作为完整牌组清除。"),
    tip: pair("Avoid blocking low cards under mixed suits when a same-suit continuation is available.", "如果能延续同花色牌列，尽量不要用不同花色遮住关键低点数牌。"),
    progress: pair("Cleared complete runs are the main progress measure for the current deal.", "本局以已经清除的完整牌组数量作为主要进度。"),
  }),
  "maze-muncher": demandProfile({
    slug: "maze-muncher", title: "Maze Muncher", zhTitle: "迷宫吞食者",
    primaryKeyword: "maze chase game", secondaryKeywords: ["arcade maze game", "browser chase game"],
    controls: ["keyboard", "touch"], gameplayTopics: ["classic", "reaction"],
    objective: pair("Collect every spark in the maze while avoiding moving sentinels.", "在迷宫中收集全部能量火花，同时避开移动的守卫。"),
    mechanic: pair("Sentinels patrol the maze while the player chooses intersections and routes through pellet-filled corridors.", "守卫会在迷宫中巡游，玩家需要在岔路口选择路线并清理通道里的能量点。"),
    rule: pair("The stage clears when all sparks are collected; contact with a sentinel costs the current run or life state used by the runtime.", "收集全部火花后关卡完成；碰到守卫会触发当前运行时设置的失败或生命损失。"),
    tip: pair("Clear dead-end corridors when sentinels are far away instead of entering them under pressure.", "守卫距离较远时再清理死胡同，不要在追击压力下进入没有出口的通道。"),
    progress: pair("Remaining sparks and score show progress through the current maze.", "剩余火花数量和得分显示当前迷宫的推进情况。"),
  }),
  "grid-three": demandProfile({
    slug: "grid-three", title: "Grid Three", zhTitle: "三连格",
    primaryKeyword: "three in a row game", secondaryKeywords: ["3x3 strategy game", "tic tac style game"],
    controls: ["mouse", "touch"], gameplayTopics: ["classic"],
    objective: pair("Place three of your marks in one horizontal, vertical or diagonal line before the computer does.", "在电脑之前，让自己的三个标记在横向、纵向或斜向形成一条直线。"),
    mechanic: pair("Player and computer alternate one mark at a time on empty cells of a 3×3 board.", "玩家和电脑轮流在 3×3 棋盘的空格中放置一个标记。"),
    rule: pair("A line of three wins immediately; a full board without a line is a draw.", "任意方向形成三连即获胜；棋盘填满仍无人三连则为平局。"),
    tip: pair("Take the center when it creates two future line options, and block an opponent's immediate third mark.", "能制造两个后续连线方向时优先占中心，并及时封堵对手的第三个连线点。"),
    progress: pair("Each round resolves as win, loss or draw and can be restarted immediately.", "每局以胜、负或平结束，并可立即重新开始。"),
  }),
  "fusion-4096": demandProfile({
    slug: "fusion-4096", title: "Fusion 4096", zhTitle: "融合 4096",
    primaryKeyword: "number merge game", secondaryKeywords: ["4096 puzzle game", "sliding number puzzle"],
    controls: ["keyboard", "touch"], gameplayTopics: ["number", "merge"],
    objective: pair("Slide matching tiles together and keep combining values toward the 4096 tile.", "滑动数字方块并合并相同数值，逐步冲击 4096 方块。"),
    mechanic: pair("Each move shifts the whole 4×4 board; equal tiles that collide merge into one tile with double value.", "每次操作会推动整个 4×4 棋盘；相同数值碰到一起会合并成一个双倍数值方块。"),
    rule: pair("A tile can merge at most once in a single move, and a new low-value tile appears after a successful move.", "同一个方块在单次移动中最多合并一次；有效移动后会生成新的低数值方块。"),
    tip: pair("Keep your highest tile near one corner and avoid breaking the ordered edge around it.", "尽量把最高数值固定在一个角落，并保持其周围边缘的有序排列。"),
    progress: pair("Current score and highest tile persist through the run; best score may be stored locally.", "本局通过当前得分和最高方块显示进度；最高分可在运行环境支持时本地保存。"),
  }),
  "open-cell-cards": demandProfile({
    slug: "open-cell-cards", title: "Open Cell Cards", zhTitle: "开放格纸牌",
    primaryKeyword: "free cell card game", secondaryKeywords: ["open cell solitaire", "browser card strategy"],
    controls: ["mouse", "touch"], gameplayTopics: ["classic"],
    objective: pair("Use four holding cells to reorganize eight tableau lanes and build four suit foundations from Ace through King.", "利用四个临时空格重新整理八列桌面牌，并把四个花色从 A 到 K 建到基础区。"),
    mechanic: pair("Each holding cell stores one card, creating temporary space for moving exposed tableau cards.", "每个临时空格可以存放一张牌，为调整桌面顶部牌提供额外空间。"),
    rule: pair("Tableau cards build downward in alternating colors while foundations build upward by matching suit.", "桌面牌按红黑交替降序叠放，基础区按相同花色升序叠放。"),
    tip: pair("Keep at least one holding cell open until you know the next sequence you need to expose.", "在确定下一步要打开的牌列之前，尽量保留至少一个空闲临时格。"),
    progress: pair("Foundation count shows how many cards have been permanently moved toward completion.", "基础区牌数表示已经永久推进到完成目标的纸牌数量。"),
  }),
  "neon-stack": demandProfile({
    slug: "neon-stack", title: "Neon Stack", zhTitle: "霓虹方块堆",
    primaryKeyword: "falling block game", secondaryKeywords: ["block stacking game", "browser line clear game"],
    controls: ["keyboard", "touch"], gameplayTopics: ["classic"],
    objective: pair("Fit falling polyomino pieces into complete horizontal rows before the stack reaches the top.", "摆放不断下落的多格方块，填满完整横行并避免堆叠触顶。"),
    mechanic: pair("Pieces can move sideways and rotate before locking; full rows disappear and open space above them.", "方块锁定前可以左右移动和旋转；完整横行会消除并释放上方空间。"),
    rule: pair("A piece locks when it can no longer move downward, and the run ends if a new piece cannot enter the board.", "方块无法继续下落时会锁定；新方块无法进入棋盘时本局结束。"),
    tip: pair("Keep the surface relatively flat and leave a deliberate channel for long pieces.", "尽量保持堆叠表面平整，并为长条形方块预留明确通道。"),
    progress: pair("Cleared lines, score and falling speed track the current run's progression.", "通过消除行数、得分和下落速度体现本局进程。"),
  }),
  "fossil-sprint": demandProfile({
    slug: "fossil-sprint", title: "Fossil Sprint", zhTitle: "化石冲刺",
    primaryKeyword: "dinosaur runner game", secondaryKeywords: ["endless jump game", "browser runner game"],
    controls: ["keyboard", "mouse", "touch"], gameplayTopics: ["reaction"],
    objective: pair("Run across a prehistoric skyline and jump each obstacle as the scroll speed increases.", "在史前地平线上持续奔跑，并随着卷轴加速不断跳过障碍。"),
    mechanic: pair("The runner moves automatically while obstacle spacing and speed create the timing challenge.", "角色自动前进，障碍间距和不断变化的速度共同构成跳跃时机挑战。"),
    rule: pair("Hitting an obstacle ends the run; successful clears increase survival distance and score.", "撞到障碍会结束本局；成功越过障碍会增加生存距离和得分。"),
    tip: pair("Use short, late jumps for single obstacles and avoid jumping too early at higher speed.", "单个障碍尽量使用偏晚的短跳；高速阶段尤其不要过早起跳。"),
    progress: pair("Distance and best distance compare performance between runs.", "通过本局距离和历史最佳距离比较不同挑战成绩。"),
  }),
  "void-runner": demandProfile({
    slug: "void-runner", title: "Void Runner", zhTitle: "虚空跑者",
    primaryKeyword: "space runner game", secondaryKeywords: ["lane runner online", "3d style runner game"],
    controls: ["keyboard", "touch"], gameplayTopics: ["reaction"],
    objective: pair("Shift between suspended lanes and survive incoming gaps and barriers for as long as possible.", "在悬浮跑道之间换道，连续避开缺口和障碍并尽可能延长生存时间。"),
    mechanic: pair("The course scrolls toward the player while lane changes create a fast route-selection challenge.", "赛道持续向玩家卷动，通过快速换道完成路线选择。"),
    rule: pair("Entering a blocked or missing lane section ends the current run.", "进入被障碍占据或缺失的赛道区域会结束当前挑战。"),
    tip: pair("Read two obstacles ahead and move once rather than correcting repeatedly at the last moment.", "尽量提前观察后面两组障碍，一次完成换道而不是最后时刻连续修正。"),
    progress: pair("Survival distance and best distance track run progression.", "本局生存距离和历史最佳距离用于记录挑战进度。"),
  }),
  "gravity-slope": demandProfile({
    slug: "gravity-slope", title: "Gravity Slope", zhTitle: "重力坡道",
    primaryKeyword: "slope ball game", secondaryKeywords: ["rolling ball game", "reaction slope game"],
    controls: ["keyboard", "mouse", "touch"], gameplayTopics: ["reaction"],
    objective: pair("Steer a rolling energy sphere down an accelerating track without falling through gaps or striking barriers.", "控制能量球沿不断加速的坡道前进，避免掉出缺口或撞上障碍。"),
    mechanic: pair("Forward motion is automatic while horizontal steering determines whether the sphere stays on safe track segments.", "能量球会自动向前滚动，玩家通过横向控制决定是否保持在安全路段。"),
    rule: pair("Leaving the track or contacting a solid barrier ends the run.", "离开赛道或撞到实体障碍都会结束本局。"),
    tip: pair("Use small steering corrections at high speed instead of holding a direction for too long.", "高速阶段使用小幅修正，不要长时间持续向一个方向转向。"),
    progress: pair("Distance and speed increase through the run, with best distance retained when available.", "本局中距离和速度会逐步提高，并在可用时保存最佳距离。"),
  }),
  "crown-draughts": demandProfile({
    slug: "crown-draughts", title: "Crown Draughts", zhTitle: "王冠跳棋",
    primaryKeyword: "checkers game online", secondaryKeywords: ["draughts game", "board strategy game"],
    controls: ["mouse", "touch"], gameplayTopics: ["classic"],
    objective: pair("Capture the opposing pieces or leave the opponent without a legal move on an 8×8 board.", "在 8×8 棋盘上吃掉对方棋子，或让对方没有任何合法走法。"),
    mechanic: pair("Regular pieces move diagonally forward; reaching the far edge crowns a piece so it can move in both directions.", "普通棋子沿斜线向前移动；到达对方底线后升为王棋，可以向两个方向移动。"),
    rule: pair("A diagonal jump over an adjacent opponent into an empty square captures that piece, with captures prioritized by the runtime.", "越过相邻对手棋子落到空格可以完成吃子；运行时会按照规则优先处理可吃子情况。"),
    tip: pair("Keep pieces connected so one capture does not expose an isolated piece to an immediate reply.", "保持棋子之间相互照应，避免一次交换后留下孤立棋子被对方立刻反吃。"),
    progress: pair("Remaining piece counts and crowned pieces show the current match state.", "双方剩余棋子数量和王棋数量体现当前对局状态。"),
  }),
  "heart-trick": demandProfile({
    slug: "heart-trick", title: "Heart Trick", zhTitle: "红心避分",
    primaryKeyword: "hearts card game", secondaryKeywords: ["trick taking card game", "browser hearts game"],
    controls: ["mouse", "touch"], gameplayTopics: ["classic"],
    objective: pair("Finish thirteen tricks with fewer penalty points than three computer opponents.", "完成十三轮牌墩，并让自己的罚分低于三名电脑对手。"),
    mechanic: pair("Players must follow the led suit when possible; heart-suit cards and one designated high-penalty queen add penalty points to the trick winner.", "有对应花色时必须跟出首家花色；红心牌以及指定的高罚分 Q 会给赢得该墩的玩家增加罚分。"),
    rule: pair("The highest card of the led suit wins the trick unless a specific runtime rule changes the trick outcome.", "通常由首家花色中点数最高的牌赢得该墩，除非运行时明确设置了其他规则。"),
    tip: pair("Use safe off-suit opportunities to discard dangerous penalty cards before they become trapped in hand.", "在无法跟出首家花色的安全时机尽早处理危险罚分牌，避免后期被困在手中。"),
    progress: pair("Trick count and accumulated penalty score show progress through the thirteen-trick hand.", "通过已完成牌墩数量和累计罚分显示十三墩牌局的进度。"),
  }),
  "star-spades": demandProfile({
    slug: "star-spades", title: "Star Spades", zhTitle: "星辉黑桃",
    primaryKeyword: "spades style card game", secondaryKeywords: ["trump card game", "trick taking game online"],
    controls: ["mouse", "touch"], gameplayTopics: ["classic"],
    objective: pair("Win more tricks than the computer players by managing suits and using the star suit as permanent trump.", "通过管理手牌花色并利用星辉花色作为固定将牌，赢得比电脑玩家更多的牌墩。"),
    mechanic: pair("Players follow the led suit when possible, while a star-suit card can beat cards from non-trump suits.", "有对应花色时必须跟牌；星辉将牌可以压过其他非将牌花色。"),
    rule: pair("Within the winning suit, the highest rank takes the trick and leads the next trick.", "在决定胜负的花色中，点数最高的牌赢得该墩并获得下一墩首出权。"),
    tip: pair("Save higher trump cards for contested tricks instead of spending them on tricks you can already win in suit.", "如果本花色已经能赢，尽量保留高点数将牌用于真正有争夺的牌墩。"),
    progress: pair("Won-trick counts compare all four players through the thirteen-trick hand.", "十三墩过程中通过四名玩家各自赢得的牌墩数比较进度。"),
  }),
  "word-hunt-grid": demandProfile({
    slug: "word-hunt-grid", title: "Word Hunt Grid", zhTitle: "字母寻词阵",
    primaryKeyword: "word search game online", secondaryKeywords: ["free word search", "browser word puzzle"],
    controls: ["mouse", "touch"], gameplayTopics: ["word"],
    objective: pair("Find every listed word hidden in straight horizontal, vertical or diagonal lines across the letter grid.", "在字母网格中找出列表里的全部单词，单词可能横向、纵向或斜向直线排列。"),
    mechanic: pair("Dragging from one letter to another selects a straight sequence; valid listed words are marked as found.", "从一个字母拖到另一个字母会选择一条直线序列；匹配列表的单词会标记为已找到。"),
    rule: pair("Selections must form a straight line and match one of the remaining target words.", "选择路径必须保持直线，并与尚未找到的目标单词完全匹配。"),
    tip: pair("Scan for unusual first and last letters before searching every possible direction.", "先寻找较少见的首字母和尾字母，再沿各方向检查，比逐格盲找更快。"),
    progress: pair("The found-word count and highlighted target list show puzzle progress.", "已找到单词数量和目标列表高亮状态显示解题进度。"),
  }),
  "dice-five": demandProfile({
    slug: "dice-five", title: "Dice Five", zhTitle: "五骰组合",
    primaryKeyword: "five dice game", secondaryKeywords: ["dice score game", "browser dice game"],
    controls: ["mouse", "touch"], gameplayTopics: [],
    objective: pair("Roll five dice up to three times per round, hold useful dice and choose one unused scoring category for thirteen rounds.", "每回合最多掷五颗骰子三次，锁定需要的骰子，并在十三回合中选择一个尚未使用的计分类别。"),
    mechanic: pair("Held dice stay unchanged between rerolls, letting the player chase pairs, runs, matching sets and five-of-a-kind patterns.", "被锁定的骰子在重掷时保持不变，玩家可以据此追求对子、顺子、同点组合和五骰同点。"),
    rule: pair("Each scoring category can be used once, and the chosen category ends the current round.", "每个计分类别只能使用一次；确认一个类别后当前回合结束。"),
    tip: pair("Keep flexible high-value dice early in a round and commit to a rare combination only when the first two rolls support it.", "回合前期优先保留兼容性高的骰子，只有前两次结果明显支持时再追求稀有组合。"),
    progress: pair("Used score categories, round count and total score track the thirteen-round game.", "通过已使用计分类别、回合数和总分记录十三回合游戏进度。"),
  }),
  "neon-drift": demandProfile({
    slug: "neon-drift", title: "Neon Drift", zhTitle: "霓虹漂移",
    primaryKeyword: "drift racing game", secondaryKeywords: ["browser drifting game", "car drift game online"],
    controls: ["keyboard", "touch"], gameplayTopics: [],
    objective: pair("Drive a compact circuit and link controlled slides through corners to build drift score without leaving the track.", "驾驶赛车绕行紧凑赛道，通过连续可控的弯道侧滑累积漂移得分，并尽量不要冲出赛道。"),
    mechanic: pair("Steering at speed creates lateral slip; maintaining a stable slide grows the active drift chain until the car straightens or crashes.", "高速转向会产生侧滑；稳定保持漂移会持续增加连段，直到车辆回正或发生碰撞。"),
    rule: pair("Track contact keeps the run alive, while hard collisions or leaving the valid course can break the drift chain.", "保持在有效赛道上可以继续挑战；严重碰撞或冲出赛道会中断漂移连段。"),
    tip: pair("Enter corners with enough speed to rotate, then reduce steering input once the slide angle is established.", "入弯时保留足够速度完成车身转向，漂移角度形成后适当减少转向输入。"),
    progress: pair("Current drift chain, total score and best score track run performance.", "通过当前漂移连段、总分和最高分记录挑战表现。"),
  }),
  "orb-shooter": demandProfile({
    slug: "orb-shooter", title: "Orb Shooter", zhTitle: "彩球发射",
    primaryKeyword: "bubble shooter style game", secondaryKeywords: ["orb matching game", "color shooter puzzle"],
    controls: ["mouse", "touch"], gameplayTopics: [],
    objective: pair("Aim colored orbs into the hanging field and clear clusters of three or more matching colors.", "把彩色球发射到悬挂球阵中，形成三个或更多同色相连球组并将其消除。"),
    mechanic: pair("Shots attach to the nearest open grid position, and connected matching-color clusters clear after placement.", "发射球会吸附到最近的空闲网格位置；落位后相连的同色球组达到条件即可消除。"),
    rule: pair("A cluster clears only when the newly connected matching group reaches at least three orbs.", "只有新形成的同色连通组达到至少三个球时才会触发消除。"),
    tip: pair("Bank shots off side walls when a direct line is blocked, and target supports that hold several lower clusters.", "直线被挡住时利用侧墙反弹，并优先攻击支撑多个下方球组的关键连接点。"),
    progress: pair("Remaining field height and score show how safely the player is controlling the board.", "通过球阵剩余高度和得分判断当前局面的安全程度。"),
  }),
};
