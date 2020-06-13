

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const m1=document.querySelector('#msgone')
const m2=document.querySelector('#msgtwo')
 

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    msgone.textContent='Loading...'
    msgtwo.textContent=''
   // http://localhost:3001
    fetch ('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgone.textContent=data.error
        }
        else{
            msgone.textContent=data.location
            msgtwo.textContent=data.forecast
        }
    })
})
})