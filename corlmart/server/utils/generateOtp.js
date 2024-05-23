const utils = {};
 
utils.generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
 
 
export default utils;