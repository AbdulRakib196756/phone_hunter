const loadphonedata=(searchtext,datalimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchtext}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayphone(data.data,datalimit))

}

const displayphone=(phones,datalimit)=>{

   const containdiv= document.getElementById('phone-hunter-div')
       containdiv.innerHTML=''
    // display 20 phones only
    const showall=document.getElementById('showall');
    if(datalimit && phones.length>6){
        phones=phones.slice(0,6)
        showall.classList.remove('d-none')

    }
    else{
        showall.classList.add('d-none')
    }

    //display no phone
    const nophone=document.getElementById('warning-mssg')
    if(phones.length == 0){
        nophone.classList.remove('d-none')
    }
    else{
        nophone.classList.add('d-none')
    } 
    // dislay all phone 
    for(const phone of phones){
       
    const carddiv= document.createElement('div')
    carddiv.classList.add('col');
    carddiv.innerHTML=`
    <div class="card h-100">
    <img src="${phone.image}" class="card-img-top w-50 m-auto img-fluid" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <button onclick="loadphonedetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phonedetails">Go details</button>\

    </div>
    </div>`;
    containdiv.appendChild(carddiv)
   }  
//    load ends here 
   tooglespineer(false)
}
const processsearch=(datalimit)=>{
    tooglespineer(true);
    const inputfeild=document.getElementById('search-input').value;
    loadphonedata(inputfeild,datalimit)
}

document.getElementById('search-btn').addEventListener('click',function(){
    processsearch(10)
    

})
// serch btn using enter 
document.getElementById('search-input').addEventListener('keypress',function(e){
     if(e.key ==='Enter'){
        processsearch(10)
     }
})

const tooglespineer =isloading=>{
    const loadersection=document.getElementById('loader')

    if(isloading){
        loadersection.classList.remove('d-none')
    }
    else{
        loadersection.classList.add('d-none')
    }
}
document.getElementById('btn-showall').addEventListener('click',function(){
    processsearch()
})
// details part 
const loadphonedetails =id=>{
    const url =` https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>phonedetails(data.data))

}

const phonedetails= phone =>{
    console.log(phone)
    const title =document.getElementById('phonedetailsLabel')
    title.innerText=phone.name
    const storage =document.getElementById('storage');
    storage.innerHTML=`
    <p>storage:${phone.mainFeatures.storage}</p>
    <p>Others:${phone.others?phone.others.Bluetooth:'no information'}</p>
    `
       
}



// loadphonedata();


