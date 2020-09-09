import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileSync';

interface Teams {
    team_name: string;
    team_short_name: string;
    team_logo_name: string;
    team_description: string;
}
  
interface DatabaseType {
    teams: Array<Teams>;
}

const adapter = new FileAsync<DatabaseType>(__dirname + '/db.json', {
    defaultValue: {
        teams: []
    }
});

const db = lowdb(adapter);
 
export default db;


