const shorthash = require('short-hash');
const usage = "Missing arguments. \nUsage: node hashed_subdomain.js <domain name> <alias target> <hash input>";
console.log(process.argv.length);

var hosted_domain = process.argv[2];
var alias_target = process.argv[3];
var hash_input = process.argv[4];

if (process.argv.length<5) {
  console.log(usage);
  process.exit();
}

// hash the input to create the subdomain
var hashed_subdomain = shorthash(hash_input).toLowerCase();
var new_alias = hashed_subdomain + "." + hosted_domain;

var AWS = require('aws-sdk');

// AWS Config
AWS.config.update({ accessKeyId: process.env.AWS_ACCESSKEY_ID, secretAccessKey: process.env.AWS_SECRETKEY });

// Set your region for future requests.
AWS.config.update({ region: "eu-west-1" }); // e.g. eu-west-1

// get the Route53 library
var route53 = new AWS.Route53();

route53.listHostedZones({}, function (err, data) {
  if (!err) {
    //console.log(data.HostedZones);

    data.HostedZones.forEach(zone => {
        if (zone.Name == hosted_domain+".") {
        console.log("Adding record set to zone:");
        console.log(zone);

        var params = {
          "HostedZoneId": zone.Id,
          "ChangeBatch": {
            "Changes": [
              {
                "Action": "CREATE",
                "ResourceRecordSet": {
                  "Name": new_alias,
                  "Type": "A",
                  "TTL": 86400,
                  "ResourceRecords": [
                    {
                      "Value": alias_target
                    }
                  ]
                }
              }
            ]
          }
        };
        
        route53.changeResourceRecordSets(params, function (err, data) {
          if (!err) {
            console.log("Newly created domain: " + new_alias);
          }else{
            console.log(err);

          }

        });
      }
    });

  } else {
    console.log(err);
  }
});




