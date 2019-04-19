Hi!

IBM CLOUD REGISTRATION -
https://ibm.biz/BdzRcx

Weather data:
https://ef7d6e04-03f0-4e4e-9153-72621f75f906:10EtFXaQcG@twcservice.mybluemix.net/api/weather

Weather data swagger:
https://twcservice.au-syd.mybluemix.net/rest-api/

```
{
  "output": {
    "generic": [
      {
        "values": [],
        "response_type": "text",
        "selection_policy": "sequential"
      }
    ]
  },
  "actions": [
    {
      "name": "/Developer Advocacy_Cloud Developer Advocacy/ash-fn/weatherbot",
      "type": "cloud_function",
      "parameters": {
        "location": "@sys-location"
      },
      "credentials": "$mycreds",
      "result_variable": "myres"
    }
  ]
}
```
