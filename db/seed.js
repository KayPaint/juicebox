const { client } = require('./index');

async function testDB() {
    try {
        client.connect();

        const result = await client.query(`SELECT * FROM users;`);

        console.log('testDB result:', result);
    } catch (error) {
        
    }
}