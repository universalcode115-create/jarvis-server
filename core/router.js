const cache = require("./cache");
const health=require("./health");
const gemini = require("../providers/gemini");
const groq = require("../providers/groq");
const openrouter = require("../providers/openrouter");
const huggingface = require("../providers/huggingface");

async function askAI(message, history = []) {

    // Coding
    if (
        /code|javascript|python|html|css|node|react|java|c\+\+|bug|error/i.test(message)
    ) {
        try {
            return await groq.chat(message, history);
        } catch {}
    }

    // Image
    if (
        /image|photo|picture|draw|generate/i.test(message)
    ) {
        try {
            return await openrouter.chat(message, history);
        } catch {}
    }

    // Normal Chat
    try {
        return await gemini.chat(message, history);
    } catch {}

    // Backup
    try {
        return await groq.chat(message, history);
    } catch {}

    try {
        return await openrouter.chat(message, history);
    } catch {}

    try {
        return await huggingface.chat(message, history);
    } catch {}

    return {
        success: false,
        provider: "none",
        text: "All AI providers are unavailable."
    };
}

module.exports = {
    askAI
};
