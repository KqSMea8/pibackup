Module.register("browser",{

    defaults: {
        search: "stuff"
    },

    start: function() {
        Log.info("start")
        Log.info("Starting module: " + this.name);
        this.sendSocketNotification("LINK");
    },

    getStyles: function() {
        console.log("getStyles")
        return ['script.css'];
    },

    sendCommand: function(cmd){
        Log.info("sendCommand")
        var browserWindow = document.getElementById('searchBrowser');
        if(browserWindow){
            browserWindow.contentWindow.postMessage(JSON.stringify({
                "event": "command",
                "func": cmd
            }), "*");
        }
    },

    socketNotificationReceived: function(notification, payload) {
       Log.info("socketNotificationReceived")
       if (notification === "NEW_SEARCH"){
            this.config.search = payload;
            Log.info(payload);
            this.updateDom(1000);
        }
    },

    getDom: function() {

	Log.info("creating elements"); 
        var wrapper = document.createElement("div");

        var background = document.createElement("div");
        background.classList.add("video-background");

        var foreground = document.createElement("div");
        foreground.classList.add("video-foreground");

        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", "searchBrowser");
        iframe.setAttribute("src", "https://www.google.com/search?q=" + this.config.search);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("type", "text/html");

        foreground.appendChild(iframe);
        background.appendChild(foreground);
        wrapper.appendChild(background);

        return wrapper;
    }
});

