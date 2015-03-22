var mongoose=require('mongoose');
var Schema=mongoose.Schema;
 
var donationSchema = new Schema({
  date: { type: Date, default: Date.now },
  customer: {type : Schema.ObjectId, ref : 'Customer'},
  donated: { type: Number, default: 0 },
  originpoint: { type: Number, default: 0 },
  charity: { type: String, default:''},
});
 
module.exports = mongoose.model('Donation', donationSchema); 
