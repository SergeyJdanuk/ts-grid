import List from '../core/List';
import HTMLGrid from './MyHTMLGrid';
import Row from '../modules/grid/Row';
import KeyCodes  from '../keycodes'
import Animation from '../core/Animation'
import Promise from 'ts-promise'

export default class MyHTMLRow extends Row {
	private container = null;

	public getElement() {
		return this.container;
	}
	public show() {
		if (this.container)
			return;
		this.render();
	}
	public hide() {
		if (!this.container)
			return;
		this.container.parentNode.removeChild(this.container);

		this.cells.each((node) => {
			node.data.hide();
		})
		
		this.container = null;
	}
	public update(fromX: number, toX: number): any {
		if (fromX == toX)
			return { then: function(cb) { cb() } };

		let el = this.getElement(),
			f = parseInt(el.style.left, 10),
			to = this.getPosition().x;

		let promise = new Promise( (resolve, reject) => {
			this.isAnimation = true;
			
			Animation(f, to, 280, (result, progress) => {
				el.style.left = result + 'px'
				if (progress == 1) {
					this.isAnimation = false
					resolve(1);
				}
			})
		});
		
		return promise;
	}
	
	public render() {
		let div = document.createElement('div'),
			pos = this.getPosition();
		
		div.setAttribute('class', 'row-container');
		// div.style.webkitTransition = 'left 280ms';
		// div.style.transition = 'left 280ms';
		div.style.position = 'absolute';
		div.style.width = this.getWidth() + 'px';
		div.style.height = this.getHeight() + 'px';
		div.style.left = pos.x + 'px';
		div.style.top = pos.y + 'px';

		// div.innerHTML = 'x: ' + pos.x + ', y: ' + pos.y;
		
		this.grid.getContentElement().appendChild(div);
		this.container = div;

		super.render();
	}
}