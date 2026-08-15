# Karigar Payment Calculator

A Next.js web application for calculating daily wages and payment breakdowns based on hours worked per day for craftsmen and workers.

## Tech Stack
- **Framework:** Next.js 15 (App Router, Static Export)
- **UI & Styling:** React 19, Tailwind CSS
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions

---

## Getting Started Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Test production static build:
   ```bash
   npm run build
   ```

---

## GitHub Pages Deployment & CI/CD

A fully automated GitHub Actions workflow is configured in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### One-Time Setup in GitHub:
1. Go to your GitHub repository: [https://github.com/mohd-naushaaad/PaymentCalculator](https://github.com/mohd-naushaaad/PaymentCalculator)
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! No API tokens or secrets required.

### How It Works:
- Every time you push changes to the `main` branch, the workflow:
  1. Installs dependencies and runs ESLint.
  2. Builds the Next.js static export with the correct base path (`/PaymentCalculator`).
  3. Deploys the static site to GitHub Pages.
- Your app will be live at:
  **`https://mohd-naushaaad.github.io/PaymentCalculator/`**

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server |
| `npm run build` | Builds optimized static export into `out/` |
| `npm run lint` | Runs ESLint checks |
