export default class Todo {
    constructor(
        private readonly id: number,
        private readonly title: string,
        private readonly completed: boolean,
    ) {}

    static fromArray(rawTodo: [number, string, string]): Todo {
        console.log(rawTodo);
        return new Todo(
            rawTodo[0],
            rawTodo[1],
            rawTodo[2] === 'true',
        );
    }

    /**
     * Checks if the object created satisfies business requirements or not.
     */
    isValid(): boolean {
        // TODO: Implement your validation logic here
        return true; // Placeholder return value
    }
}