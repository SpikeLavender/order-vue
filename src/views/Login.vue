<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">Login</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">Login
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    //import { requestLogin } from '../api/api'
    import axios from 'axios'
    export default {
        data () {
            return {
                logining: false,
                ruleForm2: {
                    username: 'hetengjiao',
                    password: 'hetengjiao'
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                checked: true
            }
        },
        methods: {
            // handleReset2 () {
            //     this.$refs.ruleForm2.resetFields()
            // },
            handleSubmit2 () {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.logining = true
                        let data = {
                            username: this.ruleForm2.username,
                            password: this.ruleForm2.password
                        }
                        let ins = axios.create({
                            baseURL: 'http://127.0.0.1:8090/v1/openapi/',
                        })
                        ins.post('/login',  data).then(res => {
                            this.logining = false
                            console.log(res.data.statusCode)
                            if (res.data.statusCode !== "200") {
                                this.$message({
                                    message: res.data.message,
                                    type: 'error'
                                })
                            } else {
                                //this.$store.commit('set_token', res.data.data.token);
                                sessionStorage.setItem('token', res.data.data.token)
                                console.log(res.data.data.token)
                                this.$router.push({ path: '/main' })
                            }
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }

</script>

<style lang="less" scoped>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }

        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>
