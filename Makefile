all: js/main.js

js/%.js: src/%.js node_modules
	mkdir -p "$(@D)"
	node_modules/.bin/babel $< --out-file $@

node_modules: package.json
	npm install
	touch $@
