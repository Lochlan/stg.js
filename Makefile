all: assets/bundle.js

assets/bundle.js: js/main.js
	node_modules/.bin/browserify $< --outfile $@

js/%.js: src/%.js node_modules
	mkdir -p "$(@D)"
	node_modules/.bin/babel $< --out-file $@

node_modules: package.json
	npm install
	touch $@
