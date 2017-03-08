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
		this.setState({
			value: e.target.value,
		});
	}

	componentDidMount() {
		if (this.props.autoheight){
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
			children,
			error,
			required,
			autoheight,
			maxLength,
			style,
			maxHeight,
			minHeight,
			...other
		} = this.props;

		const classNames = cx(
			{
				'field--error': error,
				'textarea--autoheight': autoheight
			},
			className
		);

		const labelClassNames = cx(
			{ required },
			labelClassName
		);

		const heightConstraints = {
			minHeight: minHeight,
			maxHeight: maxHeight
		};

		return (
			<div>
				<label className={labelClassNames} htmlFor={other.id}>
					{label}
				</label>
				<textarea type='text'
					name={name}
					required={required}
					className={classNames}
					onChange={this.onChange}
					rows={autoheight ? 1 : 'auto'}
					ref={(textarea) => {this.textarea = textarea;}}
					style={{ ...(style || {}), ...heightConstraints }}
					value={this.state.value}
					{...other}
					>
				</textarea>

				{ maxLength && <p className='text--caption align--right'>{this.state.value.length} / {maxLength}</p> }

				{ error && <p className='text--error'>{error}</p> }
				{children}
			</div>
		);
	}
}

Textarea.propTypes = {
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
	maxLength: React.PropTypes.number
};

export default Textarea;
