const request=require('request');

const forecast=(lat,long,callback)=>{

    const url='https://api.darksky.net/forecast/b4d2b33b0d08801e519e4c3155c1a34c/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=si';
    request({url,json:true},(error,{body})=>{

    if(error){
        callback('Unable to connect to the weather app',undefined);
        console.log(response);
    } else if(body.error){
        callback('Unable to find the location',undefined);
    } else{
        callback(undefined,{
            summary:body.daily.data[0].summary,
            temp:'Temp. is '+body.currently.temperature+'C',
            rainProb:'There is '+body.currently.precipProbability+' probability of rain'
        });
    }   
  });

}
module.exports=forecast;