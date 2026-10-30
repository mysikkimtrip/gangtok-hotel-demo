# MySikkimTrip - Sikkim Tour Packages Demo App

A standalone, mobile-first demonstration application showcasing handcrafted Sikkim holiday packages. 

> **Note:** This is an independent, separate demonstration app. It has zero dependencies on your existing website or live Hostinger hosting, requires no database or backend servers, and can be hosted for free anywhere on static hosting (e.g., Netlify, Vercel, GitHub Pages, or a separate subdomain/subfolder on Hostinger).

---

## 🌟 Features Included

1. **5 Interactive Packages:**
   - **3 Nights / 4 Days:** *Glimpse of Sikkim & High Altitude Lakes* (Gangtok & sacred Tsomgo Lake at 12,310 ft)
   - **4 Nights / 5 Days:** *Classic Sikkim Explorer* (Gangtok, Tsomgo Lake, Ravangla Buddha Park & Pelling Kanchenjunga viewpoints)
   - **5 Nights / 6 Days:** *East & North Sikkim Odyssey (Bestseller)* (Gangtok, Lachen, Gurudongmar Lake at 17,800 ft & Yumthang Valley)
   - **6 Nights / 7 Days:** *Grand Sikkim Circuit* (Gangtok, North Sikkim & West Sikkim Pelling Glass Skywalk)
   - **7 Nights / 8 Days:** *Ultimate Sikkim & Darjeeling Himalayan Panorama* (Sikkim Grand Circuit + Darjeeling Tea Hills & Tiger Hill Sunrise)

2. **Destination Photos & Itineraries:**
   - Authentic Himalayan photography
   - Comprehensive day-by-day schedules (Morning, Afternoon, Evening) with distances, travel times, and elevations
   - Sightseeing points & local insider tips for each day

3. **4 Hotel Category Tiers:**
   - **Standard (Budget Cozy):** 2-3 Star mountain hotels, hot water geysers, daily breakfast (CP Plan)
   - **Deluxe (Comfort 3-Star):** 3-Star valley view rooms, breakfast & dinner included (MAP Plan)
   - **Super Deluxe (Premium View):** Balcony rooms facing Kanchenjunga, heating, premium toiletries
   - **Luxury / Boutique Heritage:** Elgin Nor-Khill / Mayfair / Chumbi Mountain Retreat style royal luxury

4. **"Price on Request" & Instant WhatsApp Enquiries:**
   - Prominently displays "Price on Request" with transparent reasoning (based on group size, vehicle preference, and peak season dates)
   - Pre-formatted WhatsApp deep links that include selected package title, duration, and chosen hotel tier
   - Built-in live phone number configurator (change the phone/WhatsApp number right in the UI or in `src/data/config.ts`)

5. **Traveller Booking & Custom Quote Form:**
   - Collects traveller details, travel date, adult/child counts, and vehicle choice (Innova/Xylo, Bolero/Scorpio, Hatchback)
   - Generates pre-formatted WhatsApp enquiry message or stores a demo callback request with reference number

6. **Side-by-Side Comparison Matrix:**
   - Interactive table comparing all 5 packages simultaneously

7. **Sikkim Travel & Permit Guide:**
   - Inner Line & Protected Area Permit (PAP) requirements (Voter ID / Passport guidelines)
   - High Altitude AMS advisory for 17,800 ft
   - Season & packing recommendations

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 📦 How to Build for Free Static Hosting

To compile the standalone static website:
```bash
npm run build
```
This produces an optimized **`dist/`** folder containing pure static HTML, CSS, and JavaScript files.

### Free Hosting Options:
- **Option 1: Netlify Drop (Fastest & 100% Free)**
  1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
  2. Drag and drop the `dist/` folder
  3. Your demo is live instantly with an SSL `https://` link.

- **Option 2: Vercel (Free)**
  - Import the repository into Vercel and it will auto-detect Vite and deploy instantly.

- **Option 3: GitHub Pages (Free)**
  - Host directly on `username.github.io/mysikkimtrip-demo`.

- **Option 4: Hostinger (Completely isolated subdomain)**
  - If you wish to host it under your domain without touching your main site:
    1. Create a subdomain in Hostinger cPanel (e.g. `tours.mysikkimtrip.com` or `demo.mysikkimtrip.com`).
    2. Upload the files inside `dist/` into that subdomain folder via File Manager.
    3. It will run independently without affecting your main site.

---

## ⚙️ How to Configure Packages & Phone Number

All data is structured in simple, well-documented configuration files:
- **Central WhatsApp Number & Agency Settings:**
  Edit **`src/data/config.ts`**:
  ```typescript
  export const DEFAULT_AGENCY_CONFIG = {
    agencyName: 'MySikkimTrip',
    whatsAppNumber: '919749947625', // Active verified business WhatsApp number (https://wa.me/919749947625)
    displayPhone: '+91 97499 47625',   // Formatted phone display string
    email: 'trips@mysikkimtrip.com',
    gangtokOfficeAddress: 'Near MG Marg, Tibet Road, Gangtok, Sikkim - 737101',
    pricingNote: 'Prices are on request...',
  };
  ```

- **Tours, Itineraries, Sightseeing & Hotels:**
  Edit **`src/data/packages.ts`** to customize day-by-day itineraries, destinations, hotel tier options, or photo URLs. All 5 tour durations (3N/4D, 4N/5D, 5N/6D, 6N/7D, 7N/8D) are configured here.
