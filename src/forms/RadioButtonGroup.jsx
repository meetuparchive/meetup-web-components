import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * @class RadioButtonGroup
 */
export default class RadioButtonGroup extends PureComponent {
	constructor(props) {
		super(props);

		const initialState = {
			value: props.selectedValue,
		};

		React.Children.forEach(props.children, radio => {
			initialState[radio.props.value] = radio.props.value === props.selectedValue;
		});

		this.state = initialState;
		this.onChange = this.onChange.bind(this);
		this.isSelected = this.isSelected.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if ('selectedValue' in nextProps) {
			const newState = {};

			Object.keys(this.state).forEach(stateKey => {
				if (stateKey === 'value') {
					newState.value = nextProps.selectedValue;
				} else {
					newState[stateKey] = stateKey === nextProps.selectedValue;
				}
			});

			this.setState(newState);
		}
	}

	onChange(e) {
		this.props.onChange && this.props.onChange(e);

		// TODO: also update state of individual buttons
		this.setState({
			value: e.target.value,
		});
	}

	isSelected(radio) {
		return radio.props.value === this.state.value;
	}

	render() {
		const { children, className } = this.props;

		return (
			<div className={className}>
				{React.Children.map(children, radio =>
					React.cloneElement(radio, {
						onChange: this.onChange,
						checked: this.isSelected(radio),
						...radio.props,
					})
				)}
			</div>
		);
	}
}

RadioButtonGroup.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element).isRequired,

	/** The value of the selected input in the radio group */
	selectedValue: PropTypes.string,

	/** The name attribute on each radio in the group */
	name: PropTypes.string.isRequired,

	/** Additional class name/s to add to the wrapper element */
	className: PropTypes.string,

	/** Callback that happens when the input changes */
	onChange: PropTypes.func,
};
