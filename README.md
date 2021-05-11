# sample-solution-route-system-api #

Code examples for following post:

* <a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2">Azure Functions JavaScript developer guide</a>
* Azure functions are similar to aws lamda functions

## Install ##
* Install <a href="https://nodejs.org/en/download/" target="_blank">Node.js</a>
* Install project dependencies with following command

`npm i -g azure-functions-core-tools@2 --unsafe-perm true`

## Run ##
Run project with following command

`func start`

## Functionalities ##

There are several functionalities implemented in the stub. See linked posts for more details how to use them.

## APIs ##
Database where you can add or get route details with JSON showing RESTful web services functionality described in blog post.


**http://localhost:7071/api/getRoutes** 

Predefined routes available in this API.

````javascript
-SAMPLE RESPONSE
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

**http://localhost:7071/api/addRoute** 

Add new route to the system.Send routeId, time, distance, expense as query parameter

````javascript

-SAMPLE INPUT REQUEST

http://localhost:7071/api/addRoute?routeId=5&time=12&distance=22&expense=9

-SAMPLE RESPONSE

{
    "statusCode" : 200,
    "data" : New Route Added Successfully with id = 5
}
````


**http://localhost:7071/api/getProjectedRoute** 

This is the major API which will give the best available routes based on less money and less time. By defualt the api will give 7 days data or pass `?days=5` as query params and get 5 days projected data. if the user spend more 12 euros for coffee then he has to skip the coffee for rest of the days

````javascript

-SAMPLE RESPONSE

{
    "statusCode" : 200,
    "data" : [
                {
                    "day" : Day 1,
                    "route" : {
                        "routeID" : 1,
                        "time" : 10,
                        "distance" : 10,
                        "coffeePrice" : 4
                    }
                },
                {
                    "day" : Day 2,
                    "route" : {
                        "routeID" : 1,
                        "time" : 10,
                        "distance" : 10,
                        "coffeePrice" : 4
                    }
                },
                {
                    "day" : Day 3,
                    "route" : {
                        "routeID" : 1,
                        "time" : 10,
                        "distance" : 10,
                        "coffeePrice" : 4
                    }
                },
                {
                    "day" : Day 4,
                    "route" : {
                        "routeID" : 2,
                        "time" : 8,
                        "distance" : 14,
                        "coffeePrice" : Skip Coffee
                    }
                },
                {
                    "day" : Day 5,
                    "route" : {
                        "routeID" : 2,
                        "time" : 8,
                        "distance" : 14,
                        "coffeePrice" : Skip Coffee
                    }
                },
                {
                    "day" : Day 6,
                    "route" : {
                        "routeID" : 2,
                        "time" : 8,
                        "distance" : 14,
                        "coffeePrice" : Skip Coffee
                    }
                },
                {
                    "day" : Day 7,
                    "route" : {
                        "routeID" : 2,
                        "time" : 8,
                        "distance" : 14,
                        "coffeePrice" : Skip Coffee
                    }
                }
            ]
}
````
