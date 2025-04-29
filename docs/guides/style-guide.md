# Radius Method Style Guide

This style guide defines the brand identity elements and styling principles for Radius Method applications, ensuring consistency across all components and interfaces.

## Primary Colors

Radius Method's primary colors add elegance to communications and are the most recognizable elements of our visual identity.

### Electric Red

![Electric Red](../assets/color-electric-red.png)

```
HEX:  #EF0000
CMYK: 0, 100, 100, 06
RGB:  239, 0, 0
```

Used for: Primary buttons, key highlights, and critical UI elements

### Dark Red

![Dark Red](../assets/color-dark-red.png)

```
HEX:  #8F0000
CMYK: 0, 100, 100, 44
RGB:  143, 0, 0
```

Used for: Hover states, secondary highlights, and accent elements

### UE Red

![UE Red](../assets/color-ue-red.png)

```
HEX:  #BF0000
CMYK: 0, 100, 100, 25
RGB:  191, 0, 0
```

Used for: Tertiary buttons, background accents, and borders

### Black

![Black](../assets/color-black.png)

```
HEX:  #000000
CMYK: 0, 0, 0, 100
RGB:  0, 0, 0
```

Used for: Background, text, and UI containers

## Secondary Colors

Secondary colors complement our primary palette and provide additional versatility for specific design needs.

### Red Purple

![Red Purple](../assets/color-red-purple.png)

```
HEX:  #EF0078
CMYK: 0%, 100%, 50%, 6%
RGB:  239, 0, 120
```

Used for: Accent elements, decorative graphics, and tertiary highlights

### White

![White](../assets/color-white.png)

```
HEX:  #FFFFFF
CMYK: 0, 0, 0, 100
RGB:  0, 0, 0
```

Used for: Text on dark backgrounds, container backgrounds, and dividers

### Azure

![Azure](../assets/color-azure.png)

```
HEX:  #0078EF
CMYK: 100%, 50%, 0%, 6%
RGB:  0, 120, 239
```

Used for: Information elements, links, and complementary action buttons

## Color Usage Guidelines

- **Consistency**: Use colors consistently throughout the interface to create a cohesive experience.
- **Hierarchy**: Use Electric Red (#EF0000) to draw attention to the most important elements.
- **Contrast**: Ensure sufficient contrast between text and background colors for readability.
- **Accessibility**: Follow WCAG 2.1 AA standards for color contrast (minimum 4.5:1 for normal text).
- **Secondary Colors**: Use secondary colors sparingly to complement the primary palette without overwhelming the visual identity.

## Typography

### Heading Font

```css
font-family: var(--font-heading);
```

Used for: Section titles, component headings, and important labels

### Base Font

```css
font-family: var(--font-base);
```

Used for: Body text, descriptions, and UI elements

## Component Styling

### Buttons

Primary Button:
```css
background-color: #EF0000;
color: white;
border-radius: 4px;
padding: 0.75rem 1.5rem;
font-family: var(--font-base);
font-weight: 500;
```

Secondary Button:
```css
background-color: transparent;
color: #EF0000;
border: 1px solid #EF0000;
border-radius: 4px;
padding: 0.75rem 1.5rem;
font-family: var(--font-base);
font-weight: 500;
```

Tertiary Button:
```css
background-color: transparent;
color: #0078EF;
border: 1px solid #0078EF;
border-radius: 4px;
padding: 0.75rem 1.5rem;
font-family: var(--font-base);
font-weight: 500;
```

Disabled Button:
```css
opacity: 0.6;
cursor: not-allowed;
```

### Cards

```css
background-color: #0A0A0A;
border: 1px solid #1A1A1A;
border-radius: 8px;
padding: 2rem;
```

### Section Titles

```css
font-size: 2.5rem;
font-weight: 600;
font-family: var(--font-heading);
color: white;
```

## Implementation Example

When implementing components, follow this color system to ensure consistency:

```tsx
import styles from './Component.module.css';

const Component = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Component Title</h2>
      <p className={styles.description}>Description text</p>
      <button className={styles.primaryButton}>Primary Action</button>
      <button className={styles.secondaryButton}>Secondary Action</button>
    </div>
  );
};
```

## Grid and Spacing

- Base unit: 4px (0.25rem)
- Spacing increments: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- Standard padding: 32px (2rem)
- Component gap: 16px-32px (1rem-2rem)

## Background Effects

For branded sections, use these background effects:

```css
.gridPattern {
  background-image: 
    linear-gradient(rgba(239, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(239, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.3;
}

.particleEffect {
  background-image: radial-gradient(rgba(239, 0, 0, 0.07) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.3;
}
```

## Responsive Design

- Mobile breakpoint: 768px
- Tablet breakpoint: 1024px
- Desktop: 1200px and above

Follow a mobile-first approach when implementing responsive designs. 