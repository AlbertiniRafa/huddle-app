# 🏆 Huddle - Where Sports Families Connect

**The Ultimate Social Media Platform for Sports Families**

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue.svg)](https://huddleapp.uk)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org)

## 🎯 What is Huddle?

Huddle is a revolutionary social media platform designed specifically for sports families. Think Instagram meets sports community - where families can:

- 📱 **Share Activities**: Post sports activities, trips, and experiences
- 🏟️ **Find Venues**: Discover and book local sports facilities
- 👨‍👩‍👧‍👦 **Connect Families**: Meet like-minded sports families nearby
- 🛒 **Marketplace**: Buy/sell sports equipment and services
- 📅 **Book Events**: Find and join local sports events

## 📱 Progressive Web App (PWA) Features

Huddle is a **full Progressive Web App** that users can install on their phones like a native app:

### ✅ PWA Features:
- **📱 Mobile App Installation**: Add to home screen on iOS/Android
- **🎨 Beautiful App Icons**: Professional Huddle branding
- **⚡ Offline Functionality**: Works without internet connection
- **🚀 App Shortcuts**: Quick access to "Create Post" and "Find Activities"
- **📱 Standalone Mode**: Full-screen native app experience
- **🔔 Push Notifications**: Stay connected with your community

### 📱 How Users Install:
1. Visit **huddleapp.uk** on mobile
2. Browser shows "Add to Home Screen" prompt
3. Tap to install - Huddle icon appears on home screen
4. Launch as native app with full-screen experience

## 🚀 Tech Stack

### Frontend:
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icons

### Backend:
- **PostgreSQL** - Robust database
- **Prisma ORM** - Type-safe database access
- **JWT Authentication** - Secure user sessions
- **RESTful APIs** - Clean API architecture

### PWA:
- **Service Worker** - Offline functionality
- **Web App Manifest** - App installation
- **App Icons** - 192x192 and 512x512 PNG icons
- **App Shortcuts** - Quick actions

## 🏗️ Project Structure

```
huddle-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── feed/              # Main social feed
│   └── profile/           # User profiles
├── components/            # Reusable UI components
├── lib/                   # Utilities and configurations
├── prisma/               # Database schema and migrations
├── public/               # Static assets and PWA files
│   ├── manifest.json     # PWA manifest
│   ├── sw.js            # Service worker
│   ├── icon-192.png     # App icon (192x192)
│   └── icon-512.png     # App icon (512x512)
└── scripts/              # Build and utility scripts
```

## 🚀 Quick Start

### Prerequisites:
- Node.js 18+ 
- PostgreSQL database
- Git

### Installation:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AlbertiniRafa/huddle-app.git
   cd huddle-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and secrets
   ```

4. **Set up database:**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Run development server:**
   ```bash
   npm run dev
   ```

6. **Open http://localhost:3000**

## 🌐 Deployment

### Deploy to Vercel (Recommended):

1. **Push to GitHub** (this repository)
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Auto-deploys Next.js settings
3. **Add Environment Variables** in Vercel dashboard
4. **Add Custom Domain:** `huddleapp.uk`
5. **Configure DNS** in Cloudflare

### Environment Variables:
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secure-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
NODE_ENV="production"
```

## 💰 Business Model

### Revenue Streams:
- **Marketplace Commission**: 5% on equipment sales
- **Premium Subscriptions**: £9.99/month Huddle Pro
- **Promoted Posts**: £10-50 per business post
- **Event Bookings**: 3% commission on bookings
- **Venue Partnerships**: Revenue sharing with facilities

### Target Market:
- **Primary**: Sports families with children (ages 5-18)
- **Secondary**: Sports coaches and instructors
- **Tertiary**: Sports venues and equipment retailers

## 🎯 Key Features

### Social Features:
- **Instagram-style Feed**: 3-column responsive layout
- **Post Types**: Activities, Products, Trips, Facilities
- **Engagement**: Likes, comments, hashtags
- **User Connections**: Follow families and friends
- **Real-time Updates**: Live notifications

### Marketplace:
- **Equipment Sales**: Buy/sell sports gear
- **Service Bookings**: Coaching, training sessions
- **Venue Rentals**: Book courts, pitches, facilities
- **Event Tickets**: Sports camps, tournaments

### Admin Dashboard:
- **User Management**: Moderate users and content
- **Analytics**: Track engagement and revenue
- **Content Moderation**: Review posts and comments
- **Revenue Tracking**: Monitor all income streams

## 📱 PWA Installation Guide

### For Users:

**On Mobile (iOS/Android):**
1. Visit `huddleapp.uk` in Safari/Chrome
2. Look for "Add to Home Screen" prompt
3. Tap "Add" - Huddle icon appears on home screen
4. Launch from home screen for full app experience

**On Desktop:**
1. Visit `huddleapp.uk` in Chrome/Edge
2. Look for install icon in address bar
3. Click to install as desktop app
4. Pin to taskbar for easy access

## 🏆 Success Metrics

### Technical KPIs:
- PWA Lighthouse Score: 95+
- Mobile Performance: <3s load time
- App Installation Rate: 25%+ of visitors
- Offline Functionality: 100% core features

### Business KPIs:
- Monthly Active Users: 10,000+ (Year 1)
- Revenue: £300,000+ annually
- User Retention: 70%+ monthly
- Marketplace GMV: £1M+ annually

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow:
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Live Demo

**🌐 Website**: [https://huddleapp.uk](https://huddleapp.uk)
**📱 Install as App**: Visit on mobile and tap "Add to Home Screen"

## 📞 Support

- **Email**: support@huddleapp.uk
- **GitHub Issues**: [Report bugs and feature requests](https://github.com/AlbertiniRafa/huddle-app/issues)
- **Documentation**: [Full documentation](https://docs.huddleapp.uk)

---

**Built with ❤️ for sports families everywhere**

*Huddle - Where Sports Families Connect* 🏆
