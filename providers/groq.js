const OpenAI = require("openai");

const SYSTEM_PROMPT = require("../core/prompt");

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

async function chat(message, history = []) {

    try {

        const messages = [

            {
                role: "system",
                content: SYSTEM_PROMPT
            },

            ...history,

            {
                role: "user",
                content: message
            }

        ];

        const completion = await client.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages,

            temperature: 0.8,

            max_tokens: 4096

        });

        return {

            success: true,

            provider: "Groq",

            text: completion.choices[0].message.content

        };

    }

    catch (err) {

        console.log("Groq Error:", err.message);

        return {

            success: false,

            provider: "Groq",

            text: ""

        };

    }

}

module.exports = {

    chat

};
