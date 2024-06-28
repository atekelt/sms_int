const express = require('express');
const bodyParser = require('body-parser');
const smppClient = require('./smppClient');

const app = express();
app.use(bodyParser.json());

smppClient.connect();

app.get('/', (req,res) => {
    res.send("SMS Integration Server");
  });

app.post('/subscribe', (req, res) => {
  const { userID, spID, productID, serviceNumber } = req.body;

  const message = `Subscription request: UserID=${userID}, SPID=${spID}, ProductID=${productID}, serviceNumber=${serviceNumber}`;

  smppClient.sendSMS(userID, message, (err, pdu) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Subscription message sent', pdu });
    }
  });
});

app.post('/unsubscribe', (req, res) => {
  const { userID, spID, productID, serviceNumber } = req.body;

  const message = `Unsubscription request: UserID=${userID}, SPID=${spID}, ProductID=${productID}, serviceNumber=${serviceNumber}`;

  smppClient.sendSMS(userID, message, (err, pdu) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Unsubscription message sent', pdu });
    }
  });
});

module.exports = app;
