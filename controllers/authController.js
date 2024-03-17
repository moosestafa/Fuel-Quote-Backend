// authController.js

// Import any necessary modules or models here
// For example, you might import a User model to interact with the database

// Hardcoded valid credentials for testing
const validCredentials = [
    { username: "user_name123", password: "Password123!" },
    { username: 'user2', password: 'password2@' },
    // Add more valid credentials as needed
  ];
  
  // Function to handle user login
  async function login(req, res) {
    // Extract username and password from the request body
    const { username, password } = req.body;
  
    try {
      // Example logic to authenticate user
      // Check if the provided credentials match any valid credentials
      const isValidUser = validCredentials.some(cred => cred.username === username && cred.password === password);
      
      if (isValidUser) {
        // If authentication is successful, generate a JWT token and send it in the response
        const token = generateToken(username);
        console.log('Login successful for user:', username);
        return res.status(200).json({ token });
      } else {
        // If authentication fails, send a 401 Unauthorized response
        console.log('Invalid credentials for user:', username);
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    }

    async function register(req, res) {
        // Extract username and password from the request body
        const { username, password } = req.body;
    
        try {
            // Example logic to check if the username is already registered
            const isUsernameTaken = validCredentials.some(cred => cred.username === username);
    
            if (isUsernameTaken) {
                // If the username is already taken, send a 409 Conflict response
                console.log('Username already taken:', username);
                return res.status(409).json({ error: 'Username already taken' });
            } else {
                // If the username is available, add the new user to the list of valid credentials
                validCredentials.push({ username, password });
                console.log('User registered successfully:', username);
                // Optionally, you may generate a JWT token for the newly registered user and send it in the response
                // const token = generateToken(username);
                // return res.status(201).json({ token });
                // For simplicity, we'll just send a 201 Created response without a token
                return res.status(201).json({ message: 'User registered successfully' });
            }
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    
  
  // Function to generate a JWT token
  function generateToken(username) {
      // Example logic to generate a JWT token (replace with your actual token generation logic)
      // For demonstration purposes, we're just using a simple hardcoded token
      return 'exampleToken';
  }
  
  module.exports = {
      login,
      register
  };
  