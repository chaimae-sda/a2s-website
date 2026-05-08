import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initializeDatabase = async () => {
  try {
    const dbName = process.env.DB_NAME || 'a2s_website';
    
    // Connection without database
    const initialConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    // Create database if it doesn't exist
    await initialConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await initialConnection.end();

    // Connect to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: dbName,
    });

    // Read and execute schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    const statements = schema.split(';').filter(stmt => stmt.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }

    // Insert data
    await insertData(connection);

    console.log('✅ Base de données initialisée avec succès!');
    await connection.end();
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
};

const insertData = async (connection) => {
  // Insert Services
  const services = [
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      image: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1332&auto=format&fit=crop',
      description: 'Solutions d\'IA innovantes pour votre croissance',
      about: 'Notre équipe maîtrise les techniques avancées de Machine Learning et d\'Intelligence Artificielle pour transformer vos données en insights actionnables. Du traitement du langage naturel à la vision par ordinateur, nous développons des modèles sur mesure adaptés à vos problématiques métier.',
      whyUs: 'Nos ingénieurs combinent expertise académique de l\'INPT et expérience terrain pour livrer des solutions ML performantes. Nous utilisons les frameworks les plus récents (TensorFlow, PyTorch, Scikit-learn) et suivons les meilleures pratiques MLOps pour garantir des modèles fiables et maintenables.'
    },
    {
      id: 'developpement-web-mobile',
      title: 'Développement Web & Mobile',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop',
      description: 'Applications modernes et performantes',
      about: 'Nous concevons et développons des applications web et mobiles complètes, du design UI/UX au déploiement. Notre stack technologique couvre React, Next.js, Node.js, Flutter et React Native pour créer des expériences utilisateur fluides et des architectures backend robustes.',
      whyUs: 'Notre équipe combine expertise en design thinking et architecture logicielle pour créer des applications qui non seulement répondent à vos besoins actuels mais évoluent avec vous.'
    },
    {
      id: 'design-graphique',
      title: 'Design & UX/UI',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=350&fit=crop',
      description: 'Design moderne et interfaces innovantes',
      about: 'Nos designers créent des expériences visuelles captivantes et intuitives. Du branding au design d\'interfaces, nous mettons l\'accent sur l\'utilisateur et l\'accessibilité pour créer des produits mémorables.',
      whyUs: 'Nous croyons que le bon design est invisible - il fait juste fonctionner. Nos équipes suivent les dernières tendances et meilleures pratiques d\'accessibilité pour garantir une expérience utilisateur exceptionnelle.'
    }
  ];

  for (const service of services) {
    await connection.execute(
      'INSERT INTO services (id, title, image, description, about, whyUs) VALUES (?, ?, ?, ?, ?, ?)',
      [service.id, service.title, service.image, service.description, service.about, service.whyUs]
    );
  }

  // Insert Projects
  const projects = [
    {
      slug: 'jumeau-numerique-ocp',
      title: 'Jumeau Numérique Pipeline OCP',
      category: 'IoT Industriel / IA',
      service_id: 'machine-learning',
      date: '12 Jan 2026',
      description: 'Un tableau de bord de surveillance en temps réel conçu pour l\'OCP afin de visualiser les flux de transport de phosphate. Utilisant la technologie de Jumeau Numérique, ce système prédit les besoins de maintenance et optimise l\'efficacité logistique de 24%.',
      fullDescription: 'Ce projet ambitieux combine l\'Internet des Objets industriel et l\'Intelligence Artificielle pour créer un jumeau numérique du pipeline de transport de phosphate de l\'OCP. Le système collecte des données en temps réel via des capteurs IoT déployés le long du pipeline, les analyse avec des modèles de Machine Learning, et présente les résultats dans un tableau de bord interactif. Les algorithmes prédictifs permettent d\'anticiper les pannes et d\'optimiser la maintenance, réduisant les temps d\'arrêt de 24%. Le projet utilise Python, TensorFlow, et React pour le frontend du dashboard.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2670',
      technologies: ['Python', 'TensorFlow', 'React', 'IoT Sensors', 'AWS']
    },
    {
      slug: 'plateforme-elearning-inpt',
      title: 'Plateforme E-Learning INPT',
      category: 'Full Stack Web (MERN)',
      service_id: 'developpement-web-mobile',
      date: '20 Déc 2025',
      description: 'Un hub académique centralisé pour les étudiants de l\'INPT. Comprend le streaming de cours en temps réel, des portails de soumission de devoirs et des espaces collaboratifs. La plateforme dessert plus de 800 étudiants actifs quotidiennement.',
      fullDescription: 'Cette plateforme e-learning complète a été développée avec la stack MERN (MongoDB, Express, React, Node.js) pour centraliser l\'expérience académique des étudiants de l\'INPT. Elle intègre un système de streaming vidéo en temps réel pour les cours, un portail de soumission et correction de devoirs, des espaces de collaboration par projet, et un tableau de bord personnalisé pour chaque étudiant. L\'architecture microservices assure une scalabilité optimale pour les 800+ utilisateurs quotidiens.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2674',
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Socket.io']
    },
    {
      slug: 'app-mobile-smart-campus',
      title: 'App Mobile Smart Campus',
      category: 'Mobile Dev (Flutter)',
      service_id: 'developpement-web-mobile',
      date: '15 Nov 2025',
      description: 'Une application mobile intuitive pour la navigation sur le campus et la gestion d\'événements. Intégrée avec des capteurs IoT pour la disponibilité des salles, elle améliore l\'expérience étudiante quotidienne.',
      fullDescription: 'L\'application Smart Campus, développée en Flutter, offre une expérience mobile complète pour les étudiants de l\'INPT. Elle inclut une carte interactive du campus avec navigation GPS, un système de réservation de salles alimenté par des capteurs IoT de présence, un calendrier d\'événements avec notifications push, et un annuaire étudiant. L\'application communique avec un backend Firebase pour la synchronisation en temps réel des données.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2670',
      technologies: ['Flutter', 'Dart', 'Firebase', 'IoT', 'Google Maps API']
    }
  ];

  for (const project of projects) {
    const [result] = await connection.execute(
      'INSERT INTO projects (slug, title, category, service_id, date, description, fullDescription, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [project.slug, project.title, project.category, project.service_id, project.date, project.description, project.fullDescription, project.image]
    );

    // Insert technologies for this project
    for (const tech of project.technologies) {
      await connection.execute(
        'INSERT INTO project_technologies (project_id, technology) VALUES (?, ?)',
        [result.insertId, tech]
      );
    }
  }

  // Insert Team Members
  const team = [
    {
      name: 'Haddadi Youssef',
      role: 'Président',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQGS3YIb0rWU1g/profile-displayphoto-shrink_800_800/B4DZacfC96HEAc-/0/1746382110521?e=1774483200&v=beta&t=McJbXvgXed0UcF40WE4LW5imBi39ahQgfSKSya0QdEk',
      linkedin: 'https://www.linkedin.com/in/youssef-haddadi/'
    },
    {
      name: 'Lamsaaf Yassine',
      role: 'Vice-Président Relations Externes',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQHNKSgRDMW-KA/profile-displayphoto-shrink_400_400/B4EZThaL9.HgAg-/0/1738948526990?e=1774483200&v=beta&t=HSrakkIC5Wda3ofWfqPZ1YVU0dX477acrGJRB7pYEKg',
      linkedin: 'https://www.linkedin.com/in/yassine-lamsaaf-9821462a8/'
    },
    {
      name: 'Benhaimoud Hanane',
      role: 'Vice-Président Organisation',
      image: 'https://media.licdn.com/dms/image/v2/D4E22AQHpIa5LjTvsIw/feedshare-shrink_1280/feedshare-shrink_1280/0/1732521195245?e=1774483200&v=beta&t=W0yJPk1kSGs1WHdUprI66RDJwPf1t9n_jqOLpt4IZRY',
      linkedin: 'https://www.linkedin.com/in/hanane-benhaimoud/'
    },
    {
      name: 'Sellame Salwa',
      role: 'Secrétaire Générale',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQHcKJYSQMTvSw/profile-displayphoto-scale_400_400/B4EZm1CUQrHMAg-/0/1759678908682?e=1774483200&v=beta&t=cLI54ppqMN4ddVW-JTD0Z3NaZMZ_KEydozCG2iVj8Rw',
      linkedin: 'https://www.linkedin.com/in/salwa-sellame-596101340/'
    },
    {
      name: 'Sajia Hafssa',
      role: 'Trésorière',
      image: '/assets/WhatsApp Image 2026-03-10 at 18.35.43.jpeg',
      linkedin: 'https://www.linkedin.com/in/hafssa-sajia-30b285332/'
    },
    {
      name: 'Saadi Chaimae',
      role: 'Cellule Sponsoring',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQFr2__1MOrOvw/profile-displayphoto-scale_400_400/B4EZy6syKEHMAg-/0/1772658830166?e=1774483200&v=beta&t=RS-YSZfIk2oChpQ6NrCZPOdNRJ9DJbXh-5sC2zfanEI',
      linkedin: 'https://www.linkedin.com/in/chaimae-saadi/'
    },
    {
      name: 'Ertil Riyad',
      role: 'Cellule Prospection',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQHTQXlouJzUhQ/profile-displayphoto-scale_400_400/B4EZzRQIVdGcAg-/0/1773037194363?e=1774483200&v=beta&t=gmnVg-5tcxghcmc9eIFglS1VkeHfZ6qPsQoDoFkRRGA',
      linkedin: 'https://www.linkedin.com/in/ertil-riyad-b9682331b/'
    }
  ];

  for (const member of team) {
    await connection.execute(
      'INSERT INTO team_members (name, role, image, linkedin) VALUES (?, ?, ?, ?)',
      [member.name, member.role, member.image, member.linkedin]
    );
  }

  // Insert Upcoming Events
  const events = [
    {
      title: 'Hackathon A2S 2026',
      description: 'Un événement de 48 heures pour les étudiants innovants. Présentez vos meilleures idées et gagnez des prix importants!',
      date: '15 Juin 2026',
      time: '08:00',
      location: 'Campus INPT',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2670',
      status: 'upcoming'
    },
    {
      title: 'Atelier Web Development',
      description: 'Apprenez les dernières technologies web avec les experts d\'A2S. React, Node.js, et bien plus.',
      date: '20 Mai 2026',
      time: '14:30',
      location: 'Salle 203 - INPT',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70e504cb?auto=format&fit=crop&q=80&w=2670',
      status: 'upcoming'
    },
    {
      title: 'Conférence IA & Machine Learning',
      description: 'Rencontrez les leaders du domaine et explorez les tendances émergentes en IA.',
      date: '25 Mai 2026',
      time: '16:00',
      location: 'Grand Amphithéâtre',
      image: 'https://images.unsplash.com/photo-1577720643272-265f434b8a80?auto=format&fit=crop&q=80&w=2670',
      status: 'upcoming'
    }
  ];

  for (const event of events) {
    await connection.execute(
      'INSERT INTO upcoming_events (title, description, date, time, location, image, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [event.title, event.description, event.date, event.time, event.location, event.image, event.status]
    );
  }

  console.log('✅ Données insérées avec succès!');
};

initializeDatabase();
