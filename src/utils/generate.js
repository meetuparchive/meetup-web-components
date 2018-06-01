const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

require('babel-register'); // process all further imports through babel

function validateName(name) {
	return /^\b([A-Z][a-z]*)/.test(name) ? true : 'Name must be TitleCase';
}

function promptCreate() {
	const questions = [
		{
			type: 'input',
			name: 'name',
			message: answers => 'Name of your component:',
			validate: validateName,
		},
		{
			type: 'confirm',
			name: 'isIntl',
			message: answers => 'Add i18n wrappers to tests and story?',
			default: false,
		},
	];

	return inquirer.prompt(questions);
}

// Begin prompts
promptCreate()
	.then(answers => ({
		answers,
		createPath: path.resolve(__dirname, '../../src/'),
	}))
	.then(config => {
		'use strict';
		const createPath = config.createPath;
		const name = config.answers.name;
		const isIntl = config.answers.isIntl;
		const nameLcase = name.replace(/^[A-Z]/, firstLetter =>
			firstLetter.toLowerCase()
		);
		let filepath;

		filepath = path.resolve(createPath, `${name}.jsx`);
		console.log('Writing component', filepath);
		fs.writeFileSync(
			filepath,
			require('./templates/component.jsx').default(name)
		);

		filepath = path.resolve(createPath, `${nameLcase}.test.jsx`);
		console.log('Writing component test', filepath);
		fs.writeFileSync(
			filepath,
			require('./templates/test.jsx').default(name, isIntl)
		);

		filepath = path.resolve(createPath, `${nameLcase}.story.jsx`);
		console.log('Writing component story', filepath);
		fs.writeFileSync(
			filepath,
			require('./templates/story.jsx').default(name, isIntl)
		);
	})
	.then(
		() => {
			console.log('Done');
		},
		err => {
			console.log(err.stack);
		}
	);
