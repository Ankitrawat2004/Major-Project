if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing");

const homepageListings = [
  {
    title: "Warm Designer Home in Noida",
    description: "A softly lit designer home with a spacious lounge, modern comforts, and quick access to central Noida.",
    image: {
      filename: "noida-designer-home",
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=82"
    },
    price: 11736,
    location: "Noida",
    country: "India",
    geometry: { type: "Point", coordinates: [77.391, 28.5355] }
  },
  {
    title: "Elegant Flat in Noida",
    description: "An elegant apartment with rich interiors, comfortable bedrooms, and a calm residential setting.",
    image: {
      filename: "noida-elegant-flat",
      url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=82"
    },
    price: 12000,
    location: "Noida",
    country: "India",
    geometry: { type: "Point", coordinates: [77.3812, 28.5743] }
  },
  {
    title: "Garden Guest Suite in Noida",
    description: "A private guest suite surrounded by plants, with a peaceful patio and bright indoor spaces.",
    image: {
      filename: "noida-garden-suite",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=82"
    },
    price: 5044,
    location: "Noida",
    country: "India",
    geometry: { type: "Point", coordinates: [77.3651, 28.6082] }
  },
  {
    title: "Skyline Balcony Home in Noida",
    description: "A contemporary home with a sunset balcony, skyline views, and an inviting outdoor swing.",
    image: {
      filename: "noida-skyline-balcony",
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=82"
    },
    price: 6890,
    location: "Noida",
    country: "India",
    geometry: { type: "Point", coordinates: [77.4237, 28.5535] }
  },
  {
    title: "Luxury Flat near Sector 94",
    description: "A polished high-rise stay with floor-to-ceiling windows, a king bed, and sweeping city views.",
    image: {
      filename: "noida-sector-94-luxury",
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=82"
    },
    price: 5280,
    location: "Noida Sector 94",
    country: "India",
    geometry: { type: "Point", coordinates: [77.3287, 28.5222] }
  },
  {
    title: "Panoramic Suite in Sector 94",
    description: "A bright suite with panoramic windows, refined decor, and an easy connection to Delhi.",
    image: {
      filename: "noida-sector-94-suite",
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=82"
    },
    price: 5998,
    location: "Noida Sector 94",
    country: "India",
    geometry: { type: "Point", coordinates: [77.3314, 28.5208] }
  },
  {
    title: "Modern Studio in Gurgaon",
    description: "A stylish studio close to Cyber City with hotel-like comforts and a dedicated work corner.",
    image: {
      filename: "gurgaon-modern-studio",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=82"
    },
    price: 6200,
    location: "Gurgaon",
    country: "India",
    geometry: { type: "Point", coordinates: [77.0266, 28.4595] }
  },
  {
    title: "City View Apartment in Gurugram",
    description: "A relaxing city apartment with large windows, modern interiors, and excellent metro access.",
    image: {
      filename: "gurugram-city-view",
      url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=82"
    },
    price: 7550,
    location: "Gurugram",
    country: "India",
    geometry: { type: "Point", coordinates: [77.089, 28.4437] }
  },
  {
    title: "Golf Course Road Retreat",
    description: "A refined retreat near Golf Course Road with warm lighting, premium bedding, and a quiet lounge.",
    image: {
      filename: "gurgaon-golf-course-retreat",
      url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=82"
    },
    price: 8400,
    location: "Gurgaon",
    country: "India",
    geometry: { type: "Point", coordinates: [77.1031, 28.4483] }
  },
  {
    title: "Cyber City Executive Suite",
    description: "A comfortable executive suite near Cyber City, ideal for work trips and relaxed weekends.",
    image: {
      filename: "gurgaon-cyber-city-suite",
      url: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=82"
    },
    price: 7900,
    location: "Gurgaon",
    country: "India",
    geometry: { type: "Point", coordinates: [77.0887, 28.4949] }
  },
  {
    title: "Quiet Home near DLF Phase 3",
    description: "A quiet, sunlit home with a private balcony and convenient access to DLF Phase 3.",
    image: {
      filename: "gurgaon-dlf-home",
      url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=82"
    },
    price: 6800,
    location: "Gurgaon",
    country: "India",
    geometry: { type: "Point", coordinates: [77.0986, 28.4896] }
  },
  {
    title: "Aravali View Weekend Home",
    description: "A serene weekend home with earthy interiors and open views toward the Aravali hills.",
    image: {
      filename: "gurgaon-aravali-view",
      url: "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=82"
    },
    price: 9100,
    location: "Gurgaon District",
    country: "India",
    geometry: { type: "Point", coordinates: [77.0564, 28.3949] }
  }
];

async function addHomepageListings() {
  await mongoose.connect(process.env.ATLASDB_URL);

  let inserted = 0;
  for (const listing of homepageListings) {
    const result = await Listing.updateOne(
      { title: listing.title },
      { $setOnInsert: listing },
      { upsert: true }
    );
    inserted += result.upsertedCount;
  }

  console.log(`Homepage listings ready: ${inserted} added, ${homepageListings.length - inserted} already existed.`);
  await mongoose.disconnect();
}

addHomepageListings().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});
