import React from "react";
import VideoPlayerItem from './VideoPlayerItem';
import LikedVideos from './../modules/LikedVideos';


// Helpers
function areVideosDifferent(newVideos, oldVideos) {
	if(!newVideos || !oldVideos) throw new Error('Videos broken');

	if(newVideos.length !== oldVideos.length) return true;

	for (var i = 0; i < newVideos.length; i++) {
		if(newVideos[i].etag !== oldVideos[i].etag) {
			return true;
		}
	}
	return false;
}

// let likedVideos = JSON.parse(window.localStorage.getItem('august-youtube-likedVideos'));

class VideoPlayerList extends React.Component {
	constructor(props) {
		super(props);
		this.onToggleLikeVideo = this.onToggleLikeVideo.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		// Avoid re-render if same videos
		return areVideosDifferent(nextProps.videos, this.props.videos);
	}

	onToggleLikeVideo(video) {
		// Check video etag exist in local storage array
		// if not push into array
		// store to local storage
		if(LikedVideos.findVideoIndex(video) === -1) {
			LikedVideos.addVideo(video);
		} else {
			LikedVideos.removeVideo(video);
		}
	}

	render() {
		const videos = this.props.videos;
		const onLikeVideo = this.onLikeVideo;
		const onToggleLikeVideo = this.onToggleLikeVideo;
		function VideoPlayerItems() {
			let items = videos.map((v, i)=> {
				return (
					<VideoPlayerItem
						key={i} 
						video={v} 
						onToggleLikeVideo={onToggleLikeVideo} 
						isVideoLike={false}
					/>
				)
			});
			return items;
		}

		return (
			<div className="VideoPlayerList">
				<VideoPlayerItems />
			</div>
		);
	}
}

export default VideoPlayerList;