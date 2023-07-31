const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
require('dotenv').config();
const app = express();
require('./db');
const User = require('./MODELS/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageuploadRoutes = require('./CONTROLLERS/imageUploadRoutes');

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/imageupload', imageuploadRoutes);



function authenticateToken(req, res, next) {
     const token = req.headers.authorization.split(' ')[1];

    // console.log('token', token);

    if (!token){
        const error = new Error('Token not found');
        next(error);
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
         const userid = decoded.id;
        // console.log('decoded', decoded);

        req.id = userid;
        next();
    }
    catch (err) {
        // console.log(err);
        // res.status(500).json({ message: 'Invalid Token' });
        next(err);
    }



}

app.get('/', (req, res) => {
    res.json({ message: 'The API is working' });
});


// app.post('/register', async (req, res) => {
//     try {
//         const { password, email, age, gender, name } = req.body;
//         const existingUser = await User.findOne({ email });


//         if (existingUser) {
//             return res.status(409).json({ message: 'Email already exists' });
//         }


//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         // console.log('salt',salt);
//         // console.log('hashedPassword',hashedPassword);

//         const newUser = new User({
//             name,
//             password: hashedPassword,
//             email,
//             age,
//             gender
//         });


//         await newUser.save();
//         res.status(201).json({
//             message: 'User registered successfully'
//         });
//     }
//     catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

// app.post('/login', async (req, res, next) => {
//     try {
//         const { email, password } = req.body;

//         const existingUser = await User.findOne({ email });

//         if (!existingUser) {
//            const error = new Error('User does not exist');
//             next(error);
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);


//         if (!isPasswordCorrect) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }


//         const accesstoken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
//             expiresIn: '1hr'
//         });

//         const refreshToken = jwt.sign({ id: existingUser._id }, process.env.JWT_REFRESH_SECRET_KEY);
//         existingUser.refreshToken = refreshToken;
//         await existingUser.save();
//         res.cookie('refreshToken', refreshToken , { httpOnly: true , path: '/refresh_token'})

//         res.status(200).json({
//             accesstoken,
//             refreshToken,
//             message: 'User logged in successfully'
//         });
//     }
//     catch (err) {
//         next(err);
//     }
// })

// app.get('/getmyprofile', authenticateToken, async (req, res) => {
//     const id = req.id;
//     const user = await User.findById(id);
//     user.password = undefined;
//     res.status(200).json({ user });
// })


// app.get('/refresh_token', async (req, res, next) => {
//    const token = req.cookies.refreshToken;
// //    res.send(token);

//     if (!token) {
//         const error = new Error('Token not found');
//         next(error);
//     }

//    jwt.verify(token , process.env.JWT_REFRESH_SECRET_KEY , async (err , decoded) =>{
//        if(err){
//               const error = new Error('Invalid Token');
//               next(error);
//        }


//        const id = decoded.id;
//        const existingUser = await User.findById(id);

//          if(!existingUser || token !== existingUser.refreshToken){
//                 const error = new Error('Invalid Token');
//                 next(error);
//          }


//          const accesstoken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
//             expiresIn: '1hr'
//          });

//             const refreshToken = jwt.sign({ id: existingUser._id }, process.env.JWT_REFRESH_SECRET_KEY);

//             existingUser.refreshToken = refreshToken;
//             await existingUser.save();
//             res.cookie('refreshToken', refreshToken , { httpOnly: true , path: '/refresh_token'})

//             res.status(200).json({
//                 accesstoken,
//                 refreshToken,
//                 message : 'Token refreshed successfully'
//             });
//    })

// });




// getbygender
app.post('/getbygender', async (req, res) => {
    const {gender} = req.body;

    const users = await User.find({gender : gender })
    res.status(200).json({ users });
});


app.post('/sortusers', async (req, res) => {
    const {sortby , order} = req.body;

   const sort = {
         [sortby] : order
   }

   console.log(sort);

   const users = await User.find().sort(sort);

//    res.send('ok')
    res.status(200).json({ users });
});



// ERROR HANDLING MIDDLEWARE
app.use((err , req, res , next) => {
    console.log('error middleware called ', err);
    res.status(500).json({ message: err.message });
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
