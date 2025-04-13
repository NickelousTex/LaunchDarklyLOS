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

Its currently aligned to port 3000 but you can change the port for the server in `server/server.js`
