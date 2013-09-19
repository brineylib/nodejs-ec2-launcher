// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set region for future requests, defaults to  'eu-west-1'
AWS.config.update({region: process.env.AWS_REGION || 'eu-west-1'});

//Credentials laoded from Environment Variables
// By default, the AWS SDK for Node.js will automatically detect AWS credentials
// set in your environment and use them for requests. This means that if you properly
// set your environment variables, you do not need to manage credentials in your
// application at all.
// The keys that the SDK looks for are as follows:
//
// AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN (optional)


/*
 * GET EC2 workflow listing.
 */
exports.list = function(req, res) {
    res.render('workflows', { user: req.user });
};

/*
 * GET start workflow
 */
exports.action = function(req, res) {
    res.render('workflows', { user: req.user });
};