const mongoose = require('mongoose');
const productSchema = require('./productModel').Schema;
const schemaOptions = {
    strict: false,
    timestamps: true,
};
const userschema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        UserName: {
            type: String,
            minLength: 3,
            maxLength: 30,
        },
        userType: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        roleid: {
            type: Int32Array,
            required: true,

        },
        firstName: 
        { type: String,
          required: true 
        },
        lastName:
         { type: String,
           required: true },
    },
    // schemaOptions
    {
        strict: false,
        timestamps: true,
    }
);






const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongooseBackup = require('mongoose-backup');
const CryptoJS = require('crypto-js');

// Use environment variable for encryption key
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'defaultEncryptionKey';

userschema.pre('save', async function (next) {
    try {
        // Generate a random salt for password hashing
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Set the salt and hashed password in the document
        this.salt = salt;
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Virtual property for temporary password storage
userschema.virtual('tempPassword').set(function (password) {
    // Store the unencrypted password in a temporary variable
    this._password = password;
    // Encrypt the password and store it in the 'password' field
    this.password = this._password ? encrypt(this._password, this.salt) : null;
}).get(function () {
    // Retrieve the unencrypted password from the virtual property
    return this._password;
});

// Encryption function using AES-256-GCM
function encrypt(text, salt) {
    // Generate a random initialization vector (IV)
    const iv = crypto.randomBytes(16);
    // Create a cipher using AES-256-GCM algorithm, with the encryption key and IV
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    // Encrypt the text and get the resulting buffer
    const encrypted = Buffer.concat([cipher.update(text + salt, 'utf8'), cipher.final()]);
    // Get the authentication tag from the cipher
    const tag = cipher.getAuthTag();
    // Concatenate IV, tag, and encrypted data, and convert to hexadecimal string
    return Buffer.concat([iv, tag, encrypted]).toString('hex');
}

// Decryption function using AES-256-GCM
function decrypt(text, salt) {
    // Convert the hexadecimal string back to a buffer
    const bufferText = Buffer.from(text, 'hex');
    // Extract IV, tag, and encrypted data from the buffer
    const iv = bufferText.slice(0, 16);
    const tag = bufferText.slice(16, 32);
    const encryptedText = bufferText.slice(32);
    // Create a decipher using AES-256-GCM algorithm, with the encryption key and IV
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    // Set the authentication tag for the decipher
    decipher.setAuthTag(tag);
    // Decrypt the data and get the resulting buffer
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    // Convert the buffer to a UTF-8 encoded string
    return decrypted.toString('utf8').slice(0, -salt.length); // Remove salt from the decrypted text
}

mongooseBackup.init({ uri: 'mongodb://localhost:27017/your-database-name' });

const user = mongoose.model('user', userschema);

module.exports = mongoose.model('user', userschema);