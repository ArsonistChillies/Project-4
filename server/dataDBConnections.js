import mysql from 'mysql2/promise'
 
let db
 
try {
 db = await mysql.createConnection ( {
 host: 'localhost',
 user: 'root',
 password: 'password',
 database: 'databaseName'
 })
 console.log ("Connected to database")
}
catch (error) {
 console.log ("error connecting to database: ", error)
}
 
export default db;