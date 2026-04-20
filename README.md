# DailySales

Shop management system for small Indian retail owners to track daily sales, stock, and profit across shifts — digitising the manual paper-based shift handover process.

## Structure

```
dailysales/
├── DS_BE/   # Node.js + Express + TypeScript REST API
└── DS_FE/   # React + TypeScript dashboard
```

## DS_BE — Backend

**Stack:** Node.js · Express · TypeScript · MongoDB · JWT · Google OAuth

- Shift lifecycle: start → add stock → close with auto calculation
- Core formula: `opening + added − closing = units sold → revenue → profit`
- Role-based auth: owner vs worker (Google OAuth + JWT)
- Reports: daily / weekly / monthly / yearly analytics
- Auto alerts: low stock and price loss warnings

## DS_FE — Frontend

**Stack:** React · TypeScript · Tailwind CSS · Recharts · Zustand

- Dashboard with shift status, revenue/profit cards, top products
- Full shift flow: start, add stock, close with live calculation preview
- Reports page with bar charts and time-range switcher (day/week/month/year)

## Quick Start

```bash
git clone https://github.com/akashtyagi03/dailysales
cd dailysales/ds_be && npm install && npm run dev   # API on :5000
cd ../ds_fe && npm install && npm run dev           # App on :5173
```
