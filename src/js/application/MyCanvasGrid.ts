import DataSourceDriver from './DataSourceDriver'
import Promise from 'ts-promise'
import Grid from '../modules/grid/Grid'
import KeyCodes  from '../keycodes'
import List from '../core/List'
import MyCanvasRow from './MyCanvasRow'
import MyCanvasCell from './MyCanvasCell'
import Animation from '../core/Animation'

export default class MyCanvasGrid extends Grid {
    private dataSource = new DataSourceDriver('29096781@N02');
    private container = null;
    protected width = 1274;
    protected height = 720;
    protected rowHeight = 240;
    protected cellWidth = 182;
    protected context = null;
    public deltaY = 0;
    protected rafID = 0;

    constructor(name: string, parent?: any) {
        super(name);
        this.createCanvas(parent);
        this.initRAF();

        window.requestAnimationFrame((/* time */ time) => {
            // time ~= +new Date // the unix time
            this.render();
        });
    }
    public initRAF() {
        (function() {
            var lastTime = 0;
            var vendors = ['webkit', 'moz', 'o'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame =
                    window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        } ());
    }
    startRAF() {
        console.log('startRAF');
        this.rafID = window.requestAnimationFrame((/* time */ time) => {
            console.log('render');
            // time ~= +new Date // the unix time
            this.render();
        });
    }
    stopRAF() {
        console.log('stopRAF');
        window.cancelAnimationFrame(this.rafID);
    }
    public getElement() {
        return this.container;
    }
    public createRow() {
        return new MyCanvasRow(this, { height: this.rowHeight, cellWidth: this.cellWidth });
    }
    public createCell(row, cellData) {
        return new MyCanvasCell(row, cellData);
    }
    public getContainer(): any {
        return this.container;
    }
    public getChunk() {
        return this.dataSource.getPhotos();
    }
    public getContext() {
        return this.context;
    }
    public createCanvas(parent) {
        let c = document.createElement('canvas'),
            context = c.getContext('2d'),
            width = this.getWidth(),
            height = this.height,
            pos = this.getPosition();

        c.setAttribute('width', width + '');
        c.setAttribute('height', height + '');
        c.style.position = 'absolute';
        c.style.width = this.getWidth() + 'px';
        c.style.height = this.getHeight() + 'px';

        if (!parent)
            document.body.appendChild(c);
        else
            parent.appendChild(c);

        this.container = c;
        this.context = context;
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
    public update(fromY: number, toY: number) {
        if (fromY == toY)
            return { then: function(cb) { cb() } };

        this.isAnimation = true;
        this.startRAF();
        return {
            then: (cb) => {

                Animation(fromY, toY, 280, (result, progress) => {
                    this.deltaY = result;

                    if (progress < 1)
                        return;

                    this.isAnimation = false
                    // this.render();
                    this.stopRAF();
                    cb();
                })
            }
        };
    }
    public render() {
        let c = this.getContext(),
            width = this.getWidth(),
            height = this.getHeight();

        c.clearRect(0, 0, width, height)
        super.render();
    }
}
