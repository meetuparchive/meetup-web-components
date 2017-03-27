import React from 'react';
import cx from 'classnames';

/**
 * @module RichTextEditor
 */
class RichTextEditor extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'richTextEditor',
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
					Hello from RichTextEditor
					{children}
			</div>
		);
	}
}

RichTextEditor.propTypes = {
};

export default RichTextEditor;
