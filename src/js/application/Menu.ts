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
    protected containerClassName = 'menu-row-container';

    render() {
        super.render();
        let container = this.getElement();
        container.style.position = 'static';
        container.style.width = 'auto';
        container.style.height = 'auto';
    }
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
        div.style.position = 'ralative';
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
    protected data = null;
    protected containerClassName = 'menu-container';
    protected contentClassName = 'menu-content';

    constructor(name, data) {
        super(name);
        this.data = data;
    }

    public createCell(row, cellData) {
        return new MenuCell(row, cellData);
    }
    public createRow() {
        return new MenuRow(this);
    }
    public load() {
        for(var i in this.data) {
            this.appendRow([this.data[i]]);
        }
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

        let wrapper = document.createElement('div'),
            container = this.getContainer(),
            content = this.getContentElement();

        console.log(content);
        content.style.position = 'inherit';
        content.style.width = '300px';
        content.style.height = 'auto';
        content.style.margin = '0 auto';

        wrapper.setAttribute('class', 'menu-wrapper');
        container.appendChild(wrapper);

        wrapper.appendChild(content);
    }
}
