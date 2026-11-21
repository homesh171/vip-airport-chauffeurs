# VIP Airport Chauffeurs

A responsive, frontend-only React website for VIP Airport Chauffeurs.

## Features
- Responsive homepage and mobile navigation
- Quote form that opens WhatsApp with the customer's entered journey details
- Floating WhatsApp contact button
- Fleet, services, airport coverage, FAQs and partner application section
- Partner applications via email (no partner login/backend)
- Terms & Conditions, Privacy Policy and custom 404 page
- Favicon, SEO metadata, sitemap, robots.txt and Vercel SPA rewrite

## Contact details configured
- WhatsApp: +44 7366 832296
- General: info@vipairportchaufferus.com
- Partner: partner@vipairportchaufferus.com

## Run locally
1. Install Node.js (LTS).
2. Extract this folder.
3. Open a terminal in the project folder.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL shown by Vite.

## Build
Run `npm run build`. The production site is generated in `dist/`.

## Deploy to Vercel
Import the project repository into Vercel. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`. No environment variables or backend are required.

## Before publishing
- Confirm the final domain and update the canonical sitemap URLs in `public/sitemap.xml` and sitemap URL in `public/robots.txt` if the domain differs.
- Replace/confirm the stock vehicle photography with images you have permission to use. Images currently load from Unsplash and require an internet connection.
- Confirm that vehicle categories, capacities, service coverage, business details and legal terms accurately reflect your actual operation.
- Have the Terms & Conditions and Privacy Policy reviewed for your business and applicable UK requirements. These are starter website policies, not legal advice.
- Test WhatsApp on an actual phone and desktop. The customer must press Send inside WhatsApp; the website does not automatically send messages or confirm bookings.
