
const itemName = 'august-youtube-likedVideos';

const LikedVideos = {

	addVideo(video) {
		let data = this.videos;
		data.push(video);
		window.localStorage.setItem(itemName, JSON.stringify(data));
	},
	removeVideo(video) {
		let data = this.videos;
		let videoIndex = this.findVideoIndex(video);
		data.splice(videoIndex, 1);
		window.localStorage.setItem(itemName, JSON.stringify(data));
	},
	findVideoIndex(video) {
		return this.videos.findIndex(v => v.etag === video.etag);
	},
	get videos() {
		try {
			let data = window.localStorage.getItem(itemName);
			if(data) {
				return JSON.parse(data);
			} else {
				return [];
			}
		} catch(e) {
			// statements
			console.log(e);
			return false;
		}
	}
}

export default LikedVideos;