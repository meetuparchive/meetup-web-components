ifeq ($(TRAVIS_BRANCH), master)
ifeq ($(TRAVIS_PULL_REQUEST), false)
VERSION_TAG ?= $(shell make version)
VERSION_BRANCH = $(TRAVIS_BRANCH)
else
VERSION_TAG ?= $(shell make version)-beta
VERSION_BRANCH = $(TRAVIS_PULL_REQUEST_BRANCH)
endif
endif

NPM_TAG ?= beta
CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 6.1.$(CI_BUILD_NUMBER)
TRAVIS_REPO_SLUG ?= meetup/meetup-web-components

.git/credentials:
	# Get the credentials from a file
	git config credential.helper "store --file=.git/credentials"
	# This associates the API Key with the account
	echo "https://$${GITHUB_DEPLOY_KEY}:@github.com" > .git/credentials

version:
	@echo $(VERSION)

tag-message:
	@echo "chore: Version %s built by Travis CI $(TRAVIS_BUILD_WEB_URL) [skip ci]"

npm-version:
	npm version $(VERSION_TAG) -m "$(shell make tag-message)"

publish-beta:
	@echo "NPM_TAG=$(NPM_TAG)"
ifeq ($(TRAVIS_BRANCH), master)
ifneq ($(TRAVIS_PULL_REQUEST), false)
	npm publish --tag $(NPM_TAG)
else
	@echo "merge to master - no beta required"
endif
endif

push-gh: .git/credentials
ifeq ($(TRAVIS_BRANCH), master)
	@echo "pushing $(VERSION_BRANCHl):$(VERSION_TAG)"
	# git push git@github.com:$(TRAVIS_REPO_SLUG).git HEAD:$(VERSION_BRANCH) --follow-tags --no-verify 
	git push origin HEAD:$(VERSION_BRANCH) --follow-tags --no-verify 
endif
