import {chatdata,notedata} from './instamsgdata.js';

let profiles_htmlcode='';
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
    renderchatcode(){
        if(this.view===1)
        {
            this.viewmsg='&#128309';
        }
        else{
            this.viewmsg='';
        }
        profiles_htmlcode+=`
        <div class="profile">
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
    rendernotecode(){
        note_htmlcode+=`
        <div class="notecontainer">
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
chatdata.forEach( (profile1) =>{
    let profile_var=new chatprofiles(profile1);
    profile_var.renderchatcode();
});
document.querySelector('.downcontentbar').innerHTML=profiles_htmlcode;


notedata.forEach( (notebox)=>{
    let note_var=new noteprofiles(notebox);
    note_var.rendernotecode();
} );
document.querySelector('.instanote').innerHTML=note_htmlcode;