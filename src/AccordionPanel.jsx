import React from 'react';
import cx from 'classnames';

import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';
import Icon from './Icon';

export const PANEL_CLASS = 'accordionPanel';
export const ACTIVEPANEL_CLASS = 'accordionPanel--active';


/**
 * @module AccordionPanel
 */
class AccordionPanel extends React.Component {
	constructor(props){
		super(props);

		props.trigger.icon = props.trigger.icon || {};
		props.trigger.icon = {
			align: 'right',
			shape: 'chevron-down',
			size: 'xs'
		};

		this.state = {
			open: this.props.isOpen
		};

		this._handleToggle = this._handleToggle.bind(this);
	}

	/**
	 * @returns {undefined}
	 *
	 * Updates state to toggle `AccordionPanel` open and closed
	 */
	_handleToggle(){
		const newState = !this.state.open;
		const { setClickedPanel } = this.props;

		if (setClickedPanel) {
			setClickedPanel(this);
		}

		this.setState({
			height: `${newState * this.content.getBoundingClientRect().height}px`,
			open: newState
		});

	}

	/**
	 * @returns {undefined}
	 *
	 * Sets height of `AccordionPanel` to be appear open or closed when mounting
	 */
	componentDidMount() {
		this.setState({
			height: `${this.state.open * this.content.getBoundingClientRect().height}px`
		});
	}

	/**
	 * @returns {undefined}
	 *
	 * Updates state to toggle `AccordionPanel` open and closed
	 */
	componentWillUpdate(nextProps, nextState) {
		if (nextProps.isOpen !== this.state.open) {
			this.setState({
				open: nextProps.isOpen,
				height: `${nextProps.isOpen * this.content.getBoundingClientRect().height}px`
			});
		}
	}

	render() {
		const {
			isOpen, // eslint-disable-line no-unused-vars
			panelContent,
			setClickedPanel, // eslint-disable-line no-unused-vars
			trigger,
			isAnimated,
			classNamesActive,
			className,
			...other
		} = this.props;

		const classNames = {
			accordionPanel: cx(
				PANEL_CLASS,
				{
					[ACTIVEPANEL_CLASS]: this.state.open,
					[classNamesActive]: this.state.open && classNamesActive
				},
				className
			),
			trigger: cx(
				trigger.className,
				'accordionPanel-label display--block span--100'
			),
			content: cx(
				{
					'accordionPanel-animator': isAnimated,
					'accordionPanel-animator--collapse': !this.state.open,
					'visibility--a11yHide': !isAnimated && !this.state.open
				}
			)
		};

		// create valid attribute name from trigger label
		const ariaId = trigger.label.replace(/\s+/g, '').toLowerCase();

		const iconShape = this.state.open && trigger.icon.shapeActive ? trigger.icon.shapActive : trigger.icon.shape;

		return(
			<Flex
				className={classNames.accordionPanel}
				rowReverse={trigger.icon.align === 'left' && 'atAll'}
				{...other}
				>

				<FlexItem>
					<Chunk>
						<button
							role='tab'
							id={`label-${ariaId}`}
							aria-controls={`panel-${ariaId}`}
							aria-expanded={this.state.open}
							aria-selected={this.state.open}
							className={classNames.trigger}
							onClick={this._handleToggle}>
								{trigger.label}
						</button>
					</Chunk>

					<Chunk
						role='tabpanel'
						aria-labelledby={`label-${ariaId}`}
						aria-hidden={!this.state.open}
						className={classNames.content}
						style={{height: this.state.height}}>
						<div
							className='accordionPanel-content'
							ref={(div) => { this.content = div; }}>
							{panelContent}
						</div>
					</Chunk>
				</FlexItem>

				<FlexItem
					className='accordionPanel-icon'
					onClick={this._handleToggle}
					shrink
					>
					<Icon
						shape={iconShape}
						size={trigger.icon.size} />
				</FlexItem>

			</Flex>
		);
	}
}

AccordionPanel.defaultProps = {
	isOpen: false
};

AccordionPanel.propTypes = {
	classNamesActive: React.PropTypes.string,
	isOpen: React.PropTypes.bool,
	isAnimated: React.PropTypes.bool,
	panelContent: React.PropTypes.element,
	trigger: React.PropTypes.shape({
		onclick: React.PropTypes.func,
		label: React.PropTypes.string.isRequired,
		className: React.PropTypes.string,
		icon: React.PropTypes.shape({
			align: React.PropTypes.string,
			shape: React.PropTypes.string,
			shapeActive: React.PropTypes.string,
			size: React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
		})
	})
};

export default AccordionPanel;
