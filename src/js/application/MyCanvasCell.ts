import MyCanvasRow from './MyCanvasRow'
import Cell from '../modules/grid/Cell'

export default class MyCanvasCell extends Cell {
    protected row: MyCanvasRow;
    private container = null;
    private img = null;

    public show() {
        this.render();
    }
    public hide() {
        
    }
    public update() {
        this.render();
    }
    public renderImage(rect) {
        let c = this.row.getContext();

        if (!this.img) {
            this.img = new Image();
            this.img.onload = () => {
                this.render();
            }
            this.img.src = this.data.url;
            return;
        }
        
        let width = this.img.width,
            height = this.img.height,
            halfRectWidth = ~~(rect.w / 2),
            halfRectHeight = ~~(rect.h / 2),
            zoom = .90,
            newWidth = ~~(rect.w * zoom),
            newHeight = ~~(rect.h * zoom),
            halfNewWidth = ~~(newWidth / 2),
            halfNewHeight = ~~(newHeight / 2),
            x = rect.x + halfRectWidth - halfNewWidth - 2,
            y = rect.y + halfRectHeight - halfNewHeight - 3;

        c.drawImage(this.img, 0, 0, width, height, x, y, newWidth, newHeight);
    }
    public renderFocusedRect(rect) {
        let c = this.row.getContext(),
            lineWidth = 10,
            halfLineWidth = ~~(lineWidth / 2);

        c.lineWidth = lineWidth;
        c.strokeStyle = '#6666FF';
        c.strokeRect(rect.x + halfLineWidth, rect.y + halfLineWidth, rect.w - lineWidth - halfLineWidth, rect.h - lineWidth - halfLineWidth);
    }
    public render() {
        let c = this.row.getContext(),
            width = this.getWidth(),
            height = this.getHeight(),
            pos = this.getPosition(),
            deltaX = this.row.getDeltaX(),
            deltaY = this.row.getDeltaY(),
            rowPos = this.row.getPosition(),
            rect = { x: ~~(pos.x + deltaX), y: ~~(rowPos.y + deltaY), w: width, h: height };

        c.save()
        c.fillStyle = 'black';
        c.fillRect(rect.x, rect.y, rect.w, rect.h);     

        this.renderImage(rect)

        if (this.focused)
            this.renderFocusedRect(rect);

        c.restore()
    }
}