import React, { useState } from "react";
import { Card, CardContent, TextField, Button,Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();

const handleOtpVerification = async () => {
  const formData = { email, otp }; // Assuming 'email' is a state variable

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setOtpVerified(true);
    } else {
      alert('Invalid OTP. Please try again.'); // You can show an error message
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

if (otpVerified) {
  // Redirect to the page where the user can post content
  navigate('/post-content');
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    const formData = {name,email,otp};
    try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
    
        if (response.ok) {
          // Registration successful, handle accordingly
          console.log('User registered successfully!');
        } else {
          // Registration failed, handle error
          const data = await response.json();
          console.error('Error registering user:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    console.log("Form submitted:", { name, email, otp });
  };

  return (
    <center>
      <Card style={{ marginTop: "50px" }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="OTP"
                  variant="outlined"
                  fullWidth
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOtpVerification}
                >
                  Submit OTP
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </center>
  );
}

export default Registration;
