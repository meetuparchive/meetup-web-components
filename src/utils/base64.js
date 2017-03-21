/**
 * @function getIconAsBase64Uri
 * @param {string} icon name
 * @returns {string} base64-encoded data uri for SVG icon
 */
export const getIconAsBase64Uri = name => {
	return require(`base64-image!swarm-icons/dist/optimized/${name}.svg`);
};
