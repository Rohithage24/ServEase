const mongoose = require('mongoose');
const { Schema } = mongoose;

exports.getuser = async (req, res) => {
    try {
      const gmail = req.params.gmail;
//console.log('Fetching user with email:', gmail);
  
    
      const user = await modelUser .findOne({ email: gmail });
  
      
      if (!user) {
        return res.status(404).send({ message: 'User  not found' });
      }
  
    
      res.status(200).send(user);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).send({ message: 'Internal server error', error: err });
    }
  };