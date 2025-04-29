# TODO: Implement Style Guide Across All Website Components

## Background
We've created a comprehensive style guide (located at `docs/guides/style-guide.md`) that defines our brand colors, typography, and component styling. To ensure visual consistency across the entire application, we need to systematically apply this style guide to all sections and components of the website.

The style guide defines:
- Primary Colors: Electric Red (#EF0000), Dark Red (#8F0000), UE Red (#BF0000), Black (#000000)
- Secondary Colors: Red Purple (#EF0078), White (#FFFFFF), Azure (#0078EF)
- Typography standards for headings and body text
- Component styling for buttons, cards, and other UI elements
- Background patterns and effects

This to-do list outlines the tasks required to thoroughly implement these standards across the entire website.

## Checklist

### Core UI Components
- [ ] Update Header component (`app/components/Header.tsx` and `Header.module.css`)
  - [ ] Replace existing colors with style guide colors
  - [ ] Apply typography standards to navigation items
  - [ ] Update button styles to match guidelines
- [ ] Update Footer component (`app/components/Footer.tsx` and `Footer.module.css`)
  - [ ] Update background colors to match brand black
  - [ ] Apply Azure color to links
  - [ ] Update typography according to style guide
- [ ] Update HeroBanner component (`app/components/HeroBanner.tsx` and `HeroBanner.module.css`)
  - [ ] Replace background patterns with standard grid/particle effects from style guide
  - [ ] Update CTA buttons to use Electric Red (#EF0000)
  - [ ] Apply heading typography standards
- [ ] Update SectionSeparator component (`app/components/SectionSeparator.tsx` and `SectionSeparator.module.css`)
  - [ ] Replace red colors with Electric Red (#EF0000)
  - [ ] Ensure spacing matches style guide standards

### Feature Section Components
- [ ] Update ProductFeatures component (`app/components/ProductFeatures.tsx` and `ProductFeatures.module.css`)
  - [ ] Standardize card styling according to style guide
  - [ ] Update accent colors with appropriate style guide colors
  - [ ] Apply typography standards to headings and descriptions
- [ ] Update CoreCapabilities component (`app/components/CoreCapabilities.tsx` and `CoreCapabilities.module.css`)
  - [ ] Update capability card styling
  - [ ] Apply appropriate brand colors to icon containers
  - [ ] Ensure spacing follows style guide
- [ ] Update CustomerShowcase component (`app/components/CustomerShowcase.tsx` and `CustomerShowcase.module.css`)
  - [ ] Standardize customer card styling
  - [ ] Replace highlight colors with style guide colors
  - [ ] Apply consistent spacing following style guide

### Interactive Demo Components
- [ ] Update SocketZeroDemo component (`app/components/SocketZeroDemo.tsx` and `SocketZeroDemo.module.css`)
  - [ ] Update animation colors to use style guide colors
  - [ ] Replace highlight colors with Electric Red or Red Purple
  - [ ] Apply button styling standards to interactive elements
  - [ ] Ensure typography matches style guide
- [ ] Update PipelineDemo component (`app/components/PipelineDemo.tsx` and `PipelineDemo.module.css`)
  - [ ] Replace pipeline connector colors with style guide colors
  - [ ] Update step indicators to use Electric Red and Dark Red
  - [ ] Standardize animation highlight colors
  - [ ] Check SVGs for non-standard colors
- [ ] Update DeploymentFlexibility component (`app/components/DeploymentFlexibility.tsx` and `DeploymentFlexibility.module.css`)
  - [ ] Update destination indicators using style guide colors
  - [ ] Standardize background patterns
  - [ ] Ensure animation colors follow style guide

### Animation Components
- [ ] Update all animation components in `app/components/deployment/animations/`
  - [ ] Replace hardcoded colors with style guide colors
  - [ ] Use Electric Red for primary animations
  - [ ] Update glow effects with appropriate rgba values
- [ ] Update destination components in `app/components/deployment/destinations/`
  - [ ] Standardize styling according to style guide
  - [ ] Update icon and highlight colors
- [ ] Review and update utility files
  - [ ] Check `app/components/deployment/utils/MotionPathUtils.ts` for animation colors
  - [ ] Update AnimationController if it contains color references

### Global Styles
- [ ] Update global CSS variables in `app/globals.css`
  - [ ] Add style guide colors as CSS variables
  - [ ] Ensure consistent naming convention
  - [ ] Document the color system
- [ ] Create a reusable component for background effects
  - [ ] Extract grid and particle patterns into a component
  - [ ] Ensure it can accept colors from the style guide

### Documentation
- [ ] Complete color assets in documentation
  - [ ] Create/update color swatch images for all colors
  - [ ] Add them to `docs/assets/`
- [ ] Update component documentation
  - [ ] Add references to the style guide
  - [ ] Include examples of proper color usage

### Testing
- [ ] Test accessibility of all color changes
  - [ ] Verify contrast ratios for text elements
  - [ ] Check interactive elements for sufficient contrast
- [ ] Perform visual regression testing
  - [ ] Take before/after screenshots
  - [ ] Verify design integrity across all components

### Final Review
- [ ] Conduct a comprehensive review of all components
  - [ ] Ensure no hardcoded colors outside the style guide palette
  - [ ] Verify consistent typography throughout
  - [ ] Check button and card styles for consistency
  - [ ] Confirm background patterns follow standards 