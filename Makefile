# Makefile
GITHUB_REPO = git@github.com:dogebase/dogebase

# Publishes the gh-pages repo
deploy: build
	cp -r public/* build && \
	cd build && \
	git init . && \
	git add . && \
	git commit -m "Boom!"; \
	git push "$(GITHUB_REPO)" master:gh-pages --force && \
	rm -rf .git

.PHONY: deploy