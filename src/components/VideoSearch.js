import React from "react";
import VideoPlayerList from './VideoPlayerList';
import YoutubeIframeAPI from '../modules/YoutubeIframeAPI';

async function fetchYoutubeSearch(q) {
	try {
		const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&maxResults=6&type=video&key=AIzaSyCB1WjqD_vSvZjvPA5CI_xaI2VLgbp3acY`);
		const data = await response.json();
		return await data.items;
	} catch {
		return new Error('Videos cannot be fetched');
	}
}


class VideoSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchInput: "",
			isLoading: false,
			isYouTubeIframeAPIReady: false,
			videos: []
		}
		this.onSearchInputChange = this.onSearchInputChange.bind(this);
		this.onSearchInputSubmit = this.onSearchInputSubmit.bind(this);
	}
	// https://www.googleapis.com/youtube/v3/search?part=snippet&q=javascript&type=video&key=AIzaSyCB1WjqD_vSvZjvPA5CI_xaI2VLgbp3acY

	onSearchInputChange(event) {
		this.setState({
			searchInput: event.target.value
		});
	}

	componentDidMount() {
		const vm = this;

		YoutubeIframeAPI.tryLoadScript(() => {
			vm.setState({
				isYouTubeIframeAPIReady: true
			});
		});
	}

	onSearchInputSubmit(event) {
		event.preventDefault();

		this.setState({
				isLoading: true
		});
		// Fetch youtube API to search input
		// Hanlde data
		// Update state
		fetchYoutubeSearch(this.state.searchInput).then(data => {
			this.setState({
				videos: data
			});
			this.setState({
				isLoading: false
			});
		});
	}

	render() {
		const videos = this.state.videos;
		const searchInput = this.state.searchInput;
		const onSearchInputChange = this.onSearchInputChange;
		const onSearchInputSubmit = this.onSearchInputSubmit;
		let loadingClass = this.state.isLoading ? 'loading' : '';
		let APIReadyClass = this.state.isYouTubeIframeAPIReady ? 'ready' : '';

		return (
			<div className="VideoSearch">
				<form className="VideoSearch__form" onSubmit={onSearchInputSubmit}>
					<input type="text" placeholder="Search video" value={searchInput} onChange={onSearchInputChange} />
					<button type="submit" onClick={onSearchInputSubmit}>Search</button>
				</form>
				<section className={`VideoSearch__main ${loadingClass} ${APIReadyClass}`}>
					<VideoPlayerList videos={videos}/>
				</section>
			</div>
		);
	}
}

export default VideoSearch;