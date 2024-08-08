{
  "name": "proyectolp4",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start:backend": "node backend/server.js",
    "start:frontend": "cd frontend && npm start",
     "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\"",
    "install:all": "npm install && cd frontend && npm install && cd ../backend && npm install"
  },
  "devDependencies": {
    "concurrently": "^7.3.0"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "description": "This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).",
  "main": "server.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "morgan": "^1.10.0",
    "nodemailer": "^6.9.14",
    "sib-api-v3-sdk": "^8.5.0"
  }
}
