import { posts_data,chatdata, notedata } from "./instamsgdata.js";
renderpost();
function renderpost(){
    let posthtmlcode='';
    posts_data.forEach( (post,index)=>{
        let img=post.note_img;
        let name=post.note_name;
        posthtmlcode += `
            <div data-index=${index} class="post js-post">
                <div class="top-section">
                    <div class="details">
                        <img src="${chatdata[index].profile}">
                        <p>${name}</p>
                    </div>
                    <div class="settings-btn"><img src="insta website pics/settings.png"></div>
                </div>
                <div class="middle-section">
                    <img src="${img}">
                </div>
                <div class="bottom-section">
                    <div class="heart-msg-section">
                        <img src="insta website pics/heart.png">
                        <img src="insta website pics/chat.png">
                    </div>
                    <div class="send-section">
                        <img src="insta website pics/send.png">
                    </div>
                </div>

            </div>
        `;
    });
    document.querySelector('.js-posts-section').innerHTML=posthtmlcode;
    document.querySelectorAll('.js-post').forEach( (post)=>{
        post.addEventListener('click',()=>{
            let index=post.dataset.index;
            localStorage.setItem('profile_index',index);
            location.href='profile.html';
        });
    } );
}

renderstories();
function renderstories(){
    let storiescode='';
    posts_data.forEach( (post,index)=>{
        let img=post.note_img;
        let name=post.note_name;
        storiescode+=`
        <div class="story-container">
            <img src="${img}">
            <p>${name}</p>
        </div>
        `;
    } );
    document.querySelector('.js-stories-section').innerHTML=storiescode;
}
renderfollowinglistsuggestion();
function renderfollowinglistsuggestion(){
    let code='';
    posts_data.forEach( (post,index)=>{
        let img=post.note_img;
        let name=post.note_name;
        code+=`
        <div data-index=${index} class="profile js-profile">
            <div class="user-details">
                <img src="${img}">
                <p>${name}</p>
            </div>
            <button>Follow</button>
        </div>
        `;
    } );
    let htmlcode=`<div class="suggestion-text">Suggestions...</div>`;
    document.querySelector('.js-follow-suggestion-box').innerHTML=htmlcode+code;
    document.querySelectorAll('.js-profile').forEach( (profile)=>{
        profile.addEventListener('click',()=>{
            let index=profile.dataset.index;
            localStorage.setItem('profile_index',index);
            location.href='profile.html';
        });
    } );
}

document.querySelector('.js-chat-box').addEventListener('click',()=>{
    location.href='instapage.html';
});
document.querySelector('.js-profile-btn').addEventListener('click',()=>{
    location.href='userprofilepage.html';
});
document.querySelector('.js-home-btn').addEventListener('click',()=>{
    location.href='instahomepage.html';
});
document.querySelector('.user-details').addEventListener('click',()=>{
    location.href='userprofilepage.html';
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
document.querySelector('.js-insta-btn').addEventListener('click',()=>{
    location.href="instahomepage.html";
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
    document.querySelector('.js-search-result').innerHTML=`
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
