CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 4.12.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)

