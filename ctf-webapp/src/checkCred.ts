import fs from 'fs';
import path from 'path';



export default function checkCred(username: string, password: string) {
    const p = path.resolve(__dirname, './../data/userData.json');
    const data = fs.readFileSync(p).toString();
    const userData = JSON.parse(data);

    // Iterating over all the users in the userData.json file
    for (const user of userData.users) {
        if (user.username === username && user.password === password) {
          return true;
        }
      }
    
      return false;
}
