const CryptoJS = require("crypto-js"); // For Node.js (install via `npm install crypto-js`)

const encryptedToken = "U2FsdGVkX19h9Dp0i29Ct6RP5ylN/M1/Fs8Ryu/9Qm8=";
const encryptionKey = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

// Decrypt the token
const bytes = CryptoJS.AES.decrypt(encryptedToken, encryptionKey);
const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

console.log("Decrypted Token:", decryptedToken);
