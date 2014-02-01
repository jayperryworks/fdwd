(function($) {
  
  // ================================================================
  // SITE_NAME behaviors
  // ================================================================

  var SITE_NAME = { // namespace setup

    config : {

      // Settings
      // -> global vars go here
      // --------------------------------------------------------------- 

    },

    // Setup
    // ---------------------------------------------------------------
    init : function(config) {
      $.extend(SITE_NAME.config, config);


    },

    // Methods
    // ---------------------------------------------------------------

    
  };

  
  $(window).load(function() {
    SITE_NAME.init();
  });
})(jQuery);
