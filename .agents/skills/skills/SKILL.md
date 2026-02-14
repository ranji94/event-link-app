---
name: skills
description: Specialized skills for creating and managing Eventspot invitation templates
---

# skills

Instructions for the AI agent to effectively create, refactor, and manage invitation templates within the Eventspot ecosystem.

## Usage

Use these skills when the user asks to create a new invitation design (e.g., "Create a wedding template"), modify an existing one, or manage translations for templates.

## Steps

### Skill: Create New Template (`create-template`)
**Trigger**: "Stwórz szablon na [okazja]", "Dodaj nowy design", "Zrób zaproszenie w stylu [styl]".

1.  **Analyze Context & Theme**:
    - Determine the occasion (Wedding, Birthday, Corporate, etc.).
    - Define a color palette using Tailwind colors (e.g., `rose-500` mixed with `stone-100`).
    - Plan unique SVG decorations (e.g., Rings for wedding, Balloons for birthday).

2.  **Scaffold File**:
    - Create a new file in `src/templates/variants/[theme-name].tsx`.
    - Copy the structure from a reference (like `baby-shower-bunny.tsx`).
    - Define the `TemplateDef` object with a unique `id`.

3.  **Implement Visuals (The "Wow" Factor)**:
    - **Do not use external images.** Write functional React components rendering SVGs inline.
    - Create a layout container with `max-w-md mx-auto` (mobile card look) but responsive logic.
    - Apply `layout === 'fullscreen'` logic if needed (usually centered on screen).

4.  **Implement Logic & Props**:
    - Destructure all `PreviewProps`.
    - Implement `useRsvpCountdown(rsvpDeadline)`.
    - **Crucial**: Conditionally render the RSVP section.
      - IF `rsvpStatus === 'ACCEPTED'`: Show success state.
      - IF `rsvpStatus === 'DECLINED'`: Show regret state.
      - IF `isExpired`: Show "Too late" message.
      - ELSE: Show "Accept/Decline" buttons wired to `onAccept`/`onDecline`.

5.  **Register Template**:
    - Remind the user to import and add the new template to `src/templates/registry.ts`.

---

### Skill: Refactor Template UI (`polish-ui`)
**Trigger**: "Popraw wygląd", "Zmień kolory", "Biednie to wygląda".

1.  **Audit**: Check for proper contrast, padding consistency, and mobile responsiveness.
2.  **Enhance**:
    - Add gradients to backgrounds (`bg-gradient-to-b`).
    - Add subtle animations using standard CSS or Tailwind classes (e.g., `animate-pulse` for important buttons).
    - Improve typography (letter-spacing, uppercase headers).
3.  **Preserve Logic**: Ensure no props or RSVP logic is removed during restyling.

---

### Skill: Generate Translations (`gen-i18n`)
**Trigger**: "Dodaj tłumaczenia", "Brakuje tekstów".

1.  **Scan**: Read the newly created template file.
2.  **Extract**: Identify all `translate("templates.[id].[key]")` calls.
3.  **Generate JSON**: Create a JSON snippet compatible with `src/locales/pl-PL.json`.
4.  **Output**: Present the JSON block for the user to copy.