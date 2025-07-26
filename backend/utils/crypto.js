const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secret = process.env.CREDENTIAL_SECRET; // set this in .env
const key = crypto.createHash('sha256').update(secret).digest();
const iv = crypto.randomBytes(16);

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

exports.decrypt = (data) => {
  const [ivHex, encrypted] = data.split(":");
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
