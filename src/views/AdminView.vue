<template>
    <div class="page row">
        <div class="col-md-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-12">
            <div class="row">
                <h5 class="col-md-4 text-warning">
                   Quản lí những tác phẩm nghệ thuật
                </h5>
                <div class="col-md-3 offset-5" style="text-align: right;">
                    <button class="bg-white border-0" @click="goToAddPicture">
                    <router-link
                        :to="{
                            name: 'add-picture',
                        }"
                    >
                        <i></i> <p class="font-weight-bold text-success">+ Thêm mới</p>
                    </router-link>
                </button>
                </div>
            </div>
            <br>
            
            <PictureListAdmin
                v-if="filteredpicturesCount > 0"
                :pictures="filteredpictures"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có bức tranh nào.</p>
            
        </div>

    </div>
</template>

<script>
    // import PictureCard from "@/components/PictureCard.vue";
    import InputSearch from "@/components/InputSearch.vue";
    import PictureListAdmin from "@/components/PictureListAdmin.vue";
    import PictureService from "@/services/picture.service";
    export default {
        components: {
            // PictureCard,
            InputSearch,
            PictureListAdmin,
        },
        // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới

        data() {
            return {
                pictures: [],
                activeIndex: -1,
                searchText: "",
            };
        },
        watch: {
            // Giám sát các thay đổi của biến searchText.
            // Bỏ chọn phần tử đang được chọn trong danh sách.
            searchText() {
                this.activeIndex = -1;
            },
        },
        computed: {
            // Chuyển các đối tượng picture thành chuỗi để tiện cho tìm kiếm.
            pictureStrings() {
                return this.pictures.map((picture) => {
                    const { name, auth } = picture;
                    return [name, auth].join("");
                });
            },
            // Trả về các picture có chứa thông tin cần tìm kiếm.
            filteredpictures() {
                if (!this.searchText) return this.pictures;
                    return this.pictures.filter((_picture, index) =>
                    this.pictureStrings[index].includes(this.searchText)
                );
            },
            activePicture() {
                if (this.activeIndex < 0) return null;
                return this.filteredpictures[this.activeIndex];
            },
            filteredpicturesCount() {
                return this.filteredpictures.length;
            },
        },
        methods: {
            async retrievepictures() {
                try {
                        this.pictures = await PictureService.getAll();
                    } catch (error) {
                        console.log(error);
                    }
            },
            refreshList() {
                this.retrievepictures();
                this.activeIndex = -1;
            },
            goToAddPicture() {
                this.$router.push({ name: "add-picture" });
            },
        },
        mounted() {
            this.refreshList();
        },

    };
</script>

<style scoped>
    .page {
        text-align: left;
        max-width: 1100px;
    }

    .grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
    }

</style>
