# 🔗 LinkForge — Distributed URL Shortener

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)
![Status](https://img.shields.io/badge/Status-Live-brightgreen)

A modern **Distributed URL Shortener** built using **React, Node.js, Express.js, PostgreSQL, and Redis**, combining fast URL shortening, custom aliases, QR code generation, database persistence, Redis caching, and a responsive web interface.

Inspired by modern link management platforms such as Bitly and TinyURL.

> **Shorter Links. Smarter Infrastructure.**

---

## 🚀 Live Demo

🌐 **[Launch LinkForge](https://linkforge-url-shortener-ainuldev.vercel.app/)**

🔗 **[Backend API](https://linkforge-url-api-ainuldev.vercel.app/health)**

💻 **[GitHub Repository](https://github.com/ainulhaqsde/-linkforge-URL-Shortener)**

---

## ✨ Features

- 🔗 **Instant URL Shortening** — Convert long URLs into short, shareable links.
- 🎯 **Custom Short Links** — Create personalized URL aliases.
- 📱 **QR Code Generation** — Generate QR codes for shortened URLs.
- ⚡ **Fast Redirection** — Redirect visitors to original destinations.
- 🗄️ **PostgreSQL Database** — Persistent storage for URL mappings.
- 🚀 **Redis Caching** — Reduce repeated database queries.
- 🧠 **Distributed ID Generation** — Snowflake-inspired and hash-based strategies.
- 🔒 **Input Validation** — Validate URLs and custom aliases.
- 🎨 **Modern UI** — Clean, user-friendly React interface.
- 📊 **Analytics Dashboard** — Interface for viewing link statistics.
- 📱 **Responsive Design** — Supports desktop, laptop, tablet, and mobile layouts.
- ☁️ **Cloud Deployment** — Frontend and backend hosted on Vercel.
- 🐳 **Docker Support** — Container-based development configuration.
- 🧩 **Modular Architecture** — Separate frontend, API, and worker services.

**Note:** The analytics background worker is implemented but not deployed, so live click statistics are not currently operational.

---

## 🖼️ Preview

Add a screenshot of the live LinkForge interface to the repository as `screenshot.png` to display it here.

![LinkForge Preview](./screenshot.png)

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Vite | Frontend development and build |
| JavaScript | Application logic |
| Node.js | Backend runtime |
| Express.js | REST API |
| PostgreSQL | Persistent database |
| Neon | PostgreSQL cloud hosting |
| Redis | Caching and event streaming |
| Redis Cloud | Managed Redis service |
| Docker | Containerization |
| Vercel | Frontend and API deployment |
| Git & GitHub | Version control |

---

## 🏗️ System Architecture

```text
                 ┌──────────────────┐
                 │  React Frontend  │
                 │      Vercel      │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │   Express API    │
                 │      Vercel      │
                 └────────┬─────────┘
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
     ┌──────────────┐          ┌──────────────┐
     │ Redis Cloud  │          │ Neon         │
     │ Cache        │          │ PostgreSQL   │
     └──────────────┘          └──────────────┘
             │
             ▼
     ┌──────────────────┐
     │  Redis Streams   │
     └────────┬─────────┘
              │
              ▼
     ┌──────────────────┐
     │ Analytics Worker │
     │ (Not Deployed)   │
     └──────────────────┘
```

---

## ⚡ How LinkForge Works

1. 🔗 Enter a long URL into the input field.
2. 🎯 Optionally choose a custom short-code alias.
3. 🚀 Click the button to generate a shortened URL.
4. 🗄️ LinkForge stores the mapping in PostgreSQL.
5. 📋 Copy the shortened link or share its QR code.
6. 🌐 Opening the link redirects visitors to the original destination.
7. ⚡ Redis caching helps speed up repeated lookups.

---

## 🧠 Distributed Systems Concepts

LinkForge demonstrates several backend engineering concepts:

- **Distributed ID Generation:** Short-code generation without relying exclusively on sequential database IDs.
- **Redis Caching:** Cache-first URL lookups to reduce database load.
- **Stateless API Design:** Architecture suitable for scaling API instances.
- **Event-Driven Processing:** Redis Streams-based analytics event pipeline.
- **Background Workers:** Separate service for processing click events.
- **Database Persistence:** Reliable storage of URL mappings.

The event-processing worker is available in the source code but requires separate deployment.

---

## 📂 Project Structure

```text
Distributed-URL-Shortener-Ainul-Haq/
│
├── api/                  # Express.js backend
├── frontend/             # React + Vite frontend
├── worker/               # Analytics worker
├── db/                   # Database resources
├── load-test/            # Performance testing
│
├── docker-compose.yml    # Container configuration
├── README.md             # Project documentation
├── DEPLOYMENT_GUIDE.md   # Deployment instructions
├── AUTHOR.md             # Attribution information
└── BENCHMARK.md          # Benchmark documentation
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ainulhaqsde/-linkforge-URL-Shortener.git
```

### 2. Open the Project

```bash
cd -linkforge-URL-Shortener
```

### 3. Install Backend Dependencies

```bash
cd api
npm install
```

### 4. Configure Environment Variables

Create an `.env` file for the backend using the configuration expected by the application.

Example:

```env
DATABASE_URL=your_postgresql_connection_string
REDIS_URL=your_redis_connection_string
BASE_URL=http://localhost:5000
NODE_ID=1
REDIS_STREAM_NAME=click_events
REDIS_CONSUMER_GROUP=analytics-group
```

Never upload actual credentials or `.env` files to GitHub.

### 5. Start the Backend

```bash
npm start
```

### 6. Start the Frontend

Open another terminal in the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite.

For complete setup instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | API health check |
| POST | `/api/shorten` | Create a shortened URL |
| GET | `/:shortCode` | Redirect to original URL |
| GET | `/api/analytics/:shortCode` | Retrieve analytics data |

### Example URL Shortening Request

```json
{
  "url": "https://www.example.com",
  "strategy": "snowflake"
}
```

### Example Shortened URL

```text
https://linkforge-url-shortener-ainuldev.vercel.app/abc123
```

The short code shown is illustrative.

---

## 📊 Analytics

The repository includes an analytics subsystem designed to:

- Record URL click events.
- Publish events through Redis Streams.
- Process events using a background worker.
- Aggregate click counts hourly.
- Display statistics in the analytics dashboard.

**Current status:** The analytics worker is not deployed, so live analytics are not fully functional on the hosted website.

---

## 📱 Responsive Design

LinkForge is designed for use across:

- 💻 Desktop
- 🖥️ Laptop
- 📱 Tablet
- 📲 Mobile

The frontend uses React to provide an interactive link-shortening experience.

---

## ☁️ Deployment

| Service | Hosting Platform |
|---|---|
| Frontend | Vercel |
| Backend API | Vercel |
| PostgreSQL Database | Neon |
| Redis Cache | Redis Cloud |

**Live Website:** https://linkforge-url-shortener-ainuldev.vercel.app/

**API:** https://linkforge-url-api-ainuldev.vercel.app/

The analytics worker remains an optional undeployed service.

---

## 🔮 Future Improvements

- 📊 Fully operational real-time analytics.
- 👤 User accounts and authentication.
- 🗂️ Personal link management dashboard.
- ⏳ Custom URL expiration controls.
- 🌍 Geographic and device analytics.
- 🛡️ Advanced rate limiting and abuse prevention.
- 📈 Enhanced performance monitoring.
- ⚙️ Automated CI/CD testing.
- ☁️ Multi-region deployment support.

---

## 👨‍💻 Developer

**Enhanced & Maintained by Ainul Haq**

Full-Stack Development | Backend Engineering | Distributed Systems

🌐 **Portfolio:** [portfolio-ainuldev.vercel.app](https://portfolio-ainuldev.vercel.app/)

💻 **GitHub:** [github.com/ainulhaqsde](https://github.com/ainulhaqsde)

🔗 **Project:** [LinkForge Repository](https://github.com/ainulhaqsde/-linkforge-URL-Shortener)

For project attribution and copyright details, see [AUTHOR.md](AUTHOR.md).

---

## 📜 License & Attribution

This project is documented as MIT-licensed. See the repository's `LICENSE` file for the applicable terms.

Original contributions and third-party attribution requirements remain subject to the project history and license notices.

---

## ⭐ Support

If you find LinkForge useful or interesting, consider giving the GitHub repository a ⭐ to support future improvements.

---

# 🔗 LinkForge

### Shorter Links. Smarter Infrastructure.

**Enhanced & Maintained by Ainul Haq | © 2026**

*Building scalable web applications with modern backend engineering.*
