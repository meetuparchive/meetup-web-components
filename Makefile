CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 2.0.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)

