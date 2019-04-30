const needle = require('needle');
const BASE_URL = "https://ef7d6e04-03f0-4e4e-9153-72621f75f906:10EtFXaQcG@twcservice.mybluemix.net/api/weather";

async function main(params) {
  try {
    let response = await needle('get', `${BASE_URL}/v3/location/search?query=${params.location}&language=en_US`, { headers: { 'accept': 'application/json' } });
    console.log(response.body);
    
    let stateCode = null;
    let countryCode = null;
    let lat = null;
    let lon = null;
    if (response.body.location && response.body.location.adminDistrictCode.length>0 && response.body.location.countryCode.length>0) {
      stateCode = response.body.location.adminDistrictCode[0];
      countryCode = response.body.location.countryCode[0];
      lat = response.body.location.latitude[0];
      lon = response.body.location.longitude[0];
    }
    
    console.log(stateCode + ", " + countryCode);
    
    // Place not found case
    if (!stateCode) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: { message: `${params.location} not in records.` },
      };
    }
    
    response = await needle('get', `${BASE_URL}/v1/country/${countryCode}/state/${stateCode}/alerts.json`, { headers: { 'accept': 'application/json' } });
    console.log(response.body);
    
    // No alerts case
    if (!response.body.alerts || response.body.alerts.length <= 0) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: { message: `No ongoing alerts in ${stateCode}, ${countryCode}.` },
      };
    }
    
    let alertHeadline = "";
    let count = 0;
    for (let alertVar of response.body.alerts) {
      alertHeadline += `Urgency - ${alertVar.urgency} : ${alertVar.headline_text} in ${alertVar.area_name}, ${alertVar.st_cd}, ${alertVar.cntry_cd}.`;
      alertHeadline += '<br><br>';
      count += 1;
      
      if (count == 5)
        break;
    }
    
    // Send data to map
    //response = await needle('get', `http://169.47.252.109:32000/set?lat=${lat}&lon=${lon}`, { headers: { 'accept': 'application/json' } });
    //console.log(response.body);
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { message: alertHeadline },
    };
  } catch (err) {
    console.log(err)
    return Promise.reject({
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: { error: err.message },
    });
  }
}

exports.main = main;
