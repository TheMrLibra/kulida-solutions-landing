# Project Images Folder

Drop your custom background images into this directory (`/public/images/`).

### Configured Asset Paths:
- **Hero Section Background**: `public/images/hero-bg.jpg` (or `.png`, `.webp`)
- **CTA Cloud Parallax Background**: `public/images/cta-clouds.jpg` (or `.png`, `.webp`)

### How to Swap Background Images in Code:
Open `src/index.css` and update the `:root` background image URLs:

```css
:root {
  /* Hero Background */
  --hero-bg-url: url('/images/hero-bg.jpg');
  
  /* CTA Cloud Parallax Background */
  --cta-clouds-bg-url: url('/images/cta-clouds.jpg');
}
```
