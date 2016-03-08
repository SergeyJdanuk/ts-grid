import Application from '../core/Application';
import MyHTMLGrid from './MyHTMLGrid';
import MyCanvasGrid from './MyCanvasGrid';
import Menu from './Menu';
import KeyCodes from '../keycodes';

export default class MyApp extends Application {
	private activeControl = null;
	private controls = [];
	private grid = null;
	private menu = null;

	constructor() {
		super();
		this.initializeEvents();

		this.menu = new Menu('menu');
		this.menu.load();
		this.menu.render();

		this.menu.on('pressed', (cell) => {
			this.closeMenu();

			let data = cell.getData();
			if (data.id == 'html')
				this.createHtmlGrid();
			else if (data.id == 'canvas')
				this.createCanvasGrid();
		})

		this.addControl(this.menu);
		this.focusInControl('menu')
	}

	public initializeEvents() {
		window.onkeydown = this.handleKeydown.bind(this);
		let elem = document.body;

		if (elem.addEventListener) {
			if ('onwheel' in document) {
				// IE9+, FF17+, Ch31+
				elem.addEventListener("wheel", this.onWheel.bind(this));
			} else if ('onmousewheel' in document) {
				// устаревший вариант события
				elem.addEventListener("mousewheel", this.onWheel.bind(this));
			} else {
				// Firefox < 17
				elem.addEventListener("MozMousePixelScroll", this.onWheel.bind(this));
			}
		}
	}
	public onWheel(e) {
		e = e || window.event;

		// wheelDelta не дает возможность узнать количество пикселей
		var delta = e.deltaY || e.detail || e.wheelDelta;

		if (delta < 0)
			e.keyCode = KeyCodes.UP;
		else
			e.keyCode = KeyCodes.DOWN;
		this.handleKeydown(event)
	}

	public handleKeydown(e) {
		e.preventDefault();
		
		let control = this.getFocusedControl();

		if (!control) {
			console.info('No one control is focused.');
			return;
		}

		control.handleKeydown(e);
	}
	public closeMenu() {
		this.menu.hide();
	}
	public createHtmlGrid() {
		let grid = new MyHTMLGrid('html-grid');
		this.addControl(grid);
		this.focusInControl('html-grid')
		grid.on('loading:end', () => {
			grid.render();
		})
		grid.load();
	}
	public createCanvasGrid() {
		let grid = new MyCanvasGrid('canvas-grid');
		this.addControl(grid);
		this.focusInControl('canvas-grid')
		grid.on('loading:end', () => {
			grid.render();
		})
		grid.load();
	}
	public addControl(control: any) {
		this.controls.push(control);
	}
	public getControl(i: number): any {
		return this.controls[i];
	}

	public focusInControl(name: string) {
		let focusedControl = this.getFocusedControl(),
			control = this.getControlByName(name);

		if (!control) {
			console.error('Not found the control: ' + name);
			return;
		}

		if (focusedControl)
			focusedControl.focusOut();

		control.focusIn();
	}
	public focusOutControl(name: string) {
		let control = this.getControlByName(name);
		if (!control) {
			console.error('Not found the control: ' + name);
			return;
		}
		control.focusOut();
	}
	public getControlByName(name: string) {
		for (var i in this.controls) { 
			if (this.controls[i].getName() == name)
				return this.controls[i];
		}
		return false;
	}
	public getFocusedControl(): any {
		for (var i in this.controls) {
			if (this.controls[i].isFocused())
				return this.controls[i];
		}
		return false;
	}
}