import rateLimit from "express-rate-limit";


const limiter = rateLimit ({
    windows: 5*60*1000,
    max: 100,
    message: {
        status: 429,
        error: "Too Many Request"
    }
})

export default limiter