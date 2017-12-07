CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 3.4.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)

