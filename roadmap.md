# Production Roadmap: From Prototype to Enterprise OS

This document outlines the technical path to transform "The Salon" from a high-fidelity frontend prototype into a fully functional, database-backed application.

> **Goal:** Launch a secure, scalable, and real-time Salon Operating System.

---

## 🏗️ Phase 1: The Iron Foundation (Weeks 1-4)
*Replacing mock data with real data structures.*

### 1. Database Implementation (Supabase/PostgreSQL)
*   **Action:** Provision a PostgreSQL database.
*   **Schema Design:**
    *   `users` (Staff, Clients, Admins)
    *   `appointments` (Date, Time, ServiceID, ClientID, StaffID, Status)
    *   `services` (Treatments, Prices, Durations)
    *   `products` (Inventory, Stock Levels)
*   **Migration:** Replace `mockData.ts` and `expanded-data.ts` with database queries.

### 2. Authentication & Authorization
*   **Action:** Implement secure login.
*   **Tech:** Clerk.com or Supabase Auth.
*   **Roles:**
    *   `Admin/Manager`: Full write access, financial views.
    *   `Staff`: Individual rota view, tip tracking.
    *   `Client`: Bookings, history, profile management.

### 3. Image Storage
*   **Action:** Set up cloud storage for client photos (Selfies) and profile pictures.
*   **Tech:** AWS S3, Cloudflare R2, or Supabase Storage.

---

## ⚙️ Phase 2: Core Business Logic (Weeks 5-8)
*Making the "Brain" work.*

### 1. The Booking Engine (Backend)
*   **Action:** Move "Slot Availability" logic from Client-Side to Server-Side.
*   **Reason:** Prevents double bookings and race conditions.
*   **Logic:** `GET /api/availability` calculates free slots based on Staff Hours - Existing Appointments - Clean Up Time.

### 2. Smart Rota Real-Time Sync
*   **Action:** Connect the Rota UI to live database updates.
*   **Tech:** Postgres Realtime (Websockets) or polling.
*   **Effect:** When Reception adds a walk-in, the Staff member's phone buzzes/updates instantly.

### 3. Inventory & Stock Decrementing
*   **Action:** Automate stock control.
*   **Logic:** Booking "Botox (3 Areas)" -> Automatically decrements 1 unit of `Botox Vial` and 1 unit of `Needle Kit` from inventory.

---

## 💳 Phase 3: Money & Communication (Weeks 9-12)
*Handling revenue and customers.*

### 1. Payment Processing (Stripe Connect)
*   **Action:** Integrate Stripe for:
    *   **Deposits:** Take 20% deposit during online booking.
    *   **No-Show Protection:** Charge card on file if client doesn't attend.
    *   **Terminal:** Integate physical card readers (Stripe Terminal) for in-store payments.

### 2. Notification System (Transactional)
*   **Action:** Replace `toast` notifications with real messages.
*   **Tech:** Resend (Email) + Twilio (SMS).
*   **Triggers:**
    *   Booking Confirmation (Email).
    *   24h Reminder (SMS).
    *   "Review Us" (Email 2 hours after appointment).

### 3. Financial Reporting Module
*   **Action:** Generate real PDF/CSV reports.
*   **Features:**
    *   End-of-Day Reconciliation.
    *   Staff Commission Reports (Auto-calculated based on service rules).
    *   VAT/Tax Export.

---

## 🚀 Phase 4: AI & Growth (Weeks 13+)
*Activate the advanced features.*

### 1. Gemini AI Integration (Production)
*   **Action:** Secure API keys on the server backend.
*   **Pipeline:** Client Upload -> Secure Storage -> Server-Side Analysis -> JSON Response -> Frontend Recommendation.

### 2. Marketing Hub (Active)
*   **Action:** Connect 'Campaigns' to the user database.
*   **Feature:** "Filter clients who haven't visited in 90 days and send SMS with 10% code."

---

## 📋 Technical Stack Recommendation

| Component | Prototype (Current) | Production (Future) |
| :--- | :--- | :--- |
| **Frontend** | Astro + React | Astro + React (Keep) |
| **Data Source** | `mockData.ts` (Static) | **Supabase (PostgreSQL)** |
| **Auth** | Mock State (`useState`) | **Clerk** or **Supabase Auth** |
| **API** | None (Direct imports) | **Server Actions** or **tRPC** |
| **Payments** | None | **Stripe** |
| **Email/SMS** | `console.log` | **Resend** / **Twilio** |
| **Hosting** | Localhost | **Vercel** or **Netlify** |
