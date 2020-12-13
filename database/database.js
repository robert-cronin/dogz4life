const {
    Pool,
    Client
} = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool()
pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})
// you can also use async/await
const res = await pool.query('SELECT NOW()')
await pool.end()
// clients will also use environment variables
// for connection information
const client = new Client()
await client.connect()
const res = await client.query('SELECT NOW()')
await client.end()