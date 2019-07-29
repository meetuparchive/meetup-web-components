import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import DeprecationWarning from '../utils/components/DeprecationWarning';

/**
 * @class RadioButtonGroup
 */
export class RadioButtonGroup extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			selectedValue: props.selectedValue,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if ('selectedValue' in nextProps) {
			this.setState({
				selectedValue: nextProps.selectedValue,
			});
		}
	}

	handleChange(e) {
		let value = e.target.value;

		this.props.onChange && this.props.onChange(e);

		// THIS IS AN INTENTIONAL TERRIBLE HACK
		// WE WANT TO SUPPORT OLD BEHAVIOR FOR NOW
		if (e.target.value === undefined) {
			value = e.target.parentNode.value;
		}

		this.setState({
			selectedValue: value,
		});
	}

	render() {
		const { children, className, direction } = this.props;

		return (
			<Flex direction={direction} className={className}>
				{React.Children.map(children, child => {
					let childProps = {};
					const isSelected = child.props.value === this.state.selectedValue;

					if (child.type.name === 'TogglePill') {
						childProps = {
							onClick: this.handleChange,
							...child.props,
							isActive: isSelected,
						};
					} else {
						childProps = {
							onChange: this.handleChange,
							...child.props,
							checked: isSelected,
						};
					}
					return (
						<FlexItem shrink>
							{React.cloneElement(child, childProps)}
						</FlexItem>
					);
				})}
			</Flex>
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

	/** The axis the radio buttons will be layed out on */
	direction: PropTypes.oneOf(['row', 'column']),

	/** Callback that happens when the input changes */
	onChange: PropTypes.func,
};

RadioButtonGroup.defaultProps = {
	direction: 'row',
};

export default DeprecationWarning(RadioButtonGroup);
