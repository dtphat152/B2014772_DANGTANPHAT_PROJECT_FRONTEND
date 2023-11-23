<template>
    <hr>
    <div class="text-center">
        <img :src="picture.image" width="1000">
        <p class="font-weight-bold text-info ">
            ______________________________________________________________________________________________________
        </p>
    </div>
    <div class="row">
        <h5  class="col-md-6" >Chi tiết Tác Phẩm Nghệ Thuật</h5>
        <button class="col-md-2 offset-4 border-info bg-white text-info rounded-lg " @click="addToCart">
            Thêm Vào Giỏ Hàng
        </button>    
    </div>
    <div class="row">
        <h5 class="col-md-2 offset-10 pl-5 font-weight-bold">Price: $ {{ picture.price }}</h5> 
    </div>
    <div class="text-center">
        <h2 class="text-info font-weight-bold">{{ picture.name }}</h2>
        <h6>Một tuyệt tác của: {{ picture.auth }}</h6>
        <p class="font-weight-bold text-info">_________________</p>
        <br><br><br><br>
    </div>
</template>

<script>
    import PictureService from '../services/picture.service';
    import CartService from '../services/cart.service';

    export default {

        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                picture: null,
                message: "",
            };
        },
        methods: {
            async getPicture(id) {
                try {
                    this.picture = await PictureService.get(id);
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            async addToCart() {
                try {
                    await CartService.add({ pictureId: this.id, quantity: 1, price: this.picture.price });
                    alert("Sản phẩm đã được thêm vào giỏ hàng!");
                    this.$router.push("/cart");
                } catch (error) {
                    console.log(error);
                    this.message = "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.";

                }
            },
        },
        created() {
            this.getPicture(this.id);
            this.message = "";
        },
    }
</script>