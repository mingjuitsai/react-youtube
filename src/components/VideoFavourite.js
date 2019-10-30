import React from "react";
import VideoPlayerList from './VideoPlayerList';
import LikedVideos from '../modules/LikedVideos';
import YoutubeIframeAPI from '../modules/YoutubeIframeAPI';


async function fetchYoutubeVideos(videoIds) {
	try {
		const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds.join(',')}&key=AIzaSyCB1WjqD_vSvZjvPA5CI_xaI2VLgbp3acY`);
		const data = await response.json();
		return await data.items;
	} catch {
		return new Error('Videos cannot be fetched');
	}
}


class VideoFavourite extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			isLoading: false,
			isYouTubeIframeAPIReady: false,
		}
		this.onToggleLikeVideo = this.onToggleLikeVideo.bind(this);
	}

	componentDidMount() {
		const vm = this;
		this.setState({
			loading: true
		});

		YoutubeIframeAPI.tryLoadScript(() => {
			vm.setState({
				isYouTubeIframeAPIReady: true
			});
		});
		
		this.setState({
			videos: LikedVideos.videos
		});
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

		this.setState({
			videos: LikedVideos.videos
		});
	}

	render() {
		const videos = this.state.videos;
		const onToggleLikeVideo = this.onToggleLikeVideo;
		let loadingClass = this.state.isLoading ? 'loading' : '';
		let APIReadyClass = this.state.isYouTubeIframeAPIReady ? 'ready' : '';

		return (
			<div className="VideoFavourite">
				<section className={`VideoFavourite__main ${loadingClass} ${APIReadyClass}`}>
					<VideoPlayerList videos={videos} likedVideos={videos} onToggleLikeVideo={onToggleLikeVideo}/>
				</section>
			</div>
		);
	}
}

export default VideoFavourite;