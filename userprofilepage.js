import { chatdata } from "./instamsgdata.js";
document.querySelector('.js-home-btn').addEventListener('click',()=>{
    location.href='instahomepage.html';
});
document.querySelector('.js-msg-btn').addEventListener('click',()=>{
    location.href='instapage.html';
});
document.querySelector('.js-profile-btn').addEventListener('click',()=>{
    location.href='userprofilepage.html';
});
document.querySelector('.js-insta-btn').addEventListener('click',()=>{
    location.href="instahomepage.html";
});
        
let clicked=0;
document.querySelector('.js-search-btn').addEventListener('click',()=>{
    console.log('hii');
    if(clicked===0){
        clicked=1;
        document.querySelector('.js-search-box').style.display="flex";
    }
    else{
        clicked=0;
        document.querySelector('.js-search-box').style.display="none";
    }
    document.querySelector('.js-profile-search-bar').addEventListener('keydown',(event)=>{
        if(event.key==="Enter")
        {
            searchprofile();
        }
    });
    
});
function searchprofile(){
    console.log("hi");
    let input_value=document.querySelector('.js-profile-search-bar').value;
    let found=0;
    chatdata.forEach( (profile,index)=>{
        if(profile.name===input_value){
            found=index;
        }
    } );
    document.querySelector('.js-profile-search-bar').value='';
    if(found>=0){
        rendersearchprofile(found);
    }
}
function rendersearchprofile(found){
    let img=chatdata[found].profile;
    let name=chatdata[found].name;
    document.querySelector('.js-result').innerHTML=`
    <div data-index=${found} class="search-profile js-search-profile">
            <img src="${img}">
            <p>${name}</p>
    </div>
    `;

    document.querySelector('.js-search-profile').addEventListener('click',()=>{
        let profile=document.querySelector('.search-profile');
        let index=profile.dataset.index;
        localStorage.setItem('profile_index',index);
        location.href='profile.html';
    });
}