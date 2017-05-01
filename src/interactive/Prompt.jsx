import React from 'react';
import cx from 'classnames';

import Modal from './Modal';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';

import { Z_INDICIES } from '../utils/designConstants';


/**
 * Prompt component
 * @module Prompt
 */
class Prompt extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		const {
			className,
			message,
			actions,
			onDismiss,
			fullscreen,
			inverted,
			...other
		} = this.props;

		const classNames = cx(
			className,
			'prompt'
		);

		return (
			<div
				className={classNames}
				{...other}
			>
				<Modal
					inverted={!!inverted}
					fullscreen={!!fullscreen}
					onDismiss={onDismiss}
					zIndex={Z_INDICIES.popup}
				>
					<Section className='flush--top'>
						<Chunk>
							<h4 className='text--bold'>{message && message}</h4>
						</Chunk>

						<Chunk>
							<Flex
								align='center'
								justify='spaceAround'
							>
								{actions.map((action, key) =>
									<FlexItem shrink key={key}>{action}</FlexItem>
								)}
							</Flex>
						</Chunk>
					</Section>
				</Modal>

			</div>
		);
	}
}

Prompt.propTypes = {
	message: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.string
	]),
	actions: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	onDismiss: React.PropTypes.func,
	fullscreen: React.PropTypes.bool,
	inverted: React.PropTypes.bool,
};

export default Prompt;
