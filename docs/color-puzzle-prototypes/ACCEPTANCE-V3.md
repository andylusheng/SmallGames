# Color Puzzle Prototype Alignment V3

## Scope

- Screw Sort Master
- Color Block Route
- Bus Queue Sort
- Hexa Color Stack

## Visual acceptance basis

The gameplay screen is aligned to the frozen product prototype's central phone/gameplay panel. The left-side product explanation and right-side campaign/map mockups in the product board are reference states, not part of the embedded gameplay runtime.

## V3 changes

- Rebuilt shared visual shell to a polished mobile-game treatment instead of a white developer-demo layout.
- Color Block Route: larger vertical board, glossy blocks, matching color gates, route/exit feedback.
- Hexa Color Stack: larger honeycomb field, denser seeded board, visibly layered stacks, four-piece tray, combo treatment.
- Screw Sort Master: five color trays, layered metal plates on a wood bench, 20 screws, covered/uncovered hierarchy and removal feedback.
- Bus Queue Sort: four recognizable buses, human-shaped passengers, platform/road treatment, waiting slots, boarding animation and departure animation.

## Runtime smoke test

Viewport: 390x844 mobile render.

- Color Block Route: first legal block interaction increments Moves from 0 to 1; block clears through a matching gate; no horizontal overflow.
- Screw Sort Master: exposed screw click increments Moves from 0 to 1; screw count falls from 20 to 19; no horizontal overflow.
- Hexa Color Stack: selecting a tray piece and placing it on an empty hex marks one piece used and increases occupied cells; no horizontal overflow.
- Bus Queue Sort: front passenger click increments Moves from 0 to 1 and Boarded from 0 to 1 when matching; no horizontal overflow.

All four inline gameplay scripts and shared core.js pass `node --check`.

## Known boundary

This is prototype-aligned gameplay UI, not a pixel-for-pixel recreation of every auxiliary screen shown on the product concept boards. The level-map / campaign screen is intentionally not part of the embedded game runtime in this delivery.
