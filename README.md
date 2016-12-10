SAY POOP :poop:
===============

# Setup
Install packages.

```bash
$ npm install -g yarn
$ yarn
```

Create your firebase project for development and then write its configurations in `.env` file.

```bash
FIREBASE_API_KEY="YOUR API KEY"
FIREBASE_AUTH_DOMAIN="YOUR AUTH DOMAIN"
FIREBASE_DATABASE_URL="YOUR DATABASE URL"
FIREBASE_STORAGE_BUCKET="YOUR STORAGE BUCKET"
FIREBASE_MESSAGING_SENDER_ID="YOUR MESSAGING SENDER ID"
```

Configure firebase.

```bash
$ npm install -g firebase-tools
$ firebase login
$ firebase list
$ firebase use ${YOUR PROJECT ID}
$ firebase deploy --only database
```

Enable anonymous authentication on firebase console.

# Development
Run development server.

```bash
$ npm start
```
