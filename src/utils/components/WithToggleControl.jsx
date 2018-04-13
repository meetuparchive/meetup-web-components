import PropTypes from 'prop-types';
import React from 'react';

/**
 * Provides boolean isActive prop to wrapped component.
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
			this.onKeyUp = this.onKeyUp.bind(this);
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.isActive !== this.props.isActive) {
				this.toggleActive();
			}
		}

		toggleBool() {
			this.setState({ isActive: !this.state.isActive });
		}

		onKeyUp(e) {
			const { target } = e;

			const isActivatingButton = [
				' ', /* space bar */
				'Enter'
			].some(key => e.key === key);

			if (isActivatingButton && target.type !== 'radio') {
				this.toggleActive();
			}
		}

		render() {
			return (
				<span
					// tabIndex={this.props.tabIndex || "0"}
					role="button"
					aria-pressed={this.state.isActive}
					// onKeyUp={this.onKeyUp}
				>
					<WrappedComponent
						{...this.props}
						tabIndex={this.props.tabIndex || "0"}
						isActive={this.state.isActive}
						toggleActive={this.toggleActive}
						onKeyUp={this.onKeyUp}
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
