# TODO: Implement Color Guide Across All Website Components

## Background
We've created a comprehensive style guide (located at `docs/guides/style-guide.md`) that defines our brand colors. To ensure visual consistency across the entire application, we need to systematically apply these color standards to all sections and components of the website.

The style guide defines:
- Primary Colors: Electric Red (#EF0000), Dark Red (#8F0000), UE Red (#BF0000), Black (#000000)
- Secondary Colors: Red Purple (#EF0078), White (#FFFFFF), Azure (#0078EF)

This to-do list outlines the tasks required to thoroughly implement these color standards across the entire website.

## Checklist

### Core UI Components
- [ ] Update Header component (`app/components/Header.tsx` and `Header.module.css`)
  - [ ] Replace existing colors with style guide colors
  - [ ] Update button color styles to match guidelines
- [ ] Update Footer component (`app/components/Footer.tsx` and `Footer.module.css`)
  - [ ] Update background colors to match brand black
  - [ ] Apply Azure color to links
- [ ] Update HeroBanner component (`app/components/HeroBanner.tsx` and `HeroBanner.module.css`)
  - [ ] Update CTA buttons to use Electric Red (#EF0000)
- [ ] Update SectionSeparator component (`app/components/SectionSeparator.tsx` and `SectionSeparator.module.css`)
  - [ ] Replace red colors with Electric Red (#EF0000)

### Feature Section Components
- [ ] Update ProductFeatures component (`app/components/ProductFeatures.tsx` and `ProductFeatures.module.css`)
  - [ ] Update accent colors with appropriate style guide colors
- [ ] Update CoreCapabilities component (`app/components/CoreCapabilities.tsx` and `CoreCapabilities.module.css`)
  - [ ] Apply appropriate brand colors to icon containers
- [ ] Update CustomerShowcase component (`app/components/CustomerShowcase.tsx` and `CustomerShowcase.module.css`)
  - [ ] Replace highlight colors with style guide colors

### Interactive Demo Components
- [ ] Update SocketZeroDemo component (`app/components/SocketZeroDemo.tsx` and `SocketZeroDemo.module.css`)
  - [ ] Update animation colors to use style guide colors
  - [ ] Replace highlight colors with Electric Red or Red Purple
- [ ] Update PipelineDemo component (`app/components/PipelineDemo.tsx` and `PipelineDemo.module.css`)
  - [ ] Replace pipeline connector colors with style guide colors
  - [ ] Update step indicators to use Electric Red and Dark Red
  - [ ] Standardize animation highlight colors
  - [ ] Check SVGs for non-standard colors
- [ ] Update DeploymentFlexibility component (`app/components/DeploymentFlexibility.tsx` and `DeploymentFlexibility.module.css`)
  - [ ] Update destination indicators using style guide colors
  - [ ] Ensure animation colors follow style guide

### Animation Components
- [ ] Update all animation components in `app/components/deployment/animations/`
  - [ ] Replace hardcoded colors with style guide colors
  - [ ] Use Electric Red for primary animations
  - [ ] Update glow effects with appropriate rgba values
- [ ] Update destination components in `app/components/deployment/destinations/`
  - [ ] Update icon and highlight colors
- [ ] Review and update utility files
  - [ ] Check `app/components/deployment/utils/MotionPathUtils.ts` for animation colors
  - [ ] Update AnimationController if it contains color references

### Global Styles
- [ ] Update global CSS variables in `app/globals.css`
  - [ ] Add style guide colors as CSS variables
  - [ ] Ensure consistent naming convention
  - [ ] Document the color system

### Documentation
- [ ] Complete color assets in documentation
  - [ ] Create/update color swatch images for all colors
  - [ ] Add them to `docs/assets/`

### Testing
- [ ] Test accessibility of all color changes
  - [ ] Verify contrast ratios for text elements
  - [ ] Check interactive elements for sufficient contrast

### Final Review
- [ ] Conduct a comprehensive review of all components
  - [ ] Ensure no hardcoded colors outside the style guide palette 