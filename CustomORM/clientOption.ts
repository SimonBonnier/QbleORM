export class ClientOptions {
    user: string | undefined;
    password: string | undefined;
    database: string | undefined;
    hostname: string | undefined;
    port: number | undefined;

    isValid = () => {
        if(!this.user || !this.password || !this.database || !this.hostname || !this.port) {
                return false;
        }
        return true;
    }
}