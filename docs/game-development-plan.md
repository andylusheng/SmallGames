# H5 游戏站 - 游戏开发规划文档

> 目标：100 款精品自研 H5 小游戏
> 当前：52 款（已去重）
> 待开发：48 款

---

## 一、现有游戏清单（52款）

### arcade 街机（19款）- 已满，不再新增
| slug | 名称 | 玩法简述 |
|------|------|----------|
| fruit-slash | Fruit Slash | 滑动切水果 |
| flappy-bird | Flappy Bird | 点击飞行避障 |
| doodle-jump | Doodle Jump | 跳跃上升 |
| fruit-catch | Fruit Catch | 接住掉落水果 |
| knife-hit | Knife Hit | 飞刀插转盘 |
| piano-tiles | Piano Tiles | 音乐节奏点击 |
| helicopter | Helicopter | 直升机避障 |
| car-dodge | Car Dodge | 赛车躲避 |
| color-switch | Color Switch | 颜色匹配穿越 |
| snake-battle | Snake Battle | 贪吃蛇对战 |
| brick-breaker | Brick Breaker | 打砖块 |
| tap-tower | Tap Tower | 点击叠塔 |
| balloon-pop | Balloon Pop | 戳气球 |
| bounce-ball | Bounce Ball | 弹球闯关 |
| avoid-blocks | Avoid Blocks | 躲避方块 |
| catch-stars | Catch Stars | 接星星 |
| gravity-flip | Gravity Flip | 重力翻转跑酷 |
| jump-rope | Jump Rope | 跳绳计时 |
| tile-hop | Tile Hop | 跳瓷砖 |

### puzzle 益智（18款）- 已满，少量补充
| slug | 名称 | 玩法简述 |
|------|------|----------|
| 2048 | 2048 | 数字合并 |
| tetris | Tetris | 俄罗斯方块 |
| bubble-pop | Bubble Pop | 泡泡消除 |
| minesweeper | Minesweeper | 扫雷 |
| tic-tac-toe | Tic Tac Toe | 井字棋 |
| maze-runner | Maze Runner | 走迷宫 |
| gem-crush | Gem Crush | 三消宝石 |
| bubble-shooter | Bubble Shooter | 泡泡龙射击 |
| memory-cards | Memory Cards | 记忆翻牌 |
| word-scramble | Word Scramble | 字母重排 |
| number-puzzle | Number Puzzle | 数字华容道 |
| speed-math | Speed Math | 速算选择题 |
| sokoban | Sokoban | 推箱子 |
| word-search | Word Search | 找字 |
| memory-sequence | Memory Sequence | 记忆序列 |
| pipe-connect | Pipe Connect | 接管子 |
| color-fill | Color Fill | 填色泛洪 |
| hangman | Hangman | 猜词 |

### casual 休闲（6款）- 需补充
| slug | 名称 | 玩法简述 |
|------|------|----------|
| whack-a-mole | Whack-a-Mole | 打地鼠 |
| reaction-test | Reaction Speed Test | 反应速度测试 |
| color-match | Color Match | 颜色匹配 |
| rock-paper-scissors | Rock Paper Scissors | 石头剪刀布 |
| quick-tap | Quick Tap | 快速点击 |
| dice-duel | Dice Duel | 骰子对决 |

### shooting 射击（3款）- 需补充
| slug | 名称 | 玩法简述 |
|------|------|----------|
| space-shooter | Space Shooter | 太空射击 |
| space-invaders | Space Invaders | 经典入侵者 |
| asteroid-dodge | Asteroid Dodge | 躲陨石 |

### racing 赛车（1款）- 严重不足
| slug | 名称 | 玩法简述 |
|------|------|----------|
| speed-racer | Speed Racer | 竞速赛车 |

### sports 体育（2款）- 严重不足
| slug | 名称 | 玩法简述 |
|------|------|----------|
| pong | Pong | 乒乓球 |
| archery | Archery | 射箭 |

### strategy 策略（2款）- 严重不足
| slug | 名称 | 玩法简述 |
|------|------|----------|
| tower-defense | Tower Defense | 塔防 |
| connect-four | Connect Four | 四子棋 |

### idle 放置（1款）- 严重不足
| slug | 名称 | 玩法简述 |
|------|------|----------|
| cookie-clicker | Cookie Clicker | 饼干点击器 |

---

## 二、新增48款游戏规划

### 品类配额

| 品类 | 现有 | 新增 | 目标 | 优先级 |
|------|------|------|------|--------|
| racing 赛车 | 1 | +7 | 8 | 最高 |
| sports 体育 | 2 | +7 | 9 | 最高 |
| strategy 策略 | 2 | +6 | 8 | 高 |
| idle 放置 | 1 | +5 | 6 | 高 |
| casual 休闲 | 6 | +6 | 12 | 中 |
| shooting 射击 | 3 | +5 | 8 | 中 |
| action 动作 | 0 | +6 | 6 | 中（新品类）|
| puzzle 益智 | 18 | +3 | 21 | 低（已够多）|
| arcade 街机 | 19 | +3 | 22 | 低（已够多）|

---

### 第3批（12款）- 补最缺品类

| # | slug | 名称 | 品类 | 玩法 |
|---|------|------|------|------|
| 1 | hill-climb | Hill Climb | racing | 油门/刹车控制爬坡赛车，物理引擎 |
| 2 | drift-racer | Drift Racer | racing | 弯道漂移赛车，方向控制 |
| 3 | moto-trial | Moto Trial | racing | 摩托平衡特技，前后倾斜 |
| 4 | basketball | Basketball Shots | sports | 拖拽瞄准投篮，抛物线物理 |
| 5 | penalty-kick | Penalty Kick | sports | 选择方向踢点球 vs 守门员 |
| 6 | table-tennis | Table Tennis | sports | 上下移动球拍打乒乓 |
| 7 | bubble-wrap | Bubble Wrap | casual | 捏泡泡纸，解压休闲 |
| 8 | fidget-spinner | Fidget Spinner | casual | 旋转陀螺，点击加速 |
| 9 | paper-toss | Paper Toss | casual | 滑动扔纸团进垃圾桶，有风扇 |
| 10 | sudoku | Sudoku Lite | puzzle | 4x4/6x6 简化数独 |
| 11 | idle-miner | Idle Miner | idle | 点击挖矿，升级自动矿工 |
| 12 | idle-factory | Idle Factory | idle | 建造工厂产线，离线收益 |

### 第4批（12款）

| # | slug | 名称 | 品类 | 玩法 |
|---|------|------|------|------|
| 13 | zombie-shoot | Zombie Shooter | shooting | 点击射击来袭僵尸 |
| 14 | tank-battle | Tank Battle | shooting | 操控坦克移动+射击敌方 |
| 15 | duck-hunt | Duck Hunt | shooting | 限时点击飞过的鸭子 |
| 16 | cannon-blast | Cannon Blast | shooting | 调整角度力度发射炮弹 |
| 17 | bubble-cannon | Bubble Cannon | shooting | 发射泡泡消除同色 |
| 18 | basketball-hoop | Hoop Master | sports | 连续投篮挑战，移动篮筐 |
| 19 | golf-putt | Golf Putt | sports | 推杆进洞，控制力度方向 |
| 20 | bowling | Bowling | sports | 滑动投球，物理击倒瓶 |
| 21 | gomoku | Gomoku | strategy | 五子棋 vs AI |
| 22 | chess-puzzle | Chess Puzzle | strategy | 国际象棋残局解谜 |
| 23 | merge-defense | Merge Defense | strategy | 合并同类塔升级防御 |
| 24 | lemonade-stand | Lemonade Stand | idle | 经营柠檬水摊，升级配方 |

### 第5批（12款）

| # | slug | 名称 | 品类 | 玩法 |
|---|------|------|------|------|
| 25 | ninja-runner | Ninja Runner | action | 忍者自动跑，点击跳/滑/攻击 |
| 26 | sword-fight | Sword Fight | action | 点击格挡/攻击，节奏对战 |
| 27 | platformer | Pixel Platformer | action | 横版跳跃过关 |
| 28 | fruit-ninja | Fruit Ninja | action | 滑动切水果（保留原版重命名）|
| 29 | subway-dash | Subway Dash | racing | 三车道跑酷躲火车 |
| 30 | boat-race | Boat Race | racing | 水道赛艇避障 |
| 31 | pac-man | Pac-Man Lite | arcade | 经典吃豆人简化版 |
| 32 | frogger | Frogger | arcade | 青蛙过马路/河 |
| 33 | crossy-road | Crossy Road | arcade | 等距视角过马路 |
| 34 | volleyball | Volleyball | sports | 双人对打排球 |
| 35 | water-sort | Water Sort | puzzle | 倒水排序 |
| 36 | block-blast | Block Blast | puzzle | 放置方块消行 |

### 第6批（12款）

| # | slug | 名称 | 品类 | 玩法 |
|---|------|------|------|------|
| 37 | tap-tycoon | Tap Tycoon | idle | 点击赚钱，投资升级 |
| 38 | pet-merge | Pet Merge | idle | 合并宠物进化 |
| 39 | plant-defense | Plant Defense | strategy | 种植物防僵尸（简化版）|
| 40 | hex-merge | Hex Merge | strategy | 六角格合并数字 |
| 41 | nonogram | Nonogram | puzzle | 数织绘图方格 |
| 42 | tangram | Tangram | casual | 七巧板拼图 |
| 43 | coin-flip | Coin Flip | casual | 抛硬币猜正反 |
| 44 | magic-8ball | Magic 8 Ball | casual | 魔法8号球问答 |
| 45 | sand-fall | Sand Fall | casual | 沙粒下落模拟 |
| 46 | ski-run | Ski Run | action | 左右躲避滑雪下坡 |
| 47 | surfing | Surf Runner | action | 冲浪避障收集 |
| 48 | space-pinball | Space Pinball | arcade | 弹球台 |

---

## 三、开发标准

每款游戏必须满足以下规范：

1. **文件格式**：单文件 HTML（内联 CSS + JS，零外部依赖）
2. **视觉风格**：深色主题 `#1a1a2e` 背景，`#4fc3f7` 主色调
3. **交互支持**：触控（pointer events）+ 键盘（Arrow/WASD/Space）
4. **渲染方式**：Canvas 2D 或 DOM 操作
5. **数据持久化**：localStorage 存储最高分/进度
6. **响应式**：`Math.min(400, innerWidth-16)` 自适应
7. **缩略图**：SVG 格式 400x300，放在 `public/games/{slug}/thumb.svg`
8. **元数据**：games.json 完整字段（id/title/slug/description/category/thumbnail/gameUrl/tags/featured/popular/dateAdded/plays/rating/instructions）

---

## 四、文件结构

```
public/games/{slug}/
  ├── index.html    # 游戏主文件
  └── thumb.svg     # 缩略图

src/data/games.json  # 游戏元数据（唯一数据源）
src/lib/games.ts     # 数据加载层
```

---

## 五、实施节奏

| 批次 | 内容 | 完成后总量 |
|------|------|-----------|
| 去重 | 删除9个重复条目 | 52款 |
| 第3批 | 12款（racing×3, sports×3, casual×3, puzzle×1, idle×2）| 64款 |
| 第4批 | 12款（shooting×5, sports×3, strategy×3, idle×1）| 76款 |
| 第5批 | 12款（action×4, racing×2, arcade×3, sports×1, puzzle×2）| 88款 |
| 第6批 | 12款（idle×2, strategy×2, puzzle×1, casual×4, action×2, arcade×1）| 100款 |

每批完成后执行 `npm run build` 验证，确保零报错。
