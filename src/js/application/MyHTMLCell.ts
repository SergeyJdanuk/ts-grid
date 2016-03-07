import MyHTMLRow from './MyHTMLRow'
import Cell from '../modules/grid/Cell'

export default class MyCell extends Cell {
	protected row: MyHTMLRow;
	private container = null;

	show() {
		if (this.container)
			return;
		this.render();
	}
	hide() {
		if (!this.container)
			return;
		this.container.parentNode.removeChild(this.container)
		this.container = null;
	}
	update() {
		if (!this.container)
			return;
		let className = this.container.className;
		if (this.focused)
			className += ' focused'; 
		else
			className = className.replace(' focused', '');

		if (this.container.className != className)
			this.container.className = className;
	}
	render() {
		let div = document.createElement('div'),
			pos = this.getPosition();


		div.setAttribute('class', 'cell-container' + (this.focused ? ' focused' : ''));
		div.style.position = 'absolute';
		div.style.width = this.getWidth() + 'px';
		div.style.height = this.row.getHeight() + 'px';
		div.style.left = pos.x + 'px';
		div.style.top = pos.y + 'px';
		div.style.color = 'white';

		div.innerHTML = 'x: ' + pos.x + ', y: ' + pos.y;
		div.style.backgroundImage = 'url("' + this.data.url + '")';
		div.style.backgroundSize = 'cover';
		this.row.getElement().appendChild(div);
		this.container = div;
	}
}