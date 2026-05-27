In this question, the candidate needs to implement an Event Emitter class that can be used for the publisher-subscriber mechanism in JavaScript.

Many users have reported that this question was asked in the interview process of Meta/Facebook, Google, and many other top product companies.

Syntax
const emitter = new Emitter();
Allows you to subscribe to some event

const sub1 = emitter.subscribe('event_name', callback1);
// you can have multiple callbacks to the same event
const sub2 = emitter.subscribe('event_name', callback2);
You can emit the event you want with this API (you can receive 'n' number of arguments)

emitter.emit('event_name', foo, bar);
And allows you to release the subscription like this (but you should be able to still emit from sub2)

sub1.release();
If we try to release a subscription multiple times, it should throw a TypeError.
