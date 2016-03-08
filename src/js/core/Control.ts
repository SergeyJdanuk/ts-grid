import Events from './Events';

export default class Control extends Events {
    protected name: string;
    private focused: boolean;

    constructor(name: string) {
        super();
        this.name = name;
        this.focused = false;
    }
    focusIn() {
        this.focused = true;
    }
    focusOut() {
        this.focused = false;
    }
    handleKeydown(event: any) {}
    render() {}
    getName(): string {
        return this.name;
    }
    public isFocused(): boolean {
        return this.focused;
    }
}