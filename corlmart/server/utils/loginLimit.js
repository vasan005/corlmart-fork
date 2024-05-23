const rateLimit=require("express-rate-limit");


export const loginLimiter=rateLimit({
    windowMs: 10*60*1000,
    max:5,
    message:"Too many login attempts ,please try again later"
});
