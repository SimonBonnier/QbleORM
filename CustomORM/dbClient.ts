import { Client } from "https://deno.land/x/postgres@v0.4.6/client.ts";
import { ClientOptions } from "./clientOption.ts";

export interface DBClient {
    queryAsync(sql: string): Promise<any> // TODO Fix any
    endAsync(): Promise<void>;
    connectAsync(): Promise<void>;
}

export class PostgresDBClient extends Client implements DBClient {
    constructor(options: ClientOptions) {
        super(options);
    }

    async connectAsync() {
        await this.connect();
    }

    async endAsync() {
        await this.end();
    }

    async queryAsync(sql: string) {
        return await this.query(sql);
    }
}
