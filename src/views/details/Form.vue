<template>
    <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="200px"
             style="margin:auto;width:40%;min-width:400px;" class="demo-ruleForm">
        <el-form-item label="Service Name: " prop="serviceName" size="medium">
            <el-input v-model="addForm.serviceName" maxlength="30" show-word-limit
                      style="margin-left: 40px; width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="Service Level: " prop="serviceLevel" size="medium">
            <el-radio-group v-model="serviceLevelData" @change="handleLevel"
                            style="margin-left: 40px;">
                <el-radio v-for="item in serviceLevels"
                          :label="item.label">
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Slice Type: " prop="sliceType" size="medium">
            <el-radio-group v-model="sliceTypeData" @change="handleType"
                            style="margin-left: 40px; ">
                <el-radio v-for="item in sliceTypes"
                          :label="item.label">
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Order Time: " prop="orderTime" size="medium" >
            <el-date-picker
                    v-model="orderTime"
                    type="daterange"
                    range-separator=" - "
                    start-placeholder="Start Time"
                    end-placeholder="End Time"
                    style="margin-left: 40px; width: 100%;"
                    @change="orderTimeHandler">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="Area List: " prop="areaList">
            <el-cascader
                    size="medium"
                    :options="areaSelectData"
                    v-model="areaOptions"
                    style="margin-left: 40px; width: 100%;"
                    @change="handleChangeArea">
            </el-cascader>
        </el-form-item>
        <el-form-item label="User List: " prop="userList" size="medium">
            <!--todo: upload and parse-->
            <el-upload v-model="addForm.userList"
                       class="upload-demo"
                       action=""
                       :file-list="fileList">
                <el-button size="medium" type="primary" >up load</el-button>
<!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
        </el-form-item>
        <el-form-item label="Application List: " prop="appList" size="medium">
            <el-select v-model="appSelectData"
                       multiple
                       collapse-tags
                       placeholder="Choose Area List"
                       style="margin-left: 40px; width: 100%;"
                       @change="handleChangeApp">
                <el-option
                        v-for="item in appOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item >
        <el-form-item label="fee: " prop="fee" size="medium">
            {{addForm.fee}}
            <i aria-label=""><svg t="1567585708878" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7690" width="20" height="20"><path d="M787.669861 62.749836h-65.742653l-210.480106 375.237589L298.62537 62.749836h-65.917737L454.915321 454.536484H224.561601v49.146496h253.973731v149.487257H224.561601v49.146496h253.973731v257.529684h66.552546V702.316733h257.045387v-49.146496H545.087878v-149.487257h257.045387v-49.146496H567.906187z" fill="#d81e06" p-id="7691"></path></svg></i>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click.native="onSubmit('addForm')" :loading="addLoading" :disabled="isDisable">Subscribe</el-button>
            <el-button @click.native.prevent = "resetForm('addForm')">Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {CodeToText, regionDataPlus, TextToCode} from 'element-china-area-data'
    import {APP_OPTIONS, SERVICE_LEVEL, SLICE_TYPE} from '../../common/common'
    import moment from 'moment'

    export default {
        data () {
            return {
                isDisable: false,
                serviceLevels: SERVICE_LEVEL,
                serviceLevelData: 'Standard',
                sliceTypes: SLICE_TYPE,
                sliceTypeData: 'eMBB',
                orderTime: [],
                areaOptions: [],
                appOptions: APP_OPTIONS,
                appSelectData: [],
                areaSelectData: regionDataPlus,
                addForm: {
                    serviceName: '',
                    serviceLevel: 'STANDARD',
                    sliceType: 'EMBB',
                    orderTime: '',
                    userList: '',
                    appList: '',
                    fee: 0,
                    areaList: ''
                },
                //addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    serviceName: [
                        { required: true, message: 'please input service name', trigger: 'blur' }
                    ],
                    serviceLevel: [
                        {required: true, message: 'please choose service level', trigger: 'change'}
                    ],
                    sliceType: [
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
                fileList: [],
            }
        },
        methods: {
            //通过label获取value
            getValueByLabel: function (name, label) {
                if (label === undefined || label === null) {
                    return ''
                }
                for (let i in name) {
                    let e = name[i]
                    if (e && e.label === label) {
                        return e.value
                    }
                }
                return ''
            },
            getMoneyByLabel: function (name,label) {
                if (label === undefined || label === null) {
                    return ''
                }
                for (let i in name) {
                    let e = name[i]
                    if (e && e.label === label) {
                        return e.money
                    }
                }
                return ''
            },
            getFee: function () {
                if(this.orderTime.length === 0){
                    return 0;
                }
                let time = ((this.orderTime[1] - this.orderTime[0]) / (1000 * 60 * 60));
                let level_money = this.getMoneyByLabel(this.serviceLevels, this.serviceLevelData);
                let slice_money = this.getMoneyByLabel(this.sliceTypes,this.sliceTypeData);
                this.addForm.fee = time * level_money * slice_money;
            },
            orderTimeHandler() {

                this.addForm.orderTime = moment(this.orderTime[0]).valueOf()
                    + '|' + moment(this.orderTime[1]).valueOf()
                this.getFee();
            },
            handleLevel() {
                this.addForm.serviceLevel = this.getValueByLabel(this.serviceLevels, this.serviceLevelData)
                this.getFee();
            },
            handleType() {
                this.addForm.sliceType = this.getValueByLabel(this.sliceTypes, this.sliceTypeData)
                this.getFee();
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
            async createOrder(data) {
                let res = await this.$Http.createOrder(data)
                //todo: 异常处理
                if (res !== undefined) {
                    console.log(res)
                    this.$message({
                        message: 'create order success',
                        type: 'success'
                    })
                    console.log(this.addForm.fee)
                    this.addForm.fee = res.data.fee
                    await this.$router.push({ path: '/main' })
                }
            },
            onSubmit (formName) {
                //this.listLoading = true
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true
                            let data = Object.assign({}, this.addForm)
                            console.log(data)
                            this.createOrder(data)
                            this.addLoading = false
                        })
                    }
                })
                console.log('submit!')
            }
        }
    }

</script>

<style scoped lang="less">
    .demo-ruleForm {
        margin: auto;
        line-height: inherit;
        .el-form-item {
            .el-radio-group {
                float: left;
                line-height: inherit;
                .el-radio {
                    line-height: inherit;
                }
            }
        }
    }
</style>