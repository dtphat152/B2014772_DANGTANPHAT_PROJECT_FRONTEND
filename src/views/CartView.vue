<template>
    <hr>
    <div class="row">
        <h6  class="col-md-6 text-info" >Nơi chứa đựng những Tác Phẩm Nghệ Thuật</h6>
        <button class="col-md-2 offset-4 border-info bg-white text-info rounded-lg " @click="checkout" >
            Đặt hàng
        </button>    
    </div>
    <div class="row">
    </div>
    <div class="text-center">
        <h2 class="text-info font-weight-bold">Giỏ Hàng</h2>
        <p class="font-weight-bold text-info">____________________</p>
        <div v-for="item in picItems" >
            <h5>{{ item.name }} - ${{ item.price }}</h5>
            <img :src="item.image" width="200" height="120">
            <p class="font-weight-bold text-info">____________________</p>
        </div>
        <p class="font-weight-bold text-info">______________________________________________________________________________________________________</p>       
        <br><br><br><br>
    </div>
</template>

<script>
    import { getAuth } from "firebase/auth";
    import CartService from '../services/cart.service';
    import PictureService from '../services/picture.service';

    // const router = useRouter();

    export default {
        data() {
            return {
            cartItems: [],
            total: 0,
            picItems: [], // Create an empty array to store fetched pictures
            };
        },
        async created() {
            this.cartItems = await CartService.getAll({});
            for (const item of this.cartItems) {
                const pictureId = item.pictureId;
                const picItem = await PictureService.get(pictureId);
                this.picItems.push(picItem); // Add each fetched picture to the array
            }
           
        },
        methods: {
            async checkout() {
                const currentUser = getAuth().currentUser;
                if (currentUser && currentUser.uid !== '7AhYiLP0CjfQEbuCglwd0Bag6JK2') {
                    // Thực hiện thanh toán
                    try {
                        await CartService.deleteAll({});
                        alert("Đã tiến hành đặt hàng!");
                        this.$router.push("/");
                    } catch (error) {
                        console.log(error);
                        this.message = "Có lỗi xảy ra khi đặt hàng.";
                    }
                } else {
                        alert("Bạn phải đăng nhập trước khi thanh toán!");
                        this.$router.push("/");
                } 
            },
        },
    };
</script>