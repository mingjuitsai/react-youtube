import React from "react";

class VideoPlayerItem extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const video = this.props.video;
		const thumbnail = video.snippet.thumbnails.medium.url;
		// let player = new window.YT.Player('player', {
  //     height: '390',
  //     width: '640',
  //     videoId: 'M7lc1UVf-VE'
  //   });

		return (
			<div className="VideoPlayerItem">
				<figure>
					<img src={thumbnail} />
				</figure>
			</div>
		);
	}
}

export default VideoPlayerItem;