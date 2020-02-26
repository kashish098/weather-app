const request=require('request');

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2FzaGlzaDA5OCIsImEiOiJjazV0bmpoNTgweHk2M2VtbDJhdW1tYmpmIn0.QeQw-kEr1XQl9Ocsc8wSEQ&limit=1';
    request({url,json:true},(error,{body})=>{    //destruct. the response to get only body
        if(error){
            callback('Unable to connect to the weather app',undefined);
        } else if(body.features.length==0){
            callback('Unable to identify the location',undefined);            
        } else{
            callback(undefined,{
              location: body.features[0].place_name,
              latitude:body.features[0].center[1],
              longitude:body.features[0].center[0]
            })
        }
    });
}

module.exports=geocode;