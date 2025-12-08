const { StandardCheckoutClient, Env } = require('pg-sdk-node');

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const clientVersion = process.env.CLIENT_VERSION;
const env = process.env.ENVIRONMENT === 'PRODUCTION' ? Env.PRODUCTION : Env.SANDBOX;

const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

console.log('Client methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(client)));


console.log('PhonePe client initialized successfully!');
module.exports = client;
