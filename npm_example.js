var q = 'tasks';
 
function bail(err) {
  console.error(err);
  process.exit(1);
}
 
// Publisher
function publisher(conn) {
  conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(q);

    ch.sendToQueue(q, new Buffer('something to do'));
    ch.sendToQueue(q, new Buffer('something to not to  do'));
    ch.sendToQueue(q, new Buffer('something to not to  do 123456'));
    ch.sendToQueue(q, new Buffer('something to not to  do 78901023'));
    ch.sendToQueue(q, new Buffer('something to not to  546789'));
  }
}
 
// Consumer
function consumer(conn) {
  var ok = conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(q);
    ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(q +'In consuming: '+msg.content.toString());
        ch.ack(msg);
      }
    });
  }
}
 
require('amqplib/callback_api')
  .connect('amqp://esceozyd:Xzva5w9d5CssOWFqyOLx9GHI-j3Aw81B@emu.rmq.cloudamqp.com/esceozyd', function(err, conn) {
    if (err != null) bail(err);
    consumer(conn);
    publisher(conn);
  });