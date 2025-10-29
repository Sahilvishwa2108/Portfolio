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
  SiAppwrite,
  SiDocker,
  SiGithub,
  SiLinkedin,
  SiInstagram
} from 'react-icons/si';


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

// Certificates data
export const certificates = [
  {
    id: 1,
    src: "/certificates/dbms.png",
    title: "NPTEL Programming in Java",
    category: 1,
    content: "Comprehensive certification in Java programming fundamentals, OOP concepts, and advanced Java features from NPTEL."
  },
  {
    id: 2,
    src: "/certificates/dbms.png",
    title: "NPTEL Database Management System",
    category: 2,
    content: "Certification in database design principles, SQL, normalization, transaction processing, and database administration."
  },
  {
    id: 3,
    src: "/certificates/infosys2.png",
    title: "High Impact Presentations",
    category: 3,
    content: "Learn to deliver high-impact presentations that generate results."
  },
  {
    id: 4,
    src: "/certificates/infosys3.png",
    title: "Java Language Features",
    category: 4,
    content: "Master the advanced features of Java programming with our comprehensive course."
  },
  {
    id: 5,
    src: "/certificates/delta.jpg",
    title: "Full Stack Web Development",
    category: 5,
    content: "Learn to build full stack web applications with our comprehensive course."
  },
  {
    id: 6,
    src: "/certificates/pwhacking.jpg",
    title: "Introduction to Ethical Hacking",
    category: 6,
    content: "Learn the basics of ethical hacking with our comprehensive beginner's course."
  },
  {
    id: 7,
    src: "/certificates/forage1.png",
    title: "TCS: Cybersecurity Analyst Job Simulation",
    category: 7,
    content: "Get hands-on experience with our cybersecurity analyst job simulation."
  },
  {
    id: 8,
    src: "/certificates/cisco1.png",
    title: "Introduction to Cybersecurity",
    category: 8,
    content: "Learn the basics of cybersecurity with our comprehensive beginner's course."
  },
  {
    id: 9,
    src: "/certificates/cisco2.png",
    title: "Cybersecurity Essentials",
    category: 9,
    content: "Master the essentials of cybersecurity with our comprehensive course."
  },
  {
    id: 10,
    src: "/certificates/cisco3.png",
    title: "Junior Cybersecurity Analyst",
    category: 10,
    content: "Get hands-on experience with our junior cybersecurity analyst job simulation."
  },
  {
    id: 11,
    src: "/certificates/cisco4.png",
    title: "Networking Basics",
    category: 11,
    content: "Learn the basics of networking with our comprehensive beginner's course."
  },
  {
    id: 12,
    src: "/certificates/cisco5.png",
    title: "Network Technician",
    category: 12,
    content: "Get hands-on experience with our network technician job simulation."
  },
  {
    id: 13,
    src: "/certificates/cisco6.png",
    title: "Networking Essentials",
    category: 13,
    content: "Master the essentials of networking with our comprehensive course."
  },
  {
    id: 14,
    src: "/certificates/cisco7.png",
    title: "Partner: Cloud Security",
    category: 14,
    content: "Learn the basics of cloud security with our comprehensive course."
  },
  {
    id: 15,
    src: "/certificates/cisco8.png",
    title: "Introduction to Packet Tracer",
    category: 15,
    content: "Get hands-on experience with our packet tracer simulation."
  },
  {
    id: 16,
    src: "/certificates/forage2.png",
    title: "Software Engineering Virtual Experience Program",
    category: 16,
    content: "Get hands-on experience with our software engineering virtual experience program."
  },
  {
    id: 17,
    src: "/certificates/aws-cloud.png",
    title: "AWS Cloud Foundation Certification",
    category: 17,
    content: "Certification covering foundational AWS cloud concepts, services, security, architecture, and operational best practices."
  },
  {
    id: 18,
    src: "/certificates/udemy1.jpg",
    title: "Complete Java Masterclass",
    category: 18,
    content: "Master the advanced features of Java programming with our comprehensive course."
  },
  {
    id: 19,
    src: "/certificates/udemy2.jpg",
    title: "Complete C++ 20 Masterclass",
    category: 19,
    content: "Master the advanced features of C++ programming with our comprehensive course."
  },
  {
    id: 20,
    src: "/certificates/infosys5.jpg",
    title: "Angular Certification",
    category: 20,
    content: "Master the essentials of Angular with our comprehensive course."
  },
  {
    id: 21,
    src: "/certificates/infosys6.png",
    title: "Email Writing Skills",
    category: 21,
    content: "Learn to write effective emails that get results."
  },
  {
    id: 22,
    src: "/certificates/infosys7.png",
    title: "Time Management",
    category: 22,
    content: "Learn to manage your time effectively and get more done."
  },
  {
    id: 23,
    src: "/certificates/infosys8.png",
    title: "HTML 5: The Language",
    category: 23,
    content: "Learn the basics of HTML 5 with our comprehensive course."
  },
  {
    id: 24,
    src: "/certificates/infosys9.png",
    title: "JavaScript Certification",
    category: 24,
    content: "Master the essentials of JavaScript with our comprehensive course."
  },
  {
    id: 25,
    src: "/certificates/infosys10.png",
    title: "BootStrap 4",
    category: 25,
    content: "Master the essentials of BootStrap 4 with our comprehensive course."
  },
  {
    id: 26,
    src: "/certificates/infosys11.png",
    title: "TypeScript Certification",
    category: 26,
    content: "Master the essentials of TypeScript with our comprehensive course."
  },
  {
    id: 27,
    src: "/certificates/infosys12.png",
    title: "CSS 3 Certification",
    category: 27,
    content: "Master the essentials of CSS 3 with our comprehensive course."
  }
];
