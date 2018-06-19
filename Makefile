CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 4.13.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)

