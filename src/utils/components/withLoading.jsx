import PropTypes from 'prop-types';
import React from 'react';

import Loading from '../../media/Loading';

const getDisplayName = WrappedComponent => {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLoading = WrappedComponent => {
	/**
	 * @module WithLoading
	 */
	class WithLoading extends React.Component {
		render() {
			const { children, isLoading, loadingProps, ...other } = this.props;

			return (
				<WrappedComponent
					aria-busy={isLoading}
					isLoading={isLoading}
					{...other}
				>
					{this.props.dangerouslySetInnerHTML
						? null
						: [
								children,
								isLoading && (
									<Loading
										key="loadingIndicator"
										partialCover
										{...loadingProps}
									/>
								),
							]}
				</WrappedComponent>
			);
		}
	}

	WithLoading.displayName = getDisplayName(WrappedComponent);
	return WithLoading;
};

withLoading.defaultProps = {
	isLoading: false,
};
withLoading.propTypes = {
	isLoading: PropTypes.bool,
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string,
	}),
};

export default withLoading;
