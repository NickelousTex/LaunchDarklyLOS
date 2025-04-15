FROM node:16

WORKDIR .

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app (replace 'app.js' with your main file if different)
CMD ["npm", "start"]