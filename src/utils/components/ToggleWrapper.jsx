import PropTypes from 'prop-types';
import React from 'react';
import ConditionalWrap from './ConditionalWrap';

/**
 * Provides boolean isActive prop to wrapped component.
 * Prop name can also be customized if need be
 *
 * @param {React.element} ToggleComponent - the component to wrap
 * @returns {React.element}
 */
// export default function withToggleControl(WrappedComponent) {
/**
 * @module ToggleWrapper
 */
class ToggleWrapper extends React.Component {
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

	toggleBool(e) {
		this.setState({ isActive: !this.state.isActive });

		if (this.props.onToggle) {
			this.props.onToggle(e);
		}
	}

	onKeyUp(e) {
		const isActivatingButton = [
			' ', /* space bar */
			'Enter'
		].some(key => e.key === key);

		if (isActivatingButton) {
			this.toggleActive();
		}
	}

	render() {
		const isInput = this.props.type == 'radio' || this.props.type == 'checkbox';

		return (
			<ConditionalWrap
				condition={!isInput}
				wrap={children => (
					<div
						role="button"
						aria-pressed={this.state.isActive}
						onKeyUp={this.onKeyUp}
						tabIndex={this.props.tabIndex || "0"}
					>
						{this.props.children({
							isActive: this.state.isActive,
							toggleActive: this.toggleActive,
						})}
					</div>
				)}
			>
				{this.props.children({
					tabIndex: isInput && this.props.tabIndex || "0",
					isActive: this.state.isActive,
					toggleActive: this.toggleActive,
					onKeyUp: this.props.type !== 'radio' && this.onKeyUp
				})}
			</ConditionalWrap>
		);
	}
}

ToggleWrapper.defaultProps = {
	isActive: false
};
ToggleWrapper.propTypes = {
	isActive: PropTypes.bool
};

export default ToggleWrapper;
