const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/IDgenerator");
const Schema = mongoose.Schema;

var StudentSchema = new Schema({
     studentId:Number,
     name: String,
     courseType: String,
     photo: String,
     emailId: String,
     phoneno:Number,
     batch: String,
     courseStartDate: String,
     courseEndDate: String

});
var studentData=mongoose.model('studentdata',StudentSchema);
module.exports = studentData;


