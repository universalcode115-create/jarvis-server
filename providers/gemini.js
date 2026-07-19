const { GoogleGenerativeAI } = require("@google/generative-ai");

const SYSTEM_PROMPT = require("../core/prompt");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function chat(message, history = []) {

    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const chat = model.startChat({

            history: history,

            generationConfig: {

                temperature: 0.8,

                topP: 0.95,

                topK: 40,

                maxOutputTokens: 4096

            }

        });

        const result = await chat.sendMessage(

            SYSTEM_PROMPT + "\n\nUser: " + message

        );

        const text = result.response.text();

        return {

            success: true,

            provider: "Gemini",

            text

        };

    }

    catch (err) {

        console.log("Gemini Error:", err.message);

        return {

            success: false,

            provider: "Gemini",

            text: ""

        };

    }

}

module.exports = {

    chat

};
