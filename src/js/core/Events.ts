export default class Events {
    private events = {};

    public on(event: string, callback: Function, context?: any) {
        if (!this.events[event])
            this.events[event] = []; 

        this.events[event].push({
            context: context || this,
            callback: callback
        })
    }

    public off(event: string) {
        delete this.events[event];
    }

    public fire(event: string, args?: any) {
        if (!this.events[event])
            return;

        var max = this.events[event].length;

        for (var i = 0; i < max; i++)
            this.events[event][i].callback.apply(this.events[event][i].context, args);
    }

    public offAll() {
        for (let n in this.events) {
            let max = this.events[n].length;
            for (let i = 0; i < max; i++) {
                this.off(this.events[i]);
            }
        }
    }
}