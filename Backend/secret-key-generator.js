const crypto = require('crypto');
const fs = require('fs');

const Bytes = crypto.randomBytes(32);
const secretKey = Bytes.toString('hex');

const info=[
    `SECRET_KEY=${secretKey}`,
    "ORIGIN=http://localhost:5173",
    "PORT=3000"
]

fs.writeFileSync('.env', info.join('\n'));
