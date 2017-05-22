import React from 'react';

/**
 * @module WithToggleControl
 */
/**
 * Provides boolean isChecked prop to wrapped component.
 *
 * @param {React.element} ToggleComponent - the component to wrap
 */
export const withToggleControl = (
	ToggleComponent
) => class extends React.Component {
	/**
	 * @constructor
	 * @param {Object} - React element props
	 */
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);

		this.state = {
			isChecked: props.isChecked || false
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		// console.log(`e.target.checked: ${e.target.checked}`);
		// console.log(`this.state.isChecked: ${this.state.isChecked}`);
		// console.log(`!this.state.isChecked: ${!this.state.isChecked}`);
		// console.log(`this.props.isChecked: ${this.props.isChecked}`);

		this.setState({
			isChecked: e.target.checked
		});

		console.log(this.state.isChecked);
	}

	/**
	 * `isChecked` prop is provided to the wrapped component in render().
	 *
	 * When there's a change on the checkbox input, `this.state.isChecked`
	 * is updated and the component will re-render with the correct
	 * boolean prop value.
	 *
	 * @returns {React.element}
	 */
	render() {

		const {
			id,
			name,
			value,
			children,
			...other
		} = this.props;

		return (
			<div>
				<input
					type='checkbox'
					className='withToggleInput-input visibility--a11yHide'
					onChange={this.onChange}
					id={id}
					name={name}
					value={value}
					checked={this.state.isChecked} />
				<label
					className='withToggleInput-label'
					htmlFor={id}
				>
					<ToggleComponent
						isChecked={this.state.isChecked}
						children={children}
						{...other}
					/>
				</label>
			</div>
		);

	}

};

withToggleControl.propTypes = {
	id: React.PropTypes.string,
	name: React.PropTypes.string
};
