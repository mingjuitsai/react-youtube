import React from "react";
import LikeIcon from './LikeIcon';
import UnLikeIcon from './LikeIcon';


/**
 * Helpers
 */
function isVideoInLikes() {
	let likeVideos = window.localStorage.getItem("august-youtube-likes");
}

class VideoPlayerItem extends React.Component {
	constructor(props) {
		super(props);
		this.onVideoClick = this.onVideoClick.bind(this);
	}

	onVideoClick() {
		const video = this.props.video;
		let player = new window.YT.Player(video.etag, {
      height: '390',
      width: '640',
      videoId: video.id.videoId,
      playerVars: {
      	autoplay: 1,
	      iv_load_policy: 3,
	      modestbranding: 1,
	      rel: 0,
	      enablejsapi: 1
      }
    });
	}

	render() {
		const vm = this;
		const video = vm.props.video;
		const onVideoClick = vm.onVideoClick;
		const thumbnail = video.snippet.thumbnails.medium.url;
		const onToggleLikeVideo = () => { this.props.onToggleLikeVideo(video) };

		function LikeToggleIcon() {
			if(vm.props.isVideoLike) {
				return (<LikeIcon />);
			} else {
				return (<UnLikeIcon />);
			}
		}

		return (
			<div className="VideoPlayerItem">
				<div id={video.etag}>
					<figure className="VideoPlayerItem__thumbnail">
						<img src={thumbnail} onClick={onVideoClick}/>
					</figure>
				</div>
				<header className="VideoPlayerItem__header">
					<h3 className="VideoPlayerItem__title">
						{video.snippet.title}
					</h3>
					<h5 className="VideoPlayerItem__header">
						by {video.snippet.channelTitle}
					</h5>
					<button className="VideoPlayerItem__like" onClick={onToggleLikeVideo}>
						<LikeToggleIcon />
					</button>
				</header>
			</div>
		);
	}
}

export default VideoPlayerItem;