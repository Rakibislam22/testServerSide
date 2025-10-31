require('dotenv').config(); // must be FIRST line

console.log("Loaded URI:", process.env.URI); // temporary check

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.URI;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();

        const db = client.db("testDb")
        const userCollection = db.collection("users");

        app.post('/users' , async (req,res) =>{
            const newUsers = req.body;
            const email = newUsers.email;
            const query = {email: email};
            const find 
        })


        await client.db("admin").command({ ping: 1 });
        console.log("✅ Connected to MongoDB successfully!");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`🚀 Server running on port: ${port}`);
});
