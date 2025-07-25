const alphabets = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

export function mono_alphabetic_encrypt(plainText) {
  if (plainText.length === 0) return "";
  if (!process.env.NEXT_PUBLIC_CIPHER_KEY) {
    throw new Error("CIPHER_KEY environment variable not configured");
  }

  plainText = plainText.toUpperCase().trim();
  let encryptedText = "";
  const charactersInPlainText = [];

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

export function mono_alphabetic_decrypt(cipherText) {
  if (cipherText.length === 0) return "";
  if (!process.env.NEXT_PUBLIC_CIPHER_KEY) {
    throw new Error("CIPHER_KEY environment variable not configured");
  }

  cipherText = cipherText.toUpperCase().trim();
  let decryptedText = "";

  for (const char of cipherText) {
    const mappedIndex = process.env.NEXT_PUBLIC_CIPHER_KEY.indexOf(char);
    if (mappedIndex === -1) continue;

    decryptedText += alphabets[mappedIndex];
  }

  return decryptedText;
}
