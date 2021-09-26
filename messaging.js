const express  = require('express');
const config = require('./config');

const telnyx = require('telnyx')(config.TELNYX_API_KEY);
const router = module.exports = express.Router();

const inboundMessageController = async (req, res) => {
    res.sendStatus(200); // Play nice and respond to webhook
    const event = req.body.data;
	
    // log contents of SMS text and respond
    console.log(`Received message with text: `, event.payload.text)
    let smsText = event.payload.text
    smsText = smsText.trim().toLowerCase()
    
    console.log(`Received message from: ${event.payload['from'].phone_number}`)
    const dlrUrl = (new URL('/messaging/outbound', `${req.protocol}://${req.hostname}`)).href;
    const toNumber = event.payload.to[0].phone_number;
    const fromNumber = event.payload['from'].phone_number;
    
    let smsResponse
    switch (smsText) {
        case "pizza":
            smsResponse = "Chicago pizza is the best"
            break;
    
        case "ice cream":
            smsResponse = "I prefer gelato";
            break;

        case "telnyx":
            smsResponse = "Unlocking the power of intelligent connectivity";
            break;
			
        default:
            smsResponse = "Please send either the word ‘pizza’ or ‘ice cream’ for a different response";
            break;
    }

    let messageRequest = {
        from: toNumber,
        to: fromNumber,
        text: smsResponse,
        webhook_url: dlrUrl,
        use_profile_webhooks: false
      }
    try {
      const telnyxResponse = await telnyx.messages.create(messageRequest);
    }
    catch (e)  {
      console.log('Error sending message');
//      console.log(e);
    }
  
  };

//   outbound message handling
	const outboundMessageController = async (req, res) => {
    res.sendStatus(200); // Play nice and respond to webhook
    const event = req.body.data;
    console.log(`Sendt response to ${event.payload.to[0].phone_number} with the text "${event.payload.text}"`)
  };
  

// inbound/outbound routing
router.route('/inbound')
    .post(inboundMessageController);

router.route('/outbound')
    .post(outboundMessageController);