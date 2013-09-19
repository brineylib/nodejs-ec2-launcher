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
 * GET EC2 instance listing.
 */
exports.list = function(req, res) {
    var instanceId = req.params.id;
    new AWS.EC2().describeInstances(function(error, data) {
        var instances = [];
        var instanceSelected = null;
        if (error) {
            // an error occurred
            console.log(error);
            res.render('error', { user: req.user, error: error });
        } else {
            // request succeeded
            data.Reservations.forEach(function(instance,i){
                instance=instance.Instances[0];
                if(instance.InstanceId === instanceId) {
                    instance.selected='true';
                    instanceSelected = instance;
                }
                instances.push(instance);
                //console.log(JSON.stringify(instance, null, '\t'));
            });
            res.render('instances', { user: req.user, instances: instances, instance: instanceSelected });
        }
    });
};