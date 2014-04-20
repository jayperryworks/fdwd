// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

(function($) {
  
  // ================================================================
  // FDWD behaviors
  // ================================================================

  var fdwd = { // namespace setup

    config : {

      // Settings
      // -> global vars go here
      // --------------------------------------------------------------- 
      menuBtn : ".header-button-menu",
      accordion: ".accordion-button"
    },

    // Setup
    // ---------------------------------------------------------------
    init : function(config) {
      $.extend(fdwd.config, config);

      // fall back to .animate() frame animation is CSS transitions are not supported
      // -> for transit.js
      if (!$.support.transition) {
        $.fn.transition = $.fn.animate;
      }

      // if SVG isn't supported, swap out SVGs for corresponding PNGs
      if (!Modernizr.svg) {
        $(".logo img").attr("src", "assets/images/logo-FDWD.png");
      }

      // set up the mobile nav
      fdwd.offCanvasNav.init(fdwd.config.menuBtn);

      // set up accordion
      fdwd.accordion.init(fdwd.config.accordion);

      $('.hero-headline h1').lettering();

      // set up widon't & ampersand replacement
      fdwd.typography('h1, h2, h3, h4, h5, h6, p, li, a, td, figcaption, small, span');

      $(window).stellar({
          responsive: true,
          horizontalScrolling: false
          // verticalOffset: 300
        });


      fdwd.registerBreakpoints();
    },

    // Methods
    // ---------------------------------------------------------------

    // --- Enquire.js breakpoints --------------------------------------
    registerBreakpoints : function() {

      // iPad screens and up: > 768px
      // ---------------------------------------------------------------------
      enquire.register("only screen and (min-width: 48em)", {

        deferSetup : true,

        setup : function() {
          // fdwd.tabs.init(fdwd.config.tabs);
        },

        match : function() {
          console.log("match");

          fdwd.offCanvasNav.kill();
          // fdwd.tabs.kill(fdwd.config.accordion);
          // fdwd.tabs.multiple = false;
          // fdwd.tabs.reset(fdwd.config.tabs);
          // fdwd.tabs.init(fdwd.config.tabs);
        },

        unmatch : function() {
          // console.log("unmatch");
          // fdwd.tabs.kill(fdwd.config.tabs);
          // fdwd.tabs.multiple = true;
          // fdwd.tabs.init(fdwd.config.accordion);
        }
      });
    },

    offCanvasNav : {
      open : "menu-open",
      target : "body",

      init : function(el) {
        $(el).each(function() {
          $(this).click(function(e) {
            $(fdwd.offCanvasNav.target).toggleClass(fdwd.offCanvasNav.open);
          });
        });
      },

      kill : function() {
        $(fdwd.offCanvasNav.target).removeClass(fdwd.offCanvasNav.open);
      }
    },

    accordion : {

      active : "active",
      open : "is-open",

      init : function(el) {

        $(el).each(function() {
          $(this).on('click', function(e) {
            $this = $(this);
            // $content = $($this.attr('href'));

            console.log("hello");

            $($this.attr('href')).toggleClass(fdwd.accordion.open);
            $this.toggleClass(fdwd.accordion.active);

            // Prevent the anchor's default click action
            e.preventDefault();
          });
        });
      }
    },

    // --- Local navigation (tabs & accordion) --------------------------------------
    //  -> http://www.jacklmoore.com/notes/jquery-tabs/
    tabs : {

      // settings

      active : "active", // the class of the active (current) tab
      open: "is-open", // the class of the content currently displayed
      multiple: true, // can multiple tabs be open? (for accordion state)

      // methods
      
      init : function(el) {

        $(el).each(function() {
          // For each set of tabs, we want to keep track of
          // which tab is active and it's associated content
          var $active, $content, $links = $(this).find('a');

          // If the location.hash matches one of the links, use that as the active tab.
          // If no match is found, use the first link as the initial active tab.
          $active = $links.filter("." + fdwd.tabs.active);
          $content = $($active.attr('href'));

          // console.log("active tab: " + $active);

          // if multiple active tabs are not allowed...
          if (fdwd.tabs.multiple != true) {
            // Hide the remaining content
            $links.not($active).each(function () {
              $($(this).attr('href')).removeClass(fdwd.tabs.open);
            });
          }

          // Bind the click event handler
          $(this).on('click', 'a', function(e){

            console.log("multiple: " + fdwd.tabs.multiple);

            // if multiple active tabs are not allowed...
            if (fdwd.tabs.multiple != true) {
              // Make the old tab inactive.
              $active.removeClass(fdwd.tabs.active);
              $content.removeClass(fdwd.tabs.open);

              // Update the variables with the new link and content
              $active = $(this);
              $content = $($(this).attr('href'));

              // Make the tab active.
              $active.addClass(fdwd.tabs.active);
              $content.addClass(fdwd.tabs.open);
            } else {
              // Update the variables with the new link and content
              $active = $(this);
              $content = $($(this).attr('href'));

              // Make the tab active.
              $active.toggleClass(fdwd.tabs.active);
              $content.toggleClass(fdwd.tabs.open);
            }

            // Prevent the anchor's default click action
            e.preventDefault();
          });
        });
      },

      kill : function(el) {
        $(el).each(function() {
          $(this).find('a').each(function() {
            $(this).removeClass(fdwd.tabs.active);
            $($(this).attr('href')).removeClass(fdwd.tabs.open);
          });
        });
      },

      reset : function(el) {
        var $link = $(el).find('a').first();
        $link.addClass(fdwd.tabs.active);
        $($link.attr('href')).addClass(fdwd.tabs.open);
      }
    },

    // --- Widon't & Best Ampersand ----------------------------------------------
    // -> http://justinhileman.info/article/a-jquery-widont-snippet/
    // -> http://justinhileman.info/article/more-jquery-typography/

    typography : function(el) {

      $(el).each(function() {
        $(this).html(
          $(this).html()
            // for any $amp; element, wrap in a span with class ".amp" 
            .replace(/&amp;/g,'<span class="amp">&amp;</span>')
            // add a non-breaking space between the last two words in selected elements
            // longer words are allowed to be widows
            .replace(/\s([^\s>]{0,12})\s*$/,'&nbsp;$1')
        );
      });
    }
  };

  // Start it up!
  // ---------------------------------------------------------------

  $(window).load(function() {
    fdwd.init();
  });
})(jQuery);