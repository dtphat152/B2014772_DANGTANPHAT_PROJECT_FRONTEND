<template>
    <nav class="navbar navbar-expand ml-5 mr-5">
        <a href="/" class="navbar-brand text-info ml-5">  <h2 class="font-weight-bold">TP Store</h2></a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'homeview' }" class="nav-link text-body pt-2 mt-1 font-weight-bold">
                    Tạo ra không gian cho nghệ thuật trong cuộc sống của bạn.
                </router-link>
            </li>
            <li class="nav-item">
                
            </li>
        </div>

        <div class="row" v-if="isLoggedIn">
            
            <div class="" v-if="userId==='7AhYiLP0CjfQEbuCglwd0Bag6JK2'">
                <button @click="admin" class="mr-4 border-info bg-info text-white font-weight-bold rounded-lg">Admin</button>
            </div>
            <div v-else>
                <button class="mr-4 border-info bg-info text-white font-weight-bold rounded-lg">Acount</button>
            </div>

            <button @click="handleSignOut"  class="border-info bg-info text-white font-weight-bold rounded-lg">Logout</button>
        </div>

        <div v-else>
            <button @click="signin"  class="mr-4 border-info bg-info text-white font-weight-bold rounded-lg ">Sign in</button>
            <button @click="register"  class="border-info bg-info text-white font-weight-bold rounded-lg">Register</button>
        </div>

        <div class="" style="width: 150px;"></div>
    </nav>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
    import {useRouter } from "vue-router";

    const router = useRouter(); 
    const isLoggedIn = ref(false);
    const userId = ref(null);
    let auth;
    onMounted (()=> {
        auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                isLoggedIn.value = true;
                userId.value = user.uid;
            } else {
                isLoggedIn.value = false;
            }
        });

    });

    const handleSignOut = () => {
        signOut(auth).then(()=>{
            router.push("/");
        })
    };

    const signin = () => {
        router.push("signin");
    };

    const register = () => {
        router.push("register");
    };

    const admin = () => {
        router.push("admin");
    };
</script>

