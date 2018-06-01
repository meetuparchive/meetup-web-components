import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';

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

	handleChange(event) {
		const { onChange } = this.props;

		this.setState({
			selectedValue: event.target.value,
		});

		if (onChange) {
			onChange(event);
		}
	}

	render() {
		const {
			direction,
			switchDirection,
			children,
			name,
			className,
		} = this.props;

		const switchDirectionAttr = switchDirection ? { switchDirection } : '';

		return (
			<Flex
				direction={direction}
				{...switchDirectionAttr}
				className={className}
			>
				{React.Children.map(children, option => (
					<FlexItem shrink>
						{React.cloneElement(option, {
							onChange: this.handleChange,
							...option.props,
							name,
							checked: option.props.value === this.state.selectedValue,
						})}
					</FlexItem>
				))}
			</Flex>
		);
	}
}

RadioButtonGroup.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	selectedValue: PropTypes.string,
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	direction: PropTypes.oneOf(['row', 'column']),
	onChange: PropTypes.func,
};

RadioButtonGroup.defaultProps = {
	direction: 'row',
};
