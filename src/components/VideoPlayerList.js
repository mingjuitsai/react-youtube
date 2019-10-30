import React from "react";
import VideoPlayerItem from './VideoPlayerItem';


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


// Component
class VideoPlayerList extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		// Avoid re-render if same videos
		return areVideosDifferent(nextProps.videos, this.props.videos);
	}

	render() {
		const videos = this.props.videos;
		const onLikeVideo = this.onLikeVideo;
		const likedVideos = this.props.likedVideos;
		const onToggleLikeVideo = this.props.onToggleLikeVideo;
		function VideoPlayerItems(props) {
			let items = videos.map((video, i)=> {
				return (
					<VideoPlayerItem
						key={i} 
						video={video} 
						onToggleLikeVideo={onToggleLikeVideo} 
						isVideoLiked={likedVideos.some(likedVideo => likedVideo.etag === video.etag)}
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