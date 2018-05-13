var EventEmitter = require('events').EventEmitter;   
var ee = new EventEmitter();

ee.on('some_events', function(foo, bar) {         
    console.log("第1个监听事件,参数foo=" + foo + ",bar="+bar );
});

/*
    EventEmitter.emit(event, [arg1], [arg2], [...])   触发指定事件
    参数1：event  字符串，事件名
    参数2：可选参数，按顺序传入回调函数的参数
    返回值：该事件是否有监听
*/
var isSuccess = ee.emit('some_events', 'Wilson', 'Zhong');

ee.on('some_events', function(foo, bar) {         
    console.log("第2个监听事件,参数foo=" + foo + ",bar="+bar );
});

ee.emit('some_events', 'zhong', 'wei');

var isSuccess2 = ee.emit('other_events', 'Wilson', 'Zhong');

console.log(isSuccess);
console.log(isSuccess2);