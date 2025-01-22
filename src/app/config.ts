export const HQMapLocation =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.518774160157!2d8.5489448!3d47.3627925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa7f798204207%3A0xee823a5ecdbfd65c!2sResilient%20Studios!5e0!3m2!1sen!2sng!4v1722356233796!5m2!1sen!2sng";

export const DEFAULT_HEADER_HEIGHT = "h-20";

// CRM Credentials
export const avaBookingSource = {
  bookingId: "T4GNZOQZ8OscdQXtBhOs_1732720366789",
  bookingUrl: "https://api.leadconnectorhq.com/widget/booking/T4GNZOQZ8OscdQXtBhOs",
};

export const discoveryCallBookingSource = {
  bookingId: "Nx1uj9hpUtMgXrp6FcgY_1732720304666",
  bookingUrl: "https://api.leadconnectorhq.com/widget/booking/Nx1uj9hpUtMgXrp6FcgY",
};

// Meta information
export const siteConfig = {
  name: "Clinic of AI",
  description: "Customize AI for your needs",
  url: "https://www.coai.com",
  ogImage: "https://www.yourcompany.com/og-image.jpg",
  address: "Kreuzstrasse 24, 8008 Zürich, Switzerland",
  phone: "+41 79 960 84 77",
  email: "communication@clinicofai.com",
} as const;

// Navigation
export const pagePaths = {
  // Base navigation
  home: { name: "Home", path: "/" },
  about: { name: "About", path: "/about" },
  solutions: { name: "Solutions", path: "/solutions" },
  industries: { name: "Industries", path: "/industries" },
  contact: { name: "Contact", path: "/contact" },
  tutorials: { name: "Tutorials", path: "/tutorials" },
  terms: { name: "Terms", path: "/terms" },
  policy: { name: "Policy", path: "/policy" },
  gdpr: { name: "GDPR & Data", path: "/gdpr" },

  // Product pages
  ava: { name: "Introducing AVA", path: "/solutions/ava" },
  gohighlevel: { name: "GoHighLevel CRM Setup", path: "/solutions/gohighlevel-crm" },

  // Industries pages
  retailServices: { name: "Retail & Services", path: "/industries/retail-services" },

  // External links
  blog: { name: "Blog", path: "https://blog.clinicofai.com/" },
} as const;

// Social media links
export const socialLinks = {
  twitter: "https://twitter.com/ClinicofAI",
  github: "https://github.com/coai",
  linkedin: "https://www.linkedin.com/company/clinic-of-ai",
  twitch: "https://www.twitch.tv/clinicofai",
  youtube: "https://www.youtube.com/channel/UCQI0R5JZ2O94yOFvAe6M8uw",
  x: "https://twitter.com/ClinicofAI",
  reddit: "https://www.reddit.com/user/plasticmindcast/",
  tiktok: "https://www.tiktok.com/@clinic_of_ai",
  instagram: "https://www.instagram.com/clinicofai.communication/",
  facebook: "https://www.facebook.com/profile.php?id=61559432771170",
} as const;

// Contact information
export const contactInfo = {
  email: "info@yourcompany.com",
  phone: "+1 (123) 456-7890",
  address: "123 Business St, City, State, ZIP",
} as const;
