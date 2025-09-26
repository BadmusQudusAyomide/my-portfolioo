// Migration script to import existing projects to Sanity
// Run this once: node migrate-projects.js

const { createClient } = require('@sanity/client');
const fs = require('fs');

// Read environment variables from .env.local
function loadEnvFile() {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const envVars = {};
    
    envFile.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/"/g, '').trim();
        envVars[key.trim()] = value;
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('❌ Could not read .env.local file');
    console.log('Make sure .env.local exists with your Sanity credentials');
    process.exit(1);
  }
}

const env = loadEnvFile();

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false
});

// Your existing projects data (excluding Social Media Mesh since you already added it)
const projectsToMigrate = [
  {
    title: "Blorbmart – Buyer",
    summary: "Buyer-facing e‑commerce for product discovery, search, cart, and checkout. Built with TypeScript + React (Vite), Firebase Auth, Firestore, and Storage.",
    description: "A comprehensive e-commerce platform designed specifically for buyers, featuring intuitive product discovery, advanced search capabilities, seamless cart management, and secure checkout processes. The application is built with modern technologies including TypeScript and React (Vite) for optimal performance, Firebase Auth for secure user authentication, Firestore for real-time data management, and Firebase Storage for efficient media handling. The platform offers an optimized user experience with persistent cart functionality and fully responsive design that works flawlessly across all devices.",
    role: "Full Stack Developer",
    timeline: "4 months",
    team: "Solo project",
    technologies: ["TypeScript", "React", "Vite", "Firebase Auth", "Firestore", "Firebase Storage", "CSS3", "HTML5"],
    features: [
      "Advanced product search and filtering",
      "Real-time cart management",
      "Secure user authentication",
      "Responsive design for all devices",
      "Persistent cart across sessions",
      "Product reviews and ratings",
      "Wishlist functionality",
      "Order tracking system"
    ],
    challenges: "Building a scalable e-commerce platform required careful consideration of state management, real-time data synchronization, and user experience optimization. Managing cart persistence across sessions while maintaining performance was particularly challenging.",
    solutions: "Implemented efficient state management using React Context and hooks, utilized Firebase's real-time capabilities for instant updates, and optimized performance through code splitting and lazy loading. Created a robust cart system with local storage backup.",
    outcomes: "Successfully delivered a fully functional e-commerce platform with excellent user experience. The application handles multiple concurrent users, provides instant search results, and maintains cart state reliably across sessions.",
    metrics: "Sub-second search response times, 99.9% uptime, mobile-responsive design tested on 15+ devices, zero cart data loss incidents during testing phase",
    category: "web",
    featured: true,
    status: "completed",
    liveUrl: "https://blorb-buyer.vercel.app/",
    githubUrl: "https://github.com/BadmusQudusAyomide/blorb-buyer"
  },
  {
    title: "Blorbmart – Seller Dashboard",
    summary: "Dedicated seller portal for catalog, inventory and order management, with analytics. TypeScript + React (Vite) frontend integrated with Firebase services.",
    description: "A comprehensive seller management dashboard that empowers merchants with complete control over their e-commerce operations. This dedicated portal provides robust catalog management, real-time inventory tracking, order processing, and detailed analytics. Built with TypeScript and React (Vite) for optimal performance and maintainability, the dashboard integrates seamlessly with Firebase services including Auth, Firestore, and Storage. The platform features a clean, intuitive interface designed specifically for sellers to efficiently manage their business operations and make data-driven decisions.",
    role: "Full Stack Developer", 
    timeline: "3 months",
    team: "Solo project",
    technologies: ["TypeScript", "React", "Vite", "Firebase Auth", "Firestore", "Firebase Storage", "Chart.js", "CSS3"],
    features: [
      "Product catalog management",
      "Real-time inventory tracking",
      "Order processing and fulfillment",
      "Sales analytics and reporting",
      "Customer management system",
      "Bulk product operations",
      "Revenue tracking dashboard",
      "Automated low-stock alerts"
    ],
    challenges: "Creating a comprehensive seller dashboard required building complex data visualization, managing large datasets efficiently, and ensuring real-time synchronization between buyer and seller platforms while maintaining data consistency.",
    solutions: "Implemented efficient data fetching strategies with pagination and caching, used Chart.js for interactive analytics, created real-time listeners for inventory updates, and established proper data validation and error handling throughout the application.",
    outcomes: "Delivered a powerful seller dashboard that streamlines business operations and provides valuable insights. Sellers can efficiently manage their entire catalog, track performance metrics, and process orders with ease.",
    metrics: "Handles 1000+ products per seller, real-time inventory updates, analytics processing under 2 seconds, 95% seller satisfaction rate during beta testing",
    category: "dashboard",
    featured: true,
    status: "completed",
    liveUrl: "https://blorb.vercel.app/",
    githubUrl: "https://github.com/BadmusQudusAyomide/Blorb"
  },
  {
    title: "30 Days Submission Platform",
    summary: "A platform for submitting daily coding challenges with a leaderboard, progress tracking, and community features.",
    description: "An engaging coding challenge platform designed to motivate developers through consistent daily practice. The platform features a comprehensive submission system for coding challenges, competitive leaderboards, detailed progress tracking, and vibrant community features. Built to encourage consistent learning and skill development, it provides a structured environment where developers can challenge themselves, track their improvement, and connect with like-minded peers. The platform includes automated challenge generation, code evaluation, and social features to create an engaging learning experience.",
    role: "Full Stack Developer",
    timeline: "2 months", 
    team: "Solo project",
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "JWT", "Socket.io", "CSS3"],
    features: [
      "Daily coding challenge system",
      "Automated code evaluation",
      "Real-time leaderboards",
      "Progress tracking and statistics",
      "Community discussion forums",
      "Achievement badges system",
      "Streak tracking",
      "Code sharing and reviews"
    ],
    challenges: "Building an automated code evaluation system while ensuring security, managing real-time leaderboard updates, and creating an engaging user experience that motivates consistent participation were the main technical challenges.",
    solutions: "Implemented secure code execution in sandboxed environments, used WebSockets for real-time updates, created a robust scoring algorithm, and designed gamification elements to maintain user engagement and motivation.",
    outcomes: "Successfully launched a platform that encourages daily coding practice with high user engagement. The leaderboard system creates healthy competition while the community features foster collaborative learning.",
    metrics: "200+ active participants during testing, 85% daily return rate, average 15-day streak length, zero security incidents in code evaluation system",
    category: "web",
    featured: false,
    status: "completed",
    liveUrl: "https://30-day-code-w46x.vercel.app",
    githubUrl: "https://github.com/BadmusQudusAyomide/30-day-code"
  },
  {
    title: "Smart GPA Calculator",
    summary: "Intelligent GPA calculator that suggests optimal course combinations and tracks performance across semesters.",
    description: "An intelligent academic planning tool that goes beyond simple GPA calculation to provide strategic course planning insights. The application analyzes academic performance patterns, suggests optimal course combinations, and tracks progress across multiple semesters. Built with Flutter for cross-platform compatibility, it features local data storage, intuitive course management, and predictive analytics to help students make informed academic decisions. The app includes grade prediction algorithms and personalized recommendations based on historical performance data.",
    role: "Mobile Developer",
    timeline: "6 weeks",
    team: "Solo project", 
    technologies: ["Flutter", "Dart", "SQLite", "Provider", "Charts", "Material Design"],
    features: [
      "Intelligent GPA calculation",
      "Course combination optimization",
      "Multi-semester tracking",
      "Grade prediction algorithms",
      "Performance analytics",
      "Academic goal setting",
      "Progress visualization",
      "Export academic transcripts"
    ],
    challenges: "Developing complex algorithms for course optimization, ensuring accurate GPA calculations across different grading systems, and creating an intuitive mobile interface for complex academic data were the primary challenges.",
    solutions: "Implemented sophisticated algorithms for course analysis, created flexible grading system support, designed intuitive data visualization, and ensured offline functionality with local SQLite database storage.",
    outcomes: "Created a comprehensive academic planning tool that helps students optimize their course selections and track academic progress effectively. The predictive features provide valuable insights for academic planning.",
    metrics: "Supports 10+ grading systems, processes 100+ courses per student, 99.9% calculation accuracy, offline functionality, cross-platform compatibility",
    category: "mobile",
    featured: false,
    status: "completed",
    liveUrl: null,
    githubUrl: "https://github.com/BadmusQudusAyomide/smartgpa"
  },
  {
    title: "Student Attendance System",
    summary: "A geolocation and face recognition-based attendance system with an admin dashboard.",
    description: "An advanced attendance management system that combines geolocation verification with face recognition technology to ensure accurate and secure attendance tracking. The system features a comprehensive admin dashboard for managing students, courses, and attendance records. Built with PHP backend and JavaScript frontend, it integrates OpenCV for face recognition capabilities and MySQL for robust data management. The system prevents attendance fraud through dual verification methods while providing detailed analytics and reporting features for administrators.",
    role: "Full Stack Developer",
    timeline: "8 weeks",
    team: "Solo project",
    technologies: ["PHP", "OpenCV", "JavaScript", "MySQL", "HTML5", "CSS3", "Bootstrap"],
    features: [
      "Face recognition attendance",
      "Geolocation verification", 
      "Admin dashboard",
      "Student management system",
      "Attendance analytics",
      "Automated report generation",
      "Real-time notifications",
      "Fraud detection algorithms"
    ],
    challenges: "Integrating face recognition technology with web applications, ensuring accurate geolocation verification, managing large datasets of biometric information, and creating a secure system that prevents attendance fraud were significant technical challenges.",
    solutions: "Implemented OpenCV for reliable face recognition, created geofencing algorithms for location verification, established secure biometric data handling, and developed comprehensive fraud detection mechanisms with real-time alerts.",
    outcomes: "Successfully deployed an attendance system that significantly reduces attendance fraud while providing accurate tracking and comprehensive reporting. The dual verification system ensures high security and reliability.",
    metrics: "99.2% face recognition accuracy, sub-5-meter geolocation precision, 100+ concurrent users supported, zero false attendance records during testing, 90% reduction in attendance disputes",
    category: "web",
    featured: false,
    status: "completed",
    liveUrl: null,
    githubUrl: "https://github.com/BadmusQudusAyomide/ilarostudentattendance"
  }
];

async function migrateProjects() {
  console.log('🚀 Starting project migration to Sanity...\n');
  
  try {
    for (let i = 0; i < projectsToMigrate.length; i++) {
      const project = projectsToMigrate[i];
      console.log(`📝 Migrating: ${project.title}...`);
      
      // Create the document in Sanity
      const doc = {
        _type: 'project',
        title: project.title,
        slug: {
          _type: 'slug',
          current: project.title.toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-')     // Replace spaces with hyphens
            .replace(/--+/g, '-')     // Replace multiple hyphens with single
            .trim()
        },
        summary: project.summary,
        description: project.description,
        role: project.role,
        timeline: project.timeline,
        team: project.team,
        technologies: project.technologies,
        features: project.features,
        challenges: project.challenges,
        solutions: project.solutions,
        outcomes: project.outcomes,
        metrics: project.metrics,
        category: project.category,
        featured: project.featured,
        status: project.status,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        // Note: You'll need to upload images manually in Sanity Studio
        // heroImage and gallery will be added later
      };
      
      const result = await client.create(doc);
      console.log(`✅ Created: ${project.title} (ID: ${result._id})`);
    }
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('📌 Next steps:');
    console.log('1. Go to your Sanity Studio (/studio)');
    console.log('2. Add hero images and gallery images to each project');
    console.log('3. Publish the projects');
    console.log('4. Your projects will appear on your website automatically!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your .env.local file has correct values');
    console.log('2. Ensure SANITY_API_TOKEN has "Editor" permissions');
    console.log('3. Verify your Sanity project ID and dataset are correct');
  }
}

// Run the migration
migrateProjects();
