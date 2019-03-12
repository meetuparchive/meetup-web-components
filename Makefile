ifeq ($(TRAVIS_BRANCH), master)
ifeq ($(TRAVIS_PULL_REQUEST), false)
GIT_TAG ?= $(shell make version)
else
GIT_TAG ?= $(shell make version)-beta
endif
endif

NPM_TAG ?= beta
CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 6.1.$(CI_BUILD_NUMBER)
TRAVIS_REPO_SLUG ?= meetup/meetup-web-components

version:
	@echo $(VERSION)

tag-message:
	@echo "Version $(GIT_TAG) built by Travis CI $(TRAVIS_BUILD_WEB_URL)"

npm-version:
	npm version $(GIT_TAG) -m "$(shell make tag-message)"

publish-beta:
	@echo "NPM_TAG=$(NPM_TAG)"
ifeq ($(TRAVIS_BRANCH), master)
ifneq ($(TRAVIS_PULL_REQUEST), false)
	npm publish --tag $(NPM_TAG)
else
	@echo "merge build - no beta required"
endif
endif

tag-gh:
ifeq ($(TRAVIS_BRANCH), master)
	@echo "GIT_TAG=$(GIT_TAG)"
	git tag $(GIT_TAG) -fam "$(shell make tag-message)"
	git status
	git push origin master --follow-tags --no-verify git@github.com:$(TRAVIS_REPO_SLUG).git
endif
