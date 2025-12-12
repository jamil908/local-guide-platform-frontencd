🗺️ LocalGuide Platform - Frontend
Modern, responsive web application for connecting travelers with local guides.
🔗 Live Demo
Website: https://your-app.vercel.app
🛠️ Technology Stack

Framework: Next.js 14 (App Router)
Language: TypeScript
Styling: Tailwind CSS
State Management: React Context API
HTTP Client: Axios
Icons: React Icons (Feather Icons)
Notifications: React Hot Toast
Date Formatting: date-fns
JWT Decoding: jwt-decode

✨ Features
For Tourists

🔍 Browse and search tours
📅 Book tours with guides
💳 Secure payment (SSLCommerz)
⭐ Write reviews and ratings
📊 Booking dashboard
👤 Profile management

For Guides

📝 Create and manage tour listings
🖼️ Upload tour images (Cloudinary)
📋 Manage bookings
✅ Accept/reject booking requests
💰 Track earnings
👤 Profile with expertise showcase

For Admins

👥 User management
🗂️ Listing moderation
📊 Booking oversight
🗑️ Delete users/listings
📈 Platform statistics

📁 Project Structure
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── tourist/page.tsx
│   │   ├── guide/
│   │   │   ├── page.tsx
│   │   │   ├── create-listing/page.tsx
│   │   │   └── edit/[id]/page.tsx
│   │   └── admin/page.tsx
│   ├── explore/page.tsx
│   ├── tours/[id]/page.tsx
│   ├── profile/[id]/
│   │   ├── page.tsx
│   │   └── edit/page.tsx
│   ├── payment/
│   │   ├── success/page.tsx
│   │   └── failed/page.tsx
│   ├── layout.tsx
│   ├── page.tsx              # Home page
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── SingleImageUpload.tsx
│   │   ├── ReviewModal.tsx
│   │   └── PaymentButton.tsx
│   └── shared/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── Loading.tsx
├── contexts/
│   └── AuthContext.tsx       # Authentication state
├── lib/
│   ├── api.ts                # Axios instance
│   ├── auth.ts               # Auth utilities
│   └── utils.ts              # Helper functions
├── types/
│   └── index.ts              # TypeScript types
├── public/
├── .env.local.example
└── README.md
🚀 Getting Started
Prerequisites

Node.js (v18 or higher)
npm or yarn

Installation

Clone the repository

bashgit clone https://github.com/yourusername/localguide-frontend.git
cd localguide-frontend

Install dependencies

bashnpm install

Environment Setup

Create .env.local file:
envNEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=LocalGuide Platform

Start Development Server

bashnpm run dev
Application will start at http://localhost:3000
📄 Pages Overview
Public Pages

/ - Home page (7 sections: Hero, How It Works, Categories, Destinations, Why Choose Us, Testimonials, CTA)
/explore - Browse all tours with search and filters
/tours/[id] - Tour details with booking
/auth/login - User login
/auth/register - User registration

Protected Pages (Tourist)

/dashboard/tourist - My bookings dashboard
/profile/[id] - User profile view
/profile/[id]/edit - Edit profile
/payment/success - Payment confirmation
/payment/failed - Payment failure

Protected Pages (Guide)

/dashboard/guide - Guide dashboard
/dashboard/guide/create-listing - Create new tour
/dashboard/guide/edit/[id] - Edit tour

Protected Pages (Admin)

/dashboard/admin - Admin panel

🎨 Design System
Color Palette

Primary: Blue (#2563eb)
Secondary: Purple (#7c3aed)
Success: Green (#10b981)
Warning: Yellow (#f59e0b)
Danger: Red (#ef4444)

Typography

Font Family: Inter (Google Fonts)
Headings: Bold, 2xl-6xl
Body: Regular, base

Components
All components use Tailwind CSS utility classes for consistent styling.
🔐 Authentication Flow

User registers/logs in
JWT token stored in localStorage
Token sent with API requests via Axios interceptors
Protected routes check authentication
Auto-redirect if not authenticated

📱 Responsive Design

Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px

All pages are fully responsive with mobile-first approach.
🧪 Testing
Manual Testing Checklist
Authentication:

 Register as Tourist
 Register as Guide
 Login with valid credentials
 Login with invalid credentials
 Logout

Tourist Flow:

 Browse tours
 Search and filter
 View tour details
 Book a tour
 Complete payment
 Write review
 Edit review
 Delete review

Guide Flow:

 Create tour listing
 Upload images
 Edit tour
 Delete tour
 View bookings
 Accept booking
 Reject booking

Admin Flow:

 View all users
 Delete user
 View all listings
 Delete listing
 View all bookings

🚀 Deployment
Vercel Deployment (Recommended)

Install Vercel CLI

bashnpm install -g vercel

Login and Deploy

bashvercel login
vercel

Set Environment Variables
Go to Vercel Dashboard → Project → Settings → Environment Variables:

NEXT_PUBLIC_API_URL = https://your-backend-api.railway.app/api

Deploy to Production

bashvercel --prod
Manual Deployment

Build the application:

bashnpm run build

Start production server:

bashnpm start
📝 Scripts
bashnpm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
🎯 Key Features Implementation
Search & Filter

Real-time search by city
Filter by category
Price range filtering
Results update instantly

Image Upload

Drag & drop support
Multiple image upload
Preview before upload
Cloudinary integration

Payment Integration

SSLCommerz gateway
Secure payment flow
Success/failure handling
Transaction tracking

Review System

Star rating (1-5)
Written reviews
Edit own reviews
Delete own reviews

🐛 Common Issues
Issue: API connection failed

Check NEXT_PUBLIC_API_URL in .env.local
Ensure backend is running

Issue: Images not uploading

Check Cloudinary credentials in backend
Verify file size < 5MB

Issue: Authentication not persisting

Check localStorage in browser
Clear localStorage and re-login

🔄 Development Workflow

Create new branch for features
Make changes
Test locally
Push to GitHub
Vercel auto-deploys preview
Merge to main for production

📧 Contact
Developer: Your Name
Email: your.email@example.com
GitHub: github.com/yourusername
📄 License
MIT License - created for Programming Hero Assignment

Happy Coding! 🚀