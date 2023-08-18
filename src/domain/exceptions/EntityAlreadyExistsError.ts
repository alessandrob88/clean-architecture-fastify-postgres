export default class EntityAlreadyExistsError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, EntityAlreadyExistsError.prototype);
    }
}