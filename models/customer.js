var mongoose=require('mongoose');
var Schema=mongoose.Schema;
 
var customerSchema = new Schema({
  firstname: { type: String, default:''},
  lastname: { type: String, default:''},
  cardnumber: { type: Number, default: 0 },
  code: { type: Number, default: 0 },
  address: { type: String, default: '' },
  zipcode: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  rewards: { type: Number, default: 0 }
});
 
module.exports = mongoose.model('Customer', customerSchema); 

