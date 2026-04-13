# nihongo-flashcard

## 1.6.2

### Patch Changes

- fix: SpeakButton.svelte:
  - loadVoices(): if no ja-prefixed voices exist, falls back to all voices as candidates, and adds an else branch to clear state cleanly.
  - doSpeak(): the fallback voice lookup (selectedVoiceName is empty) now also uses ?? voices[0] as a last resort, matching the norske behaviour, so speech fires even when no Japanese voice is identified.

## 1.6.0

### Minor Changes

- feat:
  - Added PWA support for installability and offline caching
  - Updated app description to specify JLPT N4/N5 vocabulary focus
  - Set a site theme color for a consistent browser UI

  fix:
  - Improved handling of returning to the last-viewed flashcard to reduce incorrect redirects

  chores:
  - Added PWA development tooling and adjusted build/service worker configuration

## 1.5.0

### Minor Changes

- feat: Flashcard UI now persists mode and example-translation preferences and restores last-viewed flashcard on return.

  style: About page typography and list styling standardized with componentized elements.

  tests: Added end-to-end and unit tests for flashcard flows, persistence, and path validation.

  chores: Removed several obsolete UI components, utility helpers, a demo test, and an unused publish script.

  refactor: Minor cleanup of speech/voice control code.

## 1.4.0

### Minor Changes

- feat: new vocab list, fix mega-menu

## 1.2.0

### Minor Changes

- feat: improve flashcard navigation UX with intuitive keyboard controls
  - Add card counter display (e.g., "3/7") for better progress tracking
  - Implement consistent arrow key navigation (←↑ previous, →↓ next)
  - Add N key shortcut for generating new cards
  - Fix history management to preserve forward navigation without truncation
  - Separate navigation from card generation for clearer UX
  - Update button states with proper disabled styling
  - Maintain full mobile compatibility with existing touch gestures
  - Update user instructions to reflect new keyboard shortcuts

  Breaking: Arrow keys no longer flip cards (use space/enter instead)

## 1.0.1

### Patch Changes

- fix: package.json update ([`3e84c48d7d11bf71e666bbd4bf5070a9e28b1701`](https://github.com/shinokada/nihongo-flashcard/commit/3e84c48d7d11bf71e666bbd4bf5070a9e28b1701))
  docs: add about page
