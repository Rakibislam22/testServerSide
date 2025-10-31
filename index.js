require('dotenv').config(); 
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
            const newUser = req.body;
            const email = newUser.email;
            const query = {email: email};
            const find = await userCollection.findOne(query);

            if(find){
                res.send({message: 'User already exist!!'})
            }
            else{
                const result = await userCollection.insertOne(newUser);
                res.send(result);
            }
        })

        app.get('/users', async (req,res) =>{
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        await client.db("admin").command({ ping: 1 });
        console.log("✅ Connected to MongoDB successfully!");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    } finally {
        
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`🚀 Server running on port: ${port}`);
});
