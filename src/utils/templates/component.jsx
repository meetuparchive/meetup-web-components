export default name => {
	const nameLcase = name.replace(/^[A-Z]/, firstLetter =>
		firstLetter.toLowerCase()
	);
	return `import React from 'react';
import cx from 'classnames';

/**
 * @module ${name}
 */
class ${name} extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'${nameLcase}',
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
					Hello from ${name}
					{children}
			</div>
		);
	}
}

${name}.propTypes = {
};

export default ${name};
`;
};
