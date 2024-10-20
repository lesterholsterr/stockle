// Testing correctness of stockModel.js
// To run: node importStockData.js

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Stock = require("./stockModel");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

const importData = async () => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "sampleStockData.json"),
      "utf-8"
    );
    const stocks = JSON.parse(data);

    console.log(`Found ${stocks.length} stock(s) in the JSON file.`);

    const operations = stocks.map((stock) => ({
      updateOne: {
        filter: { _id: stock._id },
        update: { $set: stock },
        upsert: true,
      },
    }));

    const result = await Stock.bulkWrite(operations);

    console.log(
      `Upserted ${result.upsertedCount} new records and modified ${result.modifiedCount} existing records in stockpile`
    );

    // Verify a few documents in the database
    for (let i = 0; i < Math.min(stocks.length, 3); i++) {
      const verifiedDoc = await Stock.findById(stocks[i]._id);
      console.log(`Verified document in database:`, verifiedDoc._id);
    }

    console.log("Data import process successful");
  } catch (error) {
    console.error("Error importing data:", error);
    if (error.writeErrors) {
      console.error("Write Errors:", error.writeErrors);
    }
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
};

importData();
