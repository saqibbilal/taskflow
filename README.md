# TaskFlow: Full-Stack Monorepo Cloud Ecosystem

A decoupled, containerized task management system designed to demonstrate high-performance communication between a headless Laravel API and a Next.js SSR frontend.

## 🚀 Architectural Overview
TaskFlow utilizes a **Monorepo** structure, separating concerns between a robust PHP backend and a modern React-based frontend.

- **Frontend:** Next.js 15 (App Router) using Server-Side Rendering (SSR).
- **Backend:** Laravel 12 (Headless API) with RESTful architecture.
- **DevOps:** Fully containerized with Docker and deployed via AWS App Runner and ECR.

## 🛠️ Tech Stack
* **Frameworks:** Laravel 12, Next.js 15 (React 19)
* **Cloud Infrastructure:** AWS App Runner, AWS RDS (PostgreSQL), AWS ECR
* **Containerization:** Multi-stage Docker builds
* **Tools:** pnpm (Monorepo), Tailwind CSS

## 🏗️ Technical Challenges & Solutions
### 1. Build-Time Environment Variable Injection
Next.js requires environment variables starting with `NEXT_PUBLIC_` to be available during the build process. I engineered a Docker workflow using `ARG` and `ENV` to "bake" the API URL into the production image, ensuring the client-side fetches work seamlessly in isolated AWS environments.

### 2. SSR Networking Resolution
Resolved the common "Invalid URL" hurdle during Server-Side Rendering. Since the Node.js server executes fetches before reaching the browser, I implemented absolute URL resolution to bridge communication between the containerized frontend and the Laravel API endpoint.

### 3. Image Optimization
Leveraged **Next.js Standalone Mode** to strip away unnecessary `node_modules`, resulting in an optimized production image that is significantly smaller and faster to deploy.

## 📋 Key Features
* **Atomic Transitions:** Uses React `useTransition` for smooth, non-blocking UI updates when toggling task states.
* **Decoupled Auth:** Designed to support headless authentication between a PHP backend and a JS frontend.
* **CORS Security:** Custom middleware configuration in Laravel to allow secure, cross-origin communication with the Next.js frontend.
* **Cloud-Native:** Fully managed via AWS services for high availability.
* **Automated Scalability:** Deployed to AWS App Runner to demonstrate auto-scaling capabilities and health-check monitoring.