import { configure } from '@kadira/storybook';
import '../assets/scss/storybook.scss';

const componentStories = require.context('../src', false, /\.story\.jsx$/)

function loadStories() {
	componentStories.keys().forEach(componentStories);
}

configure(loadStories, module);
