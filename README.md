# sample-solution-route-system-api #

Code examples for following post:

* <a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2">Azure Functions JavaScript developer guide</a>

## Install ##
* Install <a href="https://nodejs.org/en/download/" target="_blank">Node.js</a>
* Open cmd.exe and install azure function core tool [ azure lamda functions sdk].
* Install project dependencies with following command

`npm i -g azure-functions-core-tools@2 --unsafe-perm true`

## Run ##
Run project with following command

`func start`

## Functionalities ##

There are several functionalities implemented in the stub. See linked posts for more details how to use them.

### Route APIs###

Database where you can add, get or remove route details with JSON showing RESTful web services functionality described in blog post.

**http://localhost:7071/api/getRoutes** 

Predefined routes available in this API
sample response 

````javascript
-RESPONSE
{
"statusCode" : 200,
"data" : [
        {
            "routeId" : 1,
            "time" : 10,
            "distance" : 10,
            "expense" : 4
        },
        {
            "routeId" : 2,
            "time" : 8,
            "distance" : 14,
            "expense" : 8
        },
        {
            "routeId" : 3,
            "time" : 12,
            "distance" : 12,
            "expense" : 6
        }
    ]
}
````
