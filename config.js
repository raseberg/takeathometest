if (!process.env.TELNYX_API_KEY) {
    console.error("Please set the environmental variable: TELNYX_API_KEY (https://portal.telnyx.com/#/app/api-keys)");
    process.exit();
  }
  
  if (!process.env.TELNYX_PUBLIC_KEY) {
    console.error("Please set the environmental variable: TELNYX_PUBLIC_KEY (https://portal.telnyx.com/#/app/api-keys/public-key)");
    process.exit();
  }
  
//  if (!process.env.TELNYX_APP_PORT) {
//    console.error("Please set the environmental variable: TELNYX_APP_PORT");
//    process.exit();
//  }

  module.exports.TELNYX_API_KEY       = process.env.TELNYX_API_KEY;
  module.exports.TELNYX_PUBLIC_KEY    = process.env.TELNYX_PUBLIC_KEY;
  module.exports.TELNYX_APP_PORT      = process.env.TELNYX_APP_PORT || 5000;