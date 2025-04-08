// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Stall = require("./models/Stall");

dotenv.config(); // loads .env variables

const stalls = [];

for (let i = 1; i <= 20; i++) {
  stalls.push({
    number: i,
    area: 100 + i * 10,
    price: 10000 + i * 500,
    booked: false,
  });
}

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Stall.deleteMany({});
    await Stall.insertMany(stalls);
    console.log("✅ Database Seeded");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

seedDB();
