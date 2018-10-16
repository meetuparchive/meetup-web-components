// @flow

import React from 'react';
import cx from 'classnames';
import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';

export const SECTIONTITLE_CLASS = 'sectionTitle';

type Props = {
	/** Text to display */
	title: React$Element<*> | string,

	/** A button-like element to associate an action with the Section */
	action: React$Element<*>,

	/** Nearest DOM element's class name */
	className?: string,
};
/**
 * @module SectionTitle
 */
class SectionTitle extends React.Component<Props> {
	render() {
		const { action, className, title, ...other } = this.props;

		const classNames = cx(SECTIONTITLE_CLASS, className);

		return (
			<Flex align="center" className={classNames} {...other}>
				<FlexItem>
					<Chunk>
						<h2 className="text--sectionTitle">{title}</h2>
					</Chunk>
				</FlexItem>
				{action && (
					<FlexItem shrink>
						<Chunk>{action}</Chunk>
					</FlexItem>
				)}
			</Flex>
		);
	}
}

export default SectionTitle;
