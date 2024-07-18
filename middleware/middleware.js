const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send("Token is required");
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid token");
        }
console.log(decoded);
        req.user = decoded;

        next();
    });
}
module.exports = verifyToken;