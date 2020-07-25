<template>
  <div id="app">
    <div v-if="$store.state.loading==true" style="z-index:9999;position:relative" class="my-auto">
      <loading
        :active.sync="$store.state.loading"
        background-color="#9b9999"
        color="#2c80ff"
        loader="dots"
        transition="fade"
        height="150"
        width="150"
        is-full-page
      ></loading>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods:{
     async getCurrentAccount() {
      // this.currentAccount = acc[0];
      let account = await window.web3.eth.getAccounts();
     // this.currentAccount = account[0];
      window.ethereum.on("accountsChanged", function() {
        window.location.reload();
        // Time to reload your interface with accounts[0]!
      });
      // let time=setInterval(async function(){
      //       let newAccount = await window.web3.eth.getAccounts();
      //       if(this.currentAccount!=newAccount[0]){
      //          window.location.reload();
      //       }
      // })
      // await time()
      // Time to reload your interface with accounts[0]!
    },
  },
  created() {
    this.getCurrentAccount();
  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
