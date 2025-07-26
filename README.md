# TechDaily - Tech News Portal

A modern tech news portal built with React and Express.js, featuring API-based article management and PostgreSQL storage.

## Features

- **Frontend**: React with Vite for fast development
- **Backend**: Express.js API server
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: API key-based for article creation
- **Responsive Design**: Mobile-first responsive layout
- **Real-time Updates**: React Query for efficient data fetching

## Project Structure

```
/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and API client
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express.js backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Database operations
│   └── db.ts              # Database connection
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- PostgreSQL database
- API key for article creation

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your database credentials and API key
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `API_KEY`: Secret key for API authentication

3. Set up the database:
```bash
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## API Endpoints

### Get All Articles
```http
GET /api/news
```

Optional query parameters:
- `category`: Filter by category (AI, Hardware, Startups, Security, Software, Green Tech)

### Get Article by Slug
```http
GET /api/news/:slug
```

### Create New Article
```http
POST /api/news
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "title": "Article Title",
  "slug": "article-slug",
  "content": "<p>Article content in HTML format</p>",
  "cover_image": "https://example.com/image.jpg",
  "category": "AI",
  "source": "Source Name",
  "published_at": "2025-01-26T10:00:00Z"
}
```

## Using the API

### Adding Articles with cURL

```bash
curl -X POST http://localhost:5000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "title": "Example Tech News Article",
    "slug": "example-tech-news",
    "content": "<p>This is an example article about <strong>technology</strong>.</p>",
    "cover_image": "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    "category": "AI",
    "source": "Tech News Daily",
    "published_at": "2025-01-26T10:00:00Z"
  }'
```

### Categories

Available categories:
- **AI**: Artificial Intelligence and Machine Learning
- **Hardware**: Physical technology and devices
- **Startups**: Startup news and funding
- **Security**: Cybersecurity and privacy
- **Software**: Software development and tools
- **Green Tech**: Environmental and sustainable technology

## Features

### Frontend Features
- **Responsive Design**: Works on all device sizes
- **Category Filtering**: Browse articles by category
- **Featured Articles**: Hero section with latest news
- **Search**: Search functionality (placeholder for future implementation)
- **Admin Dashboard**: View article statistics and management
- **Article Detail Pages**: Full article view with sharing capabilities

### Backend Features
- **RESTful API**: Clean API endpoints for article management
- **Authentication**: Secure API key-based authentication
- **Data Validation**: Comprehensive input validation with Zod
- **Error Handling**: Proper error responses and logging
- **Database Integration**: PostgreSQL with Drizzle ORM

## Development

### Database Commands

```bash
# Push schema changes to database
npm run db:push

# Generate database types
npm run db:generate
```

### Available Scripts

```bash
# Start development server (frontend + backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

The application is ready for deployment on platforms like:
- **Replit**: Already configured with `.replit` file
- **Vercel**: Frontend deployment
- **Railway/Render**: Full-stack deployment
- **Docker**: Container deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own tech news portal!

