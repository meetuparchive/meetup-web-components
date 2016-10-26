import React from 'react';
import cx from 'classnames';
import { findDOMNode } from 'react-dom';

/**
 * @module DropMenuTrigger
 */
class DropMenuTrigger extends React.Component {
	constructor (props) {
		super(props);

		this.toggleActive = this.toggleActive.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	toggleActive() {
		this.props.onToggleActive(!this.props.active);
	}

	handleKeyDown(e) {
		if (e.key === 'Enter'){
			this.toggleActive();
		}
	}

	handleClick() {
		this.toggleActive();
	}

	render() {
		const {
			children,
			className,
			active,
			tabIndex,
			...other
		} = this.props;

		const classNames = cx(
			'dropMenu-trigger',
			{
				'dropMenu-trigger--active': active,
				'dropMenu-trigger--inactive': !active
			},
			className
		);

		return (
			<div
				className={classNames}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}
				tabIndex={tabIndex ? tabIndex : -1}
				role='button'
				{...other}
			>
				{children}
			</div>
		);
	}

}

/**
 * @module DropMenuOption
 */
class DropMenuOption extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			activeIndex: 0,
		};

		this.onSelect = this.onSelect.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleHover = this.handleHover.bind(this);
	}

	onSelect() {
		if (this.props.onSelect) {
			this.props.onSelect();
		}
		this.props._internalSelect();
	}

	handleKeyDown(e) {
		e.preventDefault();
		if (e.key === 'Enter') {
			this.onSelect();
		}
	}

	handleClick() {
		this.onSelect();
	}

	handleHover() {
		this.props._internalFocus(this.props.index);
	}

	render() {
		const {
			active,
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'dropMenu-option',
			{
				'dropMenu-option--active': active
			},
			className
		);

		return (
			<div
				onClick={this.handleClick}
				onKeyUp={this.handleKeyUp}
				onKeyDown={this.handleKeyDown}
				onMouseOver={this.handleHover}
				className={classNames}
				tabIndex='-1'
				{...other}
			>
				{children}
			</div>
		);
	}

}

/**
 * @module DropMenuOptions
 */
class DropMenuOptions extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			activeIndex: 0,
		};

		this.onSelectionMade = this.onSelectionMade.bind(this);
		this.moveSelectionUp = this.moveSelectionUp.bind(this);
		this.moveSelectionDown = this.moveSelectionDown.bind(this);
		this.handleKeys = this.handleKeys.bind(this);
		this.normalizeSelectedBy = this.normalizeSelectedBy.bind(this);
		this.focusOption = this.focusOption.bind(this);
		this.updateFocusIndexBy = this.updateFocusIndexBy.bind(this);
		this.renderOptions = this.renderOptions.bind(this);
	}

	onSelectionMade() {
		this.props.onSelectionMade();
	}

	moveSelectionUp() {
		this.updateFocusIndexBy(-1);
	}

	moveSelectionDown() {
		this.updateFocusIndexBy(1);
	}

	handleKeys(e) {
		const options = {
			ArrowDown: this.moveSelectionDown,
			ArrowUp: this.moveSelectionUp
		};
		if(options[e.key]){
			options[e.key].call(this);
		}
	}

	normalizeSelectedBy(delta, numOptions) {
		this.selectedIndex += delta;
		if (this.selectedIndex > numOptions - 1) {
			this.selectedIndex = 0;
		} else if (this.selectedIndex < 0) {
			this.selectedIndex = numOptions - 1;
		}
	}

	focusOption(index) {
		this.selectedIndex = index;
		this.updateFocusIndexBy(0);
	}

	updateFocusIndexBy(delta) {
		const optionNodes = findDOMNode(this).querySelectorAll('.dropMenu-option');
		this.normalizeSelectedBy(delta, optionNodes.length);
		this.setState({activeIndex: this.selectedIndex}, function () {
			optionNodes[this.selectedIndex].focus();
		});
	}

	renderOptions() {
		let index = 0;
		return React.Children.map(this.props.children, function(c){
			let clonedOption = c;
			if (c.type === DropMenuOption) {
				const active = this.state.activeIndex === index;
				clonedOption = React.cloneElement(c, {
					active: active,
					index: index,
					_internalFocus: this.focusOption,
					_internalSelect: this.onSelectionMade
				});
				index++;
			}
			return clonedOption;
		}.bind(this));
	}

	render() {
		const {
			className,
			active,
			horizontalPlacement,
			verticalPlacement,
			height,
			...other
		} = this.props;

		const classNames = cx(
			'dropMenu-options',
			{
				'visibility--a11yHide': !active,
				'visibility--a11yShow': active,
				[`dropMenu-options--horizontal-${horizontalPlacement}`]: typeof horizontalPlacement === 'string',
				[`dropMenu-options--vertical-${verticalPlacement}`]: typeof verticalPlacement === 'string',
			},
			className
		);

		return (
			<div
				className={classNames}
				role='menu'
				tabIndex='-1'
				aria-expanded={active}
				onKeyDown={this.handleKeys}
				style={{bottom: verticalPlacement == 'top' ? `${height}px` : 'initial'}}
				{...other}
			>
				{this.renderOptions()}
			</div>
		);
	}

}

/**
 * @module DropMenu
 */
class DropMenu extends React.Component {
	constructor (props) {
		super(props);

		this.closeMenu = this.closeMenu.bind(this);
		this.focusTrigger = this.focusTrigger.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleTriggerToggle = this.handleTriggerToggle.bind(this);
		this.afterTriggerToggle = this.afterTriggerToggle.bind(this);
		this.updatePositioning = this.updatePositioning.bind(this);
		this.handleKeys = this.handleKeys.bind(this);

		this.state = {
			_isMounted: false,
			active: false,
		};
	}

	closeMenu(callback) {
		if (callback) {
			this.setState({active: false}, callback);
		} else {
			this.setState({active: false});
		}
	}

	focusTrigger() {
		findDOMNode(this.trigger).focus();
	}

	onSelectionMade() {
		this.closeMenu(this.focusTrigger);
	}

	handleBlur(e) {
		// give next element a tick to take focus
		setTimeout(function() {
			if (!this.state._isMounted) {
				return;
			}
			if (!findDOMNode(this).contains(document.activeElement) && this.state.active){
				this.closeMenu();
			}
		}.bind(this), 1);
	}

	handleTriggerToggle() {
		this.setState({active: !this.state.active}, this.afterTriggerToggle);
	}

	afterTriggerToggle() {
		if (this.state.active) {
			// this.options.focusOption(0);
			this.updatePositioning();
		}
	}

	updatePositioning() {
		const triggerRect = findDOMNode(this.trigger).getBoundingClientRect();
		const optionsRect = findDOMNode(this.options).getBoundingClientRect();
		const positionState = {
			horizontalPlacement: this.props.preferredHorizontal,
			verticalPlacement: this.props.preferredVertical,
			height: optionsRect.height
		};
		// Only update preferred placement positions if necessary to keep menu from
		// appearing off-screen.
		if (triggerRect.left + optionsRect.width > window.innerWidth) {
			positionState.horizontalPlacement = 'left';
		} else if (optionsRect.left < 0) {
			positionState.horizontalPlacement = 'right';
		}
		if (triggerRect.bottom + optionsRect.height > window.innerHeight) {
			positionState.verticalPlacement = 'top';
		} else if (optionsRect.top < 0) {
			positionState.verticalPlacement = 'bottom';
		}
		this.setState(positionState);
	}

	handleKeys(e) {
		if (e.key === 'Escape') {
			this.closeMenu(this.focusTrigger);
		}
	}

	renderTrigger() {
		let trigger;
		React.Children.forEach(this.props.children, function(child){
			if (child.type === DropMenuTrigger) {
				trigger = React.cloneElement(child, {
					ref: (div) => this.trigger = div,
					onToggleActive: this.handleTriggerToggle,
					active: this.state.active
				});
			}
		}.bind(this));
		return trigger;
	}

	renderMenuOptions() {
		let options;
		React.Children.forEach(this.props.children, function(child){
			if (child.type === DropMenuOptions) {
				options = React.cloneElement(child, {
					ref: (div) => this.options = div,
					active: this.state.active,
					horizontalPlacement: this.state.horizontalPlacement,
					verticalPlacement: this.state.verticalPlacement,
					height: this.state.height,
					onSelectionMade: this.onSelectionMade.bind(this)
				});
			}
		}.bind(this));
		return options;
	}

	componentDidMount() {
		this.setState({_isMounted: true});
	}

	componentWillUnmount() {
		this.setState({_isMounted: false});
	}

	render() {
		const {
			className,
			...other
		} = this.props;

		const classNames = cx(
			'dropMenu',
			className
		);

		return (
			<div
				className={classNames}
				onKeyDown={this.handleKeys}
				onBlur={this.handleBlur}
				{...other}
			>
				{this.renderTrigger()}
				{this.renderMenuOptions()}
			</div>
		);
	}
}

DropMenuOption.propTypes = {
	active: React.PropTypes.bool,
	onSelect: React.PropTypes.func
};

module.exports = { DropMenu, DropMenuTrigger, DropMenuOptions, DropMenuOption };
