<template>
    <el-row class="container">
        <el-header :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                {{collapsed?'':sysName}}
            </el-col>
            <el-menu :default-active="$route.path" mode="horizontal" class="el-menu-demo"
                     unique-opened router v-show="!collapsed">
                <template v-for="(item,index) in routes">
                    <el-submenu :index="index+''" :key="item.name" v-if="!item.leaf"><!--遍历的其中一个菜单项,设置有单节点的。-->
                        <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                        <el-menu-item v-for="child in routeChildren(item)" :index="child.path" :key="child.path">
                            {{child.name}}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-if="item.leaf&&item.children.length>0" :key="item.name" :index="item.children[0].path"><i
                            :class="item.iconCls"></i>{{item.children[0].name}}
                    </el-menu-item>
                </template>
            </el-menu>
            <el-col :span="4" class="userinfo">
                <span class="user-icon">
                    <svg t="1567574734757" class="icon"
                         viewBox="0 0 1024 1024"
                         version="1.1"
                         xmlns="http://www.w3.org/2000/svg"
                         p-id="1458" width="32" height="32">
                    <path d="M768 728.615385v-7.876923-11.815385c-11.815385-110.276923-122.092308-196.923077-256-196.923077s-244.184615 86.646154-256 192.984615v23.63077c0 43.323077 35.446154 78.769231 78.769231 78.76923h354.461538c43.323077 0 78.769231-35.446154 78.769231-78.76923zM512 1024C228.430769 1024 0 795.569231 0 512S228.430769 0 512 0s512 228.430769 512 512-228.430769 512-512 512z m0-555.323077c94.523077 0 169.353846-74.830769 169.353846-169.353846S606.523077 126.030769 512 126.030769s-169.353846 78.769231-169.353846 173.292308 74.830769 169.353846 169.353846 169.353846z" p-id="1459" fill="#32C9B5" class="selected">
                    </path>
                </svg>
                </span>

                <span class="userinfo-inner">
<!--                    <img :src="this.sysUserAvatar"/> -->
                    {{sysUserName}}
                </span>
                <el-button type="text" @click.native="logout" style="color: #FFFFFF">Log out</el-button>
            </el-col>
        </el-header>
        <el-col :span="24" class="main">
            <section class="content-container">
                <div class="grid-content bg-purple-light">

                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data () {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                sysName: 'Business Distribution System',
                collapsed: false,
                sysUserName: '',
                sysUserAvatar: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        computed: {
            // 关于v-for v-if，data里未定义的变量遍历使用计算属性。否则使用v-for v-if配合使用
            routes: function () {
                //console.log("this.$router.options.routes" + this.$router.options.routes.filter)
                return this.$router.options.routes.filter(function (item) {
                    return !item.hidden
                })
            },
            // 利用闭包实现计算属性传参。
            routeChildren: function () {
                return function (route) {
                    return route.children.filter(function (child) {
                        return !child.hidden
                    })
                }
            }
        },
        methods: {
            // 退出登录
            logout: function () {
                let _this = this
                this.$confirm('确认退出吗?', '提示', {
                    // type: 'warning'
                }).then(() => {
                    localStorage.removeItem('Authorization');
                    localStorage.removeItem('username');
                    _this.$router.push('/login')
                }).catch(() => {

                })
            }
        },
        mounted () {
            this.sysUserName = this.$store.state.username
        }
    }

</script>

<style scoped lang="less">

    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 99%;
        background: #EBF0F4;

        .header {
            height: 60px;
            line-height: 60px;
            background: #409EFF;
            color: #fff;

            .logo {
                width: 25%;
                font-size: 21px;
                padding-left: 10px;
                text-align: left;
            }
            .el-menu-demo {
                float: left;
                text-align: center;
                padding-left: 10px;
                margin-left: 10px;
                background: #409EFF;
                .el-menu-item {
                    padding: 0 70px;
                    font-size: 14px;
                    font-family:SFUIDisplay;
                    font-weight: 400;
                    color: #FFFFFF;
                    opacity: 0.7;
                }
                :hover {
                    background: #42b983;
                    color: #FFFFFF;
                }
                .el-menu-item.is-active {
                    border-bottom: none;
                    background: #42b983 !important;
                    //border-bottom-color: #fc3f34 !important;
                    opacity: 1;
                    //border-bottom-color: transparent;
                }
            }

            .userinfo {
                text-align: right;
                padding-right: 35px;
                float: right;
                .user-icon {
                    margin: 14px 10px 0px 0px;
                    float: left;
                    overflow: inherit;
                    position: relative;
                    //padding-left: 20px;
                    border-radius: 30px;
                    line-height: 10px;
                    background: #FFFFFF;
                    .icon {
                        margin: 0;
                        padding: 0;
                    }
                }
                .userinfo-inner {
                    cursor: pointer;
                    color: #fff;
                    float: left;
                }
            }
        }

        .main {
            display: flex;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;

            .content-container {
                flex: 1;
                overflow-y: scroll;
                padding: 20px;

                .content-wrapper {
                    //background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>
