import DataSource from '../modules/data-source/DataSource';
import Promise from 'ts-promise';
import $ = require('jquery');

export default class FlickrDataSource extends DataSource {

    private apiKey = 'a45cf0550301cd2ea80afa12921af59b';
    private userId: string;

    private page = 0;
    private perpage = 20;

    private pages: number;
    private total: number;


    constructor(userId: string) {
        super();
        this.userId = userId;
    }

    public getPhotoUrl(photo: any): string {
        //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
        return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_n.jpg'
    }

    public getPhotos(perpage?: number): Promise<any> {
        console.log('FlickrDataSource.getPhotos...');

        return new Promise((resolve, reject) => {
            this.request('flickr.photos.getRecent').then((data) => {
                console.log('FlickrDataSource.getPhotos... OK');
                resolve(this.onPhotosSuccess(data));
            }, function error() {
                console.log('FlickrDataSource.getPhotos... ERROR');
                reject(Error());
            })
        });
    }

    public onPhotosSuccess(data) {
        this.page = data.photos.page;
        this.pages = data.photos.pages;
        this.perpage = data.photos.perpage;
        this.total = data.photos.total;

        return data.photos.photo.map((v) => {
            return {
                url: this.getPhotoUrl(v),
                title: v.title
            }
        });
    }

    public request(method): Promise<any> {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: 'https://api.flickr.com/services/rest/',
                data: {
                    method: method,
                    api_key: this.apiKey,
                    user_id: this.userId,
                    per_page: this.perpage,
                    page: this.page += 1,
                    extras: 'media',
                    format: 'json',
                    nojsoncallback: 1
                },
                dataType: "json",
                timeout: 15000,
                success: (data) => {
                    resolve(data);
                },
                error: function() {
                    reject(Error('Error'));
                }
            })
        });
    }
}
