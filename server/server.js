require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, '../public')));

const LaunchDarkly = require('@launchdarkly/node-server-sdk');

// Access environment variables
const sdkKey = process.env.LAUNCHDARKLY_SDK_KEY;
const userKey = process.env.USER_KEY;
const userName = process.env.USER_NAME;
const userEmail = process.env.USER_EMAIL;

if (!sdkKey) {
    console.error('LaunchDarkly SDK key is missing. Please set it in the .env file.');
    process.exit(1); // Exit if SDK key is not provided
}

// Initialize LaunchDarkly client
const ldClient = LaunchDarkly.init(sdkKey);

// Wait for initialization
ldClient.waitForInitialization().then(() => {
    console.log('LaunchDarkly client initialized');

    // Create a user object using environment variables
    const user = {
        key: userKey,
        name: userName,
        email: userEmail,
    };

    //Evaluate a feature flag
    ldClient.variation('startup_log', user, true).then((flagValue) => {
        console.log(`Feature flag value for ${userName}: ${flagValue}`);
    });
}).catch((err) => {
    console.error('LaunchDarkly initialization failed:', err);
});

app.listen(PORT, () => console.log(`connected to port ${PORT}`));

// Ensure client is closed on shutdown
process.on('SIGINT', () => {
    ldClient.close();
    process.exit();
});
