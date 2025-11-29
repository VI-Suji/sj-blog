# 📚 Comic Book Style Blog

A unique, visually striking blog built with Next.js, featuring a bold comic book aesthetic with the Bangers font and dynamic content management.

![Blog Preview](./public/latest1.png)

## ✨ Features

### 🔗 **Shareable URLs**
- **Homepage**: `http://localhost:3000/`
- **Blog**: `http://localhost:3000/blog`
- **Topics**: `http://localhost:3000/topics`
- **About**: `http://localhost:3000/about`
- **Individual Posts**: `http://localhost:3000/post/your-post-slug`
- **Category Filter**: `http://localhost:3000/blog?category=Technology`

Each page has its own clean, shareable URL!

### 🎨 **Comic Book Aesthetic**
- Bold borders and shadows
- Bangers font for headers
- Vibrant color scheme
- Interactive hover effects
- Manga/comic-inspired design elements

### 📝 **Content Management**
- **Sanity CMS**: Manage all blog content with Sanity Studio (Coming Soon)
- **Real-time Updates**: Content syncs automatically
- **Rich Text Support**: Bold, italic, links, code blocks, lists, quotes
- **Category System**: Organize posts by Technology, Photography, Travel, etc.
- **Tag System**: Multiple tags per post for better organization

### 🔍 **Search & Discovery**
- **Real-time Search**: Instant results as you type
- **Multi-field Search**: Searches titles, descriptions, tags, and categories
- **Category Filtering**: Browse posts by category
- **Tag Filtering**: Filter by specific tags
- **Clickable Results**: Direct navigation to posts from search

### 🛠️ **Admin Panel (New)**
- **Custom Dashboard**: Manage posts at `/admin`
- **Markdown Editor**: Simplified writing experience
- **Post Management**: Create, edit, and publish posts

### 📝 **Content Management**
- **Sanity CMS**: Manage all blog content with Sanity Studio (`/studio`)
- **Real-time Updates**: Content syncs automatically
- **Rich Text Support**: Bold, italic, links, code blocks, lists, quotes
- **Category System**: Organize posts by Technology, Photography, Travel, etc.
- **Tag System**: Multiple tags per post for better organization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A Sanity account (to be set up)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd blog-updated
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Sanity CMS**
   - Follow Sanity setup instructions (Coming Soon)
   - Configure your Sanity project
   - Get your Sanity project ID and dataset

4. **Configure environment variables**
Create a `.env.local` file:
```env
# Sanity configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=gisuef4d
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-29

# Required for Custom Admin Panel (/admin)
NEXT_PUBLIC_SANITY_API_TOKEN=your_write_token
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Sanity Schema Setup (Coming Soon)

The blog will use the following content structure:

### Blog Post Schema

| Field Name | Type | Description |
|------------|------|-------------|
| title | String | Post title |
| slug | Slug | URL-friendly identifier |
| publishedAt | DateTime | Publication date |
| description | Text | Short summary/excerpt |
| tags | Array | Post tags (TECH, THOUGHTS, BOOKS, PICTURES) |
| category | String | Post category |
| published | Boolean | Publish status |
| coverImage | Image | Cover image |
| content | Block Content | Rich text content |

### Category Options
- Technology
- Photography
- Random Thoughts
- Travel
- Books
- Lifestyle

### Tag Options
- TECH
- THOUGHTS
- BOOKS
- PICTURES

## 📝 Creating Blog Posts (Coming Soon)

Once Sanity is integrated:

1. **Access Sanity Studio** at `/studio`
2. **Create a new post** with all required fields
3. **Write your content** using the rich text editor
4. **Publish** - the post will appear automatically!

## 🎯 Project Structure

```
blog-updated/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Homepage
│   ├── blog/
│   │   └── page.tsx              # Blog listing
│   ├── post/
│   │   └── [slug]/page.tsx       # Individual post
│   ├── topics/
│   │   └── page.tsx              # Topics/search page
│   └── about/
│       └── page.tsx              # About page
├── components/
│   ├── About.tsx                 # About page
│   ├── Blog.tsx                  # Blog listing with filters
│   ├── BlogPost.tsx              # Individual post view
│   ├── Footer.tsx                # Footer component
│   ├── Hero.tsx                  # Homepage hero
│   ├── Latestscrolls.tsx         # Latest posts section
│   ├── Navbar.tsx                # Navigation bar
│   └── Topics.tsx                # Search & categories
├── lib/
│   └── types.ts                  # TypeScript types
├── public/                       # Static assets
├── .env.local                    # Environment variables
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity (To be integrated)
- **Fonts**: Google Fonts (Bangers)
- **Markdown**: Custom renderer with inline formatting

## 🎨 Customization

### Colors
Edit Tailwind classes in components to change colors:
- Primary: `bg-yellow-300`, `bg-blue-50`, etc.
- Borders: `border-black`
- Shadows: `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`

### Fonts
Change the font in components:
```typescript
import { YourFont } from "next/font/google";
const yourFont = YourFont({ subsets: ["latin"], weight: "400" });
```

### Layout
- **Posts per page**: Edit `postsPerPage` in `Blog.tsx`
- **Grid columns**: Change `md:grid-cols-3` to your preference

## 📈 Performance

- **Optimized Images**: Using Next.js Image component
- **Client-side Rendering**: For interactive components
- **Efficient Filtering**: Minimal re-renders
- **Loading States**: Skeleton loaders for better UX

## 🔄 Migration Status

✅ **Completed:**
- Removed Notion backend dependencies
- Cleaned up API routes
- Updated component imports
- Removed environment variable dependencies

🚧 **To Do:**
- Set up Sanity CMS
- Create Sanity schemas
- Implement Sanity data fetching
- Set up Sanity Studio
- Configure image handling with Sanity

## 📄 License

MIT License - feel free to use this project for your own blog!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📧 Contact

For questions or support, reach out to [your-email@example.com]

---

**Built with ❤️ using Next.js**
