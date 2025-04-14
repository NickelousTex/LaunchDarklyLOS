# LaunchDarklyLOS

## Setup
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
export REACT_APP_USER_KEY=test_user
export USER_NAME="Jon Doe"
export USER_EMAIL="jon.doe@gmail.com"
export LAUNCHDARKLY_SDK_KEY="sdk-******" # your SDK key
export REACT_APP_LAUNCHDARKLY_CLIENT_SIDE_ID="*******" # your project client id - note that only flags enabled to use client sdk will be able to be used
```

**4. Compile the packages and start the server**

```sh
npm start
```

**4. Go to [http://localhost:3000](http://localhost:3000) on a web browser**

The port for the server can be updated in `.env`


-----


## Part 1
**5. Test server side listening feature showing log lead option**
After logging into LaunchDarkly go to the feature flag for showing the Log Lead function: https://app.launchdarkly.com/projects/default/flags/show_log_lead_button

Toggle function on/off manually to validate to see the impact on the UI
When set to false:
# placeholder for image w/ Off

When set to true:
# placeholder for image w/ On

We also can just turn the entire flag off via API using curl for easy rollback:
```sh
curl -X PATCH 'https://app.launchdarkly.com/api/v2/flags/default/show_log_lead_button' \
  -H 'LD-API-Version: 20240415' \
  -H 'Authorization: your_api_key' \
  -H 'Content-Type: application/json; domain-model=launchdarkly.semanticpatch' \
  -d '{
      "environmentKey": "test",
      "instructions": [
        { "kind": "turnFlagOff" }
      ]
    }'
```

### Part 2
**6. Test client side listening feature showing Application Lookup option**
After logging into LaunchDarkly go to the feature flag for showing the Application Lookup Card: https://app.launchdarkly.com/projects/default/flags/show_application_lookup

The flag's functionality is designed to be based on context of the admin 'key' 

![alt text](https://github.com/NickelousTex/LaunchDarklyLOS/blob/nt-finalize/src/common/images/ApplicationLookup_rule.png "Application Lookup Card")

Update the key in App.js to be a 'admin_user' - this will pass the targeted rules and the card will appear.
```
context: {
    kind: 'admin',
    key: 'admin_user',
    name: 'Jon Doe',
    email: 'JonDoe@gmail.com',
},
```
Note that changing the key to `test_user` will result in the card disappearing


Alternatively:
Update the kind to `user` and user_key to `Jane Doe` to pass a targeted user flag to show the card as well.
```
context: {
    kind: 'user',
    key: 'Jane Doe',
    name: 'Jon Doe',
    email: 'JonDoe@gmail.com',
},
```

### Extra Credit
**7. Experimentation**
log-call-click - clicks on the log call button
