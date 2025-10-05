/*
queries.js
-- Run these commands in mongosh while connected to the cluster or local mongod.
-- Example: mongosh "mongodb://localhost:27017/plp_bookstore"
-- Or use MongoDB Atlas -> Collections -> Aggregations / playground
*/

/* USE the database */
use plp_bookstore;

/* === Task 2: Basic CRUD Operations === */

/* Find all books in a specific genre (e.g., "Technology") */
db.books.find({ genre: "Technology" }).pretty();

/* Find books published after a certain year (e.g., after 2019) */
db.books.find({ published_year: { $gt: 2019 } }).pretty();

/* Find books by a specific author (e.g., "D. Woldesenbet") */
db.books.find({ author: "D. Woldesenbet" }).pretty();

/* Update the price of a specific book by title */
db.books.updateOne(
  { title: "Intro to Python Data Analysis" },
  { $set: { price: 32.0 } }
);

/* Delete a book by its title */
db.books.deleteOne({ title: "Practical MongoDB" });

/* === Task 3: Advanced Queries === */

/* Find books that are both in stock and published after 2010 */
db.books.find({ in_stock: true, published_year: { $gt: 2010 } }).pretty();

/* Use projection to return only title, author, and price */
db.books.find(
  { genre: "Technology" },
  { title: 1, author: 1, price: 1, _id: 0 }
).pretty();

/* Sorting: display books by price ascending */
db.books.find({}, { title: 1, price: 1, _id: 0 }).sort({ price: 1 }).pretty();

/* Sorting: price descending */
db.books.find({}, { title: 1, price: 1, _id: 0 }).sort({ price: -1 }).pretty();

/* Pagination: 5 books per page
   Example: page 1: skip 0, limit 5
            page 2: skip 5, limit 5
*/
db.books.find().skip(0).limit(5).pretty(); // page 1
db.books.find().skip(5).limit(5).pretty(); // page 2

/* === Task 4: Aggregation Pipeline === */

/* Average price of books by genre */
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } },
  { $sort: { avgPrice: -1 } }
]);

/* Find the author with the most books in the collection */
db.books.aggregate([
  { $group: { _id: "$author", booksCount: { $sum: 1 } } },
  { $sort: { booksCount: -1 } },
  { $limit: 1 }
]);

/* Group books by publication decade and count them
   e.g., for 2014 -> 2010s, for 2021 -> 2020s
*/
db.books.aggregate([
  {
    $project: {
      title: 1,
      decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

/* === Task 5: Indexing === */

/* Create an index on title for faster searches */
db.books.createIndex({ title: 1 }, { name: "IdxTitle" });

/* Create a compound index on author and published_year */
db.books.createIndex({ author: 1, published_year: -1 }, { name: "IdxAuthorYear" });

/* Use explain() to show query plan before and after index (example) */
/* Example query to search by title */
db.books.find({ title: "Intro to Python Data Analysis" }).explain("executionStats");

/* Searching by author + year (will use our compound index)
   Example:
*/
db.books.find({ author: "D. Woldesenbet", published_year: { $gte: 2020 } }).explain("executionStats");

/* Clean-up example (optional) - drop indexes if needed
db.books.dropIndex("IdxTitle");
db.books.dropIndex("IdxAuthorYear");
*/
