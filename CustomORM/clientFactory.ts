import { DBClient, PostgresDBClient } from './dbClient.ts';
import { ClientOptions } from "./clientOption.ts";

export enum ClientType {
    POSTGRES
}

export class ClientFactory {

    static create(clientType: ClientType, options: ClientOptions): DBClient {
        switch(clientType) {
            case ClientType.POSTGRES:
                return new PostgresDBClient(options);
            
            default: 
                throw Error(`Can't create client of type ${clientType}`);
        }
    } 
}