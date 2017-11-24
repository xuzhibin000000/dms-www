/* eslint-disable */
// -----------------------------------------------------------------------
// Eros Fratini - eros@recoding.it
// jqprint 0.3
//
// - 19/06/2009 - some new implementations, added Opera support
// - 11/05/2009 - first sketch
//
// Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
// requires jQuery 1.3.x
//
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//------------------------------------------------------------------------

(function($) {
    var opt;

    var hkey_root,hkey_path,hkey_key;
    hkey_root="HKEY_CURRENT_USER";
    hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
    //网页打印时清空页眉页脚
    function pagesetup_null() {
        try {
            var RegWsh = new ActiveXObject("WScript.Shell")
            hkey_key = "header"
            RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "")
            hkey_key = "footer"
            RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "")
        } catch (e) {}
    }
    function pagesetup_default() {
        try {
            var RegWsh = new ActiveXObject("WScript.Shell")
            hkey_key = "header"
            RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "&w&b页码，&p/&P")
            hkey_key = "footer"
            RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "&u&b&d")
        } catch (e) {
        }
    }

    $.fn.jqprint = function (options) {
        try{
            pagesetup_null();
            opt = $.extend({}, $.fn.jqprint.defaults, options);

            var $element = (this instanceof jQuery) ? this : $(this);
            
            if (opt.operaSupport && $.browser.opera) 
            { 
                var tab = window.open("","jqPrint-preview");
                tab.document.open();

                var doc = tab.document;
            }
            else 
            {
                var $iframe = $("<iframe  />");
            
                if (!opt.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" }); }

                $iframe.appendTo("body");
                var doc = $iframe[0].contentWindow.document;
            }
            
            if (opt.importCSS)
            {
                if ($("link[media=print]").length > 0) 
                {
                    $("link[media=print]").each( function() {
                        doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
                    });
                }
                else 
                {
                    $("style").each( function() {
                        // doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
                        // 如果是内部样式，则开启这段注释
                        doc.write("<style type='text/css' rel='stylesheet'>" +
                               $(this).text() +
                            "</style>")
                    });
                }
            }
            
            if (opt.printContainer) { doc.write($element.outer()); }
            else { $element.each( function() { doc.write($(this).html()); }); }
            
            doc.close();
            
            (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
            setTimeout( function() { (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close(); } }, 1000);
            pagesetup_default();
        } catch (e) {}
    }
    
    $.fn.jqprint.defaults = {
		debug: false,
		importCSS: true, 
		printContainer: true,
		operaSupport: true
	};

    // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
    jQuery.fn.outer = function() {
      return $($('<div></div>').html(this.clone())).html();
    } 
})(jQuery);