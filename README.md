# 📚 Comic Book Style Blog

A unique, visually striking blog built with Next.js and Notion as a CMS, featuring a bold comic book aesthetic with the Bangers font and dynamic content management.

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
- **Notion as CMS**: Manage all blog content directly in Notion
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

### 📱 **User Experience**
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Loading Skeletons**: Smooth loading experience
- **Pagination**: Easy navigation through posts
- **Active Filter Indicators**: Clear visual feedback
- **Smooth Scrolling**: Polished page transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A Notion account
- Notion API key

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

3. **Set up Notion**
   - Create a Notion database
   - Add the required fields (see Database Setup below)
   - Get your Notion API key and Database ID

4. **Configure environment variables**
Create a `.env.local` file:
```env
NOTION_SECRET=your_notion_api_key
NOTION_DATABASE_ID=your_database_id
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Notion Database Setup

### Required Fields

| Field Name | Type | Description |
|------------|------|-------------|
| Name | Title | Post title |
| Slug | Text | URL-friendly identifier (e.g., `my-first-post`) |
| Date | Date | Publication date |
| Description | Rich Text | Short summary/excerpt |
| Tags | Multi-select | Post tags (TECH, THOUGHTS, BOOKS, PICTURES) |
| Category | Select | Post category |
| Published | Checkbox | Publish status |
| Cover | File/URL | Cover image (optional) |

### Category Options
Add these options to your Category field:
- Technology
- Photography
- Random Thoughts
- Travel
- Books
- Lifestyle

### Tag Options
Add these options to your Tags field:
- TECH
- THOUGHTS
- BOOKS
- PICTURES

## 📝 Creating Blog Posts

1. **In Notion**, create a new page in your database
2. **Fill in the properties**:
   - Name: Your post title
   - Slug: URL-friendly version (e.g., `amazing-photography-tips`)
   - Date: Publication date
   - Description: Brief summary
   - Tags: Select relevant tags
   - Category: Choose a category
   - Published: ✅ Check this box
   - Cover: Add a cover image (optional)

3. **Write your content** inside the Notion page using:
   - Headers: `# H1`, `## H2`, `### H3`
   - **Bold**: `**text**`
   - *Italic*: `*text*`
   - Links: `[text](url)`
   - Code blocks: ` ```language `
   - Lists: `- item` or `1. item`
   - Quotes: `> quote text`

4. **Refresh your blog** - the post will appear automatically!

## 🎯 Project Structure

```
blog-updated/
├── app/
│   ├── api/
│   │   └── posts/
│   │       ├── route.ts          # Fetch all posts
│   │       └── [slug]/route.ts   # Fetch single post
│   ├── layout.tsx
│   └── page.tsx                  # Main app component
├── components/
│   ├── About.tsx                 # About page
│   ├── Blog.tsx                  # Blog listing with filters
│   ├── BlogPost.tsx              # Individual post view
│   ├── Footer.tsx                # Footer component
│   ├── Hero.tsx                  # Homepage hero
│   ├── Latestscrolls.tsx         # Latest posts section
│   ├── Navbar.tsx                # Navigation bar
│   ├── Topics.tsx                # Search & categories
│   └── SEO.tsx                   # SEO meta tags
├── lib/
│   └── notion.ts                 # Notion API integration
├── public/                       # Static assets
├── .env.local                    # Environment variables
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Notion API
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

## 🔒 Security

- API keys stored in environment variables
- Server-side API routes protect secrets
- No sensitive data exposed to client

## 🐛 Troubleshooting

### Posts showing same content
- Ensure each post has a unique **Slug** value in Notion
- Check that content is added inside the Notion page (not just properties)

### Posts not appearing
- Verify **Published** checkbox is checked
- Check `.env.local` has correct credentials
- Ensure Notion integration has access to the database

### Search not working
- Clear browser cache
- Check console for errors
- Verify posts have content in searchable fields

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

**Built with ❤️ using Next.js and Notion**
