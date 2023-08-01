const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);


app.get("/", (req, res) => {
    res.send("Welcome to the Shayari App");
})

app.post("/api/generate", async (req, res) => {
    const {keyword, task} = req.body;
    const apiKey = process.env.OPENAI_API_KEY;
    const prompt = `Act as a Content creator, create a unique and funny ${task} for ${keyword}`;
    try {

        const response = await openai.createCompletion({
            model : "text-davinci-003",
            prompt,
            max_tokens : 200
        })
        const shayari = response.data.choices[0].text;
        return res.send(shayari)
    } catch (error) {
        return res.send(error.message);
    }
})


app.listen(PORT, () => {
    try {
        console.log(`Serving running on port ${PORT}`);
    } catch (error) {
        console.error(error);
    }
})

