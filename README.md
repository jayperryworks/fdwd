# Jekyll Boilerplate
##### Assembled & configured by [Jay Perry Works](http://jayperryworks.com)

This is the basic boilerplate I use for my design prototypes. It includes all my favorite tools:

### Precompiling/build tools:

- [Jekyll](http://jekyllrb.com): set up for github pages
- [Bundler](http://bundler.io): easy way to manage assets and dependencies
- [Guard](http://guardgem.org): wonderful tool to automate precompiling/workflows.


### Markup template:
- [HTML5 Boilerplate](http://html5boilerplate.com): the best front-end template ever. I've integrated it into the Jekyll layouts and SASS stylesheets.

### CSS
- [SASS](http://sass-lang.com) & [Compass](http://compass-style.org): life didn't really begin on planet earth until there were CSS preprocessors.
- [Bourbon library](http://bourbon.io): requires SASS. Lots of nice mixins for special effects and polyfills.
- [Singularity.gs grid system](http://singularity.gs): my current favorite grid framework. It's lightweight, incredibly configurable, and uses the "[isolation method](http://palantir.net/blog/responsive-design-s-dirty-little-secret)" by default, solving annoying bugs with sub-pixel rendering in many browsers.
- The CSS organization and (most) naming conventions are based on the [MVCSS framework](http://mvcss.github.io/library/), which is a great scheme for making CSS more maintainable and reusable on projects of any scale.

### JS
- [JQuery](http://jquery.com). Though I like [MooTools]() for bigger projects.
- [Enquire.js](http://wicky.nillia.ms/enquire.js/): sync your JS with your media queries, calling and killing scripts based on screen size. Check out a [tutorial from Chris Coyer](http://css-tricks.com/enquire-js-media-query-callbacks-in-javascript/).
- [Transit.js](http://ricostacruz.com/jquery.transit/): CSS transition-driven animation that falls back to $.animate()
- [Typography.js](http://justinhileman.info/article/more-jquery-typography/): "Widon't" and other great scripts to help with typesetting.

****

## Installation:
1. Make a new folder and initialize a new git repo:

````
    git init
    touch README
    git add README
  	git commit -m 'first commit, added README'
  	git remote add origin { remote SSL }
  	git push origin master
````


2. Then clone this repo and copy the files into your new folder

3. Run [sudo] bundle install

4. Check through the config files and adjust stuff as needed: _config.yaml, Gemfile, Guardfile, config.rb

5. Finally, run the jekyll/guard commands:

###### for github pages:

  	bundle exec jekyll serve --w

in another terminal tab:

  	bundle exec guard

_or_

###### for non-github pages sites:

in the Gemfile:
- comment out "gem github-pages" 
- uncomment "gem guard-jekyll-plus"

  	bundle exec guard

