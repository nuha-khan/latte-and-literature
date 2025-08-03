// hash.js
import bcrypt from 'bcrypt';

const password = 'admin@2325'; // You can change this
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then((hash) => {
  console.log('Hashed password:', hash);
});
