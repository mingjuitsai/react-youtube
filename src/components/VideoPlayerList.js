import React from "react";
import VideoPlayerItem from './VideoPlayerItem'


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


class VideoPlayerList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cool: ''
		}
	}

	shouldComponentUpdate(nextProps) {
		// Avoid re-render if same videos
		return areVideosDifferent(nextProps.videos, this.props.videos);
	}


	render() {
		console.log('render');
		const videos = this.props.videos;
		function VideoPlayerItems() {
			let items = videos.map((v, i)=> {
				return (
					<VideoPlayerItem key={i} video={v}/>
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