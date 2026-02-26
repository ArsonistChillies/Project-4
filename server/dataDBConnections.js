import mysql from 'mysql2/promise'
 
let db
 
try {
 db = await mysql.createConnection ( {
 host: 'localhost',
 user: 'root',
 password: 'Ss04212006.',
 database: 'localhost:3306/stack_overflow_clone'
 })
 console.log ("Connected to database")
}
catch (error) {
 console.log ("error connecting to database: ", error)
}
 
export default db;