const assert = require('chai').assert;
const sinon = require('sinon')

var callback = sinon.spy();

callback(); // Invoke the spy callback function

//console.log(callback.called);
//console.log(callback.callCount);

var missionImpossible = {
    start: function (agent) {
        agent.apply(this);
    }
};

// By using a sinon.spy(), it allows us to track how the function is used
var ethanHunt = sinon.spy();
missionImpossible.start(ethanHunt);

