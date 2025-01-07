const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    fName: String,
    email: {type:String , require:true ,unique:true},
    password: String,
    mobile: Number,
    address: String,
    aadhaarId: Number
  });
  

const modelUser  = mongoose.model('user', userSchema);

exports.adduser = async (req, res) => {
    console.log('Request Body:', req.body);
    try {
      const userd = new modelUser (req.body);
      await userd.save();
      res.status(201).send({ message: 'User  created successfully', user: userd });
    } catch (err) {
      console.error('Error saving user:', err);
      res.status(500).send({ message: 'Error creating user', error: err });
    }
  }

  exports.getuser = async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from the request body

    try {
        // Query the database to find a user with the provided email and password
        const user = await modelUser.findOne({ email, password });

        if (user) {
            // If the user exists, send a success response
            res.status(200).json({ message: 'User  found', user });
            console.log(user);
            
        } else {
            // If the user does not exist, send a 404 response
            res.status(404).json({ message: 'User  not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//   exports.getuser=async (req, res) => {
   
//     const gmail = req.presm.gmail;
//     console.log(gmail);
    
//     // const user = await modelUser.findOne({email:gmail})
//     // console.log(user);
    


//   }