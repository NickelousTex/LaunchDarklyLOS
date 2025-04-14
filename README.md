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

**4. Go to localhost:3000 on a web browser**

Its currently aligned to port 3000 but you can change the port for the server in `.env`


**5. Test new feature showing log call option**
After logging into LaunchDarkly go to the feature flag for showing the log call function: https://app.launchdarkly.com/projects/default/flags/show_log_lead_button

Toggle function on/off manually to validate to see the impact on the UI
When set to false:
# placeholder for image w/ Off

When set to true:
# placeholder for image w/ On
