<template>
  <div class="home">
    <center>
      <img style="width:10%" src="../assets/mima.png">
   <h1>MIMA Token Swap from ERC20 to TRC20</h1>
   <p style="margin-top:3%">Logged in ETH address: <span style="font-weight:bold;">{{currentAddress}}</span></p>

   <div  style="margin-top:2%" v-if="isStored==false">
     <h2 style="margin-bottom:1%">Step 1 :</h2>
     <p>Add the TRX address on which you would like to receive TRC20 tokens.</p>
     <label>Enter your TRX address: </label><br>
     <input v-model="trxAddress" style="height:30px;width:400px;border-radius:8px;margin-top:10px;" type="text">
     <br>
     <button @click="addAddress" class="btn">Add</button>
     </div>

    <div v-else-if="isStored==true">
      
       <p style="margin-top:2%">Your stored TRX address: <span style="font-weight:bold;">{{storedAddress}}</span></p>
        <h2 style="margin-top:2%">Step 2 :</h2>
        <p>Transfer your ERC20 MIMA tokens to the given Smart contract address and wait for at least 30 Mins after the transaction is confirmed.</p>
        <p> Contract address: <input id="address" :value="contractAddress" style="font-size:17px;font-weight:bold;width:410px;border-radius:8px;"><button class="copy" @click="copy">Copy</button></p>
    </div>

   </center>
  </div>
</template>

<style scoped>
.formField {
  margin: 20px;
}
.formBottom {
  width: 20%;
  display: flex;
  justify-content: space-around;
}
</style>

<script>
import axios from "axios";
import {Swap} from "../../embarkArtifacts/contracts"
export default {
  name: "home",
  data() {
    return {
      trxAddress:"",
      contractAddress:"",
      storedAddress:"",
      isStored:undefined,
      currentAddress:"",
      name: "",
      bdate: "",
      email: "",
      address: "",
      country: "",
      pin: "",
      mobile: "",
      idType: "",
      idNumber: "",
      kycId: "1",
      encryptedData: null
    };
  },
  methods: {

    async addAddress(){
     
      if(this.trxAddress==""){
        alert("Please enter your TRX address");
        return;
      }
        try {
           this.$store.state.loading=true;
          await Swap.methods.storeAddress(this.trxAddress).send();
          alert('Transaction completed')
          this.isStored=await Swap.methods.isStored(this.currentAddress).call();
    this.storedAddress=await Swap.methods.storedAddress(this.currentAddress).call();
        } catch (error) {
          alert('Transaction Failed')
        }
        finally{
           this.$store.state.loading=false;
        }
    },
    copy() {
  /* Get the text field */
  var copyText = document.getElementById("address");
  console.log(copyText)

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}
   
  },
  async mounted() {
    let acc = await window.web3.eth.getAccounts();
    this.currentAddress=acc[0]
    console.log("account:", acc[0]);
    this.isStored=await Swap.methods.isStored(this.currentAddress).call();
    this.storedAddress=await Swap.methods.storedAddress(this.currentAddress).call();
    console.log(this.storedAddress)
   this.contractAddress=Swap.address
  }
};
</script>
<style>
button:hover{
  background-color :black;
  color:white
}
.btn{
  padding:10px;color:white;margin-top:1%;border-radius:8px;width:200px;background-color:blue;font-size: 20px;
}
.copy{
  width:100px;margin-left:10px;height:40px;background-color:blue;color:white;border-radius:8px;
}
</style>
