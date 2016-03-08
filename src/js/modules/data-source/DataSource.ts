import Promise from 'ts-promise';

export default class DataSource {
    protected offset = 0;
    protected limit = 50;

    public getChunk(limit?: number, offset?: number, update?: boolean) {
        throw 'Not implements';
        if (update) {
            this.offset = offset ? offset : this.offset;
            this.limit = limit ? limit : this.limit;
        }
    }
    public getNextChunk(limit?: number, offset?: number) {
        throw 'Not implements';
    }
    
    public getOffset(): number {
        return this.offset;
    }

    public getLimit(): number {
        return this.limit;
    }

    public setLimit(limit?: number) {
        this.limit = limit ? limit : this.limit;
    }

    public setOffset(offset?: number) {
        this.offset = offset ? offset : this.offset;
    }
}