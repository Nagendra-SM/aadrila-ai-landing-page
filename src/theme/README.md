# Theme System Documentation

## Color Palette

- **Hero Title**: `#3E6EB4` - Primary blue for main headings
- **Title**: `#CD6028` - Orange accent for section titles  
- **Subtitle**: `#DFEEFC` - Light blue for subtitles and secondary text
- **Body**: `#FFFFFF` - White for main body text
- **Button**: `#141219` - Dark background for buttons
- **Button Hover**: `#1E1C26` - Slightly lighter dark for button hover state

## Typography

### Font Families
- **Raleway**: Used for headings and titles (font-weight: 300-900)
- **Manrope**: Used for body text and subtitles (font-weight: 200-800)

### Font Weights
- Light: 300
- Regular: 400  
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800
- Black: 900

## Usage Examples

### ThemedText Component
```tsx
<ThemedText variant="hero-title" as="h1">Main Heading</ThemedText>
<ThemedText variant="title" as="h2">Section Title</ThemedText>
<ThemedText variant="subtitle">Subtitle Text</ThemedText>
<ThemedText variant="body">Body content</ThemedText>
```

### ThemedButton Component
```tsx
<ThemedButton onClick={handleClick}>Primary Button</ThemedButton>
<ThemedButton variant="secondary">Secondary Button</ThemedButton>
```

### CSS Classes
```css
/* Colors */
.text-hero-title { color: var(--color-hero-title); }
.text-title { color: var(--color-title); }
.text-subtitle { color: var(--color-subtitle); }
.text-body { color: var(--color-body); }

/* Fonts */
.font-raleway { font-family: var(--font-raleway); }
.font-manrope { font-family: var(--font-manrope); }

/* Buttons */
.bg-button { background-color: var(--color-button); }
.bg-button-hover:hover { background-color: var(--color-button-hover); }
```
