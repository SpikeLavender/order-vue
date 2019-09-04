<template>
    <section>
        <el-row class="button-container">
            <el-button @click.native.prevent="orderPri5G" class="button">Order Private 5G Slice</el-button>
            <el-button @click.native.prevent="orderSha5G" class="button">Order Shared 5G Slice</el-button>
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

<style scoped lang="less">
    .button-container {
        .button {
            width:246px;
            height:120px;
            background: #FFFFFF;
            box-shadow:0px 4px 12px 0px rgba(0,0,0,0.1);
            border-radius:4px;
            color:rgba(0,0,0,1);
            font: bold 16px PingFang-SC;
            line-height:22px;
            margin: 200px 100px;
        }
        :hover {
            background: #2492FC;
            color: #FFFFFF;
        }
    }
</style>