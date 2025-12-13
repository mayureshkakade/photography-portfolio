# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A photography portfolio website for Omkar Kalgude built with Next.js 13 (Pages Router). The unique architecture uses **Google Drive as a CMS** - photos are organized in Google Drive folders and dynamically fetched via the Google Drive API.

**Tech Stack:** Next.js 13, React 18, TypeScript, Bootstrap/Reactstrap, Google Drive API, Resend (email)

**Live Site:** https://www.omkarkalgudephotography.com/

## Development Commands

```bash
# Development
yarn dev              # Start dev server at http://localhost:3000

# Building
yarn build            # Production build
yarn start            # Start production server

# Linting
yarn lint             # Run ESLint (auto-fixes enabled)
yarn tsc --noEmit     # Type check without emitting files

# Git
git commit -m "type: message"  # Commits use conventional commits format
                                # Husky enforces: feat|fix|chore|docs|style|refactor|test|perf
```

## Code Quality Tools

**Pre-commit Hooks (Husky):**
- TypeScript type checking on all `.ts`/`.tsx` files
- ESLint auto-fix on staged files
- Enforced via `.husky/pre-commit` → `yarn lint-staged`

**Commit Message Linting:**
- Conventional Commits enforced via commitlint
- Format: `type(scope?): subject` (e.g., `feat: add lightbox`, `fix(gallery): image loading`)
- Enforced via `.husky/commit-msg`

**ESLint Rules:**
- Extends: `next/core-web-vitals`, `@typescript-eslint/recommended`, `prettier`
- Strict: `@typescript-eslint/no-explicit-any`: error, `prefer-const`: error
- Unused vars allowed with `_` prefix (e.g., `_unusedProp`)

**Prettier:**
- Single quotes, 80 char width, 2 space tabs, semicolons, ES5 trailing commas

## Architecture Overview

### Google Drive as CMS

**Core Integration:** `/src/lib/google-drive-image.ts`
- All photos/videos managed through Google Drive folders
- Folder IDs stored in `/data/metadata.json`
- No database - content comes from Google Drive API in real-time

**Key Functions:**
- `fetchGoogleDriveImages(folderId, size?)` - Fetch images with size optimization
- `fetchAllAlbumsDetails(albumIds)` - Parallel fetch for multiple albums
- `fetchFilmData(folderId)` - Fetch video metadata + thumbnails
- `fetchSingleCoverImage(folderId, size?)` - Get first image for covers

**Image URL Pattern:**
```
https://lh3.googleusercontent.com/d/{fileId}=s{size}
```
- `=s300` → 300px (thumbnails)
- `=s600` → 600px (medium)
- `=s1200` → 1200px (large)
- Empty suffix → Full resolution

### Data Flow

```
metadata.json (folder IDs)
    ↓
getStaticProps/getServerSideProps
    ↓
Google Drive API (lib/google-drive-image.ts)
    ↓
Type-mapped data (AppImageData, AlbumData, etc.)
    ↓
Component props
    ↓
Client rendering (Next.js Image + preloading)
```

### Rendering Strategies

**Static Site Generation + ISR (most pages):**
- Pages: `index`, `albums`, `films`, `about`, `contact`
- Pattern: `getStaticProps` with `revalidate: 30`
- Content regenerates every 30 seconds on request

**Server-Side Rendering (dynamic pages):**
- Page: `gallery` (individual album view)
- Pattern: `getServerSideProps` - runs on every request
- Reason: Gallery ID from query params (`?id=...&displayName=...`)

### Image Optimization Strategy

Multi-layered approach for optimal performance:

**1. Network-Level:**
- DNS prefetch + preconnect to `lh3.googleusercontent.com` and `www.googleapis.com`
- Configured in `_document.tsx`

**2. Next.js Image Config (`next.config.js`):**
```javascript
images: {
  domains: ['lh3.googleusercontent.com'],
  deviceSizes: [750, 1200, 1920],
  imageSizes: [64, 128],
  formats: ['image/webp'],
  minimumCacheTTL: 86400,  // 24-hour cache
}
```

**3. Client-Side Preloading (`lib/image-preloader.ts`):**
- `preloadImage(src)` - Promise-based CORS preloading
- `preloadImages(urls, concurrent=3)` - Batch preload with concurrency limit
- `preloadAdjacentImages(images, index)` - Preloads 2 images before/after current
- `createLazyLoadObserver(callback)` - Intersection Observer for lazy loading

**4. Component-Level:**
- Lightbox preloads next 2 images using hidden `<Image>` components
- Cover images use `priority` prop for LCP optimization
- Gallery images use `loading="lazy"`
- Blur placeholders: Base64-encoded SVG gradients

### File Naming Conventions

**IMPORTANT:** Content managed through Google Drive must follow these naming patterns:

**Gallery Images:**
- **Numbered files:** `1.jpg`, `2.jpg`, `3.jpg`, etc.
- Displayed in lightbox in numerical order
- Not used: `cover.jpg`, `mobile-cover.jpg`, files with "thumbnail" in name

**Cover Images:**
- `cover.jpg` - Desktop/tablet cover image
- `mobile-cover.jpg` - Mobile cover image

**Album Thumbnails:**
- Format: `thumbnail.{AlbumName}.jpg`
- Example: `thumbnail.Wedding.jpg` → Album display name: "Wedding"
- Album name extracted from filename between dots

**Film Thumbnails:**
- Format: `thumbnail.{VideoName}.{extension}`
- Example: `thumbnail.Pre-Wedding.jpg`

### Type System

Core types in `/src/components/types.ts`:

```typescript
GoogleDriveFile        // Raw API response
AppImageData           // Processed image data (id, url, title, sizes)
AlbumData              // Album metadata (id, displayName, thumbnail, images)
FilmItem               // Video data (id, url, lightImg, thumbnail)
```

Path alias: `@/*` → `./src/*` (e.g., `import { types } from '@/components/types'`)

## Working with Google Drive Content

### Adding New Albums

1. Create folder in Google Drive with photos
2. Add cover images: `cover.jpg`, `mobile-cover.jpg`
3. Add numbered gallery images: `1.jpg`, `2.jpg`, etc.
4. Get folder ID from URL: `drive.google.com/drive/folders/{FOLDER_ID}`
5. Add to `/data/metadata.json`:
   ```json
   "albums": [
     { "id": "YOUR_FOLDER_ID" }
   ]
   ```
6. Deploy - album appears automatically after 30-second revalidation

### Adding Films/Videos

1. Upload thumbnail to films folder: `thumbnail.VideoName.jpg`
2. Add video entry to metadata.json:
   ```json
   "filmsData": [
     {
       "id": 1,
       "url": "https://youtu.be/VIDEO_ID",
       "lightImg": "/path/to/thumbnail.jpg",
       "lightImgLazy": "/path/to/thumbnail_lazy.jpg"
     }
   ]
   ```

### Environment Variables

Required:
- `GOOGLE_API_KEY` - Google Drive API key (read-only permissions)

Optional:
- `RESEND_API_KEY` - For contact form email functionality

## Component Architecture

**Layout Components:**
- `Layout/` - Wrapper with Header + Footer (used in `_app.tsx`)
- `Header/` - Navigation bar (responsive)
- `Footer/` - Site footer

**Page Components:**
- `Home/` - Landing page sections (Carousel, Albums, FilmPlayer, Instagram, Text)
- `Gallery/` - Masonry grid + Lightbox for individual albums
- `Album/` - Album thumbnail grid (used on home + albums page)
- `Films/` - Video grid with ReactPlayer
- `ContactUs/` - Contact form with validation
- `AboutUs/` - About page content

**Utility Components:**
- `Lightbox/` - Full-screen image viewer with keyboard nav + preloading
- `Carousel/` - Responsive image carousel
- `Spinner/` - Loading indicator

**Helper Files:**
- Components with complex logic have `helper.ts` files
- Example: `Gallery/helper.ts`, `Carousel/helper.ts`

## Key Files & Locations

```
/src/lib/
  google-drive-image.ts    # Google Drive API integration
  image-preloader.ts        # Client-side preloading utilities

/src/pages/
  _app.tsx                  # App wrapper (Layout, global styles, analytics)
  _document.tsx             # HTML document (preconnect hints)
  index.tsx                 # Home page (ISR)
  gallery.tsx               # Individual album view (SSR)
  albums.tsx                # All albums grid (ISR)
  films.tsx                 # Videos page (ISR)
  about.tsx                 # About page (ISR)
  contact.tsx               # Contact form (ISR)

/data/
  metadata.json             # Google Drive folder IDs + config

/src/constants/
  index.ts                  # Static content (text, social links, etc.)
```

## Testing & Deployment

**No automated tests configured** - manual testing via:
```bash
yarn dev      # Local testing
yarn build    # Production build test
```

**CI/CD:**
- GitHub Actions: `.github/workflows/ci.yml`
- Pipeline: Install → Type check → Lint → Build
- Node 20.x, Yarn package manager
- Caches node_modules for faster builds

**Deployment:**
- Hosted on Vercel (inferred from `@vercel/analytics` dependency)
- Auto-deploys from main branch
- ISR ensures content updates within 30 seconds without rebuilds

## Common Patterns

**Fetching Data for Pages:**
```typescript
export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await fetchGoogleDriveImages(FOLDER_ID, 'large');
    return {
      props: { data },
      revalidate: 30,  // ISR - regenerate every 30s
    };
  } catch (error) {
    console.error('Error:', error);
    return { props: { data: [] } };  // Graceful degradation
  }
};
```

**Using Image Preloader:**
```typescript
import { preloadAdjacentImages } from '@/lib/image-preloader';

// In lightbox/gallery navigation
useEffect(() => {
  preloadAdjacentImages(images, currentIndex);
}, [currentIndex]);
```

**Next.js Image Usage:**
```typescript
<Image
  src={imageUrl}
  alt={title}
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isCover}  // Only for above-fold images
  loading={isCover ? undefined : "lazy"}
  placeholder="blur"
  blurDataURL={BLUR_SVG}
/>
```

## Performance Considerations

**Image Loading:**
- Prioritize above-fold images (`priority` prop)
- Lazy load below-fold content
- Preload adjacent lightbox images for smooth UX
- Use appropriate size variants (don't load full-res thumbnails)

**API Calls:**
- Batch with `Promise.all()` where possible (albums, multiple folders)
- ISR reduces API calls (30s cache)
- Error handling prevents crashes on API failures

**Bundle Size:**
- Bootstrap adds significant weight (~200KB)
- Consider lazy loading heavy components (ReactPlayer)
- Next.js automatic code splitting by page
