// realsoccer/scripts/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../server/src/models/User');
const Player = require('../server/src/models/Player');
const League = require('../server/src/models/League');
const Fixture = require('../server/src/models/Fixture');
const NewsArticle = require('../server/src/models/NewsArticle');
const Product = require('../server/src/models/Product');
const Order = require('../server/src/models/Order');
const Payment = require('../server/src/models/Payment');
const logger = require('../server/src/config/logger'); // Reusing server logger

dotenv.config({ path: './server/.env' }); // Load server .env file

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`MongoDB Connected for Seeding: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB for seeding: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  try {
    logger.info('Clearing existing data...');
    await User.deleteMany({});
    await Player.deleteMany({});
    await League.deleteMany({});
    await Fixture.deleteMany({});
    await NewsArticle.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Payment.deleteMany({});
    logger.info('Existing data cleared.');

    logger.info('Seeding users...');
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@realsoccer.com',
      password: 'adminpassword', // Password will be hashed by pre-save hook
      role: 'admin',
    });

    const regularUser = await User.create({
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'userpassword',
      role: 'user',
    });
    logger.info('Users seeded.');

    logger.info('Seeding leagues...');
    const premierLeague = await League.create({
      name: 'Premier League',
      country: 'England',
      logo: 'https://placehold.co/150x150/00507a/ffffff?text=PL',
      description: 'Top-tier English football league.',
      season: '2024/2025',
    });

    const laLiga = await League.create({
      name: 'La Liga',
      country: 'Spain',
      logo: 'https://placehold.co/150x150/d40026/ffffff?text=LL',
      description: 'Top-tier Spanish football league.',
      season: '2024/2025',
    });
    logger.info('Leagues seeded.');

    logger.info('Seeding players...');
    const messi = await Player.create({
      name: 'Lionel Messi',
      team: 'Inter Miami CF',
      position: 'Forward',
      nationality: 'Argentinian',
      dateOfBirth: new Date('1987-06-24'),
      height: 170,
      weight: 72,
      jerseyNumber: 10,
      profileImage: 'https://placehold.co/150x150/000000/ffffff?text=Messi',
      statistics: { goals: 700, assists: 300, matchesPlayed: 850 },
      biography: 'Widely regarded as one of the greatest players of all time.',
    });

    const ronaldo = await Player.create({
      name: 'Cristiano Ronaldo',
      team: 'Al Nassr FC',
      position: 'Forward',
      nationality: 'Portuguese',
      dateOfBirth: new Date('1985-02-05'),
      height: 187,
      weight: 83,
      jerseyNumber: 7,
      profileImage: 'https://placehold.co/150x150/000000/ffffff?text=Ronaldo',
      statistics: { goals: 750, assists: 250, matchesPlayed: 900 },
      biography: 'One of the most prolific goalscorers in football history.',
    });
    logger.info('Players seeded.');

    logger.info('Seeding fixtures...');
    await Fixture.create({
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool FC',
      league: premierLeague._id,
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      location: 'Old Trafford',
      status: 'scheduled',
    });

    await Fixture.create({
      homeTeam: 'Real Madrid',
      awayTeam: 'FC Barcelona',
      league: laLiga._id,
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      location: 'Santiago Bernabéu',
      status: 'scheduled',
    });
    logger.info('Fixtures seeded.');

    logger.info('Seeding news articles...');
    await NewsArticle.create({
      title: 'Transfer Rumours: Star Player Linked with Premier League Move',
      content: 'Speculation grows around a major transfer deal involving a top European club and a highly-rated midfielder...',
      author: 'Sports Reporter',
      category: 'transfer news',
      imageUrl: 'https://placehold.co/600x400/cccccc/333333?text=Transfer+News',
      tags: ['transfer', 'rumours', 'premier league'],
    });

    await NewsArticle.create({
      title: 'Match Report: Thrilling Derby Ends in Draw',
      content: 'In a hotly contested derby, both teams battled hard, but neither could find a decisive winner, ending in a 2-2 draw...',
      author: 'Match Analyst',
      category: 'match report',
      imageUrl: 'https://placehold.co/600x400/cccccc/333333?text=Match+Report',
      tags: ['derby', 'draw', 'highlights'],
    });
    logger.info('News articles seeded.');

    logger.info('Seeding products...');
    await Product.create({
      name: 'Official Team A Home Jersey',
      description: 'The official home jersey for Team A, season 2024/2025. Made with breathable fabric.',
      price: 89.99,
      category: 'jersey',
      brand: 'Adidas',
      imageUrl: 'https://placehold.co/400x400/00507a/ffffff?text=Jersey',
      stock: 50,
    });

    await Product.create({
      name: 'Pro Match Football',
      description: 'High-quality match ball, FIFA approved for professional play.',
      price: 120.00,
      category: 'ball',
      brand: 'Nike',
      imageUrl: 'https://placehold.co/400x400/d40026/ffffff?text=Ball',
      stock: 30,
    });
    logger.info('Products seeded.');

    logger.info('Database seeding complete!');
  } catch (error) {
    logger.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  } finally {
    mongoose.disconnect();
  }
};

// Execute the seeding function
seedData();