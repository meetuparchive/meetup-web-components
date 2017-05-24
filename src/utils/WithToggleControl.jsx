import React from 'react';

/**
 * Provides boolean isChecked prop to wrapped component.
 * Prop name can also be customized if need be
 *
 * @param {React.element} ToggleComponent - the component to wrap
 * @returns {React.element}
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
