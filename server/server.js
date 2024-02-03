const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader=require('image-downloader');

const Register = require('./models/resgister'); 
const NewPlace=require('./models/accomendation');
const multer = require('multer');
const path = require('path');
const fs=require('fs');
const BookingModel = require('./models/booking');

app.use(cors({
    origin: ["https://mern-stack-website-frontend.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser()); 
app.use('/uploads',express.static(__dirname+'/'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://your-frontend-domain.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

require('dotenv').config();

mongoose.connect('mongodb+srv://Airbnb:Airbnb@cluster0.tiglnj5.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});




app.get('/', (req, res) => {
    res.send('Hello World!');
    res.json("Hello")
});


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new Register({
            name,
            email,
            password: hashedPassword
        });

        const result = await user.save();
        console.log('Data saved successfully:', result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const jwtSecret = 'rickandmorty';

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDocs = await Register.findOne({ email });

    if (userDocs) {
        const passOk = bcrypt.compareSync(password, userDocs.password);
        if (passOk) {
            jwt.sign({
                email: userDocs.email,
                id: userDocs._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDocs);
            });
        } else {
            return res.status(422).json('pass not ok');
        }
    } else {
        return res.status(404).json('not found');
    }
});



app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if(token)
    {
        jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
            if(err) throw err
            const {name,email,_id}=await Register.findById(userData.id)
            res.json({name,email,_id})
        })
    }
});

app.get('/myaccomendation', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing Token' });
    }

    try {
        const userData = jwt.verify(token, jwtSecret);
        const { id } = userData;
        const data = await NewPlace.find({ owner: id });

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        return res.json(data);
    } catch (error) {
        console.error('Error in /myaccomendation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/placesDetails/:id',async(req,res)=>{
    const {id}=req.params
    res.json(await NewPlace.findById(id))
})

app.get('/places', async (req, res) => {
  try {
    const data = await NewPlace.find();
    res.json(data);  // <-- This line sends a response
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/mybookings', async (req, res) => {
    const token = req.cookies.token;
  
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
          console.error('JWT verification error:', err);
          res.status(401).json({ error: 'Unauthorized' });
          return;
        }
  
        try {
          const { name, email, _id } = await Register.findById(userData.id);
          console.log('User data:', { name, email, _id });

          const bookings = await BookingModel.find({ user: userData.id }).populate('place');
          console.log('Bookings data:', bookings);

          res.json({ user: { name, email, _id }, bookings });            
        } catch (error) {
          console.error('Error fetching bookings:', error);
          res.status(500).json({ error: 'Error fetching bookings' });
        }
      });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
});

  

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})

app.post('/booking', async (req, res) => {
    const { place, checkIn, checkOut, name, number, numberOfGuest } = req.body;
    const token = req.cookies.token;
  
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const userId = userData.id;

        try {
          const booking = await BookingModel.create({
            place,
            user: userId,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            name,
            number,
            numberOfGuest,
          });
  
          res.json(booking);
          console.log(booking);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error creating booking' });
        }
      });
    }
});
  
  

app.post('/newplace', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { title, address, addedPhotos, description, selectedPerks, extraInfo, checkIn, checkOut, maxPeople, price } = req.body;
        const userData = jwt.verify(token, jwtSecret);

        const Place = new NewPlace({
            owner: userData.id,
            title,
            address,
            addedPhotos,
            description,
            selectedPerks,
            extraInfo,
            checkIn,
            checkOut,
            maxPeople,
            price
        });

        await Place.save();
        console.log(Place)
        res.status(200).json({ message: 'Place created successfully' });
    } catch (error) {
        console.error('Error creating new place:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/uploads-by-link', async (req, res) => {
    const { photolink } = req.body;

    if (!photolink) {
        return res.status(400).json({ error: 'The link parameter is missing in the request body' });
    }

    try {
        const newName = 'photo'+ Date.now() + '.jpg';
        await imageDownloader.image({
            url: photolink,
            dest: __dirname + '/uploads/' + newName
        });
        res.json(newName);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadFiles);
});

app.put('/editplace', async (req, res) => {
    const { token } = req.cookies;
    const {
        id,
        title,
        address,
        addedPhotos,
        description,
        selectedPerks,
        extraInfo,
        checkIn,
        checkOut,
        maxPeople,
        price
    } = req.body;
    try {
        const userData = jwt.verify(token, jwtSecret);
        const placeDoc = await NewPlace.findById(id);
        console.log(userData.id)
        console.log(placeDoc.owner.toString())
        if (userData.id === placeDoc.owner.toString()   ) {
            placeDoc.set({
                title,
                address,
                addedPhotos,
                description,
                selectedPerks,
                extraInfo,
                checkIn,
                checkOut,
                maxPeople,
                price
            });
            await placeDoc.save();
            res.json('Place updated successfully');
        } else {
            res.status(403).json('Forbidden - User does not have permission to edit this place');
        }
    } catch (error) {
        console.error('Error updating place:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
