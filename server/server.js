const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware for handling Cross-Origin Resource Sharing
const axios = require('axios'); // Import Axios for making HTTP requests
const app = express(); // Initialize Express app
const PORT = process.env.PORT || 5001; // Set the port, use environment variable or default to 5001

// CORS middleware configuration to allow requests from the React frontend running on port 5173
app.use(cors({
    origin: 'http://localhost:5173', // Frontend address that is allowed to communicate with the backend
    methods: ['GET', 'POST', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers in requests
}));

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * GET /api/courses
 * Endpoint to fetch a list of courses from the external ServiceNow API.
 * The result is limited to 10 records.
 */
app.get('/api/courses', async (req, res) => {
    try {
        // Making a GET request to ServiceNow API to get courses data
        const response = await axios.get('https://dev199851.service-now.com/api/now/table/x_snc_course_subsc_courses?sysparm_limit=10', {
            auth: {
                username: 'admin', // Authentication credentials for ServiceNow API
                password: 'evC95gaG@KF%',
            },
            headers: {
                'Accept': 'application/json', // We accept JSON responses
                'Content-Type': 'application/json', // We send requests in JSON format
            },
        });
        const courses = response.data.result; // Extract course data from the API response
        res.json({ result: courses }); // Send the course data back to the client
    } catch (error) {
        console.error('Error fetching courses:', error); // Log error details
        res.status(500).send('Server Error'); // Respond with a 500 status in case of failure
    }
});

/**
 * GET /api/users
 * Endpoint to fetch a list of subscribed users from the external ServiceNow API.
 * The result is limited to 10 records.
 */
app.get('/api/users', async (req, res) => {
    try {
        // Making a GET request to ServiceNow API to get user data
        const response = await axios.get('https://dev199851.service-now.com/api/now/table/x_snc_course_subsc_users_subscridbed?sysparm_limit=10', {
            auth: {
                username: 'admin', // Authentication credentials for ServiceNow API
                password: 'evC95gaG@KF%',
            },
            headers: {
                'Accept': 'application/json', // We accept JSON responses
                'Content-Type': 'application/json', // We send requests in JSON format
            },
        });
        const users = response.data.result; // Extract user data from the API response
        res.json({ result: users }); // Send the user data back to the client
    } catch (error) {
        console.error('Error fetching users:', error); // Log error details
        res.status(500).send('Server Error'); // Respond with a 500 status in case of failure
    }
});

/**
 * POST /api/subscribe
 * Endpoint to subscribe a user to a course.
 * The request body should contain 'title' (course name) and 'userId' (user ID).
 */
app.post('/api/subscribe', async (req, res) => {
    const { title, userId } = req.body; // Destructure title and userId from the request body

    // Log the incoming request data for debugging
    console.log('Received subscription request:', { title, userId });

    try {
        // Making a POST request to ServiceNow API to create a subscription
        const response = await axios.post('https://dev199851.service-now.com/api/now/table/x_snc_course_subsc_subscriptions_table', {
            title: title, // Course title
            user_id: userId // User ID
        }, {
            auth: {
                username: 'admin', // Authentication credentials for ServiceNow API
                password: 'evC95gaG@KF%',
            },
            headers: {
                'Accept': 'application/json', // We accept JSON responses
                'Content-Type': 'application/json', // We send requests in JSON format
            }
        });

        // Log the response from ServiceNow for debugging
        console.log('Response from ServiceNow:', response.data);
        res.status(200).json(response.data); // Send the subscription result back to the client
    } catch (error) {
        // Log detailed error information, including the response from ServiceNow if available
        console.error('Error subscribing:', error.response ? error.response.data : error.message);
        res.status(500).send('Error subscribing'); // Respond with a 500 status in case of failure
    }
});

/**
 * DELETE /api/unsubscribe
 * Endpoint to unsubscribe a user from a course.
 * The request body should contain 'userId' (user ID) and 'title' (course name).
 */
app.delete('/api/unsubscribe', async (req, res) => {
    const { userId, title } = req.body; // Destructure userId and title from the request body

    try {
        // Making a DELETE request to ServiceNow API to remove the subscription
        await axios.delete(`https://dev199851.service-now.com/api/now/table/x_snc_course_subsc_subscriptions_table`, {
            data: { userId, title }, // Send userId and title as the request payload
            auth: {
                username: 'admin', // Authentication credentials for ServiceNow API
                password: 'evC95gaG@KF%'
            },
            headers: {
                'Accept': 'application/json', // We accept JSON responses
                'Content-Type': 'application/json' // We send requests in JSON format
            }
        });

        res.status(200).send('Unsubscribed successfully!'); // Send success message to the client
    } catch (error) {
        console.error('Error unsubscribing:', error); // Log error details
        res.status(500).send('Error unsubscribing'); // Respond with a 500 status in case of failure
    }
});

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
