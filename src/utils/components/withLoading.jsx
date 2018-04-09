import PropTypes from 'prop-types';
import React from 'react';

import Loading from '../../media/Loading';

const WithLoading = (WrappedComponent) =>
	({ children, isLoading, loadingProps, ...other }) => (
		<WrappedComponent
			aria-busy={isLoading}
			isLoading={isLoading}
			loadingComponent={
				isLoading &&
					<Loading
						partialCover
						{...loadingProps}
					/>
			}
			{...other}
		>
			{children}
		</WrappedComponent>
	);

WithLoading.defaultProps = {
	isLoading: false
};
WithLoading.propTypes = {
	isLoading: PropTypes.bool,
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string
	})
};

export default WithLoading;
