# Design Brief

**Purpose**: Event discovery and filtering by category (Music, Tech, Food) with immediate, tactile interaction through category pills.

**Tone**: Modern productivity with editorial clarity. Refined restraint, no decoration. Focus on information hierarchy and filter affordance.

**Differentiation**: Category pills are custom interactive elements that provide instant visual feedback. Active pills elevated with warm accent color. Event cards display categories as matching badges, creating visual cohesion.

## Color Palette

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| Primary | `0.45 0.1 30` | `0.75 0.12 40` | Category pill active state, primary actions |
| Accent (Warm Amber) | `0.6 0.22 40` | `0.68 0.22 40` | Category labels, active states, highlights |
| Neutral Background | `0.97 0.01 0` | `0.13 0.02 0` | Page background |
| Card Surface | `0.99 0.01 0` | `0.17 0.02 0` | Event cards, elevated surfaces |
| Muted | `0.88 0.01 0` | `0.25 0.02 0` | Inactive pills, secondary surfaces |
| Destructive | `0.58 0.2 22` | `0.65 0.18 20` | Delete/remove actions |

## Typography

| Role | Font | Scale | Usage |
| --- | --- | --- | --- |
| Display | Bricolage Grotesque | 28px, 700 | Page title "Event Finder" |
| Body | DM Sans | 14–16px | Event titles, descriptions, filter labels |
| Mono | System | 12px | Timestamps, metadata |

## Structural Zones

| Zone | Treatment | Notes |
| --- | --- | --- |
| Header | `bg-card border-b border-border` | Branding, title, compact layout |
| Filter Pile | `gap-2 py-4 px-0` | Category pills: full rounded, pill-active/pill-inactive utilities |
| Event Grid | `grid gap-4 md:grid-cols-2 lg:grid-cols-3` | Responsive card layout, gap-4 spacing |
| Event Card | `bg-card rounded-lg shadow-xs border border-border` | Subtle elevation, category badge accent color |
| Footer | `bg-muted/20 border-t border-border py-4` | Optional, minimal footprint |

## Component Patterns

- **Filter Pill**: Rounded button, toggle state, `.pill-active` / `.pill-inactive` classes, smooth transition
- **Category Badge**: Small accent-colored label on event cards matching pill color system
- **Event Card**: Grid item, border-lg, category badge in top-right, date/location in footer
- **Empty State**: Centered text on neutral background when no events match filters

## Motion

- **Pill Toggle**: `transition-smooth` on background/text color, immediate feedback
- **Card Hover**: Subtle `shadow-md` on hover, `transition-smooth`

## Constraints

- No gradients, full-color blocks only
- Maximize whitespace for clarity
- Single accent color (warm amber) for category indicators across all zones
- Dark mode as default theme; light mode available
- 2 font families maximum (display + body)

## Signature Detail

Category pills act as both filter controls and visual category indicators. The warm accent color provides a consistent, memorable touchpoint across filter pills, event badges, and active states — creating visual coherence without decoration.

