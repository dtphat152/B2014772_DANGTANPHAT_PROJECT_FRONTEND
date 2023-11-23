<template>
    <Form style="background-color: darkgray; border: 20px solid darkgray; border-radius: 10px;"
        @submit="submitPicture"
        :validation-schema="pictureFormSchema"
        >
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="pictureLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">ImageURL</label>
            <Field
                name="image"
                type="text"
                class="form-control"
                v-model="pictureLocal.image"
            />
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="auth">Họa Sĩ</label>
            <Field
                name="auth"
                type="text"
                class="form-control"
                v-model="pictureLocal.auth"
            />
            <ErrorMessage name="auth" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá Tiền</label>
            <Field
                name="price"
                type="text"
                class="form-control"
                v-model="pictureLocal.price"
            />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="pictureLocal.favorite"
            />
            <label for="favorite" class="form-check-label">
                <strong>Bức Tranh yêu thích</strong>
            </label>
        </div>
        <div class="form-group">
            <div class="text-center">
                <button class="btn btn-info">Lưu</button>
            </div>
            <hr>
            <div class="text-center">
                <button
                    v-if="pictureLocal._id"
                    type="button"
                    class="ml-2 btn btn-danger"
                    @click="deletePicture"
                >
                    Xóa
                </button>
            </div>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    export default {
        components: {
                Form,
                Field,
                ErrorMessage,
            },
            emits: ["submit:picture", "delete:picture"],
            props: {
            picture: { type: Object, required: true }
        },
        data() {
            const pictureFormSchema = yup.object().shape({
                name: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                image: yup
                    .string()
                    .required("Tranh phải có giá trị."),
                auth: yup.string().required("Tên phải có giá trị."),
                price: yup
                    .string()
                    .required("Giá tiền phải có giá trị."),
            });
            return {
                pictureLocal: this.picture,
                pictureFormSchema,
            };
        },
        methods: {
            submitPicture() {
                this.$emit("submit:picture", this.pictureLocal);
            },
            deletePicture() {
                this.$emit("delete:picture", this.pictureLocal.id);
            },
        },
    };
</script>

<style scoped>
    @import "@/assets/form.css";
</style>