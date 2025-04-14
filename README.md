# LaunchDarklyLOS

**1. Clone down this repository**

```sh
git clone https://github.com/NickelousTex/LaunchDarklyLOS.git
```

**2. Navigate to the cloned down repository and install packages**

```sh
cd LaunchDarklyLOS
npm i
```

**3. Setup environment variables**

Create an environment variable file for storing key information to edit for testing. You can edit this file later.
```sh
touch .env
export PORT=3000
export USER_KEY=test_user
export USER_NAME="Jon Doe"
export USER_EMAIL="jon.doe@gmail.com"
export LAUNCHDARKLY_SDK_KEY="sdk-******" # your SDK key
```

**4. Compile the packages and start the server**

```sh
npm start
```

**4. Go to [http://localhost:3000](http://localhost:3000) on a web browser**

Its currently aligned to port 3000 but you can change the port for the server in `.env`

## Part 1
**5. Test server side listening feature showing log call option**
After logging into LaunchDarkly go to the feature flag for showing the log lead function: https://app.launchdarkly.com/projects/default/flags/show_log_lead_button

Toggle function on/off manually to validate to see the impact on the UI
When set to false:
# placeholder for image w/ Off

When set to true:
# placeholder for image w/ On

This command can also be done via the API using curl:
```sh
curl -X PATCH 'https://app.launchdarkly.com/api/v2/flags/default/show_log_lead_button' \
  -H 'LD-API-Version: 20240415' \
  -H 'Authorization: your_api_key' \
  -H 'Content-Type: application/json; domain-model=launchdarkly.semanticpatch' \
  -d '{
      "environmentKey": "test",
      "instructions": [
        { "kind": "turnFlagOn" }
      ]
    }'
```

### Part 2
**6. Test client side listening feature showing Application lookup option**
After logging into LaunchDarkly go to the feature flag for showing the Application Lookup Card: https://app.launchdarkly.com/projects/default/flags/show_application_lookup

The flag's functionality is designed to be based on context of the admin 'key' 

# placeholder image

Update the key in App.js to be a 'admin_user' - this will pass the targeted rules and the card will appear.

Altneratively:
Update the user from Jon to Jane Doe to pass an individual targeting rule
```
context: {
    kind: 'user',
    key: 'test_user',
    name: 'Jane Doe',
    email: 'JaneDoe@gmail.com',
},
```
