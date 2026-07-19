const OpenAI = require("openai");

const SYSTEM_PROMPT = require("../core/prompt");

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

async function chat(message, history = []) {

    try {

        const completion = await client.chat.completions.create({

            model: "deepseek/deepseek-chat-v3-0324:free",

            messages: [

                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },

                ...history,

                {
                    role: "user",
                    content: message
                }

            ],

            temperature: 0.8

        });

        return {

            success: true,

            provider: "OpenRouter",

            text: completion.choices[0].message.content

        };

    }

    catch(err){

        console.log("OpenRouter Error :",err.message);

        return{

            success:false,

            provider:"OpenRouter",

            text:""

        };

    }

}

module.exports={

chat

};
