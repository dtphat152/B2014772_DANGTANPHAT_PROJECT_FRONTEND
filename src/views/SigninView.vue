<template>
    <div class="container bg-image" style="background-image: url('https://i.pinimg.com/originals/9d/fc/0d/9dfc0dd5bebd1b8f9818b346ddfae146.jpg');border-radius: 10px;">
      <br><br><br><br><br><br><br><br><br><br><br>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header font-weight-bold text-info" >Sign in</div>
            <div class="card-body">
        
                <div class=" row">
                  <label for="email" class="col-md-4  text-md-right">Email</label>
                  <div class="col-md-6">
                    <input
                      id="email"
                      type="email"
                      class="form-control"
                      name="email"
                      value
                      required
                      autofocus
                      v-model="email"
                    />
                  </div>
                </div>
                <hr>
                <div class=" row">
                  <label for="password" class="col-md-4  text-md-right">Password</label>
                  <div class="col-md-6">
                    <input
                      id="password"
                      type="password"
                      class="form-control"
                      name="password"
                      required
                      v-model="password"
                    />
                  </div>
                </div>
                <p v-if="errMsg">{{ errMsg }}</p>
                <hr>
                <div class=" row mb-0">
                  <div class="col-md-8 offset-md-4">
                   <p><button @click="register" class="border-info bg-info text-white font-weight-bold rounded-lg">Submit</button></p>
                  </div>
                </div>
    
            </div>
          </div>
        </div>
      </div>
      <br><br>
    </div>
  </template>
  
  
  <script setup>
    import { ref } from 'vue'
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { useRouter} from 'vue-router' 
    const email = ref("");
    const password = ref("");
    const errMsg = ref()
    const router = useRouter();
    const register = () => {
        signInWithEmailAndPassword(getAuth(), email.value, password.value)
            .then ((data)=>{
                console.log("Successfully sign in!");
                router.push('/');
            })
            .catch((erro)=> {
                console.log(erro.code);
                switch (erro.code) {
                    case "auth/invalid-email":
                        errMsg.value = "Invalid name";
                        break;
                    case "auth/user-not-found":
                        errMsg.value = "No account with that email was found";
                        break;
                    case "auth/wrong-password":
                        errMsg.value = "Incorrect password";
                        break; 
                    default:
                        errMsg.value = "Email or password was incorrect";
                        break;  
                }
            })
    }
  
  </script>