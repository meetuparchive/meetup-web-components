GIT_TAG ?= $(shell make version)-beta
NPM_TAG ?= beta
CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 6.1.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)

tag-message:
	@echo "Version $(GIT_TAG) built by Travis CI $(TRAVIS_BUILD_WEB_URL)"

publish-beta:
ifeq ($(TRAVIS_BRANCH), master)
ifeq ($(TRAVIS_PULL_REQUEST), true)
	# git config --global user.email "web-platform-bot@meetup.com"
	# git config --global user.name "muptravis"
	# eval "$(ssh-agent)"
	# echo "$GITHUB_DEPLOY_KEY" > /tmp/github_deploy_key
	# chmod 600 /tmp/github_deploy_key
	# ssh-add /tmp/github_deploy_key
	echo "GIT_TAG=$(GIT_TAG)"
	echo "NPM_TAG=$(NPM_TAG)"
	npm version $(GIT_TAG) -m "$(shell make tag-message)"
	# npm publish --tag $NPM_TAG
	# git tag $GIT_TAG -f -a -m "$(make tag-message)" || true
	# git push --tags git@github.com:$TRAVIS_REPO_SLUG.git
else
	@echo "merge build - no beta required"
endif
endif
