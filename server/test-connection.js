// test-connection.js
const connectDB = require('./config/database');

const testConnection = async () => {
    try {
        await connectDB();
        console.log('Connection test successful!');
    } catch (error) {
        console.error('Connection test failed:', error);
    } finally {
        process.exit();
    }
};

testConnection();