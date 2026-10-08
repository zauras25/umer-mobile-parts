📱 Umer Mobile Parts

A modern mobile spare-parts e-commerce platform built with Next.js, React, TypeScript, Tailwind CSS, and PostgreSQL.

Umer Mobile Parts is designed for browsing and managing mobile phone spare parts, products, categories, customer accounts, orders, retailers, replacements, warranty requests, support, and CMS-managed website content.

✨ Features
🛍️ Store
🛍️ Mobile spare-parts shop
🔎 Product and category browsing
📦 Product detail pages
🛒 Shopping cart
❤️ Wishlist
⚖️ Product comparison
🔍 Product search
👤 Customer
👤 Customer accounts
📋 Order management
🚚 Order tracking
🔄 Replacement requests and status tracking
🛡️ Warranty support
💬 Customer support
📍 Address management
🏪 Retailer
🏪 Retailer registration
🔐 Retailer login
📊 Retailer dashboard
📦 Retailer account management
📊 Admin
📊 Admin dashboard
📦 Product management
🗂️ Category management
📝 CMS page management
🖼️ Media management
🏠 Homepage management
🧭 Navigation management
❓ FAQ management
⭐ Reviews management
💬 Testimonials management
🛡️ Policies management
🔎 SEO management
🎨 Footer management
📢 Banner management
📝 CMS Pages

The admin CMS provides website page management with:

➕ Create pages
✏️ Edit pages
🗑️ Delete pages
🟢 Publish pages
📝 Save pages as drafts
🔗 Custom page slugs
📄 Page excerpts
📝 Page content
🔎 SEO titles
📋 SEO descriptions
🎨 UI
📱 Responsive design for desktop and mobile
🎨 Modern UI built with Tailwind CSS
⚡ Next.js App Router
🧩 Reusable React components
🖥️ Responsive admin dashboard
🛠️ Tech Stack
Next.js 16
React 19
TypeScript
Tailwind CSS 4
PostgreSQL
Prisma ORM
ESLint
Next.js App Router
Turbopack
📁 Project Structure
umer-mobile-parts/
├── app/                         # Application routes and pages
│   ├── admin/                   # Admin dashboard and management
│   ├── account/                 # Customer account pages
│   ├── cart/                    # Shopping cart
│   ├── checkout/                # Checkout
│   ├── retailer/                # Retailer portal
│   ├── shop/                    # Shop and product pages
│   └── ...
├── components/                  # Reusable UI components
├── data/                        # Application data
├── lib/                         # Application utilities and services
│   └── cms/                     # CMS models and repositories
├── prisma/                      # Database contract and configuration
│   ├── db.ts                    # Database connection
│   ├── schema.json              # Prisma contract
│   ├── schema.d.ts              # Generated contract types
│   └── schema.prisma            # Database schema
├── public/                      # Static assets
├── types/                       # TypeScript types
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json                # TypeScript configuration

🚀 Getting Started
Requirements

Make sure you have installed:

Node.js
npm
PostgreSQL 15 or newer
Installation

Clone the repository:

git clone https://github.com/zauras25/umer-mobile-parts.git


Go into the project:

cd umer-mobile-parts


Install dependencies:

npm install

🔐 Environment Variables

Create a .env file in the project root for local development.

Example:

DATABASE_URL="postgresql://postgres:<password>@127.0.0.1:5432/postgres"


Never commit real API keys, passwords, database credentials, or other secrets to GitHub.

Use .env.example as a reference when available.

🗄️ Database Setup

The project uses PostgreSQL with the Prisma ORM contract system.

After configuring DATABASE_URL, verify that the database matches the project contract:

npx prisma db verify --db "postgresql://postgres:<password>@127.0.0.1:5432/postgres"


If the database schema needs to be updated to match the current contract:

npx prisma db update --db "postgresql://postgres:<password>@127.0.0.1:5432/postgres"


Then verify again:

npx prisma db verify --db "postgresql://postgres:<password>@127.0.0.1:5432/postgres"


A successful verification should report:

✔ Database marker and schema match contract

📝 CMS Pages

CMS pages are managed from:

/admin/pages


The CMS page system stores content in PostgreSQL and supports:

Page title
Slug
Excerpt
Page content
Draft/published status
SEO title
SEO description
Created and updated timestamps

The CMS repository is located at:

lib/cms/repositories/page-repository.ts


Admin page actions are located at:

app/admin/pages/actions/page-actions.ts

💻 Development

Start the development server:

npm run dev


Then open:

http://localhost:3000


Admin CMS:

http://localhost:3000/admin/pages

📜 Available Scripts
Command	Description
npm run dev	Start the development server
npm run build	Create a production build
npm run start	Start the production server
npm run lint	Run ESLint
🏗️ Production Build

Create a production build:

npm run build


Start the production server:

npm run start


The current application build successfully compiles the application and generates the configured static pages.

⚠️ Development Status

The project is actively under development.

Current development includes:

🛍️ E-commerce functionality
📊 Admin management
📝 CMS page management
🗄️ PostgreSQL database integration
🔎 SEO management
🏪 Retailer functionality
👤 Customer account functionality
🔄 Replacement and warranty workflows

Some modules and integrations may continue to evolve during development.

🔒 Security

Never commit sensitive information to the repository.

Do not commit:

.env
Database passwords
API keys
Authentication secrets
Private tokens
Production credentials

For local development, keep secrets in environment variables.

👨‍💻 Author

Umer Mobile Parts

GitHub:

https://github.com/zauras25/umer-mobile-parts

⭐ If you find this project useful, consider giving the repository a star.