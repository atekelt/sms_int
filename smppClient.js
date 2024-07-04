const smpp = require('smpp');
require('dotenv').config();
let session;

const connect = () => {
  session = new smpp.Session({host: process.env.HOST, port: process.env.SMS_PORT});

  session.on('connect', () => {
    session.bind_transceiver({
      system_id: process.env.USER,
      password: "Dis#6838"
    }, (pdu) => {
      if (pdu.command_status === 0) {
        console.log('Successfully bound to SMPP server');
      }
    });
  });

  session.on('close', () => {
    console.log('SMPP session closed');
  });

  session.on('error', (err) => {
    console.error('SMPP session error:', err);
  });
};

const sendSMS = (phoneNumber, message, callback) => {
  if (!session) {
    callback(new Error('No SMPP session established'));
    return;
  }

  session.submit_sm({
    destination_addr: phoneNumber,
    short_message: message
  }, (pdu) => {
    if (pdu.command_status === 0) {
      console.log('Message sent successfully');
      callback(null, pdu);
    } else {
      console.error('Failed to send message:', pdu);
      callback(new Error('Failed to send message'));
    }
  });
};

module.exports = {
  connect,
  sendSMS
};
