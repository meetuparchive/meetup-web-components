VERSION ?= 6.1.$(CI_BUILD_NUMBER)

ifeq ($(TRAVIS_BRANCH), master)
ifeq ($(TRAVIS_PULL_REQUEST), false)
NPM_TAG ?= latest
VERSION_TAG ?= $(VERSION)
else
NPM_TAG ?= beta
VERSION_TAG ?= $(VERSION)-beta
endif
endif

CI_BUILD_NUMBER ?= $(USER)-snapshot
TRAVIS_REPO_SLUG ?= meetup/meetup-web-components

# 'npm version' updates package.json and commits tag to git
publish:
	@echo "publishing $(VERSION_TAG)"
	npm version $(VERSION_TAG) -m "chore: Version %s built by Travis CI\n\n$(TRAVIS_BUILD_WEB_URL)\n[skip ci]"
	npm publish --tag $(NPM_TAG)

push-gh:
ifeq ($(TRAVIS_BRANCH), master)
ifeq ($(TRAVIS_PULL_REQUEST), false)
	@echo "pushing master:$(VERSION_TAG)"
	git push git@github.com:$(TRAVIS_REPO_SLUG).git HEAD:master --follow-tags --no-verify 
endif
endif
