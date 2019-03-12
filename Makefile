GIT_TAG ?= $(shell make version)-beta
NPM_TAG ?= beta
CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 6.1.$(CI_BUILD_NUMBER)
TRAVIS_REPO_SLUG ?= meetup/meetup-web-components

version:
	@echo $(VERSION)

tag-message:
	@echo "Version $(GIT_TAG) built by Travis CI $(TRAVIS_BUILD_WEB_URL)"

publish-beta:
	@echo "NPM_TAG=$(NPM_TAG)"
ifeq ($(TRAVIS_BRANCH), master)
ifneq ($(TRAVIS_PULL_REQUEST), false)
	npm version $(GIT_TAG) -m "$(shell make tag-message)"
	npm publish --tag $(NPM_TAG)
else
	@echo "merge build - no beta required"
endif
endif

tag-gh:
ifeq ($(TRAVIS_BRANCH), master)
	@echo "GIT_TAG=$(GIT_TAG)"
	git config --global user.email "web-platform-bot@meetup.com"
	kit config --global user.name "muptravis"
	eval "$$(ssh-agent -s)"
	ssh-add <(echo "$$GITHUB_DEPLOY_KEY") 
	git tag $(GIT_TAG) -fam "$(shell make tag-message)"
	git push --tags git@github.com:$(TRAVIS_REPO_SLUG).git
endif
