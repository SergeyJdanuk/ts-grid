import DataSourceDriver from './DataSourceDriver'
import Promise from 'ts-promise'
import Grid from '../modules/grid/Grid'
import KeyCodes  from '../keycodes'
import List from '../core/List'
import MyHTMLRow from './MyHTMLRow'
import MyHTMLCell from './MyHTMLCell'
import Animation from '../core/Animation'

export default class MyHTMLGrid extends Grid {
	private dataSource = new DataSourceDriver('29096781@N02');
	protected container = null;
	protected contentEl = null;
	protected width = 1274;
	protected height = 720;
	protected rowHeight = 240;
	protected cellWidth = 182;

	public getElement() {
		return this.container;
	}
	public createRow() {
		return new MyHTMLRow(this, { height: this.rowHeight, cellWidth: this.cellWidth });
	}
	public createCell(row, cellData) {
		return new MyHTMLCell(row, cellData);
	}
	public getContainer(): any {
		return this.container;
	}
	public getContentElement(): any {
		return this.contentEl;
	}
	public getChunk() {
		return this.dataSource.getPhotos();
	}

	public load() {
		this.fire('loading:start');

		let error = () => {
			this.fire('loading:error')
		}

		let max = 5,
			count = max,
			i = 0;

		while (count--) {
			this.getChunk().then((data) => {
				this.appendRow(data);
				if (++i == max)
					this.fire('loading:end');
			}, error);
		}
	}
	public loadNext() {
		console.log('loadNext...');
		this.getChunk().then((data) => {
			this.appendRow(data);
			console.log('loadNext... OK');
		}, () => {
			console.log('loadNext... ERROR');
		});
	}
	public update() {
		let el = this.getContentElement(),
			f = parseInt(el.style.top, 10),
			to = this.getPosition().y;

		return new Promise((resolve, reject) => {
			if (f == to)
				return resolve(1);

			this.isAnimation = true;

			Animation(f, to, 280, (result, progress) => {
				el.style.top = result + 'px'
				if (progress == 1) {
					this.isAnimation = false
					resolve(1);
				}
			})
		});
	}
	public render(parent?: any) { 

		let div = document.createElement('div'),
			content = document.createElement('div'),
			pos = this.getPosition();

		div.setAttribute('class', 'grid-container');
		div.style.position = 'absolute';
		div.style.width = this.getWidth() + 'px';
		div.style.height = this.getHeight() + 'px';
		div.style.overflow = 'hidden';

		content.setAttribute('class', 'grid-content');
	
		content.style.position = 'absolute';
		content.style.width = this.getWidth() + 'px';
		content.style.height = this.rowHeight * this.getRowsCount() + 'px';
		content.style.left = pos.x + 'px';
		content.style.top = pos.y + 'px';

		div.appendChild(content);

		if (!parent)
			document.body.appendChild(div);
		else
			parent.appendChild(div);

		this.container = div;
		this.contentEl = content;

		super.render();
	}
}
