const crypto = require('crypto');
const fs = require('fs');

const Bytes = crypto.randomBytes(32);
const secretKey = Bytes.toString('hex');

fs.writeFileSync('.env', `SECRET_KEY="${secretKey}"\nORIGIN="http://localhost:5173"\nPORT=3000`);
