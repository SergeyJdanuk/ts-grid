import Promise from 'ts-promise'
import Grid from '../modules/grid/Grid'
import KeyCodes  from '../keycodes'
import List from '../core/List'
import MyHTMLRow from './MyHTMLRow'
import MyHTMLCell from './MyHTMLCell'
import MyHTMLGrid from './MyHTMLGrid'
import Animation from '../core/Animation'

class MenuRow extends MyHTMLRow {
	protected height = 70;
	protected cellWidth = 372;
}
class MenuCell extends MyHTMLCell {
	public hide() {
		this.container = null;
	}
	public render() {
		let div = document.createElement('div'),
			cell = document.createElement('div'),
			content = document.createElement('div'),
			pos = this.getPosition();

		div.setAttribute('class', 'cell-container' + (this.focused ? ' focused' : ''));
		div.style.position = 'absolute';
		div.style.width = this.getWidth() + 'px';
		div.style.height = this.row.getHeight() + 'px';
		div.style.left = pos.x + 'px';
		div.style.top = pos.y + 'px';
		div.style.color = 'white';

		cell.setAttribute('class', 'cell');

		content.innerHTML = this.data.title;
		cell.appendChild(content)
		div.appendChild(cell)

		this.row.getElement().appendChild(div);
		this.container = div;
	}
}

export default class Menu extends MyHTMLGrid {
	protected rowHeight = 240;

	public createCell(row, cellData) {
		return new MenuCell(row, cellData);
	}
	public createRow() {
		return new MenuRow(this);
	}
	public load() {
		this.appendRow([{ title: 'Grid: HTML', id: 'html' }]); 
		this.appendRow([{ title: 'Grid: Canvas', id: 'canvas' }]);
	}
	public update(): any {
		return { then: (cb) => { cb() } }
	}
	public loadNext() {}
	public hide() {
		this.container.parentNode.removeChild(this.container);
	}
	public render(parent?: any) {
		super.render();

		let el = this.getContentElement();

		el.setAttribute('class', 'menu-container');
		el.style.position = 'absolute';
		el.style.width = 'auto';
		el.style.height = 'auto';
		el.style.top = '50%';
		el.style.left = '35%';
	}
}
