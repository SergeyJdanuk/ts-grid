import List from '../../core/List';
import Grid from './Grid';
import KeyCodes  from '../../keycodes'

export default class Row {
	protected cells = new List();
	protected grid = null;
	protected focusedCell = null;
	protected selectedCell = null;
	protected cellWidth = 170;
	protected height = 213;
	protected x: number;
	protected y: number;
	protected selectedVisibleIndex: number;
	protected firstVisibleCell = null;
	protected lastVisibleCell = null;
	public isAnimation = false;

	constructor(grid: Grid, options?: any) {
		this.grid = grid;
		if (options) {
			this.height = options.height || this.height;
			this.cellWidth = options.cellWidth || this.cellWidth;
		}
	}
	public appendCell(cell) {
		let x = this.getCellsCount() * this.getCellWidth(),
			y = 0;

		cell.setPosition(x, y);
		cell.setSize(this.getCellWidth(), this.getHeight())

		this.cells.append(cell);

		if (!this.getFirstVisibleCell()) {
			this.setFirstVisibleCell(this.getFirstCell());
			this.setLastVisibleCell(this.getFirstCell());
		}
		else {
			if (this.getCellsCount() <= this.getCellsVisibleCount())
				this.setLastVisibleCell(this.getLastCell());
		}
	}
	public getWidth() {
		return this.getCellsCount() * this.getCellWidth();
	}
	public getCellWidth(): number {
		return this.cellWidth;
	}
	public getHeight(): number {
		return this.height;
	}
	public prependCell(cell) {
		this.cells.prepend(cell);
	}
	public setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	public getPosition() {
		return { x: this.x, y: this.y };
	}
	public setSelectedVisibleIndex(index: number) {
		this.selectedVisibleIndex = index;
	}
	public getSelectedVisibleIndex(): number {
		return this.selectedVisibleIndex;
	}
	public getFirstVisibleCell() {
		return this.firstVisibleCell;
	}
	public setFirstVisibleCell(cell) {
		if (cell)
			this.firstVisibleCell = cell;
	}
	public getLastVisibleCell() {
		return this.lastVisibleCell;
	}
	public setLastVisibleCell(cell) {
		if (cell)
			this.lastVisibleCell = cell;
	}
	public getCellsVisibleCount() {
		return ~~(this.grid.getWidth() / this.getCellWidth());
	}
	public focusIn(selectedVisibleIndex?: number) {

		let cell = this.getFocusedCell();
		if (cell)
			return;

		cell = this.getFirstCell();
		if (!cell)
			return;

		selectedVisibleIndex = selectedVisibleIndex != undefined ? selectedVisibleIndex : 0;

		if (selectedVisibleIndex >= this.getCellsCount())
			selectedVisibleIndex = this.getCellsCount()-1;

		this.setSelectedVisibleIndex(selectedVisibleIndex);

		let selectedCell = this.getVisibleCellByIndex(selectedVisibleIndex);

		this.focusInCell(selectedCell);
	}
	public getVisibleCellByIndex(index: number) {
		let cell = this.getFirstVisibleCell()
		while (--index >= 0)
			cell = cell.next;
		return cell;
	}
	public focusOut() {
		let cell = this.getFocusedCell();
		if (!cell)
			return;

		this.focusOutCell(cell);
	}
	public focusInCell(cell) {
		if (this.focusedCell)
			this.focusOutCell(this.focusedCell);

		this.focusedCell = cell;
		this.setSelectedCell(cell);

		cell.data.focusIn();
	}
	public focusOutCell(cell) {
		cell.data.focusOut();
		this.focusedCell = null;
	}
	public getFocusedCell() {
		return this.focusedCell;
	}
	public getFirstCell() {
		return this.cells.first();
	}
	public getLastCell() {
		return this.cells.last();
	}
	public getCellsCount() {
		return this.cells.count();
	}
	public getNextSibling(cell) {
		return cell ? cell.next : null;
	}
	public getPrevSibling(cell) {
		return cell ? cell.prev : null;
	}
	public setSelectedCell(cell) {
		this.selectedCell = cell;
	}
	public getSelectedCell() {
		return this.selectedCell;
	}
	public handleKeydown(event) {
		if (this.isAnimation)
			return;
		
		switch (event.keyCode) {
			case KeyCodes.RIGHT:
				return this.onKeyRight();
			case KeyCodes.LEFT:
				return this.onKeyLeft();
		}
	}
	public onKeyRight() {
		let next = this.getNextSibling(this.getFocusedCell());
		if (!next)
			return;

		this.focusOutCell(this.getFocusedCell());

		let pos = this.getPosition(),
			cellPos = next.data.getPosition(),
			cellX = cellPos.x,
			cellWidth = next.data.getWidth(),
			width = this.grid.getWidth(),
			needUpdateFirstVisibleCell = false;

		if ( (pos.x - width) * -1 < cellX + cellWidth && cellX + cellWidth > width) {
			pos.x -= cellWidth;
			needUpdateFirstVisibleCell = true;
			this.setLastVisibleCell(this.getNextSibling(this.getLastVisibleCell()))
			let last = this.getLastVisibleCell();
			if (last)
				last.data.show();
		}
		else
			this.setSelectedVisibleIndex(this.getSelectedVisibleIndex() + 1);

		this.setPosition(pos.x, pos.y);

		this.update().then((code) => {
			if (needUpdateFirstVisibleCell) {
				let cell = this.getFirstVisibleCell();
				if (cell)
					cell.data.hide();
				this.setFirstVisibleCell(this.getNextSibling(cell))
			}
			this.focusInCell(next);
		});
	}
	public onKeyLeft() {

		let prev = this.getPrevSibling(this.getFocusedCell());
		if (!prev)
			return;

		this.focusOutCell(this.getFocusedCell());

		let pos = this.getPosition(),
			cellPos = prev.data.getPosition(),
			cellX = cellPos.x,
			cellWidth = prev.data.getWidth(),
			width = this.grid.getWidth(),
			needUpdateLastVisibleCell = false;

		if (cellX + pos.x < 0) {
			pos.x += cellWidth;
			needUpdateLastVisibleCell = true;
			this.setFirstVisibleCell(this.getPrevSibling(this.getFirstVisibleCell()));
			let first = this.getFirstVisibleCell();
			if (first)
				first.data.show();
		}
		else
			this.setSelectedVisibleIndex(this.getSelectedVisibleIndex() - 1);

		this.setPosition(pos.x, pos.y)
		
		this.update().then((code) => {
			if (needUpdateLastVisibleCell) {
				let cell = this.getLastVisibleCell();
				if (cell)
					cell.data.hide();
				this.setLastVisibleCell(this.getPrevSibling(cell))
			}
			this.focusInCell(prev);
		});
	}
	public update(): any {
		throw 'Not implemented';
	}
	public render() {
		let cell = this.getFirstVisibleCell(),
			last = this.getLastVisibleCell();

		if (!cell)
			return;
		while(cell && cell.prev != last) {
			cell.data.render()
			cell = cell.next;
		}
	}
	public hide() {
		
	}
	public show() {
		
	}
}