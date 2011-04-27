(function($) {
    $.showMessage = function(message, options){
        var bgColor = "";
        var position = "fixed";
        var top = 0;
        if ($.support.opacity) {
            bgColor = "rgba(0, 0, 0, 0.8)";
        } else {
            bgColor = "black";
        }
        if (/arm/.test(navigator.platform)) {  // 移动浏览器的fixed定位貌似有问题
            position = "absolute";
            top = $(window).scrollTop();
        } else {
            position = "fixed";
            top = 0;
        }

        // defaults
        settings = $.extend({
             id: 'sliding_message_box',
             //position: 'bottom',
             position: 'top',
             size: '45',
             backgroundColor: bgColor,
             //backgroundColor: 'green',
             delay: 1500,
             speed: 500,
             fontSize: '25px'
        }, options);

        var elem = $('#' + settings.id);

        // generate message div if it doesn't exist
        if(elem.length === 0){
            elem = $('<div></div>').attr('id', settings.id);

            elem.css({'z-index': '999',
                      'background-color': settings.backgroundColor,
                      'text-align': 'center',
                      'position': position,
                      'left': '0',
                      'width': '100%',
                      'color': 'white',
                      'line-height': settings.size + 'px',
                      'font-size': settings.fontSize
                      });

            $('body').append(elem);
        }

        elem.html(message);

        var size = parseInt(settings.size, 10); 
        var finalPos, initPos;
        if (settings.position === 'top') {
            finalPos = top;
            initPos = finalPos - size;
        } else {
            initPos = top + $(window).height();
            finalPos = initPos - size;
        }

        elem.css('top', initPos + 'px');
        elem.animate({top:finalPos}, settings.speed);
        setTimeout(function(){
            elem.animate(
                {top: initPos + 'px'}, 
                settings.speed, 
                "linear", 
                function(){
                    elem.css('top', '-' + settings.size + 'px');
                }
            );
        }, settings.delay);
    };
})(jQuery);
