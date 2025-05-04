export class ResponseLogin {
    jwt: string

    constructor(jwt: string) {
        this.jwt = jwt;
    }
}