import {chatdata,notedata} from './instamsgdata.js';
import { conversation,msgs } from './chattingdata.js';

let profiles_htmlcode='';
export let profile_index=localStorage.getItem('index')||0;
class chatprofiles{
    img='';
    name='';
    time='';
    msg='';
    view='';
    viewmsg='';
    
    constructor(profile1){
        this.img=profile1.profile;
        this.name=profile1.name;
        this.time=profile1.time;
        this.msg=profile1.msg;
        this.view=profile1.view;
    }
    renderchatcode(index){
        if(this.view===1)
        {
            this.viewmsg='&#128309';
        }
        else{
            this.viewmsg='';
        }
        profiles_htmlcode+=`
        <div class="profile js-profile" data-index=${index}>
            <div>
                <img class="userdp" src="${this.img}">
            </div>
            <div class="content">
                <p>${this.name}</p>
                <p>${this.msg} . &middot ${this.time}</p>
            </div>
            <div class="dotsection"><p>${this.viewmsg}</p></div>
        </div>
        `;
    }
}
let note_htmlcode='';
class noteprofiles{
    note_img='';
    note_name='';
    note_song='';
    note_singer_name='';
    note_desc='';
    constructor(note){
        this.note_img=note.note_img;
        this.note_name=note.note_name;
        this.note_song=note.note_song;
        this.note_singer=note.note_singer;
        this.note_desc=note.note_desc;
    }
    rendernotecode(index){
        note_htmlcode+=`
        
        

        <div data-index=${index} class="notecontainer js-notecontainer">
            <div><img class="dp" src="${this.note_img}"></div>
            <p class="name">${this.note_name}</p>
            <div class="notecontent">
                <p style="color: white">${this.note_song}</p>
                <p style=" color: rgb(75, 48, 48)">${this.note_singer_name}</p>
                <p>${this.note_desc}</p>
            </div>
        </div>
        `;
    }

}

chatdata.forEach( (profile1,index) =>{
    let profile_var=new chatprofiles(profile1);
    profile_var.renderchatcode(index);
});
document.querySelector('.downcontentbar').innerHTML=profiles_htmlcode;


// window.addEventListener('DOMContentLoaded',()=>{
//     document.querySelector('.js-left-arrow').addEventListener('click',()=>{
//         document.querySelector('.instanote').scrollBy({
//             left: 300,
//             behavior: 'smooth'
//         });
//     });
// })

let note_arrow_htmlcode='';
note_arrow_htmlcode+=`
<div class="arrows-box">
    <div class="left-arrow-box"><button class="left-arrow js-left-arrow"><</button></div>
    <div class="right-arrow-box"><button class="right-arrow js-right-arrow">></button></div>
</div>`;

notedata.forEach( (notebox,index)=>{
    let note_var=new noteprofiles(notebox);
    note_var.rendernotecode(index);
} );
document.querySelector('.instanote').innerHTML=note_arrow_htmlcode+note_htmlcode;

document.querySelectorAll('.js-notecontainer').forEach( (notebox)=>{
    notebox.addEventListener('click',()=>{
        console.log("hii");
        let index=notebox.dataset.index;
        console.log(index);
        shownoteplay(index);
    } );
});


let currentAudio = null;
let soundplaying=0;
function shownoteplay(index){
    let img=notedata[index].note_img;
    let name=notedata[index].note_name;
    let notesong=notedata[index].note_song;
    let notesinger=notedata[index].note_singer_name;
    let notedesc=notedata[index].note_desc;
    let song=notedata[index].song;
    // const notemusic = new Audio(song);
    // notemusic.play();
    if(index!=0){
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentAudio = new Audio(song);
        currentAudio.play();
        soundplaying=1;
    }
    else{
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
         }
    }
    
    document.querySelector('.right').innerHTML=`
    <div class="js-note-close-btn note-close-btn"><img src="insta website pics/close.png"></div>
    <div class="notecontainer js-notecontainer">
        <div><img class="dp" src="${img}"></div>
        <p class="name">${name}</p>
        <div class="notecontent js-note-content">
            
            <p style="color: white">${notesong}</p>
            <p style=" color: rgb(75, 48, 48)">${notesinger}</p>
            <p>${notedesc}</p>
        </div>
    </div>
    `;
    
    document.querySelector('.js-note-content').addEventListener('click',()=>{
    if(index!=0){
        if(soundplaying===1){
            currentAudio.pause();
            soundplaying=0;
        }
        else{
            currentAudio.play();
            soundplaying=1;
        }
    }
    // else{

    // }  
        
        
    });
    document.querySelector('.js-note-close-btn').addEventListener('click',()=>{
        document.querySelector('.right').innerHTML=`
            <div><img class="chatimg" src="insta website pics/chat.png"></div>
            <div>
                <p>Your messages</p>
                <p>Send a message to start a chat.</p>
            </div>
            <div><button>Send message</button></div>
        `;
        currentAudio.pause();
        currentAudio.currentTime = 0;
    });
}

// window.addEventListener('DOMContentLoaded',()=>{
//     const instanote = document.querySelector('.instanote');
//     const leftArrow = document.querySelector('.left-arrow');
//     const rightArrow = document.querySelector('.right-arrow');

//     rightArrow.addEventListener('click', () => {
//         instanote.scrollBy({
//             left: 100,
//             behavior: 'smooth'
//         });
//         console.log(rightArrow);
//     });
    
//     leftArrow.addEventListener('click', () => {
//         instanote.scrollBy({
//             left: -100,
//             behavior: 'smooth'
//         });
//     });
// });



setupNoteArrows();

function setupNoteArrows() {
  const instanote = document.querySelector('.instanote');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  if (leftArrow && rightArrow) {
    rightArrow.addEventListener('click', () => {
      instanote.scrollBy({
        left: 100,
        behavior: 'smooth',
      });
      console.log("hi");
    });

    leftArrow.addEventListener('click', () => {
      instanote.scrollBy({
        left: -100,
        behavior: 'smooth',
      });
    });
  } else {
    console.warn("Arrows not found in DOM");
  }
}

document.querySelectorAll('.js-profile').forEach( (profile) =>{
    profile.addEventListener('click',()=>{
        let index=profile.dataset.index;
        profile_index=index;
        localStorage.setItem('profile_index',index);
        let dp=chatdata[index].profile;
        let name=chatdata[index].name;
        console.log(index);
        loadchat(dp,name);
    });
});
document.querySelector('.js-home-btn').addEventListener('click',()=>{
    location.href='instahomepage.html';
});
document.querySelector('.js-chat-btn').addEventListener('click',()=>{
    location.href='instapage.html';
});
function loadchat(dp,name){
    let chatcode=`
    <div class="top-section">
        <div class="close-icon-box">
            <img class="close-icon js-close-btn" src="insta website pics/close.png">
        </div>
        <div class="profile-left-section ">
            <img class="icon js-icon" src="${dp}">
            <p class="js-name">${name}</p>
        </div>
        <div class="calls-section">
            <img class="calling-icon" src="insta website pics/phone.png">
            <img class="calling-icon" src="insta website pics/video.png">
            <img class="calling-icon" src="insta website pics/information.png">
        </div>
    </div>
    <div class="conversation">
        <div class="js-result result-section">
        </div>
        <div class="bottom-section">
            <input class="js-input" type="text" placeholder="Enter text">
            <button class="send-btn">Send</button>
        </div>
        
    </div>
    `;

    document.querySelector('.right').innerHTML=chatcode;
    document.querySelector('.js-input').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
            chat();
        }
    });
    document.querySelector('.send-btn').addEventListener(('click'),() => {
        chat();
    });
    document.querySelector('.js-close-btn').addEventListener('click',()=>{
        newmsgchat();
    });
    document.querySelector('.js-icon').addEventListener('click',()=>{
        location.href="profile.html";
    });
    document.querySelector('.js-name').addEventListener('click',()=>{
        location.href="profile.html";
    });
}

function chat(){
    let input_text=document.querySelector('.js-input').value;
    input_text=input_text.toLowerCase();
    console.log(input_text);
    let reply_msg='';
    reply_msg=conversation[input_text];
    console.log(reply_msg);
    if(reply_msg !== undefined &&reply_msg!=''){
        msgs.push({
            msg:input_text,
            reply:reply_msg
        });
        localStorage.setItem('msgs',JSON.stringify(msgs));
    }
    reply_msg='';
    // console.log(replies);
    console.log(msgs);
    document.querySelector('.js-input').value='';
    let htmlcode='';
    msgs.forEach((msg)=>{
        let msg_p=msg.msg;
        let reply_p=msg.reply;
        htmlcode+=`
        <p class="msg">${msg_p}</p>
        <p class="reply">${reply_p}</p>
        `;
    });
    document.querySelector('.js-result').innerHTML=htmlcode;
    document.querySelector('.js-result').scrollTop=document.querySelector('.js-result').scrollHeight;
}
function newmsgchat(){
    let htmlcode=`<div><img class="chatimg" src="insta website pics/chat.png"></div>
    <div>
        <p>Your messages</p>
        <p>Send a message to start a chat.</p>
    </div>
    <div><button>Send message</button></div>`;
    document.querySelector('.right').innerHTML=htmlcode;
}
window.addEventListener('DOMContentLoaded',()=>{

});
document.querySelector('.js-insta-btn').addEventListener('click',()=>{
    location.href="instahomepage.html";
});
document.querySelector('.js-profile-btn').addEventListener('click',()=>{
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