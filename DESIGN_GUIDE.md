# Design Guide - Old-School Library Aesthetic

## 🎨 Design Philosophy

This library management system is designed to evoke the feeling of a **traditional university library** from the early-to-mid 20th century, combining classic academic aesthetics with modern functionality.

## Color Palette

```css
--parchment: #f4f1e8          /* Main background - warm, aged paper */
--parchment-dark: #e8e3d6     /* Secondary background */
--dark-brown: #5d4037          /* Primary color - rich brown */
--maroon: #7b1e2a              /* Accent color - academic maroon */
--light-maroon: #9c3848        /* Light accent */
--text-primary: #2c1810        /* Main text - dark brown */
--text-secondary: #5d4037      /* Secondary text */
--border-color: #c9b99a        /* Borders - muted tan */
--shadow: rgba(61, 44, 28, 0.15) /* Subtle shadows */
```

## Typography

### Font Families
- **Headings:** Playfair Display (serif, elegant, traditional)
- **Body Text:** Crimson Text (serif, readable, academic)
- **Fallback:** Georgia, serif

### Usage
```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', Georgia, serif;
  color: var(--dark-brown);
  font-weight: 600;
}

body {
  font-family: 'Crimson Text', Georgia, serif;
  line-height: 1.6;
}
```

## UI Components

### Library Card
The signature component - resembles a traditional library catalog card:

```css
.library-card {
  background: linear-gradient(to bottom, #fffef9 0%, #f8f6f0 100%);
  border: 2px solid var(--border-color);
  padding: 25px;
  box-shadow: 0 2px 4px var(--shadow);
  /* NO border-radius - keep sharp corners! */
}

.library-card::before {
  /* Top accent line - like old index cards */
  content: '';
  height: 3px;
  background: linear-gradient(to right, maroon, dark-brown, maroon);
}
```

### Buttons
Classic, solid buttons with no modern effects:

```css
button {
  padding: 12px 24px;
  border: 2px solid var(--dark-brown);
  background-color: var(--dark-brown);
  color: #fff;
  font-family: 'Crimson Text', serif;
  font-weight: 600;
  /* NO border-radius */
  /* Simple hover: darker color + slight lift */
}
```

### Tables
Academic register style:

```css
table {
  background: #fffef9;
  border: 2px solid var(--border-color);
}

th {
  background-color: var(--dark-brown);
  color: #fff;
  font-family: 'Playfair Display', serif;
}
```

### Form Elements
Classic input fields with subtle styling:

```css
input, select, textarea {
  border: 2px solid var(--border-color);
  background-color: #fffef9;
  font-family: 'Crimson Text', serif;
  /* NO border-radius */
}

input:focus {
  border-color: var(--dark-brown);
  box-shadow: 0 0 0 3px rgba(93, 64, 55, 0.1);
}
```

## Layout Principles

### 1. Sharp Corners
❌ **Avoid:** `border-radius: 10px;`
✅ **Use:** Sharp, clean edges (border-radius: 0)

### 2. Paper Texture
- Subtle gradient backgrounds
- Slight variations in parchment color
- Radial gradients for depth

### 3. Typography Hierarchy
```
h1: 2.5-3.5rem (page titles)
h2: 2rem (section headers)
h3: 1.5rem (subsections)
p: 1rem (body text)
```

### 4. Spacing
- Generous padding (20-30px)
- Consistent margins (15-20px)
- Breathing room around elements

## Special UI Patterns

### Book Catalog Cards
Inspired by old library catalog cards:

```jsx
<div className="book-catalog-card">
  <h3>Book Title</h3>
  <div className="book-metadata">
    <div><strong>Author:</strong> Name</div>
    <div><strong>ISBN:</strong> Number</div>
    <div><strong>Available:</strong> Count</div>
  </div>
</div>
```

### Dashboard Stats
Modern stats with classic styling:

```jsx
<div className="stat-card">
  {/* Gradient background but muted colors */}
  <h3>Stat Label</h3>
  <p>Number</p>
</div>
```

### Strikethrough Pattern
For returned books (like crossing out in a register):

```css
.returned {
  text-decoration: line-through;
  opacity: 0.6;
}
```

## Responsive Design

### Desktop (>768px)
- Top navigation bar
- Full tables
- Multi-column grids
- Sidebar-style layouts

### Mobile (≤768px)
- Bottom navigation bar
- Tables convert to card layouts
- Single-column grids
- Sticky search bars
- Touch-friendly targets (min 44px)

```css
@media (max-width: 768px) {
  .top-nav { display: none; }
  .bottom-nav { display: block; }
  table { display: none; }
  .mobile-card-list { display: block; }
}
```

## Icons & Graphics

### Icon Style
- Emoji-based for simplicity: 📚 📖 👤 ✏️ ➕ 🔍
- OR outline-style icons (if using library)
- NO colorful, modern icons

### Images
- Avoid if possible
- If needed: sepia-toned, vintage library photos
- Black and white academic imagery

## Animation & Interactions

### Subtle, Refined Animations
```css
transition: all 0.3s ease;

/* Hover: slight lift */
transform: translateY(-2px);

/* Hover: subtle shadow increase */
box-shadow: 0 6px 12px var(--shadow);
```

### Avoid
- ❌ Flashy transitions
- ❌ Bouncing animations
- ❌ Spinning loaders (use simple text)
- ❌ Modern glassmorphism
- ❌ Neon effects

## Accessibility

✅ High contrast text (dark brown on parchment)
✅ Minimum 1.6 line-height for readability
✅ Large, clear fonts (16px base)
✅ Keyboard navigation support
✅ Clear focus states
✅ Semantic HTML

## Design Don'ts

❌ No gradient text
❌ No drop shadows on text
❌ No modern card shadows (0 20px 50px...)
❌ No bright colors (stay muted)
❌ No sans-serif fonts
❌ No rounded corners
❌ No floating action buttons
❌ No modern loading spinners

## Design Do's

✅ Paper-like backgrounds
✅ Classic serif typography
✅ Muted, warm colors
✅ Sharp, clean edges
✅ Academic register aesthetics
✅ Subtle shadows
✅ Traditional forms
✅ Classic table layouts

## Color Usage Examples

### Success Messages
```css
background: #f0f8ec;
border: 2px solid #6ba544;
color: #2d5016;
```

### Error Messages
```css
background: #fdf0f0;
border: 2px solid var(--maroon);
color: var(--maroon);
```

### Overdue Indicators
```css
background: linear-gradient(135deg, var(--maroon), #5d1520);
color: white;
```

## Inspiration

This design is inspired by:
- Old library catalog cards
- Academic registers and ledgers
- University library reading rooms
- Vintage bookstore aesthetics
- Classic educational materials

---

**Remember:** When in doubt, think "What would a 1950s university librarian use?" Keep it classic, keep it elegant, keep it functional.
