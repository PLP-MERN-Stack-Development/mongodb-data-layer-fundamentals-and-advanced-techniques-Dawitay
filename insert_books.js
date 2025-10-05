// insert_books.js
// Usage:
// 1) install dependencies: npm install mongodb
// 2) set MONGODB_URI if using Atlas, e.g. export MONGODB_URI="mongodb+srv://user:pass@cluster0.mongodb.net"
// 3) node insert_books.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "plp_bookstore";
const collectionName = "books";

const books = [
  {
    title: "Solar Analytics: A Practical Guide",
    author: "A. Kebede",
    genre: "Science",
    published_year: 2021,
    price: 34.99,
    in_stock: true,
    pages: 220,
    publisher: "GreenEnergy Press",
  },
  {
    title: "Intro to Python Data Analysis",
    author: "D. Woldesenbet",
    genre: "Technology",
    published_year: 2023,
    price: 29.5,
    in_stock: true,
    pages: 310,
    publisher: "TechBooks Ltd",
  },
  {
    title: "Machine Learning with PyTorch",
    author: "S. Alemu",
    genre: "Technology",
    published_year: 2022,
    price: 45.0,
    in_stock: false,
    pages: 420,
    publisher: "AI Books",
  },
  {
    title: "Modern Database Design",
    author: "K. Tesfaye",
    genre: "Education",
    published_year: 2019,
    price: 39.99,
    in_stock: true,
    pages: 380,
    publisher: "EduPress",
  },
  {
    title: "Deep Learning Essentials",
    author: "M. Bekele",
    genre: "Technology",
    published_year: 2020,
    price: 49.99,
    in_stock: true,
    pages: 500,
    publisher: "DeepLearn Publishing",
  },
  {
    title: "The Cryptocurrency Trader",
    author: "D. Woldesenbet",
    genre: "Finance",
    published_year: 2018,
    price: 24.0,
    in_stock: false,
    pages: 200,
    publisher: "FinPress",
  },
  {
    title: "Web Development with JavaScript",
    author: "A. Solomon",
    genre: "Technology",
    published_year: 2017,
    price: 27.5,
    in_stock: true,
    pages: 280,
    publisher: "WebBooks",
  },
  {
    title: "Data Visualization Patterns",
    author: "L. Mengesha",
    genre: "Design",
    published_year: 2016,
    price: 31.25,
    in_stock: true,
    pages: 240,
    publisher: "VizHouse",
  },
  {
    title: "Effective Project Management",
    author: "R. Yohannes",
    genre: "Business",
    published_year: 2015,
    price: 22.0,
    in_stock: true,
    pages: 190,
    publisher: "BizBooks",
  },
  {
    title: "Cloud Infrastructure Cookbook",
    author: "N. Abebe",
    genre: "Technology",
    published_year: 2021,
    price: 42.0,
    in_stock: true,
    pages: 360,
    publisher: "CloudPress",
  },
  {
    title: "Startups & Scaling",
    author: "D. Woldesenbet",
    genre: "Business",
    published_year: 2024,
    price: 38.0,
    in_stock: true,
    pages: 260,
    publisher: "ScaleUp",
  },
  {
    title: "Practical MongoDB",
    author: "G. Tadesse",
    genre: "Technology",
    published_year: 2014,
    price: 28.0,
    in_stock: false,
    pages: 320,
    publisher: "NoSQL Press",
  },
];

async function main() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB:", uri);

    const db = client.db(dbName);
    const col = db.collection(collectionName);

    // Create DB & collection implicitly by inserting documents
    const insertResult = await col.insertMany(books);
    console.log(`Inserted ${insertResult.insertedCount} documents into ${dbName}.${collectionName}`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

main();
