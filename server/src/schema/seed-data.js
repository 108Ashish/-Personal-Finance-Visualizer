const mongoose = require('mongoose');
const FinancialRecordModel = require('../schema/financial-record');

// MongoDB connection
const mongoURI = "mongodb+srv://singhashishsuttle:su1fF8bLAR6OOPDY@financetracker.alicd3x.mongodb.net/financetracker?retryWrites=true&w=majority";

// Categories for financial records
const categories = ['Food', 'Utilities', 'Entertainment', 'Transportation', 'Housing', 'Healthcare', 'Education', 'Shopping'];
const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Digital Wallet'];

// Generate random amount between min and max
const randomAmount = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Generate sample data for each month of 2025
const generateMonthlyData = () => {
  const sampleData = [];
  
  for (let month = 0; month < 12; month++) {
    // Generate between 3-7 records per month
    const recordsCount = randomAmount(3, 7);
    
    for (let i = 0; i < recordsCount; i++) {
      // Create a random date within the month
      const day = randomAmount(1, 28); // Avoiding edge cases with month lengths
      const date = new Date(2025, month, day);
      
      // Create the record
      sampleData.push({
        userId: 'default-user',
        date,
        description: `Expense for ${date.toLocaleString('default', { month: 'long' })}`,
        amount: randomAmount(50, 500),
        category: categories[Math.floor(Math.random() * categories.length)],
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
      });
    }
  }
  
  return sampleData;
};

// Connect to MongoDB and seed data
async function seedDatabase() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
    
    // Clear existing records for default user
    await FinancialRecordModel.deleteMany({ userId: 'default-user' });
    console.log('Cleared existing records');
    
    // Generate and insert sample data
    const sampleData = generateMonthlyData();
    const result = await FinancialRecordModel.insertMany(sampleData);
    
    console.log(`Successfully inserted ${result.length} records`);
    console.log('Sample:', result[0]);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();