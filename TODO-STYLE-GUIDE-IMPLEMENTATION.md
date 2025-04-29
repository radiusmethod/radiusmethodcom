# TODO: Implement Color Guide Across All Website Components

## Background
We've created a comprehensive style guide (located at `docs/guides/style-guide.md`) that defines our brand colors. To ensure visual consistency across the entire application, we need to systematically apply these color standards to all sections and components of the website.

The style guide defines:
- Primary Colors: Electric Red (#EF0000), Dark Red (#8F0000), UE Red (#BF0000), Black (#000000)
- Secondary Colors: Red Purple (#EF0078), White (#FFFFFF), Azure (#0078EF)

This to-do list outlines the tasks required to thoroughly implement these color standards across the entire website.

## Checklist

### Core UI Components
- [x] Update Header component (`app/components/Header.tsx` and `Header.module.css`)
  - [x] Replace existing colors with style guide colors
  - [x] Update button color styles to match guidelines
- [x] Update Footer component (`app/components/Footer.tsx` and `Footer.module.css`)
  - [x] Update background colors to match brand black
  - [x] Apply Azure color to links
- [x] Update HeroBanner component (`app/components/HeroBanner.tsx` and `HeroBanner.module.css`)
  - [x] Update CTA buttons to use Electric Red (#EF0000)
- [x] Update SectionSeparator component (`app/components/SectionSeparator.tsx` and `SectionSeparator.module.css`)
  - [x] Replace red colors with Electric Red (#EF0000)

### Feature Section Components
- [x] Update ProductFeatures component (`app/components/ProductFeatures.tsx` and `ProductFeatures.module.css`)
  - [x] Update accent colors with appropriate style guide colors
- [x] Update CoreCapabilities component (`app/components/CoreCapabilities.tsx` and `CoreCapabilities.module.css`)
  - [x] Apply appropriate brand colors to icon containers
- [x] Update CustomerShowcase component (`app/components/CustomerShowcase.tsx` and `CustomerShowcase.module.css`)
  - [x] Replace highlight colors with style guide colors

### Interactive Demo Components
- [x] Update SocketZeroDemo component (`app/components/SocketZeroDemo.tsx` and `SocketZeroDemo.module.css`)
  - [x] Update animation colors to use style guide colors
  - [x] Replace highlight colors with Electric Red or Red Purple
- [x] Update PipelineDemo component (`app/components/PipelineDemo.tsx` and `PipelineDemo.module.css`)
  - [x] Replace pipeline connector colors with style guide colors
  - [x] Update step indicators to use Electric Red and Dark Red
  - [x] Standardize animation highlight colors
  - [x] Check SVGs for non-standard colors
- [x] Update DeploymentFlexibility component (`app/components/DeploymentFlexibility.tsx` and `DeploymentFlexibility.module.css`)
  - [x] Update destination indicators using style guide colors
  - [x] Ensure animation colors follow style guide

### Animation Components
- [x] Update all animation components in `app/components/deployment/animations/`
  - [x] Replace hardcoded colors with style guide colors
  - [x] Use Electric Red for primary animations
  - [x] Update glow effects with appropriate rgba values
- [ ] Update destination components in `app/components/deployment/destinations/`
  - [ ] Update icon and highlight colors
- [ ] Review and update utility files
  - [ ] Check `app/components/deployment/utils/MotionPathUtils.ts` for animation colors
  - [ ] Update AnimationController if it contains color references

### Global Styles
- [x] Update global CSS variables in `app/globals.css`
  - [x] Add style guide colors as CSS variables
  - [x] Ensure consistent naming convention
  - [x] Document the color system

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