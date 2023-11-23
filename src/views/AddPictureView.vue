<template>
    <div v-if="picture" class="page">
        <div class="font-weight-bold text-warning text-center"><h4>Thêm Liên Hệ</h4></div>
        <PictureForm
            :picture="picture"
            @submit:picture="createPicture"
        />
        <div class="text-center">
            <h5 class="font-weight-bold text-success">{{ message }}</h5>
        </div>
        <br>
        
    </div>
</template>

<script>
    import PictureForm from "@/components/PictureForm.vue";
    import PictureService from "@/services/picture.service";
    export default {
        components: {
            PictureForm,
        },
        data() {
            return {
                picture: null,
                message: "",
            };
        },
        methods: {
            
            async createPicture(data) {
                try {
                    await PictureService.create(data);
                    this.message = "Thông Báo: Tác Phẩm Tranh được thêm thành công.";
                    alert(message);
                    this.$router.push("/admin");
                } catch (error) {
                    console.log(error);
                }
            },
        },

        created() {
            this.picture = {};
            this.message = "";
        },
    };
</script>
