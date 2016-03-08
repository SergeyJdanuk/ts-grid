import KeyCodes  from '../../keycodes'
import Control from '../../core/Control'
import List from '../../core/List'
import Cell from './Cell'
import Row from './Row'

export default class Grid extends Control {
	protected rows = new List();
	protected focusedRow = null;
	protected selectedRow = null;
	protected width = 1024;
	protected height = 768;
	protected rowHeight = 213;
	protected cellWidth = 170;
	protected x = 0;
	protected y = 0;
	protected isAnimation = false;
	protected firstVisibleRow = null;
	protected lastVisibleRow = null;

	public getWidth(): number {
		return this.width;
	}
	public getHeight(): number {
		return this.height;
	}
	public setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	public getPosition() {
		return { x: this.x, y: this.y };
	}
	public createRow(): any {
		// Must be returned row object
		// example: 
		// 		return new MyHTMLRow(this);
		throw "Not implemented";
	}
	public createCell(row, cellData): any {
		// Must be returned row object
		// example: 
		// 		return new MyHTMLRow(row, cellData);
		throw "Not implemented";
	}
	public getFirstVisibleRow() {
		return this.firstVisibleRow;
	}
	public setFirstVisibleRow(row) {
		if (row)
			this.firstVisibleRow = row;
	}
	public getLastVisibleRow() {
		return this.lastVisibleRow;
	}
	public setLastVisibleRow(row) {
		if (row)
			this.lastVisibleRow = row;
	}
	public getRowsVisibleCount(): number {
		return ~~(this.getHeight() / this.rowHeight);
	}
	public getSelectedRow() {
		return this.selectedRow;
	}
	public setSelectedRow(row) {
		this.selectedRow = row;
	}
	public focusOutRow(row) {
		row.data.focusOut();
		this.focusedRow = null;
	}
	public getFocusedRow() {
		return this.focusedRow;
	}
	public getFirstRow() {
		return this.rows.first();
	}
	public getLastRow() {
		return this.rows.last();
	}
	public getRowsCount() {
		return this.rows.count();
	}
	public getNextSibling(row) {
		return row ? row.next : null;
	}
	public getPrevSibling(row) {
		return row ? row.prev : null;
	}
	public loadNext() {}
	public onPressed(cell) {
		this.fire('pressed', [cell])
	}
	public focusIn() {
		super.focusIn();
		let row = this.getSelectedRow();
		if (row)
			return this.focusInRow(row);

		row = this.getFirstRow()
		if (!row)
			return;

		this.focusInRow(row);
	}
	public focusOut() {
		super.focusOut();
		let row = this.getFocusedRow();
		if (!row)
			return;
		row.data.focusOut();
		this.focusedRow = null;
	}
	public focusInRow(row, selectedVisibleIndex?: number) {
		if (this.focusedRow)
			this.focusOutRow(this.focusedRow);

		this.focusedRow = row;
		this.setSelectedRow(row);
		row.data.focusIn(selectedVisibleIndex);
	}
	
	public handleKeydown(event: any) {
		if (this.isAnimation)
			return;
		
		let row = this.getFocusedRow();

		if (!row)
			return;

		switch (event.keyCode) {
			case KeyCodes.DOWN:
				return this.onKeyDown();
			case KeyCodes.UP:
				return this.onKeyUp();
			default:
				row.data.handleKeydown(event);
		}	
	}
	public appendRow(data:any) {
		let row = this.createRow();

		row.setPosition(0, this.rows.count() * row.getHeight());

		for(var i in data) {
			let cell = this.createCell(row, data[i]);
			row.appendCell(cell);
		}

		this.rows.append(row);

		if (!this.getFocusedRow())
			this.focusInRow(this.getFirstRow());

		if (!this.getFirstVisibleRow()) {
			this.setFirstVisibleRow(this.getFirstRow());
			this.setLastVisibleRow(this.getFirstRow());
		}
		else {
			if (this.getRowsCount() <= this.getRowsVisibleCount())
				this.setLastVisibleRow(this.getLastRow());
		}
	}
	public onKeyDown() {
		let focusedRow = this.getFocusedRow(),
			next = this.getNextSibling(focusedRow);

		if (!next || !focusedRow)
			return;

		let selectedVisibleIndex = focusedRow.data.getSelectedVisibleIndex();

		this.focusOutRow(focusedRow);

		let pos = this.getPosition(),
			rowPos = next.data.getPosition(),
			rowY = rowPos.y,
			rowHeight = next.data.getHeight(),
			height = this.getHeight(),
			needUpdateFirstVisibleRow = false,
			fromY = pos.y;

		if ((pos.y - height) * -1 < rowY + rowHeight && rowY + rowHeight > height) {
			pos.y -= rowHeight;
			needUpdateFirstVisibleRow = true;
			this.setLastVisibleRow(this.getNextSibling(this.getLastVisibleRow()));
			let last = this.getLastVisibleRow();
			if (last)
				last.data.show();
		}

		this.setPosition(pos.x, pos.y)
		
		this.update(fromY, pos.y).then(() => {
			if (needUpdateFirstVisibleRow) {
				let row = this.getFirstVisibleRow();
				if (row)
					row.data.hide();
				this.setFirstVisibleRow(this.getNextSibling(row))
			}			
			this.focusInRow(next, selectedVisibleIndex);

			let row = this.getSelectedRow();
			if (row && (!row.next || (row.next && !row.next.next)))
				this.loadNext();
		});
	}

	public onKeyUp() {
		let focusedRow = this.getFocusedRow(),
			prev = this.getPrevSibling(focusedRow);
		if (!prev)
			return;

		let selectedVisibleIndex = focusedRow.data.getSelectedVisibleIndex();

		this.focusOutRow(this.getFocusedRow());

		let pos = this.getPosition(),
			rowPos = prev.data.getPosition(),
			rowY = rowPos.y,
			rowHeight = prev.data.getHeight(),
			height = this.getHeight(),
			needUpdateLastVisibleRow = false,
			fromY = pos.y;

		if (rowY + pos.y < 0) {
			pos.y += rowHeight;
			needUpdateLastVisibleRow = true;
			this.setFirstVisibleRow(this.getPrevSibling(this.getFirstVisibleRow()));
			let first = this.getFirstVisibleRow();
			if (first)
				first.data.show();
		}

		this.setPosition(pos.x, pos.y)

		this.update(fromY, pos.y).then(() => {
			if (needUpdateLastVisibleRow) {
				let row = this.getLastVisibleRow();
				if (row)
					row.data.hide();
				this.setLastVisibleRow(this.getPrevSibling(row))
			}			
			this.focusInRow(prev, selectedVisibleIndex);
		});
	}
	public update(fromX: number, toX: number): any {
		throw 'Not implemented';
	}
	public render() {
		let node = this.getFirstVisibleRow(),
			last = this.getLastVisibleRow();

		if (!node)
			return;

		while (node) {
			node.data.render();

			if (node == last)
				break

			node = node.next;
		}

	}
}