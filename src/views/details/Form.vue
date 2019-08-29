<template>
    <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="200px"
             style="margin:30px;width:60%;min-width:600px;" class="demo-ruleForm">
        <el-form-item label="Service Name" prop="serviceName" size="small">
            <el-input v-model="addForm.serviceName" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="Service Level" prop="serviceLevel" size="small">
            <el-radio-group v-model="serviceLevelData" @change="handleLevel">
                <el-radio v-for="item in serviceLevels"
                          :label="item.label">
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Slice Type" prop="sliceType" size="small">
            <el-radio-group v-model="sliceTypeData" @change="handleType">
                <el-radio v-for="item in sliceTypes"
                          :label="item.label">
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Order Time" prop="orderTime" size="small">
            <el-date-picker
                    v-model="orderTime"
                    type="daterange"
                    range-separator=" - "
                    start-placeholder="Start Time"
                    end-placeholder="End Time"
                    @change="orderTimeHandler">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="Area List" prop="areaList">
            <el-cascader
                    size="small"
                    :options="areaSelectData"
                    v-model="areaOptions"
                    @change="handleChangeArea">
            </el-cascader>
        </el-form-item>
        <el-form-item label="User List" prop="userList" size="small">
            <!--todo: upload and parse-->
            <el-upload v-model="addForm.userList"
                       class="upload-demo"
                       action=""
                       :file-list="fileList">
                <el-button size="small" type="primary" >up load</el-button>
<!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
        </el-form-item>
        <el-form-item label="Application List" prop="appList" size="small">
            <el-select v-model="appSelectData"
                       multiple
                       collapse-tags
                       style="margin-left: 20px;"
                       placeholder="Choose Area List"
                       @change="handleChangeApp">
                <el-option
                        v-for="item in appOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item >
        <el-form-item label="fee" prop="fee" size="small">
            <i aria-label=""></i>{{addForm.fee}}
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click.native="onSubmit('addForm')" :loading="addLoading" :disabled="isDisable">Subscribe</el-button>
            <el-button @click.native.prevent = "resetForm('addForm')">Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import axios from 'axios'
    import { regionDataPlus, CodeToText, TextToCode} from 'element-china-area-data'
    import common from '../../common/common'
    import moment from 'moment'
    export default {
        data () {
            return {
                isDisable: false,
                serviceLevels: common.serviceLevel,
                serviceLevelData: 'Standard',
                sliceTypes: common.sliceType,
                sliceTypeData: 'eMBB',
                orderTime: [],
                areaOptions: [],
                appOptions: common.appOptions,
                appSelectData: [],
                areaSelectData: regionDataPlus,
                addForm: {
                    serviceName: '',
                    serviceLevel: 'STANDARD',
                    sliceType: 'EMBB',
                    orderTime: '',
                    userList: '',
                    appList: '',
                    fee: '',
                    areaList: ''
                },
                //addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    serviceName: [
                        { required: true, message: 'please input service name', trigger: 'blur' }
                    ],
                    serviceLevelData: [
                        {required: true, message: 'please choose service level', trigger: 'change'}
                    ],
                    sliceTypeData: [
                        {required: true, message: 'please choose slice type', trigger: 'change'}
                    ],
                    orderTime: [
                        {required: true, message: 'please choose order time', trigger: 'change'}
                    ],
                    areaList: [
                        {required: true, message: 'please choose area region', trigger: 'change'}
                    ],
                    userList: [
                        {required: false, message: 'please upload user list', trigger: 'change'}
                    ],
                    appList: [
                        {required: true, message: 'please choose application', trigger: 'change'}
                    ]
                },
                fileList: []
            }
        },
        methods: {
            orderTimeHandler() {

                this.addForm.orderTime = moment(this.orderTime[0]).valueOf()
                    + '|' + moment(this.orderTime[1]).valueOf()
            },
            handleLevel() {
                this.addForm.serviceLevel = common.getValueByLabel(this.serviceLevels, this.serviceLevelData)
                console.log(this.addForm.serviceLevel)
            },
            handleType() {
                this.addForm.sliceType = common.getValueByLabel(this.sliceTypes, this.sliceTypeData)
                console.log(this.addForm.sliceType)
            },
            handleChangeArea () {
                let province = this.areaOptions[0];
                let city = this.areaOptions[1];
                let area = this.areaOptions[2];
                if (province !== undefined) {
                    this.addForm.areaList = CodeToText[province] + ' ';
                }
                if (city !== undefined) {
                    this.addForm.areaList += CodeToText[city] + ' ';
                }
                if (area !== undefined) {
                    // 拼接公司详细地址
                    this.addForm.areaList += CodeToText[area] + ' ';
                }

                // 由于上面将地址转为了字符串，所以在加载页面获取数据时，要重新将字符串转为数组。下面是对数据的处理
                if(this.addForm.areaList) {
                    let address = this.addForm.areaList.split(' ');
                    // 省份
                    this.areaOptions.push(TextToCode[address[0]].code);
                    // 城市
                    let cityCode = TextToCode[address[0]][address[1]].code;
                    this.areaOptions.push(cityCode);
                    // 地区
                    let areaCode = TextToCode[address[0]][address[1]][address[2]].code;
                    this.areaOptions.push(areaCode);
                }
            },
            handleChangeApp() {
                this.addForm.appList = this.appSelectData.join('|')
                //console.log(this.addForm.appList)
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            onSubmit (formName) {
                //this.listLoading = true
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true
                            let data = Object.assign({}, this.addForm)

                            console.log(data)
                            let ins = axios.create({
                                baseURL: 'http://127.0.0.1:8090/v1/openapi/',
                            })
                            ins.post('/5g-orders', data, {
                                headers: {
                                    'token': sessionStorage.getItem('token')
                                }
                            }).then(res => {
                                let statusCode = res.data.statusCode
                                console.log(res)
                                if (statusCode === "200") {
                                    this.$message({
                                        message: 'create order success',
                                        type: 'success'
                                    })
                                    //this.$refs['addForm'].resetFields()
                                    //this.addFormVisible = false
                                    //this.getUsers()
                                    console.log(this.addForm.fee)
                                    this.addForm.fee = res.data.data.fee
                                    //this.resetForm(formName)
                                    this.$router.push({ path: '/main' })
                                } else {
                                    this.$message({
                                        message: res.data.message,
                                        type: 'error'
                                    })
                                }
                                console.log(res)
                                this.addLoading = false
                            }).catch (error => {
                                console.log(error)
                                this.$message({
                                    message: error,
                                    type: 'error'
                                })
                                this.addLoading = false
                            })
                        })
                    }
                })
                console.log('submit!')
            }
        }
    }

</script>
