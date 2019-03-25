import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * @class RadioButtonGroup
 */
export default class RadioButtonGroup extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			selectedValue: props.selectedValue,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if ('selectedValue' in nextProps) {
			this.setState({
				selectedValue: nextProps.selectedValue,
			});
		}
	}

	handleChange(e) {
		this.props.onChange && this.props.onChange(e);

		this.setState({
			selectedValue: e.target.value,
		});
	}

	render() {
		const { children, className } = this.props;

		return (
			<div className={className}>
				{React.Children.map(children, radio =>
					React.cloneElement(radio, {
						onChange: this.handleChange,
						...radio.props,
						checked: radio.props.value === this.state.selectedValue,
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
