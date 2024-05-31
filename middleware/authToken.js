const jwt = require("jsonwebtoken");

// Middleware
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(500).json({success: false, data: token});
    }
    try {
        const decoded = jwt.verify(token, "bulkmail");
        req.user = decoded;
        next();
        
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            res.setHeader("Clear-Site_Data", "cache", "cookies", "storage");
            return res.status(500).json({success: false, data: error})
        }
        return res.status(401).json({success: false, data: error})
    }
}

module.exports = {verifyToken}