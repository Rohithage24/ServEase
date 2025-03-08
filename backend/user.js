const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
  fName: String,
  email: { type: String, require: true, unique: true },
  password: String,
  mobile: Number,
  address: String,
  pinCode: Number,
  aadhaarId: Number,
});

const modelUser = mongoose.model("user", userSchema);

exports.adduser = async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const userd = new modelUser(req.body);
    await userd.save();
    res
      .status(201)
      .send({ message: "User  created successfully", user: userd });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send({ message: "Error creating user", error: err });
  }
};

exports.getuser = async (req, res) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  try {
    // Query the database to find a user with the provided email and password
    const user = await modelUser.findOne({ email, password });

    if (user) {
      // If the user exists, send a success response
      res.status(200).json({ message: "User  found", user });
      
    } else {
      // If the user does not exist, send a 404 response
      res.status(404).json({ message: "User  not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getRequser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
   
    const user = await modelUser.findOne({ _id:id  });

    if (user) {
      
      res.status(200).json({ message: "Userrequest  found", user });
      
    } else {
     
      res.status(404).json({ message: "Userrequest  not found" });
    }
  } catch (error) {
   
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all Users from the database
    const Users = await modelUser.find({});
    console.log("User", Users);

    // Send the response with the list of Users
    res.status(200).send({
      message: "Users fetched successfully",
      Users: Users,
    });
  } catch (err) {
    console.error("Error fetching Users:", err);
    res.status(500).send({ message: "Error fetching Users", error: err });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const deletedUser = await modelUser.deleteOne({ _id : id }).exec();

    console.log("Deleted user:", deletedUser);

    res.status(200).send({
      message: "user deleted successfully",
      deletedUser: deletedUser,
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send({ message: "Error deleting user", error: err });
  }
};

//   exports.getuser=async (req, res) => {

//     const gmail = req.presm.gmail;
//     console.log(gmail);

//     // const user = await modelUser.findOne({email:gmail})
//     // console.log(user);

//   }
