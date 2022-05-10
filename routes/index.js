var express = require('express');
var router = express.Router();
// var twilio = require('twilio');

// const accountSid = 'AC40af5e3fe326b82d49130978f1271b72';
// const authToken = '996d15a8bab21a5cb3bd4569ff37a926';

var TeleSignSDK = require('telesignsdk');

  const customerId = "FF0896E9-218A-4C68-992F-6412770EEE85";
  const apiKey = "eUdk1hXw/jwcl5dQZ87jpE8QC7OBC+XfMFMbEmNYPcq/Q7tUadviSOClJ1q91I8trxCl30zmbf54VPDpeV3z9A==";
  const rest_endpoint = "https://rest-api.telesign.com";
  const timeout = 10*1000; // 10 secs

  const client = new TeleSignSDK( customerId,
      apiKey,
      rest_endpoint,
      timeout // optional
      // userAgent
  );


  router.post('/sms', function(req, res, next) {
    
    console.log("## MessagingClient.message ##");
    const message = req.body.message;
    const phoneNumber = req.body.number;
    console.log(req.body);
    const messageType = "ARN";
  
  
    function messageCallback(error, responseBody) {
        if (error === null) {
            console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
                ` => code: ${responseBody['status']['code']}` +
                `, description: ${responseBody['status']['description']}`);
            res.send({status:200,message:'Message Send'});
        } else {
          res.send({status:201,message:"Message couldn't Send"});
            console.error("Unable to send message. " + error);
        }
    }
    client.sms.message(messageCallback, phoneNumber, message, messageType);

  });

 


module.exports = router;
