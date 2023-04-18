export default class DomainException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DomainException";
    }
}
