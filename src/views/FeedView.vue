<template>
    <div>
        <p>Feed</p>
      <p>User ID: {{ userId }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { useRouter } from 'vue-router' 
  
  const userId = ref(null);
  const router = useRouter();
  const auth = getAuth();
  
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userId.value = user.uid;
        console.log("User ID: ", userId.value);
        // router.push('/');
      } else {
        console.log("No user is signed in.");
        userId.value = null;
      }
    });
  });
  </script>
  