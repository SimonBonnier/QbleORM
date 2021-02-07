import { Client } from "https://deno.land/x/postgres@v0.4.6/mod.ts";

export interface IQueryable<T> {
    filter<T>(predicate: (type: T) => boolean): IQueryable<T>;
    execute(): Promise<Array<any>>
}

export class PostgresQueryable<T> implements IQueryable<T> {
    private type : new () => T;
    private sql: string;
    private client: Client;
    
    constructor(type: new () => T, client: Client) {
        this.type = type;
        this.sql = `SELECT * FROM ${this.type.name} as ${this.type.name}`;
        this.client = client;
    }

    filter<T>(predicate: (type: T) => boolean) {
        
        this.sql.concat(' WHERE ');
        
        let predicateString = predicate.toString();

        // Handle ArrowFunction
        let sqlWhereExtension = this.parseInlineArrowFunction(predicateString);
        this.sql = this.sql.concat(` WHERE ${sqlWhereExtension}`);
        // Handle RegularFunction

        // Handle Sending In Function
        

        
        console.log('function', predicate.toString());
        console.log('sql', this.sql);
        return this;
    }

    async execute() : Promise<Array<any>> {
        await this.client.connect();
        let result = await this.client.query(this.sql);
        await this.client.end()
        return result.rows;
    }

    private parseInlineArrowFunction(predicateString: string) : string {
        console.log('predicateString', predicateString);
        let predicateToken = predicateString.split('=>')[0].trim();
        let predicatePart = predicateString.split('=>')[1].trim();

        predicatePart = predicatePart.replaceAll(`${predicateToken}.`, `${this.type.name.toLowerCase()}.`);
        
        console.log('predicateToken', predicateToken);
        console.log('predicatePart', predicatePart);
        return predicatePart;
    }
    
    private parseInlineRegularFunction(predicateString: string) {
        throw Error("Not implemented");
    }

    private parseFunction(predicateString: string) {
        throw Error("Not implemented");
    }
}