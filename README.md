# Mahmut Özsoy – Full Stack Portfolio

This is a **Full Stack Personal Portfolio** website built with **Next.js 15 (App Router)**, **MySQL**, and **Prisma ORM**. It features a dynamic content management system (Admin Panel) allowing real-time updates of projects, skills, experience, and education without redeploying the application.

🔗 **Live Website:** [mahmutozsoy.dev](https://mahmutozsoy.dev)
🔗 **GitHub:** [github.com/mahmuttozsoy](https://github.com/mahmuttozsoy)
🔗 **LinkedIn:** [linkedin.com/in/mahmuttozsoy](https://www.linkedin.com/in/mahmuttozsoy/)

---

## 🚀 Features

- **Dynamic Content:** All sections (About, Experience, Projects, Skills) are fetched from a MySQL database.
- **Admin Panel:** Secure dashboard to manage all portfolio content.
- **Modern UI/UX:** Built with Tailwind CSS, Framer Motion animations, and responsive design.
- **SEO Optimized:** Server-side rendering (SSR) with dynamic metadata and Schema.org integration.
- **Contact Form:** Integrated messaging system directly accessible from the Admin Panel.

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes (Serverless)
- **Database:** MySQL
- **ORM:** Prisma
- **Authentication:** Custom JWT-based Auth (for Admin Panel)
- **Deployment:** Vercel / Hostinger (VPS)

---

## 📂 Project Structure

```bash
📦 portfolio
 ┣ 📂 app
 ┃ ┣ 📂 admin        # Admin Panel pages & components
 ┃ ┣ 📂 api          # Backend API routes (REST)
 ┃ ┣ 📂 components   # Shared frontend components
 ┃ ┣ 📂 projects     # Dynamic project detail pages
 ┃ ┗ 📜 layout.tsx   # Root layout & Metadata
 ┣ 📂 lib            # Database connection & utilities
 ┣ 📂 prisma         # Database schema & migrations
 ┣ 📂 public         # Static assets
 ┗ 📜 middleware.ts  # Auth protection
```

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mahmuttozsoy/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
JWT_SECRET="your_secret_key"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Setup Database
Run Prisma migrations to create tables:
```bash
npx prisma migrate dev --name init
```

### 5. Seed Initial Data (Optional)
Populate the database with sample data:
```bash
http://localhost:3000/api/seed
```
*Visit this URL in your browser once the server is running.*

### 6. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🔐 Admin Access

You can access the admin panel at `/admin`.
- **Default Username:** `admin`
- **Default Password:** `password123`
*(Change these credentials immediately after deployment)*

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
