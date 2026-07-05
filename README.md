# 👜 Hayfa Premium Bags

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)
![Microsoft Azure](https://img.shields.io/badge/Microsoft%20Azure-0078D4?logo=microsoftazure&logoColor=white)

Hayfa Premium Bags is a full-stack e-commerce web application developed as part of a Software Project Organization course. The project demonstrates the implementation of modern web development practices by integrating frontend development, backend services, relational databases, containerization, and deployment automation into a single application.

---

# 📖 Project Overview

Through the Hayfa app, customers are able to browse premium leather bags, while on the  administrator's side, they can handle with product management capabilities. It was designed to demonstrate the complete software development workflow—from database integration and RESTful API implementation to Docker-based deployment and CI/CD automation.

---

# ✨ Features

## Customer Features

- Browse available products
- View detailed product information
- Explore products by category
- Responsive user interface

## Product Management

- Create new products
- Update product information
- Delete products
- Upload product images
- Manage inventory data

## Technical Features

- RESTful API implementation
- PostgreSQL database integration
- Docker containerization
- CI/CD workflow using GitHub Actions
- Cloud deployment preparation for Microsoft Azure

---

# Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | RESTful APIs, Node.js |
| Database | PostgreSQL |
| DevOps | Docker, GitHub Actions, Microsoft Azure |
| Development Tools | Git, Visual Studio Code, DBeaver |

---

# Application Architecture

```text
                Browser
                    │
                    ▼
          Next.js Web Application
                    │
              RESTful APIs
                    │
              PostgreSQL
                    │
          Docker Container
                    │
     GitHub Actions CI/CD Pipeline
                    │
         Microsoft Azure Deployment
```

---

# ⚙ CI/CD Workflow

This project includes an automated CI/CD workflow using GitHub Actions.

The workflow performs:

- Source code validation
- Application build
- Docker image creation
- Deployment preparation

Docker is used to provide a consistent runtime environment across development and deployment.

---

# Project Structure

```text
.
├── .github/
│   └── workflows/
├── db/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── uploads/
├── Dockerfile
├── package.json
└── README.md
```

---

# The step-by-step

## Prerequisites

- Node.js 20+
- PostgreSQL
- Git

## Installation

Clone the repository.

```bash
git clone https://github.com/vikakiku/hayfa-premium-bags.git
```

Move into the project directory.

```bash
cd hayfa-premium-bags
```

Install dependencies.

```bash
npm install
```

Configure the environment variables.

```env
DATABASE_URL=your_postgresql_connection_string
```

Start the development server.

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

# Docker

Build the Docker image.

```bash
docker build -t hayfa-app .
```

Run the container.

```bash
docker run -p 3000:3000 \
-e DATABASE_URL=your_database_url \
hayfa-app
```

---

# Repository Highlights

This repository demonstrates practical experience with:

- Full-stack web application development
- RESTful API development
- Relational database integration
- Docker containerization
- CI/CD automation using GitHub Actions
- Git-based collaborative development workflow

---

# Author
**Devika Rahman**

GitHub: https://github.com/vikakiku