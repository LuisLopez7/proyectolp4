{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.2",
    "chart.js": "^4.4.3",
    "nodemailer": "^6.9.14",
    "react": "^18.3.1",
    "react-calendar": "^5.0.0",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.25.1",
    "react-scripts": "^5.0.1",
    "sib-api-v3-sdk": "^8.5.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "cross-env PORT=5000 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
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
  "devDependencies": {
    "concurrently": "^8.2.2",
    "cross-env": "^7.0.3"
  }
}
