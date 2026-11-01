# My Portfolio

![App Preview](https://imgix.cosmicjs.com/3f603d90-88c6-11f1-af69-19b9f5212e74-autopilot-photo-1507003211169-0a1dd7228f2d-1785052047328.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, fully responsive developer portfolio built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). It showcases your projects (with screenshots, tech stacks, and live URLs), skills, work experience, and contact information — all managed from your Cosmic bucket.

## Features

- 🏠 **Homepage** with hero, availability status, featured projects, skills snapshot, career timeline preview, and contact CTA
- 🚀 **Projects index + detail pages** with rich content, tech stack badges, screenshot gallery, live demo and GitHub links
- 🛠️ **Skills page** auto-grouped by category with animated proficiency bars and years of experience
- 💼 **Work experience timeline** with company logos, locations, current-role badge, and formatted date ranges
- 📬 **Contact page** with email, phone, location, availability, resume download, and social links
- 🖼️ **Interactive screenshot gallery** with thumbnail navigation
- 🌙 **Dark, gradient-accented design** using Tailwind CSS with glassmorphism cards
- ⚡ **Server Components** for all data fetching — Cosmic keys never reach the browser
- 🧪 **Strict TypeScript** with defensive handling of every optional Cosmic metafield
- 🖼️ **imgix image optimization** at 2x resolution for crisp retina rendering
- ♿ **Accessible** semantic markup, focus states, and ARIA labels

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6ae6e7a85b93710bce4e18a3&clone_repository=6a65bd6c9c05ffa1ada03175)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a developer portfolio with projects (including screenshots, tech stack, and live URLs), skills, and work experience.
>
> User instructions: A developer portfolio with projects, skills, work experience, and contact info"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Portfolio". The content is managed in Cosmic CMS with the following object types: skills, projects, work-experience, profile. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A developer portfolio with projects, skills, work experience, and contact info

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **[Next.js 16](https://nextjs.org)** — App Router, Server Components, streaming
- **[React 19](https://react.dev)**
- **[TypeScript](https://www.typescriptlang.org)** — strict mode with `noUncheckedIndexedAccess`
- **[Tailwind CSS](https://tailwindcss.com)** + `@tailwindcss/typography`
- **[Cosmic](https://www.cosmicjs.com)** via `@cosmicjs/sdk` — see the [Cosmic docs](https://www.cosmicjs.com/docs)
- **imgix** for on-the-fly image optimization
- **Bun** for package management and scripts

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.0+ (or Node.js 20+)
- A Cosmic account with a bucket containing `profile`, `projects`, `skills`, and `work-experience` object types

### Installation

```bash
# 1. Install dependencies
bun install

# 2. Add your Cosmic credentials to .env.local
#    COSMIC_BUCKET_SLUG=your-bucket-slug
#    COSMIC_READ_KEY=your-read-key
#    COSMIC_WRITE_KEY=your-write-key

# 3. Start the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Type-check then create a production build |
| `bun run start` | Serve the production build |
| `bun run type-check` | Run TypeScript validation only |

## Cosmic SDK Examples

### Fetching projects with connected data

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Manual sorting (newest completion date first)
const projects = response.objects.sort((a, b) => {
  const dateA = new Date(a.metadata?.completion_date || '').getTime()
  const dateB = new Date(b.metadata?.completion_date || '').getTime()
  return dateB - dateA
})
```

### Fetching a single project by slug

```typescript
try {
  const response = await cosmic.objects
    .findOne({ type: 'projects', slug })
    .depth(1)
  return response.object
} catch (error) {
  // Cosmic returns 404 (not an empty array) when nothing matches
  if (hasStatus(error) && error.status === 404) return null
  throw error
}
```

### Fetching the singleton profile

```typescript
const response = await cosmic.objects.findOne({ type: 'profile' }).depth(1)
const profile = response.object
```

### Safely rendering metafield values

```typescript
import { getMetafieldValue } from '@/lib/cosmic'

// Handles strings, numbers, booleans, and legacy { key, value } objects
<h1>{getMetafieldValue(profile.metadata?.full_name)}</h1>
```

## Cosmic CMS Integration

This app reads from four object types:

### 👤 profile
`full_name`, `headline`, `bio`, `avatar`, `email`, `phone`, `location`, `available_for_work`, `social_links`, `resume` — powers the hero, contact page, and footer.

### 🚀 projects
`description`, `content`, `featured_image`, `screenshots`, `tech_stack`, `live_url`, `github_url`, `completion_date`, `featured` — powers the projects grid and detail pages. Projects with `featured` enabled surface on the homepage.

### 🛠️ skills
`name`, `category`, `proficiency`, `years_experience`, `icon` — grouped automatically by `category` on the skills page.

### 💼 work-experience
`job_title`, `company_name`, `company_logo`, `location`, `start_date`, `current_role`, `end_date`, `description` — rendered as a reverse-chronological timeline.

All queries use `.depth(1)` so connected objects and file metafields resolve in a single request. Every metafield is treated as optional and rendered defensively, so incomplete content never breaks the build.

## Deployment Options

### Vercel (recommended)

1. Push this repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add the environment variables `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY`
4. Deploy 🎉

### Netlify

1. Connect your repository at [app.netlify.com](https://app.netlify.com)
2. Build command: `bun run build` — Publish directory: `.next`
3. Add the same three environment variables under **Site settings → Environment variables**
4. Deploy

### Environment Variables

| Variable | Description |
| --- | --- |
| `COSMIC_BUCKET_SLUG` | Your Cosmic bucket slug |
| `COSMIC_READ_KEY` | Read key for fetching content |
| `COSMIC_WRITE_KEY` | Write key (reserved for future write operations) |

Find these in your Cosmic dashboard under **Bucket Settings → API Access**.
<!-- README_END -->