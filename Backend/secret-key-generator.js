const crypto = require('crypto');
const fs = require('fs');

const Bytes = crypto.randomBytes(32);
const secretKey = Bytes.toString('hex');

fs.appendFileSyncFileSync('.env', `SECRET_KEY=${secretKey}`);
