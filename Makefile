PROJECT=platform-typescript-medium-serde
PROJECT_PATH=$(PROJECT)
BUILDER_IMAGE=$(PROJECT)-builder
RUN=docker run --rm \
	-v $(CURDIR):/workspace/$(PROJECT_PATH) \
	-w /workspace/$(PROJECT_PATH)

.PHONY: run-container build test

build-docker-builder:
	docker build --tag $(BUILDER_IMAGE) .

build-deps:
	$(RUN) $(BUILDER_IMAGE) npm install

build-js:
	$(RUN) $(BUILDER_IMAGE) npm run build

build: build-docker-builder build-deps build-js

test: build
	$(RUN) $(BUILDER_IMAGE) npm run test

# build then checks for difference in build directory
# this is used in jenkins job to make sure files inside build directory
# is up-to-date with the files inside src
check-on-deployment-build-diff: build check-build-diff

# check-build-diff script checks if there is any changes inside `./build` directory using git
# it will fails (exit 1) when there are files that are changed inside the directory
check-build-diff:
	$(RUN) $(BUILDER_IMAGE) git add .
	$(RUN) $(BUILDER_IMAGE) bash -c "\
	if [ $$(git diff --cached --raw -- build | wc -l) -gt 0 ]; then \
		echo \"\";\
		echo \"Error: Different Build Files\";\
		echo \"Files inside './build' directory are different after build process\";\
		echo \"This indicates build process are not run using 'make run' before commiting\";\
		echo \"Please run 'make run before committing changes and try again'\";\
		echo \"\";\
		exit 1; \
	else \
		exit 0; \
	fi"

clean:
	$(RUN) $(BUILDER_IMAGE) rm -rf node_modules
	-docker rmi -f $(BUILDER_IMAGE)
