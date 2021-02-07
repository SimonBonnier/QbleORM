import { Client } from "https://deno.land/x/postgres@v0.4.6/mod.ts";
// import { Client } from "https://deno.land/x/postgres/mod.ts";

export class DBInitializer {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    initDBIfNotExitst = async () => {
        await this.client.connect();
        const result = await this.client.query(`SELECT EXISTS 
                                      (
                                        SELECT 1
                                        FROM information_schema.tables 
                                        WHERE table_schema = 'public'
                                        AND table_name = 'people'
                                      );
                                    `);
  
        if(result.rows[0][0] === true) {
            return;
        }
        
        await this.client.query(`CREATE TABLE people (
                                id integer NOT NULL, 
                                firstname text NOT NULL
                                )`);

        await this.client.query(
            `INSERT INTO people(id, firstname) VALUES (1, 'Simon'); 
            INSERT INTO people(id, firstname) VALUES (2, 'Lisa'); 
            INSERT INTO people(id, firstname) VALUES (3, 'Fredrik'); 
            INSERT INTO people(id, firstname) VALUES (4, 'Ove'); 
            `);

        await this.client.end();
    }

    logPeople = async () => {
        const result2 = await this.client.query("SELECT * FROM people;");
        console.log('rows', result2.rows)
    }
}