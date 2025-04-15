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

**2. Navigate to the repository and setup environment variables**

```sh
cd LaunchDarklyLOS
```

Create an environment variable file for storing key information to edit for testing. You can edit this file later to include your SDK key and project client-side id. Note that the client-side id can only be used with flags that have Client-side ID setup.
```sh
cat <<EOF > .env
USER_KEY=test_user
REACT_APP_USER_KEY=test_user
USER_NAME="Jon Doe"
USER_EMAIL="jon.doe@gmail.com"
LAUNCHDARKLY_SDK_KEY="<your-sdk-key-******>"
REACT_APP_LAUNCHDARKLY_CLIENT_SIDE_ID="<your-client-side-id-*******>" 
EOF
```

**4. Startup docker container**

Using docker compose create a container to run the app in detached mode
```sh
docker compose up -d
```

**5. Open a web browser**

Access the application at http://localhost:3000 in your browser.

**6. Update environment variables**

If updating environment variables in your .env file, reload those to the app
```sh
docker compose up -d --force-recreate	
```

**7. When finished - shutdown container**

```sh
docker compose down
```


-----

## Key Callouts
- [enviornment variables](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/server/server.js#L11-L16) *must have `.env` file setup 
- [server-side sdk](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/server/server.js#L23-L44)
- [server-side flag usage 1](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/client/components/UserActivities.js#L13-L26) | [server-side flag usage 2](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/client/components/UserActivities.js#L51-L57)
- [client-side sdk w/streaming](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/client/App.js#L7-L19) *streaming is default if not set, but can be disabled
- [client-side flag usage 1](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/client/components/Dashboard.js#L74-L79) | [client-side flag usage 2](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/client/components/Dashboard.js#L175-L182)
- [custom metric](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/client/components/UserActivities.js#L34-L44)


## Feature Demonstration

### Part 1
**Server-Side Listening - Log Lead Button**

Log into LaunchDarkly and navigate to the Log Lead Button feature flag: https://app.launchdarkly.com/projects/default/flags/show_log_lead_button

Toggle function on/off manually to validate to see the impact on the UI

When set to false:
![alt text](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/src/common/images/LogLead_Absent.png "Log Lead missing")

When set to true:
![alt text](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/src/common/images/LogLead_Present.png "Log Lead present")

**Rollback via API**
You can turn off the feature flag programmatically using the LaunchDarkly API:
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
**Client-Side Listening - Application Lookup Card**

Log into LaunchDarkly and navigate to the Application Lookup Card feature flag: https://app.launchdarkly.com/projects/default/flags/show_application_lookup

The flag's functionality is designed to be based on context of the admin 'key' 

![alt text](https://github.com/NickelousTex/LaunchDarklyLOS/blob/main/src/common/images/ApplicationLookup_rule.png "Application Lookup Card")

Update the [context object](https://github.com/NickelousTex/LaunchDarklyLOS/blob/nt-finalize/client/App.js#L10-L14) in App.js to match one of the targeted rules.


Admin Context (Card Visable)
```
context: {
    kind: 'admin',
    key: 'admin_user',
    name: 'Jon Doe',
    email: 'JonDoe@gmail.com',
},
```
Changing the key to a non-targeted value (e.g., test_user) will hide the card


User Context (Card Visable)

Update the kind to `user` and user_key to `Jane Doe` to pass a targeted user flag to show the card as well.
```
context: {
    kind: 'user',
    key: 'Jane Doe',
    name: 'Jon Doe',
    email: 'JonDoe@gmail.com',
},
```

### **Extra Credit
**Experimentation**

Track user interactions with feature flags by leveraging metrics in LaunchDarkly. For example, monitor clicks on the Log Call Button using this metric:
[log-call-click](https://app.launchdarkly.com/projects/default/metrics/log_call_count/details?env=test&selected-env=test)

**Integration Test**

Used [Zapier](https://zapier.com/editor/291968418/published) to make a trigger to draft an email every time a flag is updated
