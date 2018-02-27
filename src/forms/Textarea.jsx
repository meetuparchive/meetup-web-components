import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import autosize from 'autosize';
import withErrorList from '../utils/components/withErrorList';

/**
 * @module Textarea
 */
export class Textarea extends React.Component {
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
		if (this.props.autosize){
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
	 * @param {Object} prevProps the previous props
	 * @return {undefined} side effect only
	 */
	componentDidUpdate(prevProps) {
		if (this.props.value !== prevProps.value) {
			autosize.update(this.textarea);
		}
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
			rows,
			style={},
			maxHeight,
			minHeight,
			maxLength,
			id,
			onChange, // eslint-disable-line no-unused-vars
			autosize,
			helperText,
			required,
			requiredText,
			...other
		} = this.props;

		const classNames = {
			textarea: cx(
				'span--100',
				{
					'field--error': error,
					'textarea--autoheight': autosize
				},
				className
			),
			label: cx(
				'label--field',
				{
					'label--required': required,
					'flush--bottom': helperText
				},
				labelClassName
			),
			helperText: cx(
				'helperTextContainer',
				{ required }
			)
		};


		// WC-158
		// IE11 does not recognize `-1` as a valid value
		// for the `maxLength` attribute, so we only
		// add the prop if `maxLength` is passed.
		if (maxLength) {
			other.maxLength = parseInt(maxLength, 10);
		}

		return (
			<div className="inputContainer">
				{label &&
					<label className={classNames.label} htmlFor={id} data-requiredtext={required && requiredText}>
						{label}
					</label>
				}
				{helperText &&
					<div className={classNames.helperText}>
						{helperText}
					</div>
				}
				<textarea
					type='text'
					name={name}
					required={required}
					className={classNames.textarea}
					onChange={this.onChange}
					rows={rows}
					ref={(textarea) => {this.textarea = textarea;}}
					style={{ minHeight, maxHeight, ...style }}
					id={id}
					value={this.state.value}
					{...other}
				/>

				{ maxLength && <p tabIndex="-1" className='text--tiny text--secondary align--right charCount'>{parseInt(maxLength - this.state.value.length)}</p> }
			</div>
		);
	}
}

Textarea.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	error: PropTypes.string,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	labelClassName: PropTypes.string,
	minHeight: PropTypes.number,
	maxHeight: PropTypes.number,
	onChange: PropTypes.func,
	rows: PropTypes.number,
	value: PropTypes.string,
	autosize: PropTypes.bool,
	helperText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	required: PropTypes.bool,
	requiredText: (props) => (
		props.required && !props.requiredText &&
			new Error('Inputs with `required` prop must provide also provide a translated string for "required" in the `requiredText` prop')
	)
};

export default withErrorList(Textarea);
