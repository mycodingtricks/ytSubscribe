(function($){      
    $.fn.ytSubscribe = function(options){
        
        var settings = $.extend({
           button:{
               channel: 'mycodingtricks', //Youtube Channel Id
               theme: 'dark', //Youtube Button Theme, Values could be either 'default' or 'dark'
               count: 'default', //Show Subscriber Count, values could be either 'default' or 'hidden'
               layout: 'full', //The Format for the button, values could be either 'default' or 'full'
               /*
                * Specify the name of a JavaScript Function that will handle event 
                * notifications related to button
                * For Example:
                * 
                * onytevent: trackYtEvent;
                * 
                * function trackYtEvent(payload){
                *   if(payload.eventType=='subscribe'){
                *     //Add Code to Handle Subscribe Event
                *   } else if(payload.eventType=='unsubscribe'){
                *     //Add Code to Handle Unsubscribe Event
                *   }
                * }
                */
               onytevent: function(data){return false} 
           },
           /*
            * HTML Structure of Subscribe Button
            * Don't forget to add the 'ytSubscribe-btn' class to the element 
            * where you want to show the Youtube Subscribe Button
            */
           structure:  "<div class='ytSubscribe-btn'></div>" 
        },options);
        loadGAPI();
        style();
        return this.each(function(){
            var self = $(this),
            iframes = self.find("iframe");
            if(iframes.length>0){
             iframes.each(function(){
                var $iframe = $(this),
                url = $iframe.attr('src');
                $iframe.wrap("<div class='ytSubscribe-iframe "+settings.button.theme+"'></div>");
                console.log(url);
                if(isYoutubeUrl(url)!==false){
                    appendButton($iframe);
                }
               console.log(url+"="+isYoutubeUrl(url));
             });
            }
            console.log(iframes.length);
            addYoutubeButton();
        });
        
        function renderYoutube(){
            $(".ytSubscribe-btn").each(function(){
               var id = "ytSubscribe-btn-"+randomInt();
               $(this).attr('id',id);
               gapi.ytsubscribe.render(id,settings.button);
            });
        }
        function style(){
            $("head").append("<style>.ytSubscribe-iframe{position:relative;background:#F9F9F9}.ytSubscribe-iframe.dark{background:black}.ytSubscribe{box-sizing:border-box;width:190px;height:auto;margin:10px auto;}.ytSubscribe-iframe>iframe{border:0px;}</style>");
        }
        function addYoutubeButton(){
            var loadJs = setInterval(function(){
                if(typeof gapi!="undefined"){
                    renderYoutube();
                    clearInterval(loadJs);
                }else{
                    loadGAPI();
                }
            },1000);
        }
        function loadGAPI(){
            $.getScript('https://apis.google.com/js/platform.js');
        }
        function appendButton(iframe){
            iframe.after("<div class='ytSubscribe'>"+settings.structure+"</div>");
        }
        function randomInt(){
            return Math.floor(Math.random()*100)+1;
        }
        function isYoutubeUrl(u){
            var reg = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
           return (u.match(reg)) ? true : false;
        }
    };
})(jQuery);
