import logo from "./logo_icon.png";
import menu from "./menu_icon.png";
import profile from "./profile_icon.png";
import dropdown from "./dropdown_icon.png";
import web_icon from "./web_icon.png";
import uiux_icon from "./ux_ui_icon.png";
import app_icon from "./app_icon.png";
import cloud_icon from "./cloud_icon.png";
import cybersecurity from "./cybersecurity.png";
import startup from "./startup.png";
import bussiness from "./bussiness.png";
import automation from "./automation.png";
import businessCun from "./business_cus.png";
import analytic from "./analytic.png";
import cloud from "./cloud_itg.png";
import tech from "./tech.png";
import telephone from "./telePhone.png";
import message from "./message.png";
import user from "./user.png";
import mail from "./mail.png";
import tick_icon from "./tick_icon.png";
import send_icon from "./send_icon.png";
import chat from "./chat.png";
import lock from "./lock.png";
import google_pay from "./google_pay.png";
import upload_icon from "./upload.png";


import razorpay from "./razorpay.png";
import stripe from "./stripe.png";

import hero from "./hero.png";
import footer_img from "./footer_img.png";
import product_bg from "./product_img.png";
import blur_hero from "./blur_hero.png";
import support_illustration from "./support_illustration.png";
import about from "./about.png";
import testimonials from "./testimonials.png";
import testimonials2 from "./testimonials2.png";
import testimonials3 from "./testimonials3.png";

export const assets = {
  logo,
  menu,
  profile,
  dropdown,
  web_icon,
  uiux_icon,
  google_pay,
  app_icon,
  cloud_icon,
  cybersecurity,
  startup,
  bussiness,
  automation,
  businessCun,
  analytic,
  cloud,
  tech,
  telephone,
  message,
  user,
  mail,
  tick_icon,
  send_icon,
  chat,
  lock,
  
  upload_icon,


  razorpay,
  stripe,

  hero,
  footer_img,
  product_bg,
  blur_hero,
  support_illustration,
  about,
  testimonials,
  testimonials2,
  testimonials3,
};

export const packages = [
  {
    name: "pro",
    price: 4999,
    originalPrice: 10999,
    features: [
      "5 pages Website",
      "1 Year Free Domain Name ( .com .in .org )",
      "Dynamic Website ( Premium Design )",
      "Live Chat Integration",
      "Payment Gateway Integration",
      "1 Year Free Technical Support For Website",
    ],
  },
  {
    name: "custom",
    price: " ?????",
    originalPrice: 19999,
    minAdvance: 1499,
    isCustom: true, // 🔧 Flag for special rendering
    features: [
      "Choose Your Page Count",
      "1 Year Free Domain Name ( .com .in .org )",
      "Dynamic Website ( Premium Design )",
      "Live Chat Integration",
      "Payment Gateway Integration",
      "100% Responsive Website",
      "OTP Verification Features",
      "Lifetime 24/7 Free Hosting Support",
      "1 Year Free Technical Support For Website",
    ],
  },
  {
    name: "preminum",
    price: 10999,
    originalPrice: 15999,
    features: [
      "12 pages Website",
      "1 Year Free Domain Name ( .com .in .org )",
      "Dynamic Website ( Premium Design )",
      "Live Chat Integration",
      "100% Responsive Website",
      "OTP Verification Features",
      "Lifetime 24/7 Free Hosting Support",
      "1 Year Free Technical Support For Website",
    ],
  },
];

export const services = [
  {
    _id: "service1",
    title: "Website Development",
    description:
      "Imagine a website that grows with your business, adapts to any screen, and is built exactly for what you need. What does your ideal online presence look like?",
    icon: web_icon,
    images: [web_icon, cloud],
    details:
      "We specialize in building custom websites using the latest tech like React, Tailwind, and Node.js. From landing pages to e-commerce platforms, our team delivers fast, scalable, SEO-friendly websites with pixel-perfect design and responsive performance.",
  },
  {
    _id: "service2",
    title: "24*7 FREE SUPPORT",
    description:
      "We believe in empowering your success around the clock. That's why every client gets access to 24/7 free support. No matter when you need us, our team is ready to help, ensuring your peace of mind and uninterrupted progress",
    icon: uiux_icon,
    images: [uiux_icon],
    details:
      "We craft seamless digital experiences focusing on accessibility, usability, and elegance. Our UI/UX design services cover wireframes, high-fidelity prototypes, and design systems, ensuring user engagement and brand consistency.",
  },
  {
    _id: "service3",
    title: "Compelling Content Writing",
    description:
      "Does your message truly resonate with your audience? We craft engaging, SEO-optimized content that captivates, informs, and converts. What story does your brand need to tell?",
    icon: app_icon,
    images: [app_icon, cloud],
    details:
      "From captivating website copy and informative blog posts to persuasive marketing materials, our expert content writers produce high-quality, SEO-friendly text designed to engage your target audience and drive conversions. We focus on clarity, brand voice, and strategic keyword integration to ensure your message is not just heard, but remembered.",
  },
  {
    _id: "service4",
    title: "Web Design Enhancement",
    description:
      "Is your existing website performing its best? We'll transform your current online presence with strategic enhancements, improving user experience and visual appeal to maximize your impact.",
    icon: cloud_icon,
    images: [cloud_icon],
    details:
      "We provide full-service SEO including technical audits, keyword optimization, schema implementation, and content strategy. Our goal is to maximize your search visibility and organic traffic growth.",
  },
  {
    _id: "service5",
    title: "Brand Strategy",
    description: "Build strong brand identity and awareness.",
    icon: startup,
    images: [startup, businessCun],
    details:
      "We help startups and businesses define their voice, identity, and brand story. Our brand strategies build emotional connections with audiences and foster long-term brand loyalty.",
  },
  {
    _id: "service6",
    title: "Dynamic Video Editing",
    description:
      "Ready to bring your vision to life with powerful visuals? We transform raw footage into compelling stories that capture attention and leave a lasting impression.",

    icon: bussiness,
    images: [bussiness, automation],
    details:
      "From corporate explainers and social media shorts to cinematic advertisements, our video editing experts craft high-quality, engaging videos that convey your message effectively. We handle everything from raw footage organization and sound design to visual effects and color grading, ensuring a polished, professional final product that resonates with your audience.",
  },
    {
    _id: "service7",
    title: "Tech Support & Maintenance",
    description:
      "Ongoing support, updates, and maintenance to keep your digital assets secure and running smoothly.",
    icon: tech,
    images: [tech],
    details:
      "Our support includes bug fixes, software upgrades, security patches, and infrastructure monitoring. We ensure your systems stay updated, available, and secure 24/7.",
  },
  // {
  //   _id: "service7",
  //   title: "Content Creation",
  //   description: "Engaging visuals, text, and media.",
  //   icon: businessCun,
  //   images: [businessCun, uiux_icon],
  //   details:
  //     "From blogs and whitepapers to videos and infographics, we create compelling content that resonates with your audience, boosts SEO, and builds thought leadership in your domain.",
  // },
  // {
  //   _id: "service8",
  //   title: "E-Commerce Solutions",
  //   description: "Scalable online stores with payment integration.",
  //   icon: automation,
  //   images: [automation, web_icon],
  //   details:
  //     "Our team builds secure, scalable e-commerce platforms with payment gateways, inventory management, product catalogs, and user-friendly checkouts that drive sales and customer satisfaction.",
  // },
  // {
  //   _id: "service9",
  //   title: "Business Automation",
  //   description: "Tools and systems to streamline your business.",
  //   icon: cybersecurity,
  //   images: [cybersecurity, automation],
  //   details:
  //     "Automate workflows, customer engagement, lead capture, invoicing, and analytics with tools like Zapier, Airtable, and custom APIs to reduce manual work and improve efficiency.",
  // },

  // {
  //   _id: "service11",
  //   title: "Cloud Integration",
  //   description:
  //     "Streamline operations with seamless cloud services integration including AWS, Azure, and Google Cloud.",
  //   icon: cloud,
  //   images: [cloud, tech],
  //   details:
  //     "We architect and deploy scalable, secure cloud environments that reduce cost and improve agility. Services include CI/CD pipelines, microservices, containerization, and cloud migration.",
  // },
  // {
  //   _id: "service12",
  //   title: "Data Analytics & Insights",
  //   description:
  //     "Unlock powerful insights from your data to drive smarter decisions and better ROI.",
  //   icon: analytic,
  //   images: [analytic, cloud],
  //   details:
  //     "We use data visualization, dashboards, and advanced analytics to help you make informed decisions. Our tools turn raw data into actionable insights that fuel growth and innovation.",
  // },
];
