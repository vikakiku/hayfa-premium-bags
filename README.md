# Hayfa - Premium Bags E-commerce Platform
**Group 5 - PSO Finals Project**

A modern e-commerce platform for premium bags featuring product management, shopping cart functionality, and admin dashboard capabilities.

## Technology Stack

- **Next.js 16** - React framework with TypeScript
- **TailwindCSS** - For styling and responsive design
- **PostgreSQL** - Primary database with pg driver
- **PHP Alternative** - Alternative backend with MySQL support
- **Docker** - Containerization with multi-stage builds
- **ESLint** - Code quality and linting

## Getting Started

### Prerequisites

- **Node.js 20+**
- **PostgreSQL 12+** or **MySQL 8+** (for PHP backend)
- **Docker** (optional)
- **Git**

### 1. Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hayfa-group-5-pso-finals
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   
   Copy `.env.example` to `.env.local` and configure:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/hayfa_db"
   NODE_ENV="development"
   NEXT_TELEMETRY_DISABLED=1
   ```

### 2. Database Setup

#### PostgreSQL (Recommended)
```sql
-- Create database
CREATE DATABASE hayfa_db;

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image_filename VARCHAR(255),
    stock INTEGER DEFAULT 0,
    description TEXT,
    category_id INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Import data from CSV files in db/ folder
```

#### MySQL (for PHP backend)
```sql
-- Create database
CREATE DATABASE hayfa_db;

-- Configure db.php with your MySQL credentials
-- Import data from CSV files
```

### 3. Running the Application

#### Development Mode (Next.js)
```bash
npm run dev
```
Access the application at: `http://localhost:3000`

#### Production Mode
```bash
npm run build
npm start
```

### 4. Docker Deployment

#### Option A: Using PowerShell Script (Windows)
```powershell
# Build Docker image (reads DATABASE_URL from .env.local)
.\docker-build.ps1

# Run container
docker run -p 3000:3000 -e DATABASE_URL="your-database-url" hayfa-app
```

#### Option B: Manual Docker Commands
```bash
# Build with database URL argument
docker build --build-arg DATABASE_URL="postgresql://username:password@localhost:5432/hayfa_db" -t hayfa-app .

# Run container
docker run -p 3000:3000 -e DATABASE_URL="postgresql://username:password@localhost:5432/hayfa_db" hayfa-app
```

### 5. PHP Alternative Backend

If you prefer to use the PHP backend:

1. **Setup web server** (Apache/Nginx + PHP + MySQL)
2. **Configure database connection** in `db.php`
3. **Run PHP development server**:
   ```bash
   php -S localhost:8000
   ```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Run Docker container |

## Features

### Customer Features
- Browse premium bag collections
- Detailed product information with images
- Shopping cart with quantity management
- Responsive design for all devices

### Admin Features
- Product management (CRUD operations)
- Inventory management
- Image upload capabilities
- Sales dashboard

### Technical Features
- Server-side rendering (SSR)
- RESTful API endpoints
- File upload functionality
- Type-safe TypeScript implementation
- Docker containerization
- Database connection pooling

## Environment Variables

| Variable | Description | Required |
|----------|------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment mode | No |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | No |

## Database Schema

### Products Table
```sql
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price INTEGER NOT NULL,
image_filename VARCHAR(255),
stock INTEGER DEFAULT 0,
description TEXT,
category_id INTEGER,
is_active BOOLEAN DEFAULT true,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### Data Import
Product data is available in CSV format in the `db/` folder:
- `products.csv` - Complete product data
- `categories.csv` - Product categories
- `cart_items.csv` - Cart items data

## Deployment

### Production Docker
```bash
# Build production image
docker build -t hayfa-app:latest .

# Run with production environment
docker run -p 3000:3000 \
  -e DATABASE_URL="your-production-database-url" \
  -e NODE_ENV="production" \
  hayfa-app:latest
```

### Cloud Platforms
- **Vercel**: Connect GitHub repo and set environment variables
- **Railway**: Deploy with DATABASE_URL configuration
- **DigitalOcean**: Use App Platform with Node.js environment
- **Heroku**: Deploy with PostgreSQL add-on

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for educational purposes - PSO Finals Project.

---
**© 2024 Hayfa - Group 5 PSO Finals**