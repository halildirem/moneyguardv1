💰 Money Guard

A personal finance tracker built with React + Vite. Track your income and expenses, view statistics, and monitor exchange rates — all in one place.

🔗 Live Demo: https://moneyguardv1.vercel.app

✨ Features

Core

User registration and login with JWT authentication
Add, edit, and delete income/expense transactions
Statistics page with Doughnut chart by category
Month/year filtering for transaction statistics
Real-time exchange rates via Frankfurter API (1-hour cache)
Responsive design for mobile, tablet, and desktop


Custom Additions

🇹🇷 Localized background visuals — Login and Register page backgrounds feature Turkish Lira banknotes instead of the original USD design, reflecting a localized experience
🎨 Custom color theme — The original purple/violet palette was replaced with a blue and gold theme for a more distinctive and modern look. All colors were verified for WCAG contrast compliance using online contrast checkers
💱 Multi-currency balance display — A dropdown on the Balance component lets users view their balance in TRY, USD, EUR, or GBP, with live conversion using Frankfurter exchange rates. Transaction summaries also update automatically based on the selected currency
📅 Custom datepicker design — The date picker in Add Transaction was styled to match the app's blue theme (not provided in the original Figma)
🔢 Formatted number display — Amounts are formatted with dot separators for readability (e.g. 40.500,00 instead of 4050000)
📱 Repositioned mobile FAB — The Add Transaction floating button was moved to the center of the screen on mobile to avoid blocking content and improve usability


🛠 Tech Stack

Technology	Purpose
React 19 + Vite	UI framework and build tool
Redux Toolkit + redux-persist	Global state management, token persistence
React Router DOM	Client-side routing, protected routes
React Hook Form + Yup	Form handling and validation
Axios	HTTP client with auth interceptor
Chart.js + react-chartjs-2	Doughnut chart for statistics
Frankfurter API	Real-time exchange rates
react-datepicker	Date selection in transaction forms
CSS Modules + CSS Variables	Scoped styles, design tokens
modern-normalize	Cross-browser CSS reset


🏗 Architecture

src/
├── assets/           # Background images, icons
├── components/       # Reusable UI components
├── pages/            # Route-level page components
├── redux/            # Store, slices, operations
│   ├── auth/         # Login, register, refresh, logout
│   ├── finance/      # Transactions, categories, balance
│   └── statistics/   # Statistics by month/year
├── styles/           # Global CSS variables, resets
└── utils/            # axios instance, helpers


🔐 Auth Flow

On app load, refreshUser is dispatched — if a token exists in localStorage, the user session is restored automatically
PrivateRoute redirects unauthenticated users to /login
PublicRoute redirects authenticated users away from /login and /register
On logout, Redux store and localStorage are cleared, user is redirected to /login


⚡ Performance

Route-level lazy loading with React.lazy + Suspense
Frankfurter API responses cached in localStorage for 1 hour
Vite manual chunk splitting for vendor libraries


👤 Developer
Halil Direm — Team Leader / Scrum Master / Frontend Developer
