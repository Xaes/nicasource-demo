export class SessionToken {
    public accessToken: string;
    public refreshToken: string;
    public expiredAt: Date;

    constructor(accessToken: string, refreshToken: string, expiredAt: Date) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiredAt = expiredAt;
    }
}