Module.register("maps",{

    defaults: {
        search: "London"
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.sendSocketNotification("LINK");
    },

    getStyles: function() {
        return ['maps.css'];
    },

    sendCommand: function(cmd){
        var mapWindow = document.getElementById('mapWindow');
        if(mapWindow){
            mapWindow.contentWindow.postMessage(JSON.stringify({
                "event": "command",
                "func": cmd
            }), "*");
        }
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "NEW_SEARCH"){
            this.config.search = payload;
            this.updateDom(1000);
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        var iframe = document.createElement("iframe");
        var key = "AIzaSyBYYVnSZS2T_lmdmCeqG2gwTScwgKrWn1U";
        
        iframe.setAttribute("id", "mapWindow");
        iframe.setAttribute("src", "https://www.google.com/maps/embed/v1/search?key=" + key + "&q=" + this.config.search);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("type", "text/html");

        wrapper.appendChild(iframe);

        return wrapper;
    }
});
