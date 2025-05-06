import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiReact, 
  SiVercel,
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiCloudinary,
  SiFirebase,
  SiAppwrite,
  SiDocker,
  SiGithub,
  SiLinkedin,
  SiInstagram
} from 'react-icons/si';
import { IconType } from 'react-icons';


// Update projects to use React Icon components
export const projects = [
  {
    id: 1,
    title: "Office Pilot (SaaS)",
    des: "A comprehensive office management SaaS featuring task delegation, client management, real-time collaboration, and role-based access control using Next.js, React, Tailwind CSS, Prisma, PostgreSQL, Redis pub/sub.",
    img: "/projects/officepilot.png",
    iconList: [SiNextdotjs, SiTailwindcss, SiTypescript, SiReact, SiVercel],
    link: "https://officepilot.vercel.app/",
    github: "https://github.com/Sahilvishwa2108/office_management_system",
    featured: true
  },
  {
    id: 2,
    title: "AI Powered Anonymous Feedback",
    des: "A feedback collection platform with AI-driven suggestions, secure authentication, and real-time updates using Next.js, React, TypeScript, NextAuth.js, and OpenAI API.",
    img: "/projects/truefeedback.png",
    iconList: [SiNextdotjs, SiTailwindcss, SiTypescript, SiReact, SiVercel],
    link: "https://anonymousfeedbacks.vercel.app/",
    github: "https://github.com/Sahilvishwa2108/feedback_app",
    featured: true
  },
  {
    id: 3,
    title: "Personal Portfolio",
    des: "A personal portfolio website built with Next.js, TypeScript and Tailwind CSS.",
    img: "/projects/portfolio.png",
    iconList: [SiNextdotjs, SiTailwindcss, SiTypescript, SiVercel],
    link: "https://sahilvishwa2108.vercel.app/",
    github: "https://github.com/Sahilvishwa2108/portfolio"
  },
  {
    id: 4,
    title: "Blog Web App",
    des: "A blog web app built with React.js, JavaScript, Tailwind CSS and Appwrite.",
    img: "/projects/blogwebapp.png",
    iconList: [SiHtml5, SiCss3, SiTailwindcss, SiJavascript, SiReact],
    link: "https://blog-web-app-sigma.vercel.app/",
    github: "https://github.com/Sahilvishwa2108/BlogWebApp"
  },
  {
    id: 5,
    title: "Video Tube",
    des: "scalable backend for a video-sharing platform using Node.js, Express.js, MongoDB, Cloudinary & Multer.",
    img: "/projects/videotube.png",
    iconList: [SiNodedotjs, SiExpress, SiMongodb, SiCloudinary],
    link: "https://github.com/Sahilvishwa2108/VideoTube.git",
    github: "https://github.com/Sahilvishwa2108/VideoTube.git"
  },
  {
    id: 6,
    title: "Simon Says Game",
    des: "A Simon Says Game built with HTML, CSS and JavaScript.",
    img: "/projects/simon.png",
    iconList: [SiHtml5, SiCss3, SiJavascript],
    link: "https://sahilvishwa2108.github.io/Simon-Says-Game/",
    github: "https://github.com/Sahilvishwa2108/Simon-Says-Game"
  },
];


export const companies = [
  {
    id: 1,
    name: "Cloudinary",
    icon: SiCloudinary,
  },
  {
    id: 2,
    name: "Appwrite",
    icon: SiAppwrite,
  },
  {
    id: 3,
    name: "Hostinger",
    icon: SiVercel, // Using Vercel as a placeholder, replace with appropriate icon
  },
  {
    id: 4,
    name: "Stream",
    icon: SiNodedotjs, // Using Node.js as a placeholder, replace with appropriate icon
  },
  {
    id: 5,
    name: "Docker",
    icon: SiDocker,
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Full Stack Developer",
    desc: "Assisted in the development of a web-based platform using Next.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg", // Keep the thumbnail path for now
  },
  {
    id: 2,
    title: "Problem Solver",
    desc: "Participated in hackathons and coding competitions, honing problem-solving skills and algorithmic thinking.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "UI/UX Design",
    desc: "Designed stunning UIs and animations using GSAP, Framer Motion, and modern libraries for impactful UX.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    desc: "Implemented CI/CD pipelines and containers using Docker, enhancing deployment efficiency.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];


export const socialMedia = [
  {
    id: 1,
    icon: SiGithub,
    link: "https://github.com/Sahilvishwa2108",
  },
  {
    id: 2,
    icon: SiLinkedin,
    link: "https://www.linkedin.com/in/sahilvishwa2108/",
  },
  {
    id: 3,
    icon: SiInstagram,
    link: "https://www.instagram.com/sahilvishwa2108/",
  },
];
