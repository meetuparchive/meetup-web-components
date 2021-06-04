CI_BUILD_NUMBER ?= $(USER)-snapshot
VERSION ?= 8.1.$(CI_BUILD_NUMBER)

version:
	@echo $(VERSION)
