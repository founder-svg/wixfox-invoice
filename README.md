# 🦊 WixFox Studio — Agency ERP, Leads & Invoicing Suite

Official desktop application for **WixFox Technologies / WixFox Digital Solutions** ([www.wixfox.com](https://www.wixfox.com/)). Built for managing prospective client leads, ongoing projects and milestones, service deliverables, and generating pixel-perfect official Quotations and Tax Invoices with 1-click A4 PDF export and direct WhatsApp dispatch.

![WixFox Logo](./public/wixfox-fox-logo.svg)

---

## 🚀 Key Modules & Capabilities

### 1. 📄 Official Quotation & Invoice Billing Engine
- **Authentic Branding**: Official WixFox Fox emblem, *"Your Growth, Our Technology."* tagline with service icons (*Websites & E-commerce, Mobile Apps, CRM & ERP Software, Digital Marketing, Business Automation*).
- **Exact Quotation Structure**: Itemized multi-line service breakdown with sub-deliverable bullet points, duration, and INR (`₹`) rates.
- **Dynamic Calculations**: Automatically computes total amount and converts it to Indian currency words representation (e.g. *"Four Thousand Two Hundred Only"*).
- **Service Breakdown & Signature**: Visual badges for setup & daily charges, handwritten authorising signature stamp, terms & conditions, and branded agency footer.
- **1-Click High-Res A4 PDF**: Download standard 210 × 297 mm printable PDFs.
- **Direct WhatsApp Dispatch**: Automatically generates a pre-formatted message summary and opens WhatsApp with client's phone pre-filled.

### 2. 👥 Leads & Client Acquisition Pipeline
- Track inquiries across stages: `New` ➔ `Contacted` ➔ `In Discussion` ➔ `Proposal Sent` ➔ `Won` ➔ `Lost`.
- Filter by status and search by client, phone, or service interest.
- 1-click actions: Open WhatsApp chat, generate custom quotation draft for the lead, or convert won lead directly into an active project.

### 3. 📁 Ongoing Projects & Services Tracker
- Monitor live projects, milestone completion sliders (0–100%), agreed project budgets, collected advance payments, and pending balances.
- Send instant WhatsApp milestone progress updates to clients.
- 1-click invoice billing for delivered projects.

### 4. 🗂️ WixFox Agency Services Catalog
- Standard service packages based on [wixfox.com](https://www.wixfox.com/):
  - High-Converting Corporate Websites
  - Native & Cross-Platform Android/iOS Mobile Apps
  - Custom Billing & ERP Software
  - Custom AI Agents & WhatsApp Chatbots
  - Meta / Instagram & Google Ads Management
- 1-click insertion into active quotations.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 6, Tailwind CSS v4, Lucide Icons
- **PDF Engine**: `html2canvas` + `jspdf` (High-definition vector rasterization)
- **Desktop Runtime**: Electron 34 for Windows PC (`.exe`)
- **Mobile Target**: Ready for Capacitor / Android APK packaging

---

## 💻 Local Setup & Execution

### Prerequisites
- Node.js (v18+) & npm

### Installation
```bash
# Clone the repository
git clone https://github.com/founder-svg/wixfox-invoice.git

# Enter project directory
cd wixfox-invoice

# Install dependencies
npm install
```

### Running the App
- **Web / Development Server**:
  ```bash
  npm run dev
  ```
  Open `http://localhost:5173/` in your browser.

- **Windows PC Launcher**:
  Double-click `run-wixfox-studio.bat` in the root folder.

- **Desktop Electron App**:
  ```bash
  npm run electron:dev
  ```

- **Build Production Bundle**:
  ```bash
  npm run build
  ```

---

## 📱 Coming Next: Backend & Android APK
1. Cloud Database integration (PostgreSQL / Supabase / Firebase) for real-time team synchronization.
2. Android APK packaging via Capacitor and GitHub Actions automated build pipeline.

---

**WixFox Technologies**  
🌐 [www.wixfox.com](https://www.wixfox.com/)  
📞 +91 8511083277  
✉️ info@wixfox.com  
*MORE VISIBILITY | MORE CUSTOMERS | MORE GROWTH*
