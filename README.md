# Modern Developer Portfolio Template

A highly customizable, blazing-fast, and visually stunning developer portfolio template built with modern web technologies. This template includes a beautiful front-end and a secure admin dashboard powered by a serverless PostgreSQL database (Neon) to manage your projects, skills, and messages on the fly.

## 🚀 Features

- **Dynamic 3D Hero Section**: Features interactive 3D elements powered by Spline.
- **Beautiful UI**: Modern, glassmorphism design with Tailwind CSS and Framer Motion animations.
- **Admin Dashboard**: Manage your portfolio data (projects, skills, experience) directly from a secure admin panel without touching code.
- **Contact Form**: Built-in contact form that saves messages directly to your database.
- **Fully Responsive**: Looks great on desktop, tablet, and mobile devices.
- **SEO Optimized**: Pre-configured meta tags for better search engine visibility.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **3D Graphics**: Spline
- **Backend/Database**: Neon Serverless PostgreSQL
- **Deployment**: Vercel (Recommended)

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Database Setup (Neon)

This portfolio uses a Neon PostgreSQL database to store your dynamic data.
Read the full setup guide in `NEON_SETUP.md`.

Quick steps:
1. Create a free account on [Neon.tech](https://neon.tech).
2. Create a new project and copy your connection string.
3. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Paste your Neon connection string into `.env`.
5. Set a secure `ADMIN_PASSWORD` in your `.env` file for accessing the admin dashboard.

### 4. Initialize the Database

Run the following command to create the necessary tables in your database:

```bash
node setup-database.js
```

*(Optional)* Populate the database with some dummy data to test the UI:
```bash
node populate-portfolio.js
```

### 5. Run the Development Server

```bash
npm run dev
```

Your portfolio should now be running locally at `http://localhost:5173`.

## 🎨 Customization

1. **Personal Information**: 
   - Open `index.html` and update the title and meta tags.
   - Open `src/components/Hero.jsx` and `src/components/Contact.jsx` and replace the placeholder text (`[Your Name]`, emails, social links) with your own details.
2. **Colors & Theming**: 
   - Modify the Tailwind configuration in `tailwind.config.js` or adjust custom CSS variables in `src/index.css`.
3. **Adding Projects/Skills**: 
   - Navigate to `/admin` in your browser.
   - Log in using the `ADMIN_PASSWORD` you set in `.env`.
   - Add your data dynamically through the UI!

## 🚀 Deployment

The easiest way to deploy your portfolio is via Vercel. 
For detailed deployment instructions, see `DEPLOYMENT.md`.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details. Feel free to use this template for your own personal portfolio!
