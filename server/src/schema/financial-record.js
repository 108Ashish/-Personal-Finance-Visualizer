const mongoose = require("mongoose");

const financialRecordSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    default: "default-user" // Add a default user ID
  },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
}, {
  timestamps: true // Add created/updated timestamps
});

// Add validation pre-save hook
financialRecordSchema.pre('save', function(next) {
  if (this.amount === 0) {
    const err = new Error('Amount cannot be zero');
    return next(err);
  }
  next();
});

const FinancialRecordModel = mongoose.model("FinancialRecord", financialRecordSchema);

module.exports = FinancialRecordModel;