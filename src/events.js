/*******************************************************************
 * events namespace
 * FranckEinstein90
 * ---------------
 *
 *  events.Event: Include implementations for:
 *
 *  - object events.Event, base class for all other event object in system
 *    . has status on or off
 *    . can be flipped from one to the other
 *    . has a unique id
 *  
 *  - object events.Chain, implements concept of a chain of events
 *    . sets of events that are linked to one another
 *
 *  - object events.Register, keeps tracks of all objects and their status
 * 
 * *****************************************************************/

const events = (function() {


    let eventRegistrar = new Map(),

        generateUUID = function() {
            let d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                d += performance.now(); //use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        };

    return {

        eventStatus: {
            on: 1,
            off: 0
        },

        Event: function(state) { // events.Event registered at construction
            this.id = generateUUID();
            if (state === undefined) {
                this.state = events.eventStatus.on;
            } else {
                this.state = state
            }
            eventRegistrar.set(this.id, this.state);
        },

        Chain: function() {
            //todo
        },

        Registrar: function() { // Event registrar
            this.events = new Map();
        }
    };
})();



/******************************************************************************
 * Event class related
 * 
 * ***************************************************************************/

events.Event.prototype.on = function() {//event is ongoing
    this.status = events.eventStatus.on; 
}

events.Event.prototype.off = function() {//event is offgoing
    this.status = events.eventStatus.off;
}

/******************************************************************************
 * Registrar class related
 * 
 * ***************************************************************************/
events.Registrar.prototype.register = function(ev) {
    this.events.set(ev.id, ev);
}

events.Registrar.prototype.size = function(ev){
    return this.events.size;
}

events.Registrar.prototype.flush = function(ev){
    return this.events.clear();
}

events.Registrar.prototype.forEach = function(eventCallbackFunction){
    this.events.forEach(eventCallbackFunction);
}

events.Registrar.prototype.get = function(eventId){
    return this.events.get(eventId);
}


module.exports = {
    events
};
