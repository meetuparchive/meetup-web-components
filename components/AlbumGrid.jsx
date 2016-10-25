import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
// import {
// 	Chunk,
// } from 'foundation-react/layoutUtils';


/**
 * @module AlbumGrid
 */
class AlbumGrid extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			photoDimens: {}
		};

		this.imgLoaded = this.imgLoaded.bind(this);
	}

	imgLoaded(e, photoId) {
		const newPhotoDimens = {
			...this.state.photoDimens
		};
		newPhotoDimens[photoId] = {
			width: e.target.naturalWidth,
			height: e.target.naturalHeight
		};
		this.setState({photoDimens: newPhotoDimens});
	}

	render() {
		const {
			children,
			className,
			photos,
			groupUrl,
			...other
		} = this.props;

		const album = photos[0].photo_album || {title: 'Album...'};

		const classNames = cx(
			'albumGrid',
			className
		);

		return (
			<ul
				className={classNames}
				{...other}>
					{children}
					{photos.map((photo, i)=>{
						let imgContainerStyle;
						let imgContainerShimStyle;

						if (this.state.photoDimens[photo.id] !== undefined) {
							imgContainerStyle = {
								width: `${this.state.photoDimens[photo.id].width / this.state.photoDimens[photo.id].height * 100}px`,
								flexGrow: this.state.photoDimens[photo.id].width / this.state.photoDimens[photo.id].height * 100
							};

							imgContainerShimStyle = {
								paddingBottom: `${this.state.photoDimens[photo.id].height / this.state.photoDimens[photo.id].width * 100}%`
							};
						}

						return(
							<li className='albumGrid-item' key={photo.id} style={imgContainerStyle}>
								<Link to={`/${groupUrl}/albums/${album.id}/${photo.id}`}>
									<i className='albumGrid-itemShim' style={imgContainerShimStyle}></i>
									<img className='albumGrid-img' src={photo.photo_link} onLoad={ (e) => this.imgLoaded(e, photo.id) } />
								</Link>
							</li>
						);
					})}
			</ul>
		);
	}
}

AlbumGrid.propTypes = {
	photos: React.PropTypes.array.isRequired
};

export default AlbumGrid;
