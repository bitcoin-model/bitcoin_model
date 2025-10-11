# Bitcoin24 - 21-Year Bitcoin Investment Strategy Simulator

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://ab37038c.bitcoin-model.pages.dev/zh-TW)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

> **Helping you drive Bitcoin adoption with 21-year macro forecasts and micro models.**

Bitcoin24 is a modern web application that transforms the original Excel model into an interactive Next.js SPA. It simulates various Bitcoin investment strategies over 21 years for individuals, corporations, institutions, and nation-states.

---

## 🌟 Features

### 8 Interactive Model Pages

1. **Intro** - Introduction and strategy overview
2. **BTC** - Bitcoin fundamentals and assumptions
3. **Macro** - Macroeconomic assumptions
4. **Individual** - Personal investment strategies
5. **Corporate** - Corporate treasury strategies
6. **Institution** - Institutional investment allocation
7. **Nation State** - National reserve management
8. **United States** - US strategic reserve scenarios

### 5 Investment Strategies

| Strategy | BTC Allocation | Stocks | Bonds | Leverage | Risk Level |
|----------|----------------|--------|-------|----------|------------|
| **Normie** | 0% | 60% | 30% | None | ⭐ Low |
| **BTC 10%** | 10% | 50% | 25% | None | ⭐⭐ Medium |
| **BTC Maxi** | 80% | 10% | 0% | None | ⭐⭐⭐ High |
| **Double Maxi** | 100% | 0% | 0% | 2x | ⭐⭐⭐⭐ Very High |
| **Triple Maxi** | 100% | 0% | 0% | 3x | ⭐⭐⭐⭐⭐ Extreme |

### Key Capabilities

- 📊 **Interactive Forecasting** - Simulate 21-year investment outcomes
- 📈 **Beautiful Charts** - Visualize portfolio growth with Recharts
- 🌍 **Multilingual** - Support for Traditional Chinese, Simplified Chinese, English, and Japanese
- 🎯 **Customizable** - Adjust assumptions to explore different scenarios
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- 💾 **Data Export** - Export results to CSV/JSON
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/dennislee928/bitcoin_model.git
cd bitcoin_model/bitcoin24-spa

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000/zh-TW](http://localhost:3000/zh-TW) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npx serve out
```

---

## 📁 Project Structure

```
bitcoin24-spa/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/            # Internationalized routes
│   │   │   ├── page.tsx         # Homepage (Intro)
│   │   │   ├── btc/             # Bitcoin assumptions
│   │   │   ├── macro/           # Macro assumptions
│   │   │   ├── individual/      # Individual strategy
│   │   │   ├── corporate/       # Corporate strategy
│   │   │   ├── institution/     # Institutional strategy
│   │   │   ├── nation-state/    # Nation-state strategy
│   │   │   └── united-states/   # US scenario
│   │   └── layout.tsx           # Root layout
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── charts/              # Chart components
│   │   ├── forms/               # Form components
│   │   ├── layout/              # Layout components
│   │   └── shared/              # Shared components
│   ├── lib/
│   │   ├── calculations/        # Calculation engine
│   │   │   ├── btc-price.ts
│   │   │   ├── portfolio.ts
│   │   │   └── forecast.ts
│   │   ├── store/               # Zustand stores
│   │   └── utils/               # Utility functions
│   ├── types/                   # TypeScript type definitions
│   ├── i18n/                    # Internationalization
│   │   ├── locales/
│   │   │   ├── zh-TW.json
│   │   │   ├── zh-CN.json
│   │   │   ├── en.json
│   │   │   └── ja.json
│   │   ├── config.ts
│   │   └── request.ts
│   └── styles/
│       └── globals.css
├── public/                      # Static assets
├── document/                    # Project documentation
└── Bitcoin24 v1.0.xlsm         # Original Excel model
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Form Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Math Calculations**: [math.js](https://mathjs.org/) + [decimal.js](https://github.com/MikeMcl/decimal.js/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

---

## 📖 Documentation

### English Documentation
- [Development Plan](./document/DEVELOPMENT_PLAN.md) - Complete development roadmap
- [Development Stages](./document/STAGES.md) - Detailed step-by-step stages
- [Development Phases](./document/PHASES.md) - 8-phase overview
- [Deployment Guide](./document/CLOUDFLARE-PAGES-FIX.md) - Cloudflare Pages deployment
- [CSS Fix Guide](./document/CSS-NOT-LOADING-FIX.md) - Styling troubleshooting

### Deployment Guides
- [Cloudflare Pages Fix](./document/CLOUDFLARE-PAGES-FIX.md)
- [Deployment Checklist](./document/DEPLOYMENT-SUCCESS-CHECKLIST.md)
- [Runtime Errors Fix](./document/RUNTIME-ERRORS-FIX.md)
- [Complete Fix Solution](./document/COMPLETE-FIX-SOLUTION.md)

---

## 🎯 Usage

### Navigate Between Models

Use the navigation bar to switch between different investment scenarios:

- **BTC Page** - Configure Bitcoin price assumptions
- **Macro Page** - Set macroeconomic parameters
- **Individual** - Simulate personal investment strategies
- **Corporate** - Model corporate treasury management
- **Institution** - Analyze institutional portfolios
- **Nation State** - Explore national reserve strategies
- **United States** - Special US scenario modeling

### Customize Assumptions

1. Navigate to **BTC** or **Macro** pages
2. Adjust input parameters (prices, growth rates, adoption curves)
3. Changes automatically update all calculations
4. View results in real-time on strategy pages

### Compare Strategies

On any strategy page:
1. Select strategies to compare (Normie, BTC 10%, BTC Maxi, etc.)
2. View interactive charts showing 21-year projections
3. Analyze detailed metrics (CAGR, max drawdown, Sharpe ratio)
4. Export data to CSV or JSON

---

## 🌍 Internationalization

Bitcoin24 supports 4 languages:

- 🇹🇼 **繁體中文** (Traditional Chinese) - Default
- 🇨🇳 **简体中文** (Simplified Chinese)
- 🇺🇸 **English**
- 🇯🇵 **日本語** (Japanese)

Switch languages using the language selector in the navigation bar.

---

## 🧮 Calculation Engine

### Bitcoin Price Model

The simulation uses multiple factors to forecast Bitcoin prices:

- **Stock-to-Flow (S2F) Model** - Scarcity-based valuation
- **Halving Cycles** - 4-year supply reduction impact
- **Adoption Curves** - Linear, exponential, or S-curve adoption
- **Institutional Adoption** - Corporate and institutional buying
- **Supply Dynamics** - 21 million hard cap consideration

### Portfolio Calculation

- **Multi-asset allocation** - Bitcoin, stocks, bonds, real estate, cash
- **Rebalancing strategies** - Never, monthly, quarterly, yearly
- **Tax considerations** - Capital gains tax impact
- **Compounding returns** - Accurate long-term growth modeling
- **Risk metrics** - Sharpe ratio, max drawdown, volatility

---

## 📊 Performance Metrics

Bitcoin24 calculates and displays:

- **Final Portfolio Value** - Total value after 21 years
- **CAGR** (Compound Annual Growth Rate)
- **Total Returns** - Nominal and real (inflation-adjusted)
- **Max Drawdown** - Worst peak-to-trough decline
- **Sharpe Ratio** - Risk-adjusted return
- **Volatility** - Standard deviation of returns

---

## 🎨 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400?text=Bitcoin24+Homepage)

### Individual Strategy Page
![Individual Page](https://via.placeholder.com/800x400?text=Individual+Strategy+Simulation)

### Chart Visualization
![Charts](https://via.placeholder.com/800x400?text=Interactive+Charts)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages (Conventional Commits)
- Add tests for new features
- Update documentation as needed

---

## 🧪 Testing

```bash
# Run type check
npm run type-check

# Run linter
npm run lint

# Run unit tests (when available)
npm run test

# Run E2E tests (when available)
npm run test:e2e
```

---

## 📦 Deployment

### Cloudflare Pages

This project is configured for deployment on Cloudflare Pages.

**Build Settings**:
```yaml
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Node version: 18 or higher
```

**One-Click Deploy**:

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com/)

### Alternative Deployments

- **Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dennislee928/bitcoin_model)
- **Netlify**: Supported with same build settings
- **Self-Hosted**: Use `npm run build` and serve the `out/` directory

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (optional):

```env
# App Configuration
NEXT_PUBLIC_APP_NAME=Bitcoin24
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Customization

#### Update Bitcoin Price Assumptions

Edit `src/lib/constants/btc-assumptions.ts` to change default values.

#### Modify Strategies

Edit `src/lib/constants/strategies.ts` to add or modify investment strategies.

#### Change Theme Colors

Edit `tailwind.config.ts` to customize the Bitcoin orange theme.

---

## 📚 Learning Resources

### Bitcoin Investment
- [Stock-to-Flow Model](https://medium.com/@100trillionUSD/modeling-bitcoins-value-with-scarcity-91fa0fc03e25)
- [Bitcoin Rainbow Chart](https://www.blockchaincenter.net/bitcoin-rainbow-chart/)
- [Plan B's Models](https://stats.buybitcoinworldwide.com/stock-to-flow/)

### Technical Documentation
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Recharts Examples](https://recharts.org/en-US/examples)
- [next-intl Guide](https://next-intl-docs.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 👥 Original Contributors

**Bitcoin24 was originally created by:**

- **Michael J. Saylor** ([@saylor](https://twitter.com/saylor))
- **Shirish Jajodia** ([@shirishjajodia](https://twitter.com/shirishjajodia))
- **Chaitanya Jain (CJ)** ([@_ChaitanyaJ](https://twitter.com/_ChaitanyaJ))

**Web Implementation**: This Next.js version was developed to make the model more accessible.

---

## 💡 Inspiration

> "If it gets to the point where it catches on, then it might make sense to get some in case it catches on. If enough people think the same way, that becomes a self fulfilling prophecy."
> 
> — **Satoshi Nakamoto** on January 17, 2009 (BTC price: $0)

---

## ⚠️ Disclaimer

**IMPORTANT**: The information provided here is for general informational purposes only and should not be considered as financial advice. It contains forward-looking information that is inherently unpredictable.

Before taking any action, you should seek advice from a professional financial advisor and other trusted sources. The authors and publishers of this information disclaim any responsibility for actions taken by users based on this information.

This represents only one perspective on potential outcomes. You should understand other perspectives, including those that may disagree.

**Past performance does not guarantee future results. Bitcoin is a volatile asset. Only invest what you can afford to lose.**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🔗 Links

- **Live Demo**: https://ab37038c.bitcoin-model.pages.dev/zh-TW
- **GitHub Repository**: https://github.com/dennislee928/bitcoin_model
- **Issue Tracker**: [GitHub Issues](https://github.com/dennislee928/bitcoin_model/issues)
- **Documentation**: [./document/](./document/)

---

## 🛣️ Roadmap

### Completed ✅

- [x] Project initialization and setup
- [x] All 8 model pages implementation
- [x] 5 investment strategies
- [x] Bitcoin price calculation engine
- [x] Portfolio management system
- [x] Multilingual support (4 languages)
- [x] Interactive charts
- [x] Responsive design
- [x] Cloudflare Pages deployment

### In Progress 🚧

- [ ] Fix CSS loading on Cloudflare Pages (currently being resolved)
- [ ] Enhanced chart interactions
- [ ] Mobile app optimization

### Planned 📋

- [ ] User accounts and scenario saving
- [ ] Social sharing features
- [ ] Advanced Monte Carlo simulation
- [ ] Real-time Bitcoin price API integration
- [ ] Historical backtesting
- [ ] PDF report generation
- [ ] 3D visualizations

---

## 💻 Development

### Project Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
```

### Tech Stack Details

#### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React component library

#### State Management
- **Zustand**: Lightweight state management
- **React Context**: For i18n and theme

#### Charts & Visualization
- **Recharts**: Composable charting library
- **Responsive design**: Mobile-first approach

#### Build & Deploy
- **Static Export**: Pre-rendered HTML for fast loading
- **Cloudflare Pages**: Global CDN deployment
- **GitHub Actions**: CI/CD automation (planned)

---

## 🐛 Known Issues

### Current Issues

1. **CSS not loading on Cloudflare Pages** 🔴
   - Status: Fix implemented, awaiting deployment
   - Workaround: Use development mode or Vercel

2. **React hydration warnings** 🟡
   - Status: Fix implemented in `src/i18n/request.ts`
   - Impact: Console warnings only, functionality works

3. **TypeScript `any` warnings** 🟢
   - Status: Minor code quality issues
   - Impact: No runtime impact

### Resolved Issues

- ✅ Root path 404 error - Fixed with `_redirects`
- ✅ next-intl locale warnings - Fixed in `request.ts`
- ✅ Static export configuration - Fixed in `next.config.js`

---

## 📞 Support

### Getting Help

- **Documentation**: Check the [document](./document/) folder
- **Issues**: [Open an issue](https://github.com/dennislee928/bitcoin_model/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dennislee928/bitcoin_model/discussions)

### Common Questions

**Q: Why does the site look unstyled?**  
A: CSS import location issue. Fix is being deployed. See [CSS-NOT-LOADING-FIX.md](./document/CSS-NOT-LOADING-FIX.md)

**Q: Can I use this for actual investment decisions?**  
A: No. This is a simulation tool. Always consult professional financial advisors.

**Q: How accurate are the predictions?**  
A: This is a simplified model for educational purposes. Real-world outcomes will vary significantly.

**Q: Can I modify the assumptions?**  
A: Yes! That's the whole point. Adjust assumptions to explore different scenarios.

---

## 🙏 Acknowledgments

- **Original Model**: Michael J. Saylor, Shirish Jajodia, Chaitanya Jain
- **Excel Model**: Bitcoin24 v1.0.xlsm
- **Web Framework**: Next.js team
- **UI Components**: shadcn/ui
- **Community**: All contributors and users

---

## 📈 Stats

- **Lines of Code**: ~15,000+
- **Components**: 50+
- **Pages**: 8
- **Languages**: 4
- **Strategies**: 5
- **Forecast Period**: 21 years

---

## 🌟 Star History

If you find this project helpful, please consider giving it a star! ⭐

[![Star History](https://img.shields.io/github/stars/dennislee928/bitcoin_model?style=social)](https://github.com/dennislee928/bitcoin_model/stargazers)

---

## 📱 Connect

- **Twitter**: Share your results with #Bitcoin24
- **GitHub**: [dennislee928](https://github.com/dennislee928)

---

**Made with 🧡 for the Bitcoin community**

*Helping individuals, corporations, institutions, and nation-states understand Bitcoin's potential impact over the next 21 years.*

---

**Last Updated**: October 11, 2025  
**Version**: 1.0.0  
**Status**: 🚀 Production (with ongoing improvements)

