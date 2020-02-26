console.log('This is client side javascript');

const weatherForm=document.querySelector('form');
const search=document.querySelector('input');  //selects first input element
const m1=document.querySelector('#message-1');
const m2=document.querySelector('#message-2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    m1.textContent='Loading..';
    m2.textContent='';
    const location=search.value;
    const url='/weather?address='+location;
    fetch(url).then((response)=>{
        response.json().then((data)=>{
    
            if(data.Error){
             m1.textContent=data.Error;
            // console.log(data.Error);
            }
            else{
                m1.textContent=data.location;
                m2.textContent=data.forecast.summary+data.forecast.rainProb+data.forecast.temp;
                // console.log(data.forecast.summary);
                // console.log(data.forecast.rainProb);
                // console.log(data.forecast.temp);
                // console.log(data.location);
            }
        })
    })    

})