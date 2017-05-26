CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 1.1.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)

