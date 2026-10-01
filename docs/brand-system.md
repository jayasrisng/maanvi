# Maanvi brand system

This is the internal source of truth for the Maanvi web experience. It is not a public route or customer-facing page.

## Core palette

| Token | Value | Use |
| --- | --- | --- |
| Maanvi saffron | `#FF6A00` | Primary brand field, decisive actions and motion end states. |
| Maanvi mark orange | `#FF6A00` | The original logo on light surfaces and standalone controls. |
| Handloom ivory | `#FFF8ED` | Main paper surface, breathing room and the logo on saffron. |
| Thread earth | `#703817` | Long-form reading text and restrained detail on ivory. |

Use saffron on ivory or ivory on saffron for primary UI. Do not introduce purple as a brand field. Deep earth, maroon and gold may only appear inside documentary imagery or as a quiet supporting textile tone; they must not replace saffron as the dominant brand colour.

## Typography

| Role | Typeface | Use |
| --- | --- | --- |
| Telugu editorial voice | Noto Serif Telugu | Telugu headings, family notes and poetic lines. |
| English editorial voice | Cormorant Garamond | Display moments and evocative English lines. |
| Information voice | Manrope | Navigation, labels, forms and utility copy. |

Telugu comes first when both languages are present. Keep the English translation smaller and secondary. Use generous line-height for Telugu and avoid all-caps Telugu.

## Logo and motion

Use the original Maanvi mark only. The introduction sequence uses the original mark orange on ivory while the logo forms, switches to ivory on homepage saffron, then reduces into the header position. The header on a saffron opening uses the ivory version of the mark.

The site should feel like cloth: continuous, calm and tactile. Motion eases in and out, never snaps or bounces. Keep controls discreet, orange, standalone and icon-led.

## Layout and interaction

- Give editorial copy generous ivory space.
- Use saffron blocks for transitions, invitations, navigation states and the footer.
- Keep calls to action high contrast: ivory on saffron or saffron/earth on ivory.
- Maintain a visible active underline in navigation.
- Use the original logo rather than constructed “Maanvi” lettering.

## Consistency audit — September 30, 2026

The active homepage, footer, intro, collection book, legal pages and new controls consistently use a saffron/ivory foundation, with Noto Serif Telugu, Cormorant Garamond and Manrope already installed across the main experience.

The codebase still contains older, lower-priority visual systems in `src/App.css`, `src/heritage.css`, `src/woven.css`, and legacy `src/pages/*` components. These carry aubergine, brown, peach and gold values, including `#65262D`, `#532B22`, `#8F340B` and several cream variants. They are not aligned with this compact core palette and should be migrated to the tokens above before those legacy routes or components are expanded.

The current production-facing journey styles in `src/journey.css`, `src/components/flowing-story.css`, `src/components/maanvi-intro.css`, and the intro renderer are the implementation baseline for new work.
