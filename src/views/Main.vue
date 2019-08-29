<template>
    <section>
        <el-row>
            <el-button round @click.native.prevent="orderPri5G" >Order Private 5G Slice</el-button>
            <el-button round @click.native.prevent="orderSha5G" >Order Shared 5G Slice</el-button>
        </el-row>
    </section>
</template>

<script>
    export default {
        methods: {
            orderPri5G() {

            },
            orderSha5G() {
                this.$router.push({ path: '/form' })
            }
        }

    }

</script>

<style scoped>

</style>