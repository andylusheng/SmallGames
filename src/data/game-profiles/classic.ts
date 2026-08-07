import type { GameSeoProfile } from "@/data/game-profiles";
import { reviewedProfile } from "@/data/game-profiles/factory";

export const CLASSIC_GAME_PROFILES: Record<string, GameSeoProfile> = {
  tetris: reviewedProfile({
    slug: "tetris",
    primaryKeyword: "tetris game online",
    secondaryKeywords: ["play tetris online", "free tetris browser game", "tetris no download", "mobile tetris game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Rotate and place seven tetromino shapes on a 10×20 board, clear complete rows and keep the stack from blocking new pieces.", zh: "在10×20棋盘中旋转和放置7种四格方块，消除完整横行，并避免堆叠挡住新方块。" },
      controls: ["keyboard", "touch"],
      scoringTitle: { en: "Tetris Line-Clear Scoring", zh: "Tetris 消行计分" },
      scoringValueLabel: { en: "Base × Level", zh: "基础分 × Level" },
      scoring: [
        { id: "single", label: { en: "1 line", zh: "1行" }, value: { en: "100 × level", zh: "100 × level" } },
        { id: "double", label: { en: "2 lines", zh: "2行" }, value: { en: "300 × level", zh: "300 × level" } },
        { id: "triple", label: { en: "3 lines", zh: "3行" }, value: { en: "500 × level", zh: "500 × level" } },
        { id: "tetris", label: { en: "4 lines", zh: "4行" }, value: { en: "800 × level", zh: "800 × level" } },
      ],
      specialMechanics: [
        { en: "The board is 10 columns by 20 rows and uses the seven standard tetromino shape families.", zh: "棋盘为10列×20行，使用7类标准四格方块。" },
        { en: "Level is floor(total lines / 10) + 1, so every 10 cleared lines raises the level.", zh: "Level = floor(累计消行/10)+1，因此每消除10行升1级。" },
        { en: "Automatic drop interval is max(100ms, 500ms − 40ms × level), making pieces fall faster as level rises.", zh: "自动下落间隔为 max(100ms, 500ms−40ms×level)，等级越高下落越快。" },
        { en: "The mobile runtime provides visible buttons for left, rotate, soft drop, right and hard drop; desktop also supports keyboard controls and pause.", zh: "移动端Runtime提供左移、旋转、软降、右移、硬降按钮；桌面还支持键盘和暂停。" },
      ],
      endCondition: { en: "Game Over occurs when a newly spawned tetromino already collides at its starting position.", zh: "新方块生成时起始位置已经发生碰撞，就会Game Over。" },
      progress: { en: "Score, lines and level exist only in the active run and are not saved to localStorage.", zh: "Score、Lines和Level只存在于当前挑战，不写入 localStorage。" },
      gameplayTopics: ["classic", "block"],
    },
    content: {
      en: { metaTitle: "Tetris Game Online – 10×20 Board with Touch Controls", metaDescription: "Play Tetris online on a 10×20 board with seven tetrominoes. Clear 1–4 lines for 100/300/500/800 × level and use keyboard or mobile touch controls.", h1: "Tetris – Clear Lines on a 10×20 Board", intro: "Rotate, move and hard-drop tetrominoes, build complete rows and handle faster automatic drops every ten cleared lines.", about: ["This browser Tetris implementation uses a 10×20 board and seven tetromino shape families. Full rows disappear and award a level-scaled score based on whether one, two, three or four lines are cleared at once.", "Difficulty comes from drop speed. Level rises every ten cleared lines, and the automatic drop interval shrinks from its starting pace toward a 100ms minimum."], howToPlay: ["Move pieces left or right and rotate them before they lock.", "Use soft drop for controlled descent or hard drop to place a piece immediately.", "Complete horizontal rows with no gaps to clear them and score.", "Keep the stack low enough that each new tetromino can spawn."], rules: ["The board is 10×20.", "One, two, three and four-line clears score 100, 300, 500 and 800 multiplied by current level.", "Level increases every 10 total cleared lines.", "A blocked spawn ends the run."], tips: ["Keep the surface relatively flat so several different tetrominoes remain placeable.", "Save a vertical gap only when you have a realistic plan for an I-piece; an open trench can become dangerous as drop speed rises.", "At higher levels, use hard drop only after confirming rotation and horizontal position because the automatic timer leaves less recovery time."], faq: [{ q: "What size is the Tetris board?", a: "The board is 10 columns wide and 20 rows tall." }, { q: "How does Tetris scoring work here?", a: "Clearing 1, 2, 3 or 4 lines awards 100, 300, 500 or 800 multiplied by the current level." }, { q: "How often does the level increase?", a: "Level is floor(lines / 10) + 1, so every 10 cleared lines raises it by one." }, { q: "Can I play this Tetris on mobile?", a: "The runtime includes visible touch buttons for left, rotate, soft drop, right and hard drop. Human device QA is still tracked separately from code support." }] },
      zh: { metaTitle: "Tetris 俄罗斯方块 – 10×20棋盘与手机触控", metaDescription: "在线玩10×20 Tetris，使用7种四格方块。单/双/三/四行分别按100/300/500/800×Level计分，支持键盘与手机触控按钮。", h1: "Tetris – 在10×20棋盘消除完整横行", intro: "旋转、移动和硬降四格方块，拼出完整横行；每累计消除10行升1级并加快自动下落。", about: ["这个浏览器Tetris使用10×20棋盘和7类四格方块。完成整行后会消除，并按照一次消除1、2、3或4行以及当前Level计算分数。", "难度主要来自下落速度。每累计10行Level+1，自动下落间隔会持续缩短，最低100ms。"], howToPlay: ["方块锁定前进行左右移动和旋转。", "使用软降控制下降，或使用硬降立即落到底部。", "填满没有空格的一整行即可消除并得分。", "控制堆叠高度，避免新方块生成时就发生碰撞。"], rules: ["棋盘10×20。", "一次消除1/2/3/4行分别获得100/300/500/800×当前Level。", "每累计10行升1级。", "新方块无法正常生成时结束。"], tips: ["尽量保持表面平整，让更多形状都有可放位置。", "只有在确实准备等待I形方块时才留深竖槽，否则高等级加速后容易封死。", "高等级时硬降前先确认旋转和横向位置，因为自动下落留给修正的时间更短。"], faq: [{ q: "Tetris 棋盘多大？", a: "10列×20行。" }, { q: "这里怎么计分？", a: "一次消除1、2、3、4行分别获得100、300、500、800乘以当前Level。" }, { q: "多久升一级？", a: "Level=floor(Lines/10)+1，因此每累计消除10行升1级。" }, { q: "手机能玩吗？", a: "Runtime已经提供左移、旋转、软降、右移和硬降触控按钮；是否标记移动端人工通过仍按单独QA流程。" }] },
    },
  }),

  minesweeper: reviewedProfile({
    slug: "minesweeper",
    primaryKeyword: "minesweeper game online",
    secondaryKeywords: ["play minesweeper online", "10x10 minesweeper", "minesweeper 10 mines", "free minesweeper browser"],
    containsViolence: true,
    mechanics: {
      objective: { en: "Reveal every safe cell on a 10×10 board containing 10 mines, using adjacent-mine numbers and flags to avoid explosions.", zh: "在含10颗雷的10×10棋盘中揭开所有安全格，通过周围雷数提示和旗帜避开地雷。" },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Minesweeper Board Rules", zh: "Minesweeper 棋盘规则" },
      scoringValueLabel: { en: "Setting", zh: "设置" },
      scoring: [
        { id: "size", label: { en: "Board", zh: "棋盘" }, value: { en: "10×10", zh: "10×10" } },
        { id: "mines", label: { en: "Mines", zh: "地雷" }, value: { en: "10", zh: "10" } },
        { id: "safe-first", label: { en: "First dig", zh: "第一次挖掘" }, value: { en: "3×3 safe zone", zh: "周围3×3安全区" }, note: { en: "Mines are placed only after the first dig and cannot appear in that cell or its eight neighbors.", zh: "地雷在第一次挖掘后才放置，并排除该格和周围8个邻格。" } },
      ],
      specialMechanics: [
        { en: "Dig and Flag are explicit modes on touch devices; desktop right-click also toggles a flag.", zh: "触屏可明确切换Dig和Flag模式；桌面右键也能切换旗帜。" },
        { en: "Revealing a zero-adjacent-mine cell recursively opens connected zero areas and their numbered boundary cells.", zh: "揭开周围雷数为0的格子时，会递归展开相连的0区及其边界数字格。" },
        { en: "The timer starts only on the first actual dig, at the same moment mines are placed.", zh: "计时只在第一次真正挖掘时启动，也是在此时才布置地雷。" },
      ],
      endCondition: { en: "You win when only the 10 mine cells remain unrevealed; digging a mine ends the game immediately.", zh: "只剩10个地雷格未揭开时获胜；挖到地雷会立即失败。" },
      progress: { en: "Elapsed time and board state are not persisted after a reload.", zh: "计时和棋盘状态不会在刷新后保留。" },
      gameplayTopics: ["classic", "puzzle"],
    },
    content: {
      en: { metaTitle: "Minesweeper Online – 10×10 Board with 10 Mines", metaDescription: "Play Minesweeper online on a 10×10 board with 10 mines. Your first dig protects a 3×3 safe area; use Dig/Flag modes and clear every safe cell.", h1: "Minesweeper – Clear a 10×10 Board with 10 Mines", intro: "Use number clues to reveal all safe squares while 10 mines stay hidden; the first dig protects the clicked cell and all eight neighbors.", about: ["This Minesweeper version uses a 10×10 board with ten mines. Mine placement is delayed until the first dig, allowing the code to guarantee that the clicked cell and its surrounding 3×3 neighborhood contain no mines.", "Touch players can switch between Dig and Flag modes, while desktop users can also right-click to flag suspected mines."], howToPlay: ["Start in Dig mode and reveal a cell.", "Read each revealed number as the count of mines in its eight neighboring cells.", "Switch to Flag mode to mark cells you believe contain mines.", "Reveal every non-mine cell to win."], rules: ["The board is 10×10 with exactly 10 mines.", "The first clicked cell and its eight neighbors are protected from mine placement.", "Digging a mine ends the game.", "You win when exactly the ten mine cells remain unrevealed."], tips: ["Start from large zero areas when available because they expose many safe cells at once.", "Use flags as working markers, not guesses you refuse to revisit.", "When a number already touches the same number of flags as its value, its other hidden neighbors are candidates to open."], faq: [{ q: "How many mines are in this Minesweeper?", a: "There are 10 mines on a 10×10 board." }, { q: "Can the first click hit a mine?", a: "No. Mines are placed after the first dig and excluded from the clicked cell and its eight neighboring cells." }, { q: "How do I flag mines on mobile?", a: "Use the on-page Flag mode button, then tap a hidden cell." }, { q: "When do you win?", a: "You win when all safe cells are revealed and only the 10 mine cells remain hidden." }] },
      zh: { metaTitle: "Minesweeper 扫雷 – 10×10棋盘10颗雷", metaDescription: "在线玩10×10扫雷，共10颗雷。第一次点击保护周围3×3安全区，使用Dig/Flag模式，根据数字揭开所有安全格。", h1: "Minesweeper – 10×10棋盘找出10颗雷", intro: "利用数字提示揭开所有安全格，并让10颗雷保持隐藏；第一次挖掘会保护点击格及周围8格。", about: ["这个Minesweeper使用10×10棋盘和10颗雷。地雷不会预先布置，而是在第一次Dig时才生成，因此代码能够排除点击格及它周围3×3区域。", "触屏用户可以切换Dig和Flag模式；桌面端也可以右键标旗。"], howToPlay: ["保持Dig模式，先揭开一个格子。", "数字表示该格周围8格中包含多少颗雷。", "切换Flag模式标记你认为有雷的隐藏格。", "揭开全部非雷格即可获胜。"], rules: ["棋盘10×10，共10颗雷。", "第一次点击及周围8个格子不会放雷。", "挖到地雷立即失败。", "只剩10个地雷格未揭开时获胜。"], tips: ["出现大块0区域时优先展开，可以一次得到很多安全信息。", "旗帜只是推理标记，发现逻辑冲突时应该及时调整。", "当某数字周围旗帜数已经等于数字值时，其余隐藏邻格通常可以继续判断为安全候选。"], faq: [{ q: "这个扫雷有多少雷？", a: "10×10棋盘中固定10颗雷。" }, { q: "第一次点击会踩雷吗？", a: "不会。地雷在第一次Dig后才布置，并排除该格及周围8格。" }, { q: "手机怎么插旗？", a: "切换页面上的Flag模式，再点击隐藏格。" }, { q: "什么时候算赢？", a: "所有安全格都被揭开，只剩10个雷格未揭开时获胜。" }] },
    },
  }),

  "tic-tac-toe": reviewedProfile({
    slug: "tic-tac-toe",
    primaryKeyword: "tic tac toe online",
    secondaryKeywords: ["tic tac toe vs computer", "unbeatable tic tac toe", "3x3 tic tac toe game", "free tic tac toe"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Play X on a 3×3 grid and form three in a row before the computer playing O.", zh: "在3×3棋盘执X，与执O的电脑对手竞争，率先连成三子。" },
      controls: ["mouse", "touch"],
      scoringTitle: { en: "Tic Tac Toe Session", zh: "Tic Tac Toe 会话计数" },
      scoringValueLabel: { en: "Result", zh: "结果" },
      scoring: [
        { id: "win", label: { en: "Player X wins", zh: "玩家X获胜" }, value: { en: "You +1", zh: "You +1" } },
        { id: "draw", label: { en: "Full board, no winner", zh: "满盘无胜者" }, value: { en: "Draw +1", zh: "Draw +1" } },
        { id: "loss", label: { en: "AI O wins", zh: "AI O获胜" }, value: { en: "AI +1", zh: "AI +1" } },
      ],
      specialMechanics: [
        { en: "Easy mode chooses a random legal move 60% of the time and uses the same minimax best-move routine 40% of the time.", zh: "Easy模式60%概率随机走合法位置，40%概率使用同一套minimax最佳着法。" },
        { en: "Unbeatable mode always selects the move with the highest minimax score.", zh: "Unbeatable模式始终选择minimax评分最高的着法。" },
        { en: "New Round clears the board but keeps You/Draw/AI counters for the current page session.", zh: "New Round会清空棋盘，但保留当前页面会话的You/Draw/AI统计。" },
      ],
      endCondition: { en: "A round ends on any three-in-a-row winning line or when all nine cells are filled for a draw.", zh: "出现任意三连线或9格全部填满形成平局时结束当前回合。" },
      progress: { en: "Win/draw/loss counters are session-only and reset after page reload.", zh: "胜/平/负计数只在当前页面会话保存，刷新后重置。" },
      gameplayTopics: ["classic", "board"],
    },
    content: {
      en: { metaTitle: "Tic Tac Toe Online – Easy or Unbeatable Computer", metaDescription: "Play 3×3 Tic Tac Toe online as X. Easy AI is 60% random and 40% minimax; Unbeatable mode always uses minimax. Track wins, draws and AI wins.", h1: "Tic Tac Toe – Play Easy or Unbeatable AI", intro: "Place X on a 3×3 board and choose between a partly random Easy opponent or an Unbeatable minimax computer.", about: ["Tic Tac Toe uses the standard eight winning lines on a 3×3 board. You always play X and move first, while the computer plays O after a short delay.", "The two difficulty modes are genuinely different in code: Easy chooses a random empty cell 60% of the time and minimax 40%; Unbeatable always chooses minimax's best move."], howToPlay: ["Choose Easy or Unbeatable difficulty.", "Tap an empty square to place X.", "Wait for the AI to place O.", "Make a row, column or diagonal of three X marks before the AI does."], rules: ["You play X and move first.", "Three matching marks in any row, column or diagonal wins.", "A full board with no winner is a draw.", "New Round keeps the session score counters."], tips: ["Against Unbeatable, prioritize preventing forks rather than chasing a line that the AI can block.", "The center participates in four winning lines, making it strategically important when available.", "Use Easy if you want occasional openings created by its 60% random-move branch."], faq: [{ q: "What is Unbeatable mode?", a: "Unbeatable always picks the move with the highest minimax score, so it does not deliberately make random mistakes." }, { q: "How does Easy AI work?", a: "Easy chooses a random legal cell 60% of the time and a minimax best move 40% of the time." }, { q: "Are Tic Tac Toe scores saved?", a: "No. You, Draw and AI counters are only kept until the page reloads." }] },
      zh: { metaTitle: "Tic Tac Toe 井字棋 – Easy或Unbeatable电脑", metaDescription: "在线玩3×3井字棋，你执X先手。Easy AI有60%随机和40%minimax；Unbeatable始终使用minimax，并统计胜平负。", h1: "Tic Tac Toe – 对战Easy或Unbeatable AI", intro: "在3×3棋盘执X先手，对战部分随机的Easy电脑或始终使用minimax的Unbeatable电脑。", about: ["Tic Tac Toe 使用标准3×3棋盘和8种三连线。玩家始终执X先手，电脑执O并在短暂延迟后回应。", "两个难度的源码逻辑不同：Easy有60%概率随机走空位、40%用minimax；Unbeatable每次都使用minimax最佳着法。"], howToPlay: ["选择Easy或Unbeatable难度。", "点击空格放置X。", "等待AI放置O。", "在AI之前完成横、竖或对角三连。"], rules: ["玩家执X并先手。", "任意横、竖、对角三个相同棋子连线获胜。", "9格填满且无人获胜则平局。", "New Round清盘但保留当前会话统计。"], tips: ["对Unbeatable时优先阻止对方形成fork，不要只追一条容易被封堵的线。", "中心格参与4条获胜线，空着时通常战略价值较高。", "想获得更随机的对局，可以选Easy，因为它60%概率走随机合法格。"], faq: [{ q: "Unbeatable模式是什么？", a: "它始终选择minimax评分最高的着法，不会主动随机犯错。" }, { q: "Easy AI怎么走？", a: "60%概率随机选合法空位，40%概率使用minimax最佳着法。" }, { q: "胜负记录会保存吗？", a: "不会，You/Draw/AI只在当前页面会话保留。" }] },
    },
  }),

  pong: reviewedProfile({
    slug: "pong",
    primaryKeyword: "pong game online",
    secondaryKeywords: ["play pong online", "pong vs computer", "classic pong browser game", "free pong game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Control the left paddle against a CPU and become the first side to score 7 points.", zh: "控制左侧球拍对抗CPU，率先得到7分。" },
      controls: ["mouse", "touch"],
      scoring: [{ id: "point", label: { en: "Opponent misses", zh: "对手漏球" }, points: 1 }, { id: "win", label: { en: "Match win", zh: "比赛获胜" }, value: { en: "First to 7", zh: "先到7分" } }],
      specialMechanics: [
        { en: "Every paddle return multiplies horizontal ball speed by 1.05, up to a coded absolute speed cap of 12.", zh: "每次球拍回击让水平球速×1.05，绝对速度上限为12。" },
        { en: "Where the ball hits the paddle changes vertical velocity, allowing flatter or steeper returns.", zh: "球撞击球拍的位置会改变垂直速度，从而形成不同回球角度。" },
        { en: "The CPU paddle moves toward the ball at a fixed maximum speed of 3.5 per update.", zh: "CPU球拍每次更新最多以3.5速度追踪球。" },
      ],
      endCondition: { en: "The first side to 7 points wins; tapping the canvas after the result starts a fresh 0–0 match.", zh: "任意一方先到7分获胜；结果出现后点击画布开始新的0–0比赛。" },
      progress: { en: "Scores are not persisted after a page reload.", zh: "比分不会在刷新后保留。" },
      gameplayTopics: ["classic", "sports"],
    },
    content: {
      en: { metaTitle: "Pong Game Online – First to 7 vs CPU", metaDescription: "Play classic Pong online against a CPU. Control the left paddle with mouse or touch, handle 5% faster returns and become the first player to 7 points.", h1: "Pong – First to 7 Against the Computer", intro: "Move the left paddle, redirect the ball by contact position and survive rallies that accelerate by 5% on every paddle return.", about: ["This Pong implementation is a single-player match against a CPU paddle. A point is awarded whenever the ball exits behind the opponent, and the first side to seven wins.", "Rallies become progressively faster because every paddle collision multiplies horizontal velocity by 1.05, with an absolute speed cap of 12."], howToPlay: ["Move the left paddle vertically with mouse or touch.", "Meet the ball before it exits the left side.", "Use different paddle contact positions to change the ball's vertical angle.", "Score seven points before the CPU."], rules: ["First to 7 wins.", "Each miss awards the opponent 1 point.", "Paddle returns increase horizontal speed by 5% until the speed cap.", "The CPU automatically tracks the ball."], tips: ["Stay near the projected ball path rather than following every vertical bounce after it happens.", "Hit away from the paddle center when you want more vertical movement in the return.", "As rally speed increases, smaller corrections are safer than sweeping from one edge to the other."], faq: [{ q: "How many points win Pong?", a: "The first player to reach 7 points wins." }, { q: "Does the ball speed increase?", a: "Yes. Every paddle return multiplies horizontal speed by 1.05 up to an absolute cap of 12." }, { q: "Can Pong be controlled by touch?", a: "Yes. Touch movement on the canvas controls the vertical position of the player paddle." }] },
      zh: { metaTitle: "Pong 乒乓弹球 – 对战CPU先到7分", metaDescription: "在线玩经典Pong对战CPU：鼠标或触屏控制左球拍，每次回击让水平球速提高5%，率先7分获胜。", h1: "Pong – 对战电脑先到7分", intro: "上下移动左侧球拍，通过击球位置改变回球角度，并适应每次回击都会加速5%的长回合。", about: ["这个Pong是单人对CPU比赛。球从对手身后出界就得1分，任意一方先拿到7分获胜。", "回合会越来越快，因为每次球拍碰撞都会把水平速度×1.05，并限制绝对速度最高为12。"], howToPlay: ["用鼠标或手指上下移动左侧球拍。", "在球穿过左边界前接住它。", "利用球撞击球拍不同位置改变垂直回球角度。", "比CPU更早获得7分。"], rules: ["先到7分获胜。", "每次漏球让对方+1分。", "球拍回击让水平速度提高5%，直到速度上限。", "CPU自动追踪球。"], tips: ["根据来球轨迹提前站位，不要每次反弹后才开始追。", "想增加垂直角度，可以让球打在球拍中心以外的位置。", "长回合速度更高，应使用更小的修正动作。"], faq: [{ q: "Pong 几分赢？", a: "先到7分获胜。" }, { q: "球会越来越快吗？", a: "会，每次球拍回击让水平速度×1.05，绝对速度最高12。" }, { q: "支持触屏吗？", a: "源码支持在画布上触摸移动来控制玩家球拍的纵向位置。" }] },
    },
  }),

  "space-invaders": reviewedProfile({
    slug: "space-invaders",
    primaryKeyword: "space invaders game online",
    secondaryKeywords: ["play space invaders online", "space shooter classic game", "alien shooter browser game", "free space invaders"],
    containsViolence: true,
    mechanics: {
      objective: { en: "Move the ship horizontally, shoot descending alien formations and survive with three lives through increasingly dense waves.", zh: "左右移动飞船射击逐渐逼近的外星编队，用3条生命尽量通过更多波次。" },
      controls: ["keyboard", "touch"],
      scoring: [
        { id: "row0", label: { en: "Alien row type 0", zh: "第0类外星人" }, points: 10 },
        { id: "row1", label: { en: "Alien row type 1", zh: "第1类外星人" }, points: 15 },
        { id: "row2", label: { en: "Alien row type 2", zh: "第2类外星人" }, points: 20, note: { en: "Score formula is 10 + 5 × alien row type.", zh: "计分公式为10+5×外星人row type。" } },
      ],
      specialMechanics: [
        { en: "Every wave has 8 columns and min(5, 3 + floor(wave / 2)) alien rows.", zh: "每波固定8列，行数为 min(5, 3+floor(wave/2))。" },
        { en: "Aliens in the top two row types start with 2 HP; lower rows start with 1 HP.", zh: "前两类行的外星人初始2HP，其余行1HP。" },
        { en: "Alien horizontal speed is 0.3 + 0.1 × wave and the formation drops 12 pixels whenever it reaches a side edge.", zh: "外星人水平速度为0.3+0.1×wave，编队触碰左右边缘时整体下移12像素。" },
        { en: "The player can have at most three bullets active at once.", zh: "玩家同一时间最多保留3发子弹。" },
      ],
      endCondition: { en: "The run ends when all three lives are lost to enemy bullets or when any alien formation reaches the player's vertical area.", zh: "3条生命被敌弹耗尽，或外星编队推进到玩家垂直区域时结束。" },
      progress: { en: "Score, lives and wave are not persisted after reload.", zh: "分数、生命和波次不会在刷新后保留。" },
      gameplayTopics: ["classic", "shooting"],
    },
    content: {
      en: { metaTitle: "Space Invaders Online – 3 Lives and Scaling Alien Waves", metaDescription: "Play Space Invaders online with 3 lives. Shoot 8-column alien formations, score 10 + 5 × row type and survive waves that add rows and increase movement speed.", h1: "Space Invaders – Survive Scaling Alien Waves", intro: "Move horizontally, manage a three-bullet limit and clear alien formations that gain rows and speed as the wave counter rises.", about: ["This Space Invaders-style game starts with three lives and an eight-column formation. Early waves have three rows; later waves add rows up to a five-row cap.", "Alien speed grows by 0.1 per wave. When the formation touches an edge it reverses direction and drops downward, creating the classic pressure of a shrinking safe area."], howToPlay: ["Move left or right with the keyboard; on touch, drag horizontally.", "Press Space or tap to shoot. Only three player bullets can exist at once.", "Destroy every alien to advance to the next wave.", "Avoid enemy bullets and prevent the formation from reaching your ship."], rules: ["You start with 3 lives.", "Alien score is 10 + 5 × row type.", "Clearing all aliens advances the wave.", "Losing all lives or letting aliens descend to the player ends the run."], tips: ["Do not spam shots when three bullets are already active; wait for a firing lane to clear.", "As waves speed up, stay positioned so you can react before the formation reaches an edge and drops.", "Prioritize dangerous low rows when the formation gets close to the player area."], faq: [{ q: "How many lives do you get?", a: "You start each run with 3 lives." }, { q: "How do waves change?", a: "Alien row count grows toward five rows and horizontal speed increases by 0.1 per wave." }, { q: "How many shots can be on screen?", a: "The player bullet list is capped at three active shots." }] },
      zh: { metaTitle: "Space Invaders 太空侵略者 – 3条命逐波加速", metaDescription: "在线玩Space Invaders：开局3条命，射击8列外星编队，按10+5×行类型计分；波次越高，行数和移动速度越高。", h1: "Space Invaders – 抵挡不断增强的外星波次", intro: "左右移动、控制最多3发同时存在的子弹，消灭会随波次增加行数和速度的外星编队。", about: ["这款Space Invaders风格游戏开局3条生命，外星编队固定8列。早期波次3行，之后逐步增加，最多5行。", "外星水平速度每波增加0.1。编队碰到边缘会反向并整体下移12像素，安全空间会越来越小。"], howToPlay: ["键盘左右移动；触屏可以水平拖动。", "按Space或点击/触摸进行射击，同时最多存在3发玩家子弹。", "清掉全部外星人进入下一波。", "避开敌弹，并阻止编队下压到飞船区域。"], rules: ["开局3条生命。", "外星人分数=10+5×row type。", "清空编队后波次+1。", "生命归零或外星人推进到玩家区域时结束。"], tips: ["已经有3发子弹在场时不要盲目连点，等射击通道释放。", "波次越高编队越快，要在它碰到边缘下移之前提前站位。", "编队接近底部时优先清理危险的低位置外星人。"], faq: [{ q: "开局几条命？", a: "3条生命。" }, { q: "波次怎么增强？", a: "外星行数会逐渐增加到最多5行，水平速度每波增加0.1。" }, { q: "最多能同时发几颗子弹？", a: "玩家最多同时保留3发子弹。" }] },
    },
  }),

  "brick-breaker": reviewedProfile({
    slug: "brick-breaker",
    primaryKeyword: "brick breaker game online",
    secondaryKeywords: ["breakout game online", "brick breaking game", "paddle brick game", "free brick breaker"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Control the paddle, keep the ball in play and destroy every brick to advance through increasingly large levels.", zh: "控制挡板保持球不落底，清除所有砖块进入越来越大的后续关卡。" },
      controls: ["mouse", "touch", "keyboard"],
      scoring: [{ id: "brick", label: { en: "Destroyed brick", zh: "击碎1块砖" }, points: 10 }, { id: "life", label: { en: "Missed ball", zh: "漏掉球" }, value: { en: "−1 life", zh: "−1生命" } }],
      specialMechanics: [
        { en: "Level N creates 3 + N rows and 7 columns of bricks.", zh: "Level N生成3+N行、7列砖块。" },
        { en: "The top two brick rows require two hits; all later rows require one hit.", zh: "最上方两行砖块需要2次命中，其余砖块1次。" },
        { en: "Paddle contact changes horizontal ball velocity according to hit position, while total speed is capped at 6 + level.", zh: "球撞击挡板的位置会改变水平速度，总速度上限为6+level。" },
      ],
      endCondition: { en: "Missing the ball removes one of three lives. The run ends when lives reach zero; clearing all bricks advances to the next level instead.", zh: "漏球会扣掉3条生命中的1条；生命归零结束，清空砖块则进入下一关。" },
      progress: { en: "Score, lives and level are not persisted after reload.", zh: "分数、生命和关卡不会在刷新后保留。" },
      gameplayTopics: ["classic", "arcade"],
    },
    content: {
      en: { metaTitle: "Brick Breaker Online – 3 Lives and Growing Brick Levels", metaDescription: "Play Brick Breaker online with 3 lives. Destroy bricks for 10 points, clear 3 + level rows across 7 columns and advance as the ball speed cap increases.", h1: "Brick Breaker – Clear Every Brick with 3 Lives", intro: "Move the paddle, launch the ball and clear a growing 7-column brick field while protecting three lives.", about: ["Brick Breaker starts at level 1 with four rows of bricks and seven columns. Each new level adds another row, so the amount of board space covered by bricks steadily increases.", "The top two rows are tougher and need two hits. Destroying a brick awards ten points, while clearing the complete field advances immediately to the next level."], howToPlay: ["Move the paddle with mouse/touch or keyboard arrows.", "Tap/click or press Space to launch the ball when it is resting on the paddle.", "Keep returning the ball and destroy every brick.", "Clear the board to advance; avoid losing all three lives."], rules: ["You start with 3 lives.", "Every destroyed brick is +10 points.", "The top two rows have 2 HP; other bricks have 1 HP.", "Missing the ball costs 1 life, while clearing all bricks advances the level."], tips: ["Use off-center paddle hits to send the ball toward brick clusters that are still intact.", "Protect lives when only a few bricks remain; forcing an aggressive angle is less valuable than keeping the ball alive.", "Later levels raise the ball speed cap and add brick rows, so expect tighter reaction windows."], faq: [{ q: "How many lives are in Brick Breaker?", a: "You start with 3 lives." }, { q: "How many points is a brick worth?", a: "Each destroyed brick awards 10 points." }, { q: "How do levels grow?", a: "Level N creates 3 + N brick rows and 7 columns. Clearing all bricks advances to the next level." }] },
      zh: { metaTitle: "Brick Breaker 打砖块 – 3条命逐关增加砖块", metaDescription: "在线玩Brick Breaker：开局3条命，每击碎砖块+10分；Level N生成3+N行、7列砖块，清空后进入下一关。", h1: "Brick Breaker – 用3条生命清空所有砖块", intro: "移动挡板、发射小球，在7列砖块区域中不断清场，并保护3条生命进入后续更大关卡。", about: ["Brick Breaker 从Level 1的4行×7列砖块开始，每升1级会再增加1行，因此后续关卡砖块覆盖面积持续增加。", "最上方两行更耐打，需要2次命中。每击碎1块获得10分，整场清空后立即进入下一关。"], howToPlay: ["用鼠标/触屏或键盘左右方向控制挡板。", "球停在挡板上时点击/触摸或按Space发射。", "持续回球并击碎全部砖块。", "清空砖块即可升级，不要耗尽3条生命。"], rules: ["开局3条生命。", "每击碎1块砖+10分。", "最上方两行2HP，其余1HP。", "漏球扣1命；清空全部砖块则进入下一关。"], tips: ["利用挡板非中心位置改变回球角度，把球送向仍密集的砖块区域。", "剩少量砖块时优先保持球不落底，不要为了激进角度浪费生命。", "后续关卡砖块更多、球速上限更高，反应时间会越来越短。"], faq: [{ q: "Brick Breaker 有几条命？", a: "开局3条生命。" }, { q: "击碎砖块多少分？", a: "每块10分。" }, { q: "关卡怎么增加？", a: "Level N有3+N行、7列砖块；清空当前全部砖块进入下一关。" }] },
    },
  }),

  "pac-man": reviewedProfile({
    slug: "pac-man",
    primaryKeyword: "pac man game online",
    secondaryKeywords: ["pac man lite online", "maze dot game", "pacman browser game", "free pac man game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Move through an 11×11 maze, eat every dot for points and avoid three moving ghosts while protecting three lives.", zh: "在11×11迷宫中吃掉所有豆子得分，同时避开3个幽灵并保护3条生命。" },
      controls: ["keyboard", "touch"],
      scoring: [{ id: "dot", label: { en: "Dot eaten", zh: "吃1颗豆" }, points: 10 }, { id: "life", label: { en: "Ghost collision", zh: "碰到幽灵" }, value: { en: "−1 life", zh: "−1生命" } }],
      specialMechanics: [
        { en: "The maze is 11×11 and starts with three ghosts placed in three corners of the open maze area.", zh: "迷宫为11×11，开局有3个幽灵位于开放区域的三个角落。" },
        { en: "Ghosts update more slowly than the player and choose the direction toward the player about 60% of the time; otherwise they select a random legal non-reversing direction.", zh: "幽灵更新频率低于玩家，约60%情况下选择更接近玩家的合法方向，否则随机选择不立即反向的合法方向。" },
        { en: "Clearing every dot resets the maze and ghost positions but keeps the current score and remaining lives.", zh: "吃完所有豆子后会重置迷宫和幽灵位置，但保留当前分数和剩余生命。" },
      ],
      endCondition: { en: "Each ghost collision costs one life and re-centers the player. The run ends when all three lives are lost.", zh: "每次碰到幽灵扣1命并把玩家重置到中心；3条生命全部耗尽后结束。" },
      progress: { en: "Best score is saved in localStorage under pacman-best.", zh: "最高分保存在 localStorage 的 pacman-best。" },
      gameplayTopics: ["classic", "maze"],
    },
    content: {
      en: { metaTitle: "Pac-Man Lite Online – 11×11 Maze with 3 Ghosts", metaDescription: "Play Pac-Man Lite online in an 11×11 maze. Eat dots for 10 points, avoid 3 ghosts, protect 3 lives and clear the maze repeatedly while score carries forward.", h1: "Pac-Man Lite – Clear an 11×11 Maze and Avoid 3 Ghosts", intro: "Eat every dot for 10 points, steer around three ghosts and keep your score growing across repeated maze clears.", about: ["Pac-Man Lite uses a compact 11×11 maze. Every open dot is worth ten points, and three ghosts patrol the maze while you start with three lives.", "Clearing the final dot does not end the run. The maze and ghosts reset, but score and remaining lives continue, creating repeated clears inside one session."], howToPlay: ["Use arrow keys or swipe to choose the next movement direction.", "Move through open maze cells and eat dots for 10 points each.", "Avoid sharing a cell with any ghost.", "Clear all dots to reset the maze while keeping score and lives."], rules: ["You start with 3 lives.", "Every dot is worth 10 points.", "Ghost contact costs 1 life and returns the player to the center.", "The run ends at 0 lives; clearing all dots starts another board inside the same run."], tips: ["Choose turns before reaching an intersection so the queued next direction can be applied as soon as the path opens.", "Watch ghost approach routes, not just their current cells, because they favor movement toward you about 60% of their decisions.", "When lives are low, prioritize safe routes over clearing the last few dots quickly."], faq: [{ q: "How many ghosts are in Pac-Man Lite?", a: "There are three ghosts." }, { q: "How many points is each dot?", a: "Each eaten dot adds 10 points." }, { q: "What happens when all dots are eaten?", a: "The maze and ghost positions reset, but your current score and remaining lives continue." }, { q: "Is the best score saved?", a: "Yes. Best score is stored in localStorage in the current browser." }] },
      zh: { metaTitle: "Pac-Man Lite 吃豆人 – 11×11迷宫3个幽灵", metaDescription: "在线玩Pac-Man Lite：11×11迷宫，每颗豆+10分，避开3个幽灵、保护3条生命；清空豆子后重置迷宫但分数继续累计。", h1: "Pac-Man Lite – 清空11×11迷宫并避开3个幽灵", intro: "每吃1颗豆获得10分，避开3个幽灵，并在一次次清空迷宫后继续累计分数。", about: ["Pac-Man Lite 使用紧凑的11×11迷宫。每个开放格上的豆子价值10分，开局3条生命，并有3个幽灵在迷宫内移动。", "吃掉最后一颗豆并不会结束挑战。迷宫和幽灵会重新初始化，但当前分数和剩余生命继续保留。"], howToPlay: ["用方向键或滑动设置下一步移动方向。", "沿开放通道移动，每吃1颗豆+10分。", "避免和任何幽灵进入同一个格子。", "吃完全部豆子后开启下一次迷宫清场，同时保留分数和生命。"], rules: ["开局3条生命。", "每颗豆10分。", "碰到幽灵扣1命并把玩家重置到中心。", "生命归零结束；清空豆子只是进入下一轮迷宫。"], tips: ["在到达路口前提前输入下一方向，让路径开放时能立即转弯。", "观察幽灵可能的追踪路线而不是只看当前位置，因为它们约60%决策会偏向玩家。", "生命较少时优先选择安全路线，不要为了最后几颗豆冒险。"], faq: [{ q: "Pac-Man Lite 有几个幽灵？", a: "3个。" }, { q: "每颗豆多少分？", a: "10分。" }, { q: "吃完所有豆会怎样？", a: "迷宫和幽灵位置会重置，但当前分数和剩余生命继续保留。" }, { q: "最高分会保存吗？", a: "会，Best写入当前浏览器 localStorage。" }] },
    },
  }),

  frogger: reviewedProfile({
    slug: "frogger",
    primaryKeyword: "frogger game online",
    secondaryKeywords: ["play frogger online", "road crossing frog game", "classic frogger browser", "free frogger game"],
    containsViolence: false,
    mechanics: {
      objective: { en: "Guide the frog from the bottom across car lanes and river logs to the top safe row, repeating crossings while protecting three lives.", zh: "让青蛙从底部穿过车道和河流木头到达顶部安全区，并用3条生命重复过关得分。" },
      controls: ["keyboard", "touch"],
      scoring: [{ id: "crossing", label: { en: "Reach the top safe row", zh: "到达顶部安全区" }, points: 50 }, { id: "death", label: { en: "Car hit or water miss", zh: "撞车或落水" }, value: { en: "−1 life", zh: "−1生命" } }],
      specialMechanics: [
        { en: "The playfield has nine rows: start and goal safe rows, one middle safe row, three river-log rows and three road-car rows.", zh: "场地共9行：起点和终点安全行、中间1个安全行、3条河流木头行和3条公路车辆行。" },
        { en: "On river rows, the frog must be above a moving log; while supported, the log also carries the frog horizontally at the lane speed.", zh: "河流行必须站在移动木头上；成功站上后，木头会按该车道速度带着青蛙横向移动。" },
        { en: "A small tap with less than 10 pixels of movement is treated as an upward hop on touch devices.", zh: "触屏移动距离小于10像素的轻点会被当作向上跳一步。" },
      ],
      endCondition: { en: "A car collision or unsupported river row costs one life. The run ends when all three lives are gone.", zh: "撞到车辆或在河流行没有踩到木头会扣1命，3条生命耗尽后结束。" },
      progress: { en: "Best score is saved in localStorage under frogger-best.", zh: "最高分保存在 localStorage 的 frogger-best。" },
      gameplayTopics: ["classic", "crossing"],
    },
    content: {
      en: { metaTitle: "Frogger Online – Cross Roads and River Logs with 3 Lives", metaDescription: "Play Frogger online across 9 rows. Reach the top for 50 points, ride moving logs across the river, dodge cars and protect 3 lives with arrow or swipe controls.", h1: "Frogger – Cross Roads and Ride Logs to the Goal", intro: "Hop through three car lanes, ride moving logs across three river rows and reach the top safe row for 50 points before losing three lives.", about: ["This Frogger-style game divides the field into nine horizontal rows. The lower section contains moving road traffic, the upper section contains river lanes with moving logs, and safe rows separate key sections.", "Road and river hazards work differently: cars kill on contact, while river rows require the frog to be over a log. A supporting log carries the frog sideways with the lane."], howToPlay: ["Use arrow keys or swipe/tap controls to move one step at a time.", "Time hops through moving cars in the lower road lanes.", "On river rows, land on a log and account for its sideways movement.", "Reach the top row for 50 points, then repeat from the starting row."], rules: ["You start with 3 lives.", "Each successful crossing to row 0 is +50 points.", "Car collisions and unsupported river rows cost 1 life.", "The run ends when lives reach zero."], tips: ["Pause on the middle safe row to read river movement before committing upward.", "When riding a log, watch the frog's horizontal position because the log continues carrying it toward the screen edge.", "On touch, a short tap means forward, while directional swipes give explicit horizontal or downward movement."], faq: [{ q: "How many lives do you get in Frogger?", a: "You start with 3 lives." }, { q: "How many points is a successful crossing?", a: "Reaching the top safe row adds 50 points and resets the frog to the bottom." }, { q: "How do river rows work?", a: "You must be on a moving log. If supported, the log carries the frog horizontally; if not, you lose a life." }, { q: "Is Frogger best score saved?", a: "Yes. Best is stored in localStorage in the current browser." }] },
      zh: { metaTitle: "Frogger 青蛙过河 – 3条命穿公路和木头", metaDescription: "在线玩Frogger：9行场地，到达顶部+50分；穿过车辆路线、踩移动木头过河，用方向键或滑动保护3条生命。", h1: "Frogger – 穿过公路并踩木头到达终点", intro: "穿过3条车辆路线，再利用3条河流中的移动木头抵达顶部；每次成功+50分，保护好3条生命。", about: ["这个Frogger风格游戏把场地分成9条水平行。下半部分是移动公路车辆，上半部分是带移动木头的河流，中间和两端有安全区域。", "公路和河流危险机制不同：撞车直接扣命，而河流必须站在木头上。踩中木头后，木头会继续按车道速度把青蛙横向带走。"], howToPlay: ["用方向键或触屏滑动/轻点逐步移动。", "在下半部分判断车辆间隔穿过公路。", "进入河流后必须落在木头上，并考虑木头的横向移动。", "到达最上方安全行+50分，然后从底部继续下一次穿越。"], rules: ["开局3条生命。", "每次成功到达row 0获得50分。", "撞车或河流中没有踩到木头扣1命。", "生命归零后结束。"], tips: ["可以在中间安全行停一下，先观察河流木头节奏再向上。", "站在木头上时持续关注横向位置，因为木头会把青蛙带向屏幕边缘。", "触屏轻点小于10像素会向前跳，方向滑动则明确控制其他方向。"], faq: [{ q: "Frogger 有几条命？", a: "开局3条生命。" }, { q: "成功过河多少分？", a: "到达顶部安全行+50分，并把青蛙重置到底部。" }, { q: "河流怎么过？", a: "必须踩在移动木头上；木头会带着青蛙横向移动，没有木头支撑就扣1命。" }, { q: "最高分会保存吗？", a: "会，Best写入当前浏览器 localStorage。" }] },
    },
  }),
};
