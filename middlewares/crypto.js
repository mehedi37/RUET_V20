import { AES, enc } from "crypto-js";

const secretKey = process.env.CRYPTO_SECRET_KEY;

export function encrypt(data) {
  const ciphertext = AES.encrypt(data.toString(), secretKey).toString();
  return ciphertext;
}

export function decrypt(encryptedData) {
  const bytes = AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(enc.Utf8);
  return decryptedData;
}

// export function testEncryptionDecryption(testData) {
//   // const testData = "devMeek007";
//   const encryptedData = encrypt(testData);
//   console.log("Encrypted: ", encryptedData);
//   const decryptedData = decrypt(encryptedData);
//   console.log("Decrypted: ", decryptedData);
// }
