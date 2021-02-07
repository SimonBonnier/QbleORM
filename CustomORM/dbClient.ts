import { Client } from "https://deno.land/x/postgres@v0.4.6/client.ts";
import { ClientOptions } from "./clientOption.ts";

export interface DBClient {
    queryAsync(sql: string): Promise<any> // TODO Fix any
    endAsync(): void;
    connectAsync(): void;
}

export class PostgresDBClient extends Client implements DBClient {
    constructor(options: ClientOptions) {
        super(options);
    }

    connectAsync() {
        this.connect();
    }

    endAsync() {
        this.end();
    }

    queryAsync(sql: string) {
        return this.query(sql);
    }
}