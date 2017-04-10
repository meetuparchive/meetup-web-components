import React from 'react';
import cx from 'classnames';
import autosize from 'autosize';

/**
 * @module Textarea
 */
class Textarea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		const { onChange } = this.props;
		this.setState({
			value: e.target.value,
		});

		if (onChange) {
			onChange(e);
		}
	}

	componentDidMount() {
		if (this.props.rows === 'auto'){
			autosize(this.textarea);
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
				<textarea type='text'
					name={name}
					required={required}
					className={classNames.textarea}
					onChange={this.onChange}
					rows={rows == 'auto' ? 1 : rows}
					ref={(textarea) => {this.textarea = textarea;}}
					style={{ ...style, ...heightConstraints }}
					value={this.state.value}
					id={id}
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
	])
};

export default Textarea;
