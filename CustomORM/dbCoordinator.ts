import { IQueryable, PostgresQueryable } from "./queryable.ts";
import { People } from '../TestDb/people.ts';
import { ClientOptions } from './clientOption.ts';
import { ClientFactory, ClientType } from './clientFactory.ts'
import { DBClient } from "./dbClient.ts";

export class DBCoordinator {
    protected client : DBClient;

    public constructor(client: DBClient) {
        this.client = client;
    }

    static CreateFromClient<T extends DBCoordinator>(type: (new (client: DBClient) => T), client: DBClient) : T {
        return new type(client);
    }

    static CreateFromConnectionString(connectionString: string) : DBCoordinator {
        const clientOptions = new ClientOptions();

        let splittedString = connectionString.split(';');
        splittedString.forEach(pair => {
            let splittedPair = pair.split('=');
            switch (splittedPair[0].toLowerCase()) {
                case 'user id': 
                clientOptions.user = splittedPair[1];
                    break;
                case 'password':
                    clientOptions.password = splittedPair[1];
                    break;
                case 'server':
                    clientOptions.hostname = splittedPair[1];
                    break;
                case 'port':
                    clientOptions.port = parseInt(splittedPair[1]);
                    break;
                case 'database':
                    clientOptions.database = splittedPair[1];
                    break;
            } 
        });

        if(!clientOptions.isValid())
            throw new Error("Invalid ConnectionString " + connectionString);
            
        const client = ClientFactory.create(ClientType.POSTGRES, clientOptions);
        // const client = new Client(clientOptions);
        return new DBCoordinator(client);
    }
}

export class TestDBCoordinator extends DBCoordinator {

    constructor(client: DBClient) {
        super(client);
    }
    people: IQueryable<People> = new PostgresQueryable<People>(People, this.client)
}