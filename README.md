# Telnyx Take At Home Test (SMS Autoresponder)

This is a simple SMS Auto-Responder application. It will respond with one of three incoming text messages:
- The word “*pizza*” will respond with the sentence: “*Chicago pizza is the best*”
- The word “*“Ice cream*” responds with the sentence: “*I prefer gelato*”
- Any other text responds with the sentence: “*Please send either the word ‘pizza’ or ‘ice cream’ for a different response*”

## Introduction

**The step-by-step instructions below are written for beginners.**
> This section is a quickstart for users who know about GIT, NODE, NPM, tunneling servers such as NGROK, and how to use the Telnyx portal for buying and configuring SMS-capable Phone Number. Other users, continue to the step by step instruction below; 
> - Clone this repository, then run `npm install` to install dependencies.
> - Add your Telnyx API Key and your Telnyx Public Key to the .env file. 
> - Start NGINX using the port provided in the .env (5000).
> - Update your telnyx inbound webhook URL with the nginx url followed by */messaging/inbound*. 
> - Run the index.js file. 
> - Test and **Enjoy!**

## Step-by-step instructions

You must know a little bit about how to use a command prompt, terminal, powershell or similar terminal tools.
This is what you will need to set it up and run it on your windows computer:

#### Set up your Telnyx Portal
Complete the steps outlined on the [Messaging > Quickstarts > Portal Setup](https://developers.telnyx.com/docs/v2/messaging/quickstarts/portal-setup#mission-control-portal-set-up) developer page. You will:
- [Create a Telnyx account](https://telnyx.com/sign-up)
- [Purchase an SMS-capable phone number](https://https://portal.telnyx.com/#/app/numbers/search-numbers) with Telnyx 
	- **NOTE**: Number must be configured to use [P2P traffic type](https://telnyx.com/resources/sms-numbers-traffic-types).
- [Create a messaging profile](https://portal.telnyx.com/#/app/messaging)
- Assign your phone number to your messaging profile

#### Set up your Development environment
- Download and install [NODE](https://nodejs.org/en/download/)
	-	NPM modules (npm is installed with Node.js)
- Create a new folder on your harddrive for this project. E.g. c:\takeathometest\
	-	Feel free to place this folder wherever you want on your disk, even though examples in this instruction suggest you are using c:\takeathometest\
- Download and unzip [NGROK](https://developers.telnyx.com/docs/v2/development/ngrok) to C:\Windows\ 
	-	**NOTE:** NGROK.exe can be located in any folder of your choice. Advantage of storing the file in e.g. C:\windows\ is because that allows you to easily run the file from any command promt folder you currently are working in.
- Download and unzip [THIS REPOSITORY](https://github.com/raseberg/takeathometest/archive/refs/heads/main.zip) to c:\takeathometest\
- REBOOT YOUR COMPUTER

#### Configure and Run the SMS Autoreponder server
- Open the .env file located in c:\takeathometest\ in a text editor such as Notepad
- Navigate to the [API Keys](https://portal.telnyx.com/#/app/api-keys) in your Telnyx Portal and copy your API Key and your Public Key to the respective fields in the .env file you just opened, and save the .env file.
	- **TIPS** This application allows you to use a port of your choice. The server port can be configured in the .env file in the TELNYX_APP_PORT variable. If no port is configured, then it defaults to port 5000 which is the one the rest of this instruction is based on. Make sure to change the ngrok port accordingly if you decide to add a port number here.
- Open a terminal windows such as command prompt and navigate to c:\takeathometest\
  - Press keyboard Win+R - type ```CMD``` then press ENTER
  - Type ``` md\takeathometest``` then press ENTER
  - Type ``` cd\takeathometest``` then press ENTER
- Install the required dependencies
  - Type ```npm install ``` then press ENTER
- You shall now start the NGROK reverse proxy / tunneling server and finalize the last piece of your configuration
  - Type ```start ngrok http 5000 ``` then press ENTER. The terminal should look something like this:
  
    ```
    ngrok by @inconshreveable                                          (Ctrl+C to quit)
    
    Session Status                online
    Version                       2.3.40
    Session Expires               1 hour, 59 minutes
    Region                        United States (us)
    Web Interface                 http://127.0.0.1:4040
    Forwarding                    http://your-url.ngrok.io -> http://localhost:5000
    Forwarding                    https://your-url.ngrok.io -> http://localhost:5000

    Connections                   ttl     opn     rt1     rt5     p50     p90
                                  0       0       0.00    0.00    0.00    0.00
    ```
  - Once the `ngrok` process is running on your localhost, copy the forwarding https address (e.g., https://your-url.ngrok.io)
- The last step before you can run your application is to update your [Telnyx Messaging Profile](https://portal.telnyx.com/#/app/messaging) with the webhook URL.
  - Edit your messaging profile Inbound Settings to "Send a webhook to this URL" with the copied forwarding url and append ```/messaging/inbound``` (e.g. https://your-url.ngrok.io/messaging/inbound). Then save your changes.
	- **NOTE**: ngrok will produce a unique url each time it starts. That means you will need to update the messaging profile if you stop and start ngrok again.
- Go back to your command prompt c:\takeathometest\ and enter ```node index.js``` to start the SMS autoresponder server.

Now; Everything should be up and running. Try and send a SMS to your telnyx number with the text "Pizza" and see what happens...

> *BUG?* The log suggests that the Autoresponder sends TWO messages in reply to the incoming SMS. Don't worry - that's a log error. It only sends and counts ONE SMS as expected.


## SOURCE
This autoresponder is based on (https://github.com/dapperAuteur/telnyx-take-home-test).

A cleaner and easier version in java is the [express-node-autoresponder](https://github.com/team-telnyx/demo-node-telnyx/tree/master/express-sms-autoresponder) made by team-telnyx, or their PHP [slim-sms-autoresponder](https://github.com/team-telnyx/demo-php-telnyx/tree/master/slim-sms-autoresponder).
