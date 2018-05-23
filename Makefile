CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 4.9.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)

