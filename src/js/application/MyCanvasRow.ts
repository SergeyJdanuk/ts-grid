import List from '../core/List';
import Row from '../modules/grid/Row';
import KeyCodes  from '../keycodes'
import Animation from '../core/Animation'
import Promise from 'ts-promise'

export default class MyCanvasRow extends Row {
	private deltaX = 0;
	public getContext() {
		return this.grid.getContext();
	}
	public getDeltaY():number {
		return this.grid.deltaY;
	}
	public getDeltaX(): number {
		return this.deltaX;
	}
	public show() {
		this.render();
	}
	public hide() {
	}
	public update(fromX: number, toX: number): any {
		if (fromX == toX)
			return { then: function(cb) { cb() } };

		return { then: (cb) => { 

			this.isAnimation = true;
			Animation(fromX, toX, 280, (result, progress) => {
				this.deltaX = result;
				
				if (progress < 1) 
					return this.render();

				this.isAnimation = false
				setTimeout(() => {
					this.render();
				},0)
				cb();
			})
		}};
	}
	public render() {
		let c = this.getContext(),
			pos = this.getPosition(),
			width = this.getWidth(),
			height = this.getHeight();

		
		super.render();
	}
}