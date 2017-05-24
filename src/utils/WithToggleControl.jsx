import React from 'react';

/**
 * @function withToggleControl
 */
/**
 * Provides boolean isChecked prop to wrapped component.
 *
 * @param {React.element} ToggleComponent - the component to wrap
 */
export default function withToggleControl(WrappedComponent, propName = 'isChecked') {
	/**
	 * @module WithToggle
	 */
	class WithToggle extends React.Component {
		constructor(props) {
			super(props);

			this.state = { bool: props[propName] };
			this.onToggleBool = this.toggleBool.bind(this);
		}
		toggleBool() {
			// console.warn('TOGGLE THE BOOL');
			// console.log(!this.state.bool);
			this.setState({ bool: !this.state.bool });
		}
		render() {

			const newProps = Object.assign({}, this.props, {
				[`${propName}`]: this.state.bool,
				toggle: this.onToggleBool
			});

			return (
				<span role='button' aria-pressed={this.state.bool}>
					<WrappedComponent {...newProps} />
				</span>
			);
		}
	}

	WithToggle.defaultProps = {
		[`${propName}`]: false
	};
	WithToggle.propTypes = {
		[`${propName}`]: React.PropTypes.bool
	};

	return WithToggle;
}
