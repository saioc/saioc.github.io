var loginRegister = Vue.extend({
   template: '<div id="loginbox" class="tanbox_dl">\
  <template>\
  <el-dialog :visible.sync="loginvisible.status" width="20%" :before-close="changeLogin" :modal-append-to-body=false>\
    <div class="Modal-content">\
        <el-form ref="form" :model="logininfo" @submit.native.prevent>\
          <div class="Modal-header">\
            <h3 class="App-titleControl App-titleControl--text" v-if="this.isforget">{{localize.congzhimima}}</h3>\
            <h3 class="App-titleControl App-titleControl--text" v-else>{{loginvisible.isregister ? localize.zhuce : localize.denglu}}</h3>\
          </div>\
          <div class="Modal-alert">\
            <div class="Alert Alert--error " v-if="errors.length">\
              <span class="Alert-body">{{ errors }}</span>\
            </div>\
          </div>\
          <div class="Modal-body" v-bind:class="{ nobottom: isforget }">\
            <div class="LogInButtons">\
            </div><div class="Form Form--centered" v-if="!this.isforget">\
                <div class="Form-group" v-if="loginvisible.isregister && loginvisible.invitecode">\
                    <input class="FormControl" v-model="logininfo.invitecode" type="text" v-bind:placeholder="localize.invitecode">\
                  </div>\
                <div class="Form-group">\
                  <input class="FormControl" v-model="logininfo.username" type="text" v-bind:placeholder="localize.username">\
                </div>\
                  <div class="Form-group" v-if="loginvisible.isregister">\
                    <input class="FormControl" v-model="logininfo.email" type="email" v-bind:placeholder="localize.email">\
                  </div>\
                  <div class="Form-group">\
                    <input class="FormControl" v-model="logininfo.password" type="password" v-on:keyup.enter="checkForm" v-bind:placeholder="localize.password">\
                  </div>\
                  <div class="Form-group">\
                    <el-button type="primary" class="btntj" @click="checkForm">{{loginvisible.isregister ? localize.zhuce : localize.denglu}}</el-button>\
                </div>\
              </div>\
              <div class="Form Form--centered" v-else>\
                <p class="helpText">{{passtips}}</p>\
                <div class="Form-group">\
                  <input class="FormControl" v-model="logininfo.email" v-on:keyup.enter="checkForm" type="email" v-bind:placeholder="localize.email">\
                </div>\
                <div class="Form-group">\
                    <el-button type="primary" class="btntj" @click="checkForm" v-bind:loading="issend" v-bind:disabled="disabled">{{btncs}}</el-button>\
                </div>\
              </div>\
            </div>\
            <div class="Modal-footer" v-if="!this.isforget">\
              <p class="LogInModal-forgotPassword" v-if="!loginvisible.isregister"><a @click="zcdl(\'wj\')">{{localize.wangjimima}}</a></p>\
              <p class="SignUpModal-logIn" v-if="loginvisible.isregister">{{localize.member_yy}} <a @click="zcdl(\'dl\')">{{localize.denglu}}</a></p>\
              <p class="LogInModal-signUp" v-else-if="loginfo.cant_register">{{localize.member}}  <a @click="zcdl(\'zc\')">{{localize.zhuce}}</a></p>\
            </div>\
          </el-form>\
        </div>\
  </el-dialog>\
</template>\
</div>',
   data() {
      return {
        logininfo:{username:'',password:'',email:'',url:'',invitecode:''},
        errors:'',
        linuserlo:window.localStorage.getItem('linuser'),
        isforget:false,
        passtips:um.sendtips,
        btncs:um.congzhimima,
        disabled:false,
        issend:false,
        localize:{
          congzhimima:um.congzhimima,
          username:um.username,
          email:um.email,
          password:um.password,
          denglu:um.denglu,
          zhuce:um.zhuce,
          invitecode:um.invitecode,
          wangjimima:um.wangjimima,
          member:um.member,
          member_yy:um.member_yy
        },
        isregister:false
      };
    },
    props:{
      loginvisible:{
        type:Object,
        required:true
      },
      loginfo:{
        type:Object,
        required:true
      },
    },
    created: function() {
    },
    methods:{
      checkForm: function (e) {

        this.errors ='';
        this.logininfo.url=window.location.href;
         const reg = /^[A-Za-z0-9_.@]+$/;
          
          if(this.isforget){

             var posturl='/api/vs/users/email';
            if (!this.logininfo.email) {
              this.errors=um.tips_email;
              return false;
            }
            if(!this.validEmail(this.logininfo.email)) {
             this.errors=um.tips_email_c;
             return false;
            }

            this.issend=true
            axios.get(posturl,
              {
                params:{
                  email:this.logininfo.email,
                  act:'findpass',
                }
              },
              {headers: {'X-WP-Nonce': this.loginfo.wpnonce}}
              ).then(res =>{

                  if (res.data.success == 1) {
                      this.errors='';
                      this.passtips=res.data.message
                      this.issend=false
                      this.btncs=um.sendemali
                      this.disabled=true
                  } else {
                     this.errors=res.data.message;
                     this.issend=false
                  }

              }).catch((error)=> {
               this.errors=error.response.data.message;
               this.issend=false
            });
            
          }else{

            if (!this.logininfo.username) {
              this.errors=um.tips_username;
              return false;
            }else if(this.logininfo.username.length<4) {
             this.errors=um.tips_username_le;
               return false;
            }
            if(this.logininfo.password.length > 18){
                this.errors=um.tips_username_le_not;
                 return false;
            }
            if (!reg.test(this.logininfo.username)) {
             this.errors=um.tips_username_le_zi;
               return false;
            }
            if(this.teststr(this.logininfo.username)){
              this.errors=um.tips_username_le_zf;
                return false;
            }

            if(this.loginvisible.isregister){

              if(this.loginfo.is_invitecode){
                if (!this.logininfo.invitecode) {
                  this.errors=um.invitecode_cd;
                   return false;
                }
                if (this.logininfo.invitecode < 5) {
                  this.errors=um.invitecode_er;
                   return false;
                }
              }

              if (!this.logininfo.email) {
                this.errors=um.tips_email;
                 return false;
              }
              if(!this.validEmail(this.logininfo.email)) {
               this.errors=um.tips_email_c;
                return false;
              }
            }

            if(!this.logininfo.password){
                this.errors=um.password_em;
                return false;
            }
            if(this.logininfo.password.length < 6){
                this.errors=um.password_le;
                 return false;
            }
            if(this.logininfo.password.length > 18){
                this.errors=um.password_le_c;
                 return false;
            }

            if(this.loginvisible.isregister){
              var posturl='/api/vs/users'
            }else{
              var posturl='/api/vs/session'
            }

          this.logininfo.linuser=this.linuserlo,
           axios.post(posturl, 
              Qs.stringify(this.logininfo),
              {headers: {'X-WP-Nonce': this.loginfo.wpnonce}}
              ).then(res =>{

                  if (res.data.success == 1) {
                      this.errors='';
                      this.$notify({
                              title: um.success,
                              message:res.data.message,
                              type: 'success',
                              duration:1000,
                              onClose:function() {
                                // window.location.href=res.data.reurl;
                                window.location.reload();
                              }
                      });
                    this.loginvisible.status = false;
                  } else {
                    console.log(res.data.message);
                     this.errors=res.data.message;
                  }

              }).catch((error)=> {
               this.errors=error.response.data.message;
            });
          }
        },
        validEmail: function (email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },
        teststr:function(str){
          var regs = new RegExp(/[`~!#$%^&*()+<>?:"{},\/;'[\]]/im);
           if (regs.test(str)) {
                  return true;
              }else{
                return false;
              }
        },
        zcdl:function(bshi){
            if(bshi=='dl'){
              this.errors=''
              this.loginvisible.isregister=false
            }else if(bshi=='zc'){
              this.errors=''
              this.loginvisible.isregister=true
            }else if(bshi=='wj'){
              this.errors=''
              this.isforget=true
            }
        },
        changeLogin:function(val){
            this.$emit('change-visible',false);
            this.isforget=false
        }

    }
});




var historywc=Vue.component('historywc', {
  template:'<el-dropdown @command="handleCommand">\
              <span class="el-dropdown-link"><div class="nab"><svg t="1546827923579" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1359" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><path d="M491.52 573.44a40.96 40.96 0 0 1-40.96-40.96V245.76a40.96 40.96 0 0 1 81.92 0v245.76h122.88a40.96 40.96 0 0 1 0 81.92h-163.84z m483.51232 102.11328a40.83712 40.83712 0 0 1-40.63232 37.7856 46.71488 46.71488 0 0 1-40.61184-43.64288S921.6 632.09472 921.6 512a409.6 409.6 0 1 0-409.6 409.6c119.84896 0 163.84-30.86336 163.84-30.86336 3.072-1.92512 54.784-12.88192 45.81376 40.46848A56.89344 56.89344 0 0 1 675.84 974.9504a493.1584 493.1584 0 1 1 299.19232-299.39712z m-98.304 66.21184a40.96 40.96 0 1 1-40.96 40.96 40.96 40.96 0 0 1 41.04192-40.96z" p-id="1360" fill="#dcdfe6"></path></svg></div></span>\
              <el-dropdown-menu slot="dropdown">\
                <el-dropdown-item  v-for="item in history" :key="item.key" :command="\'/v_play/\'+item.url+\'.html\'">\
                  <el-row class="hlist">\
                    <el-col :span=6><img class="historyimg" :src="item.cover"></el-col>\
                    <el-col :span=18>\
                      <div class="hitort">\
                        <span v-if="item.type==\'tv\'" :title="item.title+part+item.episode+ji">{{item.title}} 第{{item.episode}}集</span>\
                        <span v-else :title="item.title">{{item.title}}</span>\
                      </div>\
                    <p class="hitimg">{{watch}} {{item.time}}</p></el-col>\
                  </el-row>\
              </el-dropdown-item>\
              <li class="qcjl el-dropdown-menu__item"><div v-on:click="clears">{{clear}}</div></li>\
              </el-dropdown-menu>\
            </el-dropdown>',
  data: function () {
    return {
      history:[],
      watch:um.watch,
      part:um.part,
      ji:um.ji,
      clear:um.clear
    }
  },
  created: function() {
       var storage = window.localStorage.getItem('hiwatch');
       if(storage!== undefined && storage != '' && storage !=null){
       	this.history=JSON.parse( storage ).slice(0,6);
       }else{
       	this.history=[];
       }
       
  },
  methods:{
      handleCommand(command) {
          if(command != 'clear'){
             window.location.href = command;
          }
      },
      clears(){
        localStorage.removeItem("hiwatch");
        this.history=[];
      }
  }
})
