const mongoose = require("mongoose");


const FeedbackSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    email: { type: String, required: true },
    serves: { type: String, required: true },
    description: { type: String, required: true },
    status:{type:String}
});

// ✅ 3. Create Mongoose Model
const FeedModel = mongoose.model("FeedBack", FeedbackSchema);