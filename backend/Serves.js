const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    link: String,
    Fees: Number
});

const Service = mongoose.model('Service', serviceSchema);


router.post('/add-service', async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json({ message: 'Service added successfully', data: newService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
