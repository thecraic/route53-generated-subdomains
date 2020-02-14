# Route53 Generated Subdomains

You want to programmatically generate Route53 subdomains for one of your hosted zones.

Example:
k4fns6sih.mydomain.com

Depending on the use case you may want a unique ID or to generate the subdomain based on a hash of an input value.

This repo contains 2 implementations:

**uuid_subdomain.js** generates a unique subdomain generated with a uuid.

**hashed_subdomain.js** generates a hashed subdomain based on an input value.

Notes: 
Ordinarily the next step in this process would be to generate and validate (using DNS validation) an SSL certificate in AWS Certificate Manager (ACM).

Details on how to do this can be found in the [ACM SDK for Javascript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ACM.html).


## Prerequisites
A verified hosted zone set up in Amazon Route 53.

## Getting Started
Clone the repository.

```
git clone https://github.com/thecraic/route53-generated-subdomains.git
```

Initialize the project.

```
npm install
```

Set your AWS access environment variables
```
export AWS_ACCESSKEY_ID='ACCESSKEYID'
export AWS_SECRETKEY='AWSSECRETKEY'
```

Generate a uuid based subdomain with an A record and target IP address.

``
Usage: node uuid_subdomain.js <domain name> <alias target>
``

```
node uuid_subdomain.js mydomain.com 123.123.123.123
```

Generate a hashed subdomain based on an input value with an A record and target IP address.

``
Usage: node hashed_subdomain.js <domain name> <alias target> <hash input>
``

```
node hashed_subdomain.js mydomain.com 123.123.123.123
```


