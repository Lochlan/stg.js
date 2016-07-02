all: assets/bundle.js

clean:
	rm -rfv\
		assets/bundle.js\
		js/\

distclean: clean
	rm -rfv\
		coverage/\
		node_modules/\

test: node_modules
	node_modules/.bin/karma start

JS_MODULES=$(subst src,js,$(shell find src -type f -name '*.js' ! -name main.js))
assets/bundle.js: js/main.js $(JS_MODULES)
	node_modules/.bin/browserify $< --outfile $@

js/%.js: src/%.js node_modules
	mkdir -p "$(@D)"
	node_modules/.bin/babel $< --out-file $@

node_modules: package.json
	npm install
	touch $@
