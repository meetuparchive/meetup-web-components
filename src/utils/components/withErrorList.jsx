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
const getErrorId = (id) => id && `${id}-error`;

/**
 * @function getFieldErrorProps
 * returns an object of ARIA attributes to assign
 * to a form field with an error
 *
 * @param {string} id - the id of the form field
 * @param {boolean} hasError - pass `true` if field has an error
 * @returns {object} props object to apply to field
 */
export const getFieldErrorProps = (id, hasError) => {
	const ariaProps = {
		'aria-invalid': !!hasError,
	};

	if (id) {
		ariaProps['aria-describedby'] = getErrorId(id);
	}

	return ariaProps;
};

/**
 * @function getErrorListProps
 * returns props to pass for an ErrorList related
 * to a form field
 *
 * @param {string} id - the id of the form field
 * @param {string|array} errors - single or multiple error messages
 * @returns {object} props object to apply to ErrorList
 */
export const getErrorListProps = (id, errors) => {
	const props = { errors };

	if (id) {
		props['errorId'] = getErrorId(id);
	}

	return props;
};

/**
 * Provides `ErrorList` component and aria related props
 * to wrapped form component
 *
 * @param {React.element} WrappedComponent - the component to wrap
 */
const withErrorList = WrappedComponent => {
	/**
	 * @module WithErrorList
	 */
	class WithErrorList extends React.PureComponent {
		/**
		 * @constructor
		 * @param {Object} - React element props
		 */
		constructor(props) {
			super(props);
		}

		/**
		 * Adds props to the wrapped form component for a11y.
		 * Adds `ErrorList` as adjacent sibling to wrapped form.
		 *
		 * @returns {React.element}
		 */
		render() {
			const {
				id,
				error,
			} = this.props;

			return this.props.suppressError ? <WrappedComponent /> : (
				<div>
					<WrappedComponent {...this.props} {...getFieldErrorProps(id, !!error)} />
					<ErrorList {...getErrorListProps(id, error)} />
				</div>
			);
		}
	}

	const wrappedComponentName =
		WrappedComponent.displayName || WrappedComponent.name || 'Component';

	WithErrorList.WrappedComponent = WrappedComponent;
	WithErrorList.displayName = `WithErrorList(${wrappedComponentName})`;

	return WithErrorList;
};

export default withErrorList;
