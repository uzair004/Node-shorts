const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} ${new Date().toLocaleDateString()}`);
    next();
};

module.exports = logger;