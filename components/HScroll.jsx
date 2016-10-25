import React from 'react';
import cx from 'classnames';

/**
 * @module HScroll
 */
class HScroll extends React.Component {
	render() {
		const {
			className,
			lockScroll,
			containsCards,
			...other
		} = this.props;

		const parentClassNames = cx(
			'hscroll',
			{
				[`${lockScroll}_hscroll--unclip`]: typeof lockScroll === 'string'
			},
			className
		);

		const childClassNames = cx(
			'hscroll-content',
			{
				'hscroll-content--cards': containsCards
			},
			className
		);

		const children = React.Children.map(this.props.children, (child, i)=>{
			return (
				<li
					key={i}
				>
					{child}
				</li>
			);
		});

		return (
			<div
				className={parentClassNames}
			>
				<ul
					className={childClassNames}
					{...other}
				>
					{children}
				</ul>
			</div>
		);
	}
}

HScroll.propTypes = {
	containsCards: React.PropTypes.bool,
	lockScroll: React.PropTypes.oneOf([
		'atAll',
		'atMedium',
		'atLarge'
	])
};

export default HScroll;
