class State {
  constructor(){
    this.loggedIn=false; this.user=null;
    this.customTests=[]; this.owned=[];
    this.activeCat='all'; this.currentTpl='quiz';
    this.qCount=0; this.friendsList=[...FRIENDS_DATA];
    this.chatOpen=null;
  }
  login(name,handle,role,edu){
    this.loggedIn=true;
    this.user={name,handle:'@'+handle,role,edu,xp:0,level:1,bolts:50,lives:10,streak:3,tests:0,history:[]};
  }
  logout(){this.loggedIn=false;this.user=null;this.owned=[];this.customTests=[];}
  addXp(n){
    if(!this.user)return;
    this.user.xp+=n;
    const t=[0,200,500,1000,2000,3500,5000,999999];
    let lv=1; t.forEach((v,i)=>{if(this.user.xp>=v)lv=i+1;});
    this.user.level=lv;
  }
  spend(n){if(!this.user||this.user.bolts<n)return false;this.user.bolts-=n;return true;}
  loseLife(){if(this.user)this.user.lives=Math.max(0,this.user.lives-1);}
  addLives(n){if(this.user)this.user.lives=Math.min(10,this.user.lives+n);}
  addHistory(e){if(this.user)this.user.history.unshift(e);}
}
const state = new State();

// ════════════════════════════════════════
// ROUTER
// ════════════════════════════════════════
