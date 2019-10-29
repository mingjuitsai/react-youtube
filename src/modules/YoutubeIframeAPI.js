
const YoutubeIframeAPI = {

	loadScript(callback) {
		let tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
    	callback();
    	window.isYouTubeIframeAPIReady = true;
    }
	},
	tryLoadScript(callback) {
		if(YoutubeIframeAPI.isYouTubeIframeAPIReady === false) {
			YoutubeIframeAPI.loadScript(callback);
		}
	},
	get isYouTubeIframeAPIReady() {
		if(window.hasOwnProperty('isYouTubeIframeAPIReady')) {
			return window.isYouTubeIframeAPIReady;
		} else {
			return false;
		}
	}
}

export default YoutubeIframeAPI;