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
export const getErrorId = (id) => `${id}-error`;


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

			const fieldProps = {
				id,
				'aria-invalid': Boolean(error),
				'aria-describedby': id && getErrorId(id),
			};
			const listProps = {
				errorId: id && getErrorId(id),
				errors: error,
			};

			return this.props.suppressError ? <WrappedComponent /> : (
				<div>
					<WrappedComponent {...this.props} {...fieldProps} />
					<ErrorList {...listProps} />
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
