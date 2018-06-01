import PropTypes from 'prop-types';
import React from 'react';
import ErrorList from '../../forms/ErrorList';

/**
 * @function getErrorId
 * returns an id with which we can set ARIA
 * relationships between errors and form fields
 *
 * @param {string} id - the id of the form field
 * @returns {string} id for error list
 */
export const getErrorId = id => `${id}-error`;

/**
 * Provides `ErrorList` component and aria related props
 * to wrapped form component
 *
 * @param {React.element} WrappedComponent - the component to wrap
 */
const withErrorList = WrappedComponent => {
	/**
	 * @module WithErrorList
	 * Adds props to the wrapped form component for a11y.
	 * Adds `ErrorList` as adjacent sibling to wrapped form.
	 *
	 * @returns {React.element}
	 */
	class WithErrorList extends React.PureComponent {
		render() {
			const { id, error, suppressError, ...other } = this.props;

			const errorId = id && getErrorId(id);

			return suppressError ? (
				<WrappedComponent {...other} />
			) : (
				<div>
					<WrappedComponent
						id={id}
						error={error}
						aria-describedby={errorId}
						aria-invalid={Boolean(error)}
						{...other}
					/>
					<ErrorList id={errorId} error={error} />
				</div>
			);
		}
	}
	WithErrorList.propTypes = {
		id: PropTypes.string,
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element,
			PropTypes.bool,
		]),
		suppressError: PropTypes.bool,
	};

	const wrappedComponentName =
		WrappedComponent.displayName || WrappedComponent.name || 'Component';

	WithErrorList.WrappedComponent = WrappedComponent;
	WithErrorList.displayName = `WithErrorList(${wrappedComponentName})`;

	return WithErrorList;
};

export default withErrorList;
