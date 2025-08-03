const alphabets: string = "K0PQIYL7VGFHJXZ39BNUDSECM4TW6ROA5821";

export function mono_alphabetic_encrypt(plainText: string): string {
    if (plainText.length === 0) return "";
    if (!process.env.NEXT_PUBLIC_CIPHER_KEY) {
        throw new Error("CIPHER_KEY environment variable not configured");
    }

    plainText = plainText.toUpperCase().trim();
    let encryptedText: string = "";
    const charactersInPlainText: string[] = [];

    for (const char of plainText) {
        const mappedIndex = alphabets.indexOf(char);
        if (mappedIndex === -1) continue;

        encryptedText += process.env.NEXT_PUBLIC_CIPHER_KEY[mappedIndex];

        if (!charactersInPlainText.includes(char)) {
            charactersInPlainText.push(char);
        }
    }

    return encryptedText;
}

export const generateUUIDv4 = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (char) {
            const rand = (Math.random() * 16) | 0;
            const value = char === "x" ? rand : (rand & 0x3) | 0x8;
            return value.toString(16);
        }
    );
};

// export function mono_alphabetic_decrypt(cipherText: string): string {
//     if (cipherText.length === 0) return "";
//     if (!process.env.NEXT_PUBLIC_CIPHER_KEY) {
//         throw new Error("CIPHER_KEY environment variable not configured");
//     }

//     cipherText = cipherText.toUpperCase().trim();
//     let decryptedText: string = "";

//     for (const char of cipherText) {
//         const mappedIndex = process.env.NEXT_PUBLIC_CIPHER_KEY.indexOf(char);
//         if (mappedIndex === -1) continue;

//         decryptedText += alphabets[mappedIndex];
//     }

//     return decryptedText;
// }
