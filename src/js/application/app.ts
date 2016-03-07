import Application from '../core/Application';
import MyHTMLGrid from './MyHTMLGrid';

export default class MyApp extends Application {
	private activeControl = null;
	private controls = [];
	private grid = new MyHTMLGrid('my-grid');

	constructor() {
		super(); 
		this.initializeEvents();

		this.addControl(this.grid);
		this.focusInControl('my-grid');
		this.grid.on('loading:end', () => {
			this.grid.render();
		})
		this.grid.load();
	}

	initializeEvents() {
		window.onkeydown = this.handleKeydown.bind(this);
	}

	handleKeydown(e) {
		e.preventDefault();
		
		let control = this.getFocusedControl();

		if (!control) {
			console.info('No one control is focused.');
			return;
		}

		control.handleKeydown(e);
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