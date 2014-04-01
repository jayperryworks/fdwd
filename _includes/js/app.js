(function($) {
  
  // ================================================================
  // FDWD behaviors
  // ================================================================

  var fdwd = { // namespace setup

    config : {

      // Settings
      // -> global vars go here
      // --------------------------------------------------------------- 

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

      // set up widon't & ampersand replacement
      typography('h1, h2, h3, h4, h5, h6, p, li, a');
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
          // pettingzoo.tabs.init(pettingzoo.config.tabs);
        },

        match : function() {
          console.log("match");
          // pettingzoo.tabs.kill(pettingzoo.config.accordion);
          // pettingzoo.tabs.multiple = false;
          // pettingzoo.tabs.reset(pettingzoo.config.tabs);
          // pettingzoo.tabs.init(pettingzoo.config.tabs);
        },

        unmatch : function() {
          // console.log("unmatch");
          // pettingzoo.tabs.kill(pettingzoo.config.tabs);
          // pettingzoo.tabs.multiple = true;
          // pettingzoo.tabs.init(pettingzoo.config.accordion);
        }
      });
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

        $(el).each(function(){
          // For each set of tabs, we want to keep track of
          // which tab is active and it's associated content
          var $active, $content, $links = $(this).find('a');

          // If the location.hash matches one of the links, use that as the active tab.
          // If no match is found, use the first link as the initial active tab.
          $active = $links.filter("." + pettingzoo.tabs.active);
          $content = $($active.attr('href'));

          // console.log("active tab: " + $active);

          // if multiple active tabs are not allowed...
          if (pettingzoo.tabs.multiple != true) {
            // Hide the remaining content
            $links.not($active).each(function () {
              $($(this).attr('href')).removeClass(pettingzoo.tabs.open);
            });
          }

          // Bind the click event handler
          $(this).on('click', 'a', function(e){

            console.log("multiple: " + pettingzoo.tabs.multiple);

            // if multiple active tabs are not allowed...
            if (pettingzoo.tabs.multiple != true) {
              // Make the old tab inactive.
              $active.removeClass(pettingzoo.tabs.active);
              $content.removeClass(pettingzoo.tabs.open);

              // Update the variables with the new link and content
              $active = $(this);
              $content = $($(this).attr('href'));

              // Make the tab active.
              $active.addClass(pettingzoo.tabs.active);
              $content.addClass(pettingzoo.tabs.open);
            } else {
              // Update the variables with the new link and content
              $active = $(this);
              $content = $($(this).attr('href'));

              // Make the tab active.
              $active.toggleClass(pettingzoo.tabs.active);
              $content.toggleClass(pettingzoo.tabs.open);
            }

            // Prevent the anchor's default click action
            e.preventDefault();
          });
        });
      },

      kill : function(el) {
        $(el).each(function() {
          $(this).find('a').each(function() {
            $(this).removeClass(pettingzoo.tabs.active);
            $($(this).attr('href')).removeClass(pettingzoo.tabs.open);
          });
        });
      },

      reset : function(el) {
        var $link = $(el).find('a').first();
        $link.addClass(pettingzoo.tabs.active);
        $($link.attr('href')).addClass(pettingzoo.tabs.open);
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
