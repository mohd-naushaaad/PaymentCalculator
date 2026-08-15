# Karigar Payment Calculator

A Next.js web application for calculating daily wages and payment breakdowns based on hours worked per day for craftsmen and workers.

## Tech Stack
- **Framework:** Next.js 15 (App Router, Static Export)
- **UI & Styling:** React 19, Tailwind CSS
- **Hosting & Edge Delivery:** Cloudflare Pages
- **CI/CD:** GitHub Actions + Cloudflare Wrangler

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

3. Test static build & Cloudflare Pages preview locally:
   ```bash
   npm run build
   npm run pages:dev
   ```

---

## Cloudflare Pages Deployment & CI/CD

### Method 1: Automated GitHub Actions CI/CD (Configured)

A GitHub Actions workflow is set up in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Every push to the `main` branch automatically runs linting, creates an optimized static export, and deploys directly to Cloudflare Pages. Pull requests will generate preview builds.

#### Required GitHub Secrets:
Add the following secrets to your GitHub repository (**Settings** > **Secrets and variables** > **Actions** > **New repository secret**):

| Secret Name | Description | Where to find |
| :--- | :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | API Token with Cloudflare Pages edit permissions | Cloudflare Dashboard > **My Profile** > **API Tokens** > **Create Token** (Use *Cloudflare Pages* template or custom with `Account.Cloudflare Pages:Edit`) |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID | Cloudflare Dashboard > Right sidebar on Account Home or in the URL |

---

### Method 2: Cloudflare Dashboard Git Integration (Zero Secret Setup)

Alternatively, you can connect your GitHub repository directly within Cloudflare Pages:

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Compute (Workers & Pages)** > **Create** > **Pages** > **Connect to Git**.
2. Select repository `mohd-naushaaad/PaymentCalculator`.
3. Set build configuration:
   - **Framework preset:** `Next.js (Static HTML Export)` or `None`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. Click **Save and Deploy**. Cloudflare will automatically build and deploy every commit and pull request.

---

### Method 3: Manual CLI Deployment via Wrangler

You can also deploy directly from your terminal:

```bash
# 1. Login to Cloudflare
npx wrangler login

# 2. Build and Deploy
npm run build
npm run pages:deploy
```

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server |
| `npm run build` | Builds static export into `out/` directory |
| `npm run lint` | Runs ESLint |
| `npm run pages:dev` | Runs local Cloudflare Pages preview of `out/` |
| `npm run pages:deploy` | Manually deploys `out/` to Cloudflare Pages |
