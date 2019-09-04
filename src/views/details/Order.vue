<template>
    <el-collapse v-model="activeName" accordion @change="getOrders" class="order-container">
        <el-collapse-item name="form">
            <template slot="title" >
                <span class="title-span">
                    New Order
                </span>

            </template>
            <div>
                <router-view></router-view>
            </div>
        </el-collapse-item>
        <el-collapse-item name="table">
            <template slot="title">
                <span class="title-span">
                    Historical Order
                </span>
            </template>
            <div>
                <router-view></router-view>
            </div>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
    export default {
        data() {
            return {
                activeName: 'form'
            }
        },
        methods: {
            getOrders(){
                if (this.activeName !== undefined && this.activeName !== '') {
                    this.$router.push({path: '/' + this.activeName})
                }
            }
        },
        mounted () {
            this.getOrders()
        }
    }
</script>

<style scoped lang="less">
    .order-container {
        border: none;
        .el-collapse-item {
            background: #FFF;
            .title-span {
                //font-weight:600;
                font: 500 16px SFUIDisplay;
                padding-left: 15px;
            }
            border-bottom: 10px solid #EBEEF5;
            div.el-collapse-item__header {
                height: 70px !important;
            }
        }
    }
</style>