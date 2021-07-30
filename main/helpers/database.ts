import admin from "firebase-admin";
import serviceAccount from "../../fbase_auth.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

export default db;