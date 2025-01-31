const admin = require("firebase-admin");

dotenv.config();

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL, 
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };