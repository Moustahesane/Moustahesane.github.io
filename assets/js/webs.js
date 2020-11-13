class EventBus
{
    /**
     * Initialize a new event bus instance.
     */
    constructor()
    {
        this.bus = document.createElement('fakeelement');
    }

    /**
     * Add an event listener.
     */
    addEventListener(event, callback)
    {
        this.bus.addEventListener(event, callback);
    }

    /**
     * Remove an event listener.
     */
    removeEventListener(event, callback)
    {
        this.bus.removeEventListener(event, callback);
    }

    /**
     * Dispatch an event.
     */
    dispatchEvent(event, detail = {})
    {
        this.bus.dispatchEvent(new CustomEvent(event, { detail }));
    }
}
window.EventBus = new EventBus;

var socket = io('http://192.168.8.108:8000/message?token=123133', {
    transports: ['polling', 'websocket']
});
socket.on('connect', function () {
 
   console.log("connect")


});
socket.on('message', function (data) {
    
    
    window.EventBus.dispatchEvent('message', data);
    setTimeout(function(){

        var canal = data.canal
        var sessionCanal=sessionStorage.getItem("canal")
        console.log('can',canal,'sesscal',sessionCanal)
    
        if(data.message!="ok" && canal)
        {   if(sessionCanal==canal)
            socket.emit("recieved",{message:"ok",canal:canal})
    
        }

    },100)

    

    
});
socket.on('disconnect', function () {
  
});
socket.on('reconnect_attempt', (attempts) => {
    
});

function sendDisconnect() {
    socket.disconnect();
}