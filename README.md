# Bitcoin24 <img src="https://github.com/bitcoin-model/bitcoin_model/blob/main/bitcoin.png" width="30" height="30">
A web app of the opensource Bitcoin24 Model inspired by: 
- <a href= "https://x.com/saylor">Michael J. Saylor</a>
- <a href="https://x.com/shirishjajodia">Shirish Jajodia</a>
- <a href="https://x.com/_ChaitanyaJ">Chaitanya Jain (CJ)</a>

## 21-year macro forecast with micro models for bitcoin strategies

This web app is a 21-year macro forecast based on the Bitcoin24 open source model designed to simulate 21-year outcomes of various Bitcoin strategies tailored for individuals, corporations, institutions, and nation-states. Users can input their own assumptions or adjust the model to explore different scenarios. 

Bitcoin24 does not model Bitcoin's volatility, as its volatility profile has evolved and will continue to do so in the future. This is a simplified model intended to show possible long-term outcomes of adopting a Bitcoin standard.
<table>
  <tr>
    <th>21-Year Forecasting</th>
    <th>Flexible Assumptions</th>
  </tr>
</table>

<br>
<br>

>"It might make sense just to get some in case it catches on. If enough people think the same way, that becomes a self-fulfilling prophecy." - Satoshi Nakamoto on 01/17/09 (BTC Price: $0)

<br>
<br>

### Model Types 
> 1. <a href="https://github.com/user-attachments/assets/d6842ec0-f919-4f82-8ee2-10bcc3fe8f97">Bitcoin24 - BTC</a>
> 2. <a href="https://github.com/user-attachments/assets/1379c00b-7b38-435a-8ec3-b43fd3319871">Bitcoin24 - Macro</a>
> 3. <a href="https://github.com/user-attachments/assets/3ce97819-e76e-449f-ab4a-3405dcc098f5">Bitcoin24 - Individual</a>
> 4. <a href="https://github.com/user-attachments/assets/8afa6ed9-301d-4c3d-8f90-ad1556043155">Bitcoin24 - Corporate</a>
> 5. <a href="https://github.com/user-attachments/assets/eaffca98-cb3f-4ec3-bec8-4d44b6b6fe1f">Bitcoin24 - Institution</a>
> 6. <a href="https://github.com/user-attachments/assets/6cc536b6-9087-4231-993b-b1a42477b2ae">Bitcoin24 - Nation State</a>
> 7. <a href="https://github.com/user-attachments/assets/37aab46f-a840-4aed-a48d-8179f1b48d50">Bitcoin24 - United States</a>
<br>

### Strategy Options
<table style="background-color: orange;">
  <tr>
    <th>Normie</th>
    <th>BTC 10%</th>
    <th>BTC Maxi</th>
    <th>Double Maxi</th>
    <th>Triple Maxi</th>
  </tr>
</table>

<br>
<br>

# Development Documentation
  - [docs/development_plan.md](docs/development_plan.md) – master roadmap for every initiative.
  - [docs/design_system.md](docs/design_system.md) – design system and core tech stack (tasks 1 & 21).
  - [docs/theming_motion_framework.md](docs/theming_motion_framework.md) – shared theming and motion implementation (tasks 2 & 21).
  - [docs/flow_specific_ux_interactions.md](docs/flow_specific_ux_interactions.md) – onboarding, navigation, and validation behaviors (tasks 3, 10, 14, 22).
  - [docs/performance_accessibility_standards.md](docs/performance_accessibility_standards.md) – performance, accessibility, and observability guardrails (task 4).
  - `.github/workflows/ci.yml`, `lighthouserc.json`, and `config/metrics/slo.json` – automated quality gates, Lighthouse budgets, and telemetry thresholds backing the standards.
  - [docs/shared_app_foundation.md](docs/shared_app_foundation.md) – architectural blueprint for services, data ingestion, and tooling (task 5).
  - [docs/authentication_account_persistence.md](docs/authentication_account_persistence.md) – authentication and scenario persistence (tasks 6 & 11).
  - [docs/scenario_persistence_controls.md](docs/scenario_persistence_controls.md) – scenario save/load UX, APIs, and revision handling (task 11).
  - [docs/dynamic_base_year_handling.md](docs/dynamic_base_year_handling.md) – dynamic base-year calculations and historical pricing backbone (task 12).
  - [docs/onboarding_wizard.md](docs/onboarding_wizard.md) – Get Started flow implementation (tasks 7 & 14).
  - [docs/user_home_page.md](docs/user_home_page.md) – authenticated dashboard experience (task 8).
  - [docs/route_guarding_navigation.md](docs/route_guarding_navigation.md) – protected routing and global navigation (task 9).
  - [docs/guided_model_flow.md](docs/guided_model_flow.md) – guided BTC → Macro → model experience (task 10).




>Disclaimer:  The information provided here is for general informational purposes only and should not be considered financial advice. It contains forward-looking information that is inherently unknowable. You should seek advice from a professional financial advisor and other trusted sources before acting on any of this information. The authors and publishers of this information disclaim responsibility for any action taken by users of this information.  This is but one view of potential outcomes. You should inform yourself of other views, including those that might disagree.






## Backend Services
This repository now includes a NestJS/Fastify backend that exposes REST and GraphQL APIs backed by PostgreSQL via Prisma. Key features include:

- JWT authentication with httpOnly cookies for REST and GraphQL requests.
- Scenario CRUD APIs and GraphQL resolvers persisted to PostgreSQL (`scenarios` table).
- BTC price ingestion stored in the `btc_prices` table, including an automated cron sync.
- Model execution endpoint that combines scenario inputs with the latest BTC price for quick analytics.

### Getting Started
1. Copy `.env.example` to `.env` and update `DATABASE_URL`, `JWT_SECRET`, and any other environment values.
2. Install dependencies and generate the Prisma client:
   ```bash
   npm install
   npm run prisma:generate
   ```
3. Apply database migrations:
   ```bash
   npm run prisma:migrate
   ```
4. Start the development server:
   ```bash
   npm run start:dev
   ```

The REST API is served on `http://localhost:3000` and the GraphQL playground is available at `http://localhost:3000/graphql`.
