const crypto = require("crypto");

const APP_KEY = process.env.APP_SECRET || "jarvis_secret";

module.exports = (req, res, next) => {

    const key = req.headers["x-app-key"];

    if (!key) {

        return res.status(401).json({

            success: false,

            error: "Unauthorized"

        });

    }

    const hash = crypto
        .createHash("sha256")
        .update(APP_KEY)
        .digest("hex");

    if (key !== hash) {

        return res.status(401).json({

            success: false,

            error: "Invalid App Key"

        });

    }

    next();

};
