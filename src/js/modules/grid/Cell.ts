import Row from './Row'

export default class Cell {
	protected row: Row;
	protected data = null;
	protected focused = false;
	protected width = 170;
	protected height = 0;
	protected x: number;
	protected y: number;

	constructor(row: Row, data: any, options?: any) {
		this.row = row;
		this.data = data;
	}
	public setSize(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
	public getSize() {
		return {width: this.width, height: this.height}
	}
	public getWidth(): number {
		return this.width;
	}
	public getHeight(): number {
		return this.height;
	}
	public focusIn() {
		this.focused = true;
		this.update();
	}
	public focusOut() {
		this.focused = false;
		this.update();
	}
	public setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	public getPosition() {
		return { x: this.x, y: this.y }
	}
	public update() {
		throw 'Not implements';
	}
	public render() {
		throw 'Not implements';	
	}
}