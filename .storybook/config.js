import { configure, setAddon } from '@storybook/react';
import '../assets/scss/storybook.scss';
import infoAddon from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';

const componentStories = require.context('../src', true, /\.story\.jsx$/);

function loadStories() {
	componentStories.keys().forEach(componentStories);
}

setAddon(infoAddon);

// Storybook runtime configuration
setOptions({
	name: 'Meetup Web Components',
	// url the button will take people to
	url: 'https://meetup.github.io/swarm-design-system',
	showStoriesPanel: true,
	showAddonPanel: true,
});

configure(loadStories, module);
