# TechDaily - Tech News Portal

## Overview

TechDaily is a modern tech news portal built with a full-stack architecture using React for the frontend and Express.js for the backend. The application provides a clean, responsive interface for reading technology news articles with API-based content management. The system is designed as a read-only portal for users, with administrative access limited to API-based article creation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Radix UI primitives for accessible, customizable components

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: API key-based authentication for article creation
- **Development**: Hot module replacement with Vite integration

### Database Design
The application uses a simple schema centered around news articles:
- **News Table**: Contains article data (id, title, slug, content, cover_image, category, source, published_at, timestamps)
- **Users Table**: Basic user structure (maintained for potential future features)

## Key Components

### Frontend Components
1. **Page Components**:
   - Home page with featured articles and category filtering
   - Individual news article detail pages
   - Admin dashboard for read-only content overview
   - 404 error handling

2. **UI Components**:
   - NewsList: Grid display of article cards with pagination
   - NewsItem: Individual article preview cards
   - NewsDetail: Full article view with sharing capabilities
   - CategoryFilter: Interactive category selection
   - HeroSection: Featured article showcase
   - AdminDashboard: Analytics and article management overview

3. **Layout Components**:
   - Header with navigation and search functionality
   - Footer with links and branding
   - Responsive design patterns

### Backend Components
1. **API Routes**:
   - `GET /api/news` - Fetch all articles (with optional category filtering)
   - `GET /api/news/:slug` - Fetch specific article by slug
   - `POST /api/news` - Create new article (requires API key authentication)

2. **Data Layer**:
   - Database connection management with connection pooling
   - Type-safe schema definitions
   - CRUD operations for news articles

## Data Flow

1. **Article Creation**: External systems POST article data to the API using Bearer token authentication
2. **Content Retrieval**: Frontend fetches articles through React Query, which handles caching and background updates
3. **Category Filtering**: URL-based category parameters trigger filtered API requests
4. **Article Display**: Responsive cards show article previews, with detailed views accessible via slug-based routing
5. **Admin Overview**: Dashboard aggregates article statistics and displays management information

## External Dependencies

### Frontend Dependencies
- React ecosystem: React, React DOM, React Query for state management
- UI Framework: Radix UI components, Tailwind CSS for styling
- Routing: Wouter for lightweight routing
- Form handling: React Hook Form with Zod validation
- Date handling: date-fns for formatting
- Icons: Lucide React icon library

### Backend Dependencies
- Express.js: Web framework and middleware
- Database: Neon PostgreSQL with connection pooling
- ORM: Drizzle with PostgreSQL adapter
- Validation: Zod for schema validation
- Development: tsx for TypeScript execution

### Development Tools
- Vite: Build tool and development server
- TypeScript: Type safety across the stack
- ESBuild: Production bundling
- Tailwind CSS: Utility-first styling

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to static assets in `dist/public`
2. **Backend Build**: ESBuild bundles Node.js server to `dist/index.js`
3. **Database Setup**: Drizzle handles schema migrations and database provisioning

### Environment Configuration
- Development: Concurrent frontend/backend servers with HMR
- Production: Unified Express server serving both API and static assets
- Database: Environment-based connection strings with automatic provisioning

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (configured for Neon serverless)
- Environment variables for database URL and API keys
- Static file serving capability

The architecture prioritizes simplicity, type safety, and performance while maintaining clear separation between content management (API-only) and content consumption (user-facing interface). The system is designed to scale efficiently with caching strategies and optimized database queries.