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
    var instanceId = req.params.id || '';
    new AWS.EC2().describeInstances(function(error, data) {
        var instances = [];
        var instanceSelected = null;
        if (error) {
            // an error occurred
            console.log(error);
            res.send(500, error);
        } else {
            // request succeeded
            data.Reservations.forEach(function(instance,i){
                instance=instance.Instances[0];
                if(instanceId !== '' && instance.InstanceId === instanceId) {
                    instance.selected=true;
                    var startStates = new Array('stopped', 'terminated');
                    var stopStates = new Array('running', 'pending');
                    if(stopStates.indexOf(instance.State.Name) > -1) {
                        instance.togglActionStop = true;
                    } else if (startStates.indexOf(instance.State.Name) > -1) {
                        instance.togglActionStart = true;
                    }
                    instanceSelected = instance;
                }
                instances.push(instance);
                //console.log(JSON.stringify(instance, null, '\t'));
            });
            res.render('instances', { user: req.user, instances: instances, instance: instanceSelected });
        }
    });
};

/*
 * GET toggl EC2 instance state
 * i.e. start/ stop the instance
 */
exports.action = function(req, res) {
    var instanceId = req.params.id || '';
    var action = req.params.action;
    if(action === 'start') {
        console.log('start');
        new AWS.EC2().startInstances({InstanceIds: new Array(instanceId)}, function(error, data) {
            if (error) {
                // an error occurred
                console.log(error);
                res.send(500, error);
            } else {
                res.redirect('/instances/'+instanceId);
            }
        });
    } else if (action === 'stop') {
        console.log('stop');
        new AWS.EC2().stopInstances({InstanceIds: new Array(instanceId)}, function(error, data) {
            if (error) {
                // an error occurred
                console.log(error);
                res.send(500, error);
            } else {
                res.redirect('/instances/'+instanceId);
            }
        });
    } else {
        res.send(400);
    }

};