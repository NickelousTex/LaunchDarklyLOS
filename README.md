# LaunchDarklyLOS

## About
This project demonstrates the integration of LaunchDarkly feature flagging within a Loan Origination System (LOS), a critical software platform widely used in financial services for managing loans such as mortgages, auto loans, student loans, and small business loans. LOS platforms are often complex, incorporating legacy systems and requiring rigorous scrutiny for updates due to their foundational role in loan servicing.

The project highlights how feature flagging can address common challenges by enabling user/rule targeting, rollback functionality, and metric gathering. It also showcases seamless integration with third-party SDKs, such as InformedIQ, overcoming traditional friction points that slow down adoption.


-----


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

Access the application at http://localhost:3000 in your browser. The server port can be updated in the .env file.


-----

## Feature Demonstration

### Part 1
**5. Server-Side Listening - Log Lead Button**
Log into LaunchDarkly and navigate to the Log Lead Button feature flag: https://app.launchdarkly.com/projects/default/flags/show_log_lead_button

Toggle function on/off manually to validate to see the impact on the UI

When set to false:
![alt text](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/src/common/images/LogLead_Absent.png "Log Lead missing")

When set to true:
![alt text](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/src/common/images/LogLead_Present.png "Log Lead present")


You can turn off the feature flag programmatically using the LaunchDarkly API - which can be used for quick rollbacks:
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

![alt text](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/src/common/images/ApplicationLookup_rule.png "Application Lookup Card")

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
Metric for clicks on the log call button
[log-call-click](https://app.launchdarkly.com/projects/default/metrics/log_call_count/)
