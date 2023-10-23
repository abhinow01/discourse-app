import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://tanejavidhata:bEcSgDg39FD2QRlX@cluster0.uqjltqz.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  otp: String,
});

const topicSchema = new mongoose.Schema({
  text: String,
});

const User = mongoose.model('User', userSchema);
const Topic = mongoose.model('Topic', topicSchema);

function sendOTP(email) {
  const OTP = randomstring.generate({ length: 6, charset: 'numeric' });

  const transporter = nodemailer.createTransport({
    service: 'ethereal',
    auth: {
      user: 'orpha.schneider40@ethereal.email',
      pass: 'UwUZJxc3B6EKVtJHAW'
    }
  });

  const mailOptions = {
    from: 'orpha.schneider40@ethereal.email',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${OTP}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return OTP;
}

// Create Account & login Flow
app.post('/register', async (req, res) => {
  const { name, email } = req.body;
  const OTP = sendOTP(email);

  try {
    const user = new User({ name, email, otp: OTP });
    await user.save();
    res.send('User registered successfully! Check your email for OTP.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    res.send('Login successful!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

// Post Topics for discussions
app.post('/postTopic', async (req, res) => {
  const { text } = req.body;

  try {
    const topic = new Topic({ text });
    await topic.save();
    res.send('Topic posted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error posting topic');
  }
});
 app.get('/getPostedContent', async (req, res) => {
    try {
      const postedContent = await Topic.find(); // Assuming 'Topic' is your Mongoose model
  
      res.json(postedContent);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching posted content');
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
