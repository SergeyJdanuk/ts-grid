export default class List {
    private _first = null;
    private _last = null;
    private _count = 0;

    public append(data: any) {
        let last = this.last(),
            node = {
                next: null,
                prev: last,
                data: data
            }

        if (last)
            last.next = node;

        if (!this.first())
            this._first = node;

        this._last = node;
        this._count++;
    }
    public prepend(data: any) {
        let prev = this.first(),
            node = {
                next: this.first(),
                prev: null,
                data: data
            }

        if (prev)
            prev.prev = node;

        if (!this.last())
            this._last = node;

        this._first = node;
        this._count++;
    }
    public last() {
        return this._last;
    }
    public first() {
        return this._first;
    }
    public isEmpty() {
        return this._count == 0;
    }
    public count() {
        return this._count;
    }
    public each(fn: Function) {
        let node = this.first();
        while(node) {
            fn(node);
            node = node.next;
        }
    }
}