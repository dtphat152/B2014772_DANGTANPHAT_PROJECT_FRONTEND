<template>
    <div v-if="picture" class="page">
        <div class="text-center text-warning font-weight-bold"><h4>Hiệu chỉnh Sản Phẩm Tranh</h4></div>
        <PictureForm
            :picture="picture"
            @submit:picture="updatePicture"
            @delete:picture="deletePicture"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import PictureForm from "@/components/PictureForm.vue";
    import PictureService from "@/services/picture.service";
    export default {
        components: {
            PictureForm,
        },
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
            async updatePicture(data) {
                try {
                    await PictureService.update(this.picture._id, data);
                    this.message = "Liên hệ được cập nhật thành công.";
                } catch (error) {
                    console.log(error);
                }
            },
            async deletePicture() {
                if (confirm("Bạn muốn xóa Liên hệ này?")) {
                    try {
                        await PictureService.delete(this.picture._id);
                        this.$router.push({ name: "homeview" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getPicture(this.id);
            this.message = "";
        },
    };
</script>
