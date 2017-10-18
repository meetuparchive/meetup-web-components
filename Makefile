CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 3.2.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)

