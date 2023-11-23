<template>
    <div class="row">
        <div class="col-md-4 pt-5 pl-3 pr-3"
            v-for="(picture, index) in pictures"
                :key="picture._id"
        >
            <router-link
                :to="{
                    name: 'detailsview',
                    params: { id: picture._id },
                }"
            >
                <div class="card">
                    <img :src="picture.image" class="card-img-top" alt="..." height="210" width="320">
                    <div class="card-body">
                        <h5 class="mt-0 text-center limit-2-rows">{{ picture.name }}</h5> 
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pictures: { type: Array, default: [] },
        },
        
    };
</script>

<style>
    .card{
        border-radius: 20px;
    }

    .card-img-top{
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;

        &:hover {
            transition: all 0.2s ease-out;
            box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
            top: -4px;
            border: 1px solid #cccccc;
            background-color: white;
        }

        &:before {
            content: "";
            position: absolute;
            z-index: -1;
            top: -16px;
            right: -16px;
            background: #00838d;
            height: 32px;
            width: 32px;
            border-radius: 32px;
            transform: scale(2);
            transform-origin: 50% 50%;
            transition: transform 0.15s ease-out;
        }

        &:hover:before {
            transform: scale(2.15);
        }
    }
</style>

