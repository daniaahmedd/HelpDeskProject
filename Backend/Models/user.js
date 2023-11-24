const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongooseBackup = require('mongoose-backup');
const CryptoJS = require('crypto-js');

const userschema = new mongoose.Schema(
    {
        UserName: {
            type: String,
            minLength: 3,
            maxLength: 30,
        },
        userType: {
            type: String,
            enum:[ "Manager", "Admin", "User", "Agent"],
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
        firstName: 
        { type: String,
          required: true 
        },
        lastName:
         { type: String,
           required: true },
    },
    {
        strict: true,
        timestamps: true,
    }
);

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'defaultEncryptionKey';

userschema.pre('save', async function (next) {
    try {
        
        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(this.password, salt);
        
        this.salt = salt;
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});


userschema.virtual('tempPassword').set(function (password) {
    
    this._password = password;
    
    this.password = this._password ? encrypt(this._password, this.salt) : null;
}).get(function () {
   
    return this._password;
});

// Encryption function using AES-256-GCM
function encrypt(text, salt) {
   
    const iv = crypto.randomBytes(16);
   
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    
    const encrypted = Buffer.concat([cipher.update(text + salt, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, encrypted]).toString('hex');
}

// Decryption function using AES-256-GCM
function decrypt(text, salt) {
    const bufferText = Buffer.from(text, 'hex');
    const iv = bufferText.Buffer.slice(0, 16);
    const tag = bufferText.Buffer.slice(16, 32);
    const encryptedText = bufferText.Buffer.slice(32);
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString('utf8').slice(0, -salt.length);
}

mongooseBackup.init({ uri: 'mongodb+srv://Mariam:LW7ZrU0N8A25kWqB@cluster0.qebr03m.mongodb.net/Software' });

module.exports = mongoose.model('user', userschema);
module.exports.Schema = userschema;   
