// ================================================================
// Widon't & Best Ampersand
// -> http://justinhileman.info/article/a-jquery-widont-snippet/
// -> http://justinhileman.info/article/more-jquery-typography/
// ================================================================

jQuery(function($) {
    $('h1, h2, h3, h4, h5, h6, p, li, a').each(function() {
      $(this).html(
        $(this).html()
        	// for any $amp; element, wrap in a span with class ".amp" 
          .replace(/&amp;/g,'<span class="amp">&amp;</span>')
          // add a non-breaking space between the last two words in selected elements
          // longer words are allowed to be widows
          .replace(/\s([^\s>]{0,12})\s*$/,'&nbsp;$1')
      );
    });
});