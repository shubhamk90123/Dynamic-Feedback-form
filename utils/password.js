const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");

const KEY_LENGTH = 64;

exports.hashPassword = (plainPassword) => {
  const salt = randomBytes(16).toString("hex");
  const hashed = scryptSync(plainPassword, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hashed}`;
};

exports.verifyPassword = (plainPassword, storedPassword) => {
  if (!storedPassword) {   
    return false;
  }

  if (!storedPassword.includes(":")) {
    return plainPassword === storedPassword;
  }

  const [salt, hash] = storedPassword.split(":");
  const hashedBuffer = scryptSync(plainPassword, salt, KEY_LENGTH);
  const storedBuffer = Buffer.from(hash, "hex");

  if (hashedBuffer.length !== storedBuffer.length) {
    return false;
  }

  return timingSafeEqual(hashedBuffer, storedBuffer);
};

exports.needsRehash = (storedPassword) => !storedPassword.includes(":");
