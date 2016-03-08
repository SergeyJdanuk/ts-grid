import DataSource from '../modules/data-source/DataSource';
import Promise from 'ts-promise';
import $ = require('jquery');

export default class FakeDataSource extends DataSource {
    constructor(val: string) {
        super();
    }
    public getPhotos(perpage?: number): Promise<any> {
        console.log('FakeDataSource.getPhotos...');

        return new Promise((resolve) => {
            this.getData().then((data) => {
                console.log('FakeDataSource.getPhotos... OK');
                resolve(data);
            })
        });
    }

    public getData() {
        let arr = [
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/84/6/00418498.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/78/6/00417896.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/74/6/00417444.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419178.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/92/6/00419237.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/92/6/00419287.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419176.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/63/6/00416343.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/27/6/00412773.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/40/50/6/00405074.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/69/6/00416977.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/28/6/00412876.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/94/6/00419406.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/92/6/00419244.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/40/6/00414073.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/38/93/6/00389382.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/93/6/00419392.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/93/6/00419361.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419192.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/89/6/00418980.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/93/6/00419360.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419189.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419198.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/28/6/00412849.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/87/6/00418725.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/90/6/00419099.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/92/6/00419203.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419101.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/81/6/00418194.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419109.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/94/6/00419412.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/94/6/00419407.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/40/59/6/00405982.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/81/6/00418133.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/47/6/00414719.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/90/6/00419032.jpg' },

            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419181.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419110.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/94/6/00419461.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/20/77/6/00207722.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/95/6/00419570.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/92/6/00419233.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/92/6/00419290.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419194.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/92/6/00419215.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/34/75/6/00347516.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419170.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/96/6/00419651.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/96/6/00419662.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/95/6/00419589.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/91/6/00419172.jpg' },
            { url: 'http://img.dotua.org/fsua_items/cover/00/41/96/6/00419617.jpg' },
        ]

        function getRandom(min, max) {
            return ~~(Math.random() * (max - min) + min);
        }

        for (let i = 0; i < 55; i++) {
            let a = getRandom(0, 24);
            let b = getRandom(0, 24);

            if (a == b)
                continue;

            let c = arr[a];
            let d = arr[b];
            arr[a] = d;
            arr[b] = c;
        }


        let data = arr;
        return { then: (cb) => { cb(data) } };
    }
}
