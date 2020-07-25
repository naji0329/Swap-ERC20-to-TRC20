import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
async function getLogin () {

  var login;

console.log("Web3:",window.web3)
  try{
  if (
    
    window.web3!=undefined
  ) {
    //  let network = await web3.eth.net.getNetworkType();
    let address = await window.web3.eth.getAccounts ();

    if (address[0] != undefined && address[0] != '') {
      login=true;
      // localStorage.setItem('loggedIn', true);

      //context.commit('getLoginData', true);
    } else {
      login= false;
      // localStorage.setItem('loggedIn', false);
      // context.commit('getLoginData', false);
    }
  } else {
   login=false;
  }
  return login;
}
catch(err){
  login=false;

 console.log(err);
 return login;
}


}
 

const router = new VueRouter({
 
  routes:[
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../views/Login.vue')
    }
  ]
})

router.beforeEach(async(to, from, next) => {
  let login=await getLogin();
console.log("Login:",login)

  if (to.path != '/login') {

    if (login!=undefined && login==true) {
      next ();
    } else {
      next ('/login');
    }
  }
   else if (to.path == '/login') {
    if (login==false || login==undefined) {
      next ();
    } else {
      next ('/');
    }
  } 
  // to and from are both route objects. must call `next`.
})
export default router
