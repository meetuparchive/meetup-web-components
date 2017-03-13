export const getIconAsBase64Uri = name => {
	const iconPath = `~swarm-icons/dist/optimized/${name}.svg`;
	const base64Content = `base64-loader!${iconPath}`;

	console.log(iconPath);

	return `data:image/svg+xml;charset=utf-8;base64,${base64Content}`;
};
