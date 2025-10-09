# Bitcoin24 SPA

A modern, interactive Single Page Application for simulating 21-year Bitcoin investment strategies.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. **Install Node.js**
   
   Download and install from [nodejs.org](https://nodejs.org/)

2. **Install Dependencies**
   
   ```bash
   cd bitcoin24-spa
   npm install
   ```

3. **Run Development Server**
   
   ```bash
   npm run dev
   ```

4. **Open Browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
bitcoin24-spa/
├── src/
│   ├── app/              # Next.js App Router
│   │   └── [locale]/     # Internationalized routes
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── charts/      # Chart components
│   │   ├── forms/       # Form components
│   │   ├── layout/      # Layout components
│   │   └── shared/      # Shared components
│   ├── lib/             # Libraries and utilities
│   │   ├── calculations/# Calculation engines
│   │   ├── store/       # State management
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Utility functions
│   │   └── constants/   # Constants
│   ├── types/           # TypeScript type definitions
│   ├── i18n/            # Internationalization
│   │   └── locales/     # Translation files
│   └── styles/          # Global styles
├── public/              # Static assets
└── tests/               # Test files
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run test         # Run Jest tests
npm run test:e2e     # Run Playwright E2E tests
npm run format       # Format code with Prettier
```

## 🌍 Supported Languages

- 繁體中文 (zh-TW)
- 简体中文 (zh-CN)
- English (en)
- 日本語 (ja)

## 🎨 Features

- ✅ 8 Interactive Pages (Intro, BTC, Macro, Individual, Corporate, Institution, Nation State, US)
- ✅ 5 Investment Strategies (Normie, BTC 10%, BTC Maxi, Double Maxi, Triple Maxi)
- ✅ Real-time Calculations
- ✅ Interactive Charts
- ✅ Multi-language Support
- ✅ Responsive Design
- ✅ Data Export (CSV, JSON)
- ✅ Dark Mode Support

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Deploy automatically

### Manual Deployment

```bash
npm run build
# Upload the .next folder to your server
```

## 📚 Documentation

See [DEVELOPMENT_PLAN.md](../DEVELOPMENT_PLAN.md) for detailed development documentation.

## 🤝 Contributing

Contributions are welcome! Please follow the development guidelines in the documentation.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Michael J. Saylor
- Shirish Jajodia
- Chaitanya Jain (CJ)

---

**Built with Next.js 14, TypeScript, and ❤️**

