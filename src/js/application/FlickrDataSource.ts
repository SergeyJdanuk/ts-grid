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
		return 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_n.jpg'
	}

	public getPhotos(perpage?	: number): Promise<any> {
		console.log('FlickrDataSource.getPhotos...');

		return new Promise( (resolve, reject) => {
			this.request('flickr.photos.getRecent').then((data) => {
				console.log('FlickrDataSource.getPhotos... OK');
				resolve(this.onPhotosSuccess(data));
			}, function error() {
				console.log('FlickrDataSource.getPhotos... ERROR');
				reject(Error());
			})
		});
	}

	onPhotosSuccess(data) {
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
		

		//return this.fakeRequest(method);

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

	public fakeRequest(methid): Promise<any> {

		let manyItems = [
			{
				"id": "24934338654",
				"owner": "138819740@N02",
				"secret": "56cca2a284",
				"server": "1643",
				"farm": 2,
				"title": "image",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "24934341174",
				"owner": "8840913@N03",
				"secret": "6d7b6062b5",
				"server": "1506",
				"farm": 2,
				"title": "Emden_01",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "24934343104",
				"owner": "139295736@N03",
				"secret": "a60c500d4d",
				"server": "1566",
				"farm": 2,
				"title": "#NiiFunny on stage now #BeachPartyWithDaStarz",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "24934343394",
				"owner": "34173790@N06",
				"secret": "123343b3f6",
				"server": "1663",
				"farm": 2,
				"title": "2016 Indy Triangle Summit-116.jpg",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "24934343404",
				"owner": "134024225@N06",
				"secret": "0e1e85b428",
				"server": "1520",
				"farm": 2,
				"title": "FB_IMG_1456834224889",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "24938132633",
				"owner": "12639178@N07",
				"secret": "7551ca01bc",
				"server": "1680",
				"farm": 2,
				"title": "Weidenmeise , NGID1696549123",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25197298999",
				"owner": "13716483@N07",
				"secret": "530e4b051f",
				"server": "1647",
				"farm": 2,
				"title": "",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25197299409",
				"owner": "95006464@N04",
				"secret": "9753712f1a",
				"server": "1551",
				"farm": 2,
				"title": "IMG_0353",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25197299459",
				"owner": "82928166@N05",
				"secret": "0d5fdafd03",
				"server": "1603",
				"farm": 2,
				"title": "",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25197300059",
				"owner": "91539904@N06",
				"secret": "e73f3fafaa",
				"server": "1613",
				"farm": 2,
				"title": "Sinner's Prayer: Dear God in Heaven, I come to you, in the name of Jesus. I'm sorry for my sins, the way I've lived, the things I've done. Please forgive me, cleanse me with your precious  blood from all unrighteousness. With my mouth I confess the Lord J",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25197301189",
				"owner": "65214570@N04",
				"secret": "63e51b1153",
				"server": "1582",
				"farm": 2,
				"title": "flic",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25269242330",
				"owner": "129717949@N08",
				"secret": "c9ae2d47e2",
				"server": "1469",
				"farm": 2,
				"title": "#longhair #purplehair #hair",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25446291972",
				"owner": "67582642@N00",
				"secret": "f32e8154bb",
				"server": "1666",
				"farm": 2,
				"title": "Porsche Club2016 (17 of 51).jpg",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25538699886",
				"owner": "60778225@N08",
				"secret": "dd8286d3bb",
				"server": "1592",
				"farm": 2,
				"title": "_DSC6634.jpg",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25538700946",
				"owner": "121676716@N08",
				"secret": "0020ceaefa",
				"server": "1695",
				"farm": 2,
				"title": "Singraven 2005",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25538700996",
				"owner": "54097083@N02",
				"secret": "af4cebbd34",
				"server": "1646",
				"farm": 2,
				"title": "UMD vs Norwich 2016 104",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25564848815",
				"owner": "92545929@N07",
				"secret": "0d4747e22e",
				"server": "1558",
				"farm": 2,
				"title": "Your StubHub Commemorative Ticket",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25564848945",
				"owner": "117787128@N03",
				"secret": "766116f5eb",
				"server": "1455",
				"farm": 2,
				"title": "P3060553.jpg",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25564849315",
				"owner": "53610434@N07",
				"secret": "5ae06f925a",
				"server": "1708",
				"farm": 2,
				"title": "Knott's Berry Farm (60)",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25564849865",
				"owner": "129644472@N03",
				"secret": "46a7d57ae1",
				"server": "1517",
				"farm": 2,
				"title": "",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			}
		];

		let a1 = [{
				"id": "25564849315", 
				"owner": "53610434@N07",
				"secret": "5ae06f925a",
				"server": "1708",
				"farm": 2,
				"title": "Knott's Berry Farm (60)",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			}];
		let a2 = [{
				"id": "25564849315",
				"owner": "53610434@N07",
				"secret": "5ae06f925a",
				"server": "1708",
				"farm": 2,
				"title": "Knott's Berry Farm (60)",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			},
			{
				"id": "25564849865",
				"owner": "129644472@N03",
				"secret": "46a7d57ae1",
				"server": "1517",
				"farm": 2,
				"title": "",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"media": "photo",
				"media_status": "ready"
			}];
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
		let b = [a1, a2],
			i = getRandomInt(0, 2);

		let items = manyItems;//b[i];

		return new Promise((resolve, reject) => {
			resolve({
				"photos": {
					"page": this.page + 1,
					"pages": 50,
					"perpage": 20,
					"total": 1000,
					"photo": items
				},
				"stat": "ok"
			});
		});
	}
}
