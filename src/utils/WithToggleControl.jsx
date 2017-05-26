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

			this.state = { isActive: props['isActive'] };
			this.onToggleBool = this.toggleBool.bind(this);
		}
		toggleBool() {
			this.setState({ isActive: !this.state.isActive });
		}
		render() {

			const newProps = {
				...this.props,
				isActive: this.state.isActive,
				toggleActive: this.onToggleBool
			};

			return (
				<span role='button' aria-pressed={this.state.isActive}>
					<WrappedComponent {...newProps} />
				</span>
			);
		}
	}

	WithToggle.defaultProps = {
		isActive: false
	};
	WithToggle.propTypes = {
		isActive: React.PropTypes.bool
	};

	return WithToggle;
}
