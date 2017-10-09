import PropTypes from 'prop-types';
import React from 'react';

/**
 * Provides boolean isChecked prop to wrapped component.
 * Prop name can also be customized if need be
 *
 * @param {React.element} ToggleComponent - the component to wrap
 * @returns {React.element}
 */
export default function withToggleControl(WrappedComponent) {
	/**
	 * @module WithToggle
	 */
	class WithToggle extends React.Component {
		constructor(props) {
			super(props);

			this.state = { isActive: props.isActive };
			this.toggleActive = this.toggleBool.bind(this);
		}
		toggleBool() {
			this.setState({ isActive: !this.state.isActive });
		}
		render() {

			return (
				<span role='button' aria-pressed={this.state.isActive}>
					<WrappedComponent
						{...this.props}
						isActive={this.state.isActive}
						toggleActive={this.toggleActive}
					/>
				</span>
			);
		}
	}

	WithToggle.defaultProps = {
		isActive: false
	};
	WithToggle.propTypes = {
		isActive: PropTypes.bool
	};

	return WithToggle;
}
