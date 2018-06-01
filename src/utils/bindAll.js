/**
 * @function bindAll
 * helper for binding prototype methods to class context
 *
 * for example, instead of doing this in a class `constructor`:
 * `this.handleClick = this.handleClick.bind(this)`
 *
 * you can use `bindAll`:
 * ```
 * bindAll(this,
 * 	handleClick,
 * 	someOtherMethod,
 * 	anotherMethod);
 * ```
 */
const bindAll = (context, ...names) => {
	names.forEach(name => (context[name] = context[name].bind(context)));
};
export default bindAll;
