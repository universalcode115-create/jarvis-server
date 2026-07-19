const axios = require("axios");

const SYSTEM_PROMPT = require("../core/prompt");

async function chat(message, history = []) {

    try {

        const response = await axios.post(

            "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",

            {
                inputs:
                    SYSTEM_PROMPT +
                    "\n\n" +
                    history.map(h => `${h.role}: ${h.content}`).join("\n") +
                    "\nUser: " +
                    message +
                    "\nAssistant:"
            },

            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
                },
                timeout: 60000
            }

        );

        let text = "";

        if (Array.isArray(response.data)) {
            text = response.data[0]?.generated_text || "";
        } else {
            text = JSON.stringify(response.data);
        }

        return {
            success: true,
            provider: "HuggingFace",
            text
        };

    } catch (err) {

        console.log("HF Error:", err.message);

        return {
            success: false,
            provider: "HuggingFace",
            text: ""
        };

    }

}

module.exports = {
    chat
};
