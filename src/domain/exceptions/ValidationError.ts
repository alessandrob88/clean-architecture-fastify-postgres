export default class ValidationError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}