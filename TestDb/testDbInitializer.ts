import { DBClient } from "../CustomORM/dbClient.ts";

export class DBInitializer {
    private client: DBClient;

    constructor(client: DBClient) {
        this.client = client;
    }

    initDBIfNotExitst = async () => {
        await this.client.connectAsync();
        const result = await this.client.queryAsync(`SELECT EXISTS 
                                      (
                                        SELECT 1
                                        FROM information_schema.tables 
                                        WHERE table_schema = 'public'
                                        AND table_name = 'people'
                                      );
                                    `);
                                    console.log('HELLO')
        await this.logPeople();
  
        if(result.rows[0][0] === true) {
            return;
        }
        
        await this.client.queryAsync(`CREATE TABLE people (
                                id integer NOT NULL, 
                                firstname text NOT NULL
                                )`);

        await this.client.queryAsync(
            `INSERT INTO people(id, firstname) VALUES (1, 'Simon'); 
            INSERT INTO people(id, firstname) VALUES (2, 'Lisa'); 
            INSERT INTO people(id, firstname) VALUES (3, 'Fredrik'); 
            INSERT INTO people(id, firstname) VALUES (4, 'Ove'); 
            `);

        await this.client.endAsync();
}

    logPeople = async () => {
        const result2 = await this.client.queryAsync("SELECT * FROM people;");
        console.log('rows', result2.rows)
    }
}