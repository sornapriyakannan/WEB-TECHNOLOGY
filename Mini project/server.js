const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/courierDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define user schema
const userSchema = new mongoose.Schema({
    name: String,
    phone_number: String
});

const User = mongoose.model('User', userSchema);

// Define delivery schema
const deliverySchema = new mongoose.Schema({
    name : String, // Added name field
    sender_name: String,
    sender_address: String,
    receiver_name: String,
    receiver_address: String,
    packagename: String,
    package_description: String,
    package_weight: Number,
    package_length: Number,
    package_width: Number,
    package_height: Number,
    service_type: String,
    price: Number,
    phone_number: String,
    otp: String
});

const Delivery = mongoose.model('Delivery', deliverySchema);

// API endpoints
// API endpoint for adding a delivery
app.post('/adddelivery', async (req, res) => {
    try {
      // Save user details
    const user = new User({
        name: req.body.name,
        phone_number: req.body.phone_number
    });
    await user.save();

      // Save delivery details
    const delivery = new Delivery(req.body);
    await delivery.save();
    res.status(200).send({ message: 'Delivery details saved successfully' });
    } catch (error) {
    console.error('Error saving delivery:', error);
    res.status(500).send('Error saving delivery');
    }
});


// API endpoint for retrieving all deliveries
app.get('/deliveries', async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.status(200).json(deliveries);
    } catch (error) {
        console.error('Error retrieving deliveries:', error);
        res.status(500).send('Error retrieving deliveries');
    }
});

// API endpoint for deleting a delivery
app.delete('/deletedelivery/:id', async (req, res) => {
    try {
        const deliveryId = req.params.id;
        await Delivery.findByIdAndDelete(deliveryId);
        res.status(200).send({ message: 'Delivery deleted successfully' });
    } catch (error) {
        console.error('Error deleting delivery:', error);
        res.status(500).send('Error deleting delivery');
    }
});
// API endpoint for updating a delivery
app.put('/updatedelivery/:id', async (req, res) => {
    try {
        const deliveryId = req.params.id;
        const updatedData = req.body;
        await Delivery.findByIdAndUpdate(deliveryId, updatedData, { new: true });
        res.status(200).send({ message: 'Delivery updated successfully' });
    } catch (error) {
        console.error('Error updating delivery:', error);
        res.status(500).send('Error updating delivery');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
