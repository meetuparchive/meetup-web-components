CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 6.1.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)

