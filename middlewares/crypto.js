import { AES, enc } from "crypto-js";

const secretKey = "{WaA#o0dj+$da%^kj]l";

export function encrypt(data) {
  const ciphertext = AES.encrypt(
    data.toString(),
    secretKey
  ).toString();
  return ciphertext;
}

export function decrypt(encryptedData) {
  const bytes = AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(enc.Utf8);
  return decryptedData;
}
