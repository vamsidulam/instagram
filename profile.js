import { chatdata,posts_data } from "./instamsgdata.js";


let profile_index=localStorage.getItem('profile_index');
console.log(profile_index);
profile_index=parseInt(profile_index);

console.log(profile_index);

window.addEventListener('DOMContentLoaded',()=>{
    renderprofilecode();
    postscode();
    renderfollowinglist();
    
});

let htmlpostscode='';
function renderprofilecode(){
    const postSection = document.querySelector('.editing-post');
    const highlightsSection = document.querySelector('.js-highlights-section');
    let code='';
    if(chatdata[profile_index].following_msg=== 'following'){
        highlightsSection.style.display="block";
        postSection.classList.remove('header-section-private');
        postSection.classList.add('post-section');
        if(chatdata[profile_index].posts===0)
        {
            code=`<button class="js-msg-btn">message</button>`;
            htmlpostscode=`
            <div class="header-section">
                <div class="posts">
                    <img src="insta website pics/edit-table.png">
                    <p>POSTS</p>
                </div>
                <div class="tagged">
                    <img src="insta website pics/person.png">
                    <p>TAGGED</p>
                </div>
            </div>
            <div class="photos-section">
                <p>No Posts Yet</p>
            </div>
            `;
        }
        else{
            let posts_code_generated='';
            let img='';
            for(let i=0;i<chatdata[profile_index].posts;i++){
                let img=posts_data[i].note_img;
                posts_code_generated+=`
                <div data-index="${i}" class="post js-post">
                    <img src="${img}">
                </div>
                `;

            }
            htmlpostscode=`
            <div class="header-section">
                <div class="posts">
                    <img src="insta website pics/edit-table.png">
                    <p>POSTS</p>
                </div>
                <div class="tagged">
                    <img src="insta website pics/person.png">
                    <p>TAGGED</p>
                </div>
            </div>
            <div class="photos-section">
                <div class="posts">
                    ${posts_code_generated}
               </div> 
            </div>
            `;
        }
        
        
    }
    else{
        highlightsSection.style.display="none";
        postSection.classList.add('header-section-private');
        postSection.classList.remove('post-section');
        code=`<img style="width: 45px; cursor: pointer; height: 45px;" class="plus-icon js-add-frnd-btn" src="insta website pics/addnewfrnd.png">`
        htmlpostscode=`
        <div class="header-section">
            <div class="posts">
                <img src="insta website pics/edit-table.png">
                <p>POSTS</p>
            </div>
            <div class="tagged">
                <img src="insta website pics/person.png">
                <p>TAGGED</p>
            </div>
        </div>
        <div class="photos-section">
            <p>This is Private Account</p>
        </div>
        `;
        
    }
    let htmlcode=`
    <div class="profile-section">
        <div class="profile">
            <img class="dp" src="${chatdata[profile_index].profile}">
        </div>
        <div class="details-section">
            <div class="top">
                <p>${chatdata[profile_index].name}</p>
                <button class="js-follow-btn">${chatdata[profile_index].following_msg}</button>
                ${code}
                <img class="plus-icon" src="insta website pics/settings.png">
            </div>
            <div class="noofposts">
                <p>${chatdata[profile_index].posts} posts</p>
                <p style="cursor:pointer;" class="js-followers">${chatdata[profile_index].followers} followers</p>
                <p style="cursor:pointer;" class="js-following">${chatdata[profile_index].following} following</p>
            </div>
            <div class="bio-section">${chatdata[profile_index].bio}</div>
            <div class="followers-section">Followed by <span style="color: black;">${chatdata[profile_index].followedby}</span> and 2more</div>
        </div>
    </div>
    
    `;
    document.querySelector('.js-profile-hightlights-section').innerHTML=htmlcode;
    highlightsSection.innerHTML=` 
        <img src="insta website pics/add.png">
        <p>Highlights</p>
    `;
    document.querySelector('.js-follow-btn').addEventListener('click',()=>{
        console.log('clicked');
        let text=document.querySelector('.js-follow-btn').innerHTML;
        console.log(text);
        if(text==='follow'){
            followbtn();
        }
        if(text==='following')
        {
            followsettings();
        }
        
    });
    document.querySelector('.js-following').addEventListener('click',()=>{
        document.querySelector('.following-list-box').style.display="flex";
        console.log("hello");
    });
    document.querySelector('.js-followers').addEventListener('click',()=>{
        document.querySelector('.following-list-box').style.display="flex";
        console.log("hello");
    });
    
    // document.querySelector('.js-msg-btn').addEventListener('click',()=>{
    //     location.href='instapage.html';
    // });
    console.log("Attaching click listeners...");
console.log(document.querySelectorAll('.js-post').length);  // Should be 3

   
    
}

function openpost(index){
    console.log(index);
    let postimg='';
    let dp='';
    let name='';
    postimg=posts_data[index].note_img;
    dp=chatdata[profile_index].profile;
    name=posts_data[index].note_name;
    let htmlopenpostcode=`
    <div class="open-post-box">
        <img class="js-close-post close-post" src="insta website pics/close.png">
        <div class="left-section">
            <img src="${postimg}">
        </div>
        <div class="right-section">
            <img src="${dp}">
            <p>${name}</p>
            <img class="send-option" src="insta website pics/send.png">
        </div>
    </div>
    `;
    document.querySelector('.open-post').innerHTML=htmlopenpostcode;
    document.querySelectorAll('.js-close-post').forEach( (close_btn)=>{
        close_btn.addEventListener('click',()=>{
            document.querySelector('.open-post').style.display = "none";
        });
    } );
    
}
document.querySelector('.js-profile-btn').addEventListener('click',()=>{
    location.href='userprofilepage.html';
});
document.querySelector('.js-msg-btn').addEventListener('click',()=>{
    location.href="instapage.html";
});
document.querySelector('.js-home-btn').addEventListener('click',()=>{
    location.href="instahomepage.html";
});
document.querySelector('.js-insta-btn').addEventListener('click',()=>{
    location.href="instahomepage.html";
});
function postscode(){
    let htmlcode=htmlpostscode;
    //document.querySelector('.js-post-section').classList.add('header-section-private');
    if (chatdata[profile_index].following_msg=== 'following'&&chatdata[profile_index].posts===0)
    {
        document.querySelector('.js-post-section').innerHTML=htmlcode;
    }
    else if (chatdata[profile_index].following_msg=== 'follow'){
        document.querySelector('.js-post-section').innerHTML=htmlcode;
    }
    else{
        document.querySelector('.js-post-section').innerHTML=htmlcode;
    }

     document.querySelectorAll('.js-post').forEach((post1)=>{
        post1.addEventListener('click',()=>{
            let index=post1.dataset.index;
            document.querySelector('.open-post').style.display="block";
            openpost(index);
        });
    });
    document.querySelectorAll('.js-close-post').forEach( (close_btn)=>{
        close_btn.addEventListener('click',()=>{
            document.querySelector('.open-post').style.display = "none";
        });
    } );
    
}
function followbtn(){
    document.querySelector('.js-follow-btn').innerHTML='following';
    chatdata[profile_index].following_msg='following';
    renderprofilecode();
    postscode();
}
function followsettings(){
    document.querySelector('.follow-btn-portion').style.display="flex";
    document.querySelector('.js-unfollow-btn').addEventListener('click',()=>{
        document.querySelector('.js-follow-btn').innerHTML='follow';
        chatdata[profile_index].following_msg='follow';
        renderprofilecode();
        postscode();
    });
    document.querySelector('.js-close-btn').addEventListener('click',()=>{
        document.querySelector('.follow-btn-portion').style.display="none";
    });
    document.querySelector('.js-favourite-btn').addEventListener('click',()=>{
        document.querySelector('.added').style.display="flex";
        setTimeout( ()=>{
            document.querySelector('.added').style.display="none";
        },2000 );
    });
}


function renderfollowinglist(){
    let img='';
    let name='';
    let profilehtmlcode='';
    chatdata.forEach( (profile)=>{
        img=profile.profile;
        name=profile.name;
        profilehtmlcode+=`
        <div>
            <img src="${img}">
            <p>${name}</p>
            <button>following</button>
        </div>
        `;
    } );
    let close_code=`
    <div class="close-box">
        <img class="close-icon js-close-icon" src="insta website pics/close.png">
    </div>
    `;
    document.querySelector('.js-following-list').innerHTML=close_code+profilehtmlcode;
    document.querySelector('.js-close-icon').addEventListener('click',()=>{
        document.querySelector('.following-list-box').style.display="none";
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
}
