import jwt from 'jsonwebtoken';

// Generate JWT token
export const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user.user_id, 
      email: user.email, 
      role: user.role 
    }, 
    'yourSecretKey', // Replace with your actual secret key
    { expiresIn: '1h' } // Token expires in 1 hour
  );
};
