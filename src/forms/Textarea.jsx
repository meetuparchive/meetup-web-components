import React from 'react';
import cx from 'classnames';
import autosize from 'autosize';

/**
 * @module Textarea
 */
class Textarea extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);

		this.state = {
			value: '',
		};
	}

	/**
	 * Turns on autosize if requested
	 * @return {undefined} side effect only
	 */
	componentDidMount() {
		if (this.props.rows === 'auto'){
			autosize(this.textarea);
		}
	}

	/**
	 * Should override value with info from state
	 * @return {[type]} [description]
	 */
	overrideValue (nextProps) {
		this.setState(() => ({
			value: nextProps.value || ''
		}));
	}

	/**
	 * @param {Object} props the incoming props
	 * @return {undefined} side effect only
	 */
	componentWillMount() {
		this.overrideValue(this.props);
	}

	/**
	 * @param {Object} nextProps the incoming props
	 * @return {undefined} side effect only
	 */
	componentWillReceiveProps(nextProps) {
		this.overrideValue(nextProps);
	}

	/**
	 * called as user changes value, updates state with new value
	 * @param  {Object} e Event object
	 * @return {undefined}
	 */
	onChange(e) {
		const { onChange } = this.props;
		const value = e.target.value;

		this.setState(() => ({
			value,
		}));

		if (onChange) {
			onChange(e);
		}
	}

	render() {
		const {
			name,
			value,	// eslint-disable-line no-unused-vars
			label,
			labelClassName,
			className,
			error,
			required,
			rows,
			style={},
			maxHeight,
			minHeight,
			id,
			onChange, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = {
			textarea: cx(
				{
					'field--error': error,
					'textarea--autoheight': rows === 'auto'
				},
				className
			),
			label: cx(
				'label--field',
				{ required },
				labelClassName
			)
		};

		const heightConstraints = {
			minHeight: minHeight,
			maxHeight: maxHeight
		};

		return (
			<div>
				<label className={classNames.label} htmlFor={id}>
					{label}
				</label>
				<textarea
					type='text'
					name={name}
					required={required}
					className={classNames.textarea}
					onChange={this.onChange}
					rows={rows == 'auto' ? 1 : rows}
					ref={(textarea) => {this.textarea = textarea;}}
					style={{ ...style, ...heightConstraints }}
					id={id}
					value={this.state.value}
					{...other}
				/>

				{ this.props.maxLength &&
					<p className='text--caption align--right'>{this.state.value.length} / {this.props.maxLength}</p>
				}

				{ error && <p className='text--error'>{error}</p> }
			</div>
		);
	}
}

Textarea.propTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	error: React.PropTypes.string,
	label: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	labelClassName: React.PropTypes.string,
	required: React.PropTypes.bool,
	autoHeight: React.PropTypes.bool,
	minHeight: React.PropTypes.number,
	maxHeight: React.PropTypes.number,
	onChange: React.PropTypes.func,
	rows: React.PropTypes.oneOfType([
		React.PropTypes.number,
		React.PropTypes.string
	]),
	value: React.PropTypes.string,
};

export default Textarea;
