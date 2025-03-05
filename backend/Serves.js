const mongoose = require("mongoose");


const servesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    address: { type: String, required: true },
    serves: { type: String, required: true },
    description: { type: String, required: true },
    status:{type:String}
});



const ServesModel = mongoose.model("Serves", servesSchema);
