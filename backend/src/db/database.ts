import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileSync';

interface Teams {
    id: string;
    team_name: string;
    team_short_name: string;
    team_logo_name: string;
    team_description: string;
    team_country_code: string;
}

interface Error {
    error_name: string;
    error_message: NodeJS.ErrnoException | null;
    error_custom: string;
}
  
interface DatabaseType {
    teams: Array<Teams>;
    error_list: Array<Error>
}

const adapter = new FileAsync<DatabaseType>(__dirname + '/db.json', {
    defaultValue: {
        teams: [],
        error_list: []
    }
});

const db = lowdb(adapter);
 
export default db;


