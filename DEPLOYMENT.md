# Hostinger Deployment Guide

This guide explains how to deploy your Next.js Portfolio to Hostinger (VPS or Shared Hosting).

## 1. Database Setup (MySQL)

1.  Log in to your Hostinger Control Panel (hPanel).
2.  Go to **Databases** -> **MySQL Databases**.
3.  Create a new database and user.
    *   **Database Name:** (e.g., `u12345_portfolio`)
    *   **Username:** (e.g., `u12345_admin`)
    *   **Password:** (Make sure to save this!)
4.  Open **phpMyAdmin** for your new database.
5.  Click **Import** tab.
6.  Choose the `deploy.sql` file from your project folder and click **Go**.
    *   *This will create all empty tables.*

## 2. Prepare Files for Upload

Since we used `output: 'standalone'`, we need to prepare a specific folder structure.

### Option A: Clean Build (Recommended)
1.  Run `npm run build` in your local terminal (if you haven't already).
2.  Create a new folder named `deploy` on your desktop.
3.  Copy the following into `deploy`:
    *   From `.next/standalone` copy **everything** into `deploy`.
    *   Copy the **`.next/static`** folder to `deploy/.next/static`.
    *   Copy the **`public`** folder to `deploy/public`.
4.  Create a `.env` file inside `deploy` with your production details:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE_NAME"
JWT_SECRET="complex_secret_key_here"
NEXT_PUBLIC_BASE_URL="https://yourdomian.com"
```

## 3. Upload to Server

### If using VPS (Ubuntu/Node.js)
1.  Connect via SSH or SFTP (FileZilla).
2.  Upload the contents of the `deploy` folder to `/var/www/portfolio` (or your preferred path).
3.  Install dependencies (PM2 is recommended for keep-alive):
    ```bash
    cd /var/www/portfolio
    npm install -g pm2
    pm2 start server.js --name "portfolio"
    pm2 save
    pm2 startup
    ```
4.  Configure Nginx as a reverse proxy to port 3000 (if needed).

### If using Shared Hosting (Node.js App)
1.  Go to **Websites** -> **Node.js**.
2.  Create a verified Node.js application.
    *   **Application Root:** `public_html` (or a subfolder)
    *   **Application URL:** `yourdomain.com`
    *   **Application Startup File:** `server.js`
3.  Upload the `deploy` folder contents to your defined Application Root.
4.  Click **Install NPM Packages** (if available) or just ensure `node_modules` is uploaded (Standalone includes them, but shared hosting might strictly require `npm install`).
5.  Start the application.

## 4. Post-Deployment (Seeding Data)

Your database is currently empty. To restore your projects and profile:

1.  Visit: `https://yourdomain.com/api/seed` in your browser.
2.  You should see `{"success":true,"message":"Database seeded..."}`.
3.  Refresh your homepage!
