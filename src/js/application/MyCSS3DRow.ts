import List from '../core/List';
import HTMLGrid from './MyHTMLGrid';
import Row from '../modules/grid/Row';
import KeyCodes  from '../keycodes'
import Animation from '../core/Animation'
import Promise from 'ts-promise'

export default class MyHTMLRow extends Row {
    private container = null;
    protected oldTranslateX = 0;

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
            f = this.oldTranslateX,
            to = this.getPosition().x;

        this.oldTranslateX = to;

        this.isAnimation = true;
        return new Promise((resolve, reject) => {

            let transitionEnd = () => {
                el.removeEventListener('webkitTransitionEnd', transitionEnd);
                this.isAnimation = false;
                return resolve(1);
            }

            let oTransitionEnd = () => {
                el.removeEventListener('oTransitionEnd', oTransitionEnd);
                this.isAnimation = false;
                return resolve(1);
            }

            el.addEventListener('webkitTransitionEnd', transitionEnd, false);
            el.addEventListener('oTransitionEnd', oTransitionEnd, false);

            el.style.transform = 'translateX(' + to + 'px)';
            el.style.oTransform = 'translateX(' + to + 'px)';
        });
    }
    
    public render() {
        let div = document.createElement('div'),
            pos = this.getPosition();
        
        div.setAttribute('class', 'row3d-container');

        div.style.position = 'absolute';
        div.style.width = this.getWidth() + 'px';
        div.style.height = this.getHeight() + 'px';
        div.style.left = pos.x + 'px';
        div.style.top = pos.y + 'px';
        
        this.grid.getContentElement().appendChild(div);
        this.container = div;

        super.render();
    }
}