const bcrypt = require("bcrypt");

// Replace these with the actual values
const plainPassword = "yourNewPassword"; // The password you set
const hashedPassword =
  "$2b$10$3QxQoGCiT3k7fckXqEApGujeTxIm7BRU5ENLSGENuctS56dVfed3e"; // Get from MongoDB

bcrypt.compare(plainPassword, hashedPassword).then(console.log);
