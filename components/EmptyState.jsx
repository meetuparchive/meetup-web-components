import React from 'react';
import cx from 'classnames';

import Icon from './Icon';
import Button from './Button';

import {
	Chunk
} from './layoutUtils';

/**
 * @module EmptyState
 */
class EmptyState extends React.Component {
	render() {
		const {
			children,
			className,
			icon,
			message,
			caption,
			cta,
			...other
		} = this.props;

		const classNames = cx(
			'emptyState',
			'align--center',
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
					{icon &&
						<Chunk>
							<Icon shape={icon} />
						</Chunk>
					}

					<Chunk>
						<h3 className='text--tertiary text--display3'>{message}</h3>
						{caption &&
							<p className='text--secondary'>{caption}</p>
						}
					</Chunk>

					{cta &&
						<Chunk>
							<Button
								onClick={cta.action}
							>
								{cta.text}
							</Button>
						</Chunk>
					}
						{children}
			</div>
		);
	}
}

EmptyState.propTypes = {
	message: React.PropTypes.string.isRequired,
	caption: React.PropTypes.string,
	icon: React.PropTypes.string,
	cta: React.PropTypes.shape({
		text: React.PropTypes.string,
		action: React.PropTypes.func
	})
};

export default EmptyState;
