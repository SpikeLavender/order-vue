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
        <el-form-item label="Time: " prop="orderTime" size="medium" >
            <el-radio-group v-model="timeType"  style="margin-left: 40px;" @change="timeDisplay">
                <el-radio :label="0" >Time range</el-radio>
                <el-radio :label="1">Duration</el-radio>
            </el-radio-group>
            <el-date-picker
                    v-model="orderTime"
                    v-show="orderTimeShow"
                    type="datetimerange"
                    range-separator=" - "
                    start-placeholder="Start Time"
                    end-placeholder="End Time"
                    style="margin-left: 40px; width: 100%; float: left"
                    @change="orderTimeHandler">
            </el-date-picker>
            <el-tooltip v-show="durationTimeShow"
                        content="Please note that your service will go into effect after you finish your order."
                        placement="bottom"
                        effect="dark">
                <el-input placeholder="Input Duration Time"
                          v-model="durationTime"
                          style="margin-left: 40px; width: 100%; float: left"
                          clearable
                          @change="durationTimeHandler">
                    <template slot="append">Minutes</template>
                </el-input>
            </el-tooltip>
        </el-form-item>
        <el-form-item label="Area List: " prop="areaList">
            <el-cascader
                    size="medium"
                    :options="areaOptions"
                    :props="cascadeProps"
                    placeholder="Please select the area: Region / Province / City "
                    clearable
                    v-model="areaSelectData"
                    style="margin-left: 40px; width: 100%;"
                    @change="handleChangeArea">
            </el-cascader>
        </el-form-item>
        <el-form-item label="User List: " prop="userList" size="medium">
            <!--todo: upload and parse-->
            <el-upload v-model="addForm.userList"
                        class="upload-demo"
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false">
                <el-button slot="trigger" size="small" type="success">up load</el-button>
<!--                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                <div slot="tip" class="el-upload__tip">only support .json and .xml，and no more than 500 KB</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="Application List: " prop="appList" size="medium">
            <el-cascader
                    size="medium"
                    :options="appOptions"
                    :props="cascadeProps"
                    placeholder="Please select a list of supported apps"
                    clearable
                    v-model="appSelectData"
                    style="margin-left: 40px; width: 100%;"
                    @change="handleChangeApp">
            </el-cascader>
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
    //import {CodeToText, regionDataPlus, TextToCode} from 'element-china-area-data'
    import {APP_OPTIONS, SERVICE_LEVEL, SLICE_TYPE, AREA_OPTIONS} from '../../common/common'
    import moment from 'moment'

    export default {
        data () {
            return {
                cascadeProps: { multiple: true },
                isDisable: false,
                serviceLevels: SERVICE_LEVEL,
                serviceLevelData: 'Standard',
                sliceTypes: SLICE_TYPE,
                sliceTypeData: 'eMBB',
                timeType: 0,
                orderTimeShow: 0,
                durationTimeShow: 0,
                orderTime: [],
                durationTime: "",
                areaOptions: AREA_OPTIONS,
                appOptions: APP_OPTIONS,
                appSelectData: [],
                areaSelectData: [],
                addForm: {
                    serviceName: '',
                    serviceLevel: 'STANDARD',
                    sliceType: 'EMBB',
                    orderTime: '',
                    durationTime: 0,
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
                        //{required: true, message: 'please choose order time', trigger: 'change'}
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
            handlePreview(){},
            handleRemove(){},
            timeDisplay() {
                this.orderTimeShow = !this.timeType
                this.durationTimeShow = this.timeType
                if (this.timeType) {
                    this.orderTime = []
                    this.addForm.orderTime = ''
                } else {
                    this.durationTime = ''
                    this.addForm.durationTime = 0
                }
                this.getFee();
            },
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
                let time = 0;
                if (this.timeType) {
                    time = this.durationTime / 60;
                } else {
                    if(this.orderTime.length > 0) {
                        time = ((this.orderTime[1] - this.orderTime[0]) / (1000 * 60 * 60));
                    }
                }

                let level_money = this.getMoneyByLabel(this.serviceLevels, this.serviceLevelData);
                let slice_money = this.getMoneyByLabel(this.sliceTypes,this.sliceTypeData);
                this.addForm.fee = time * level_money * slice_money;
            },
            orderTimeHandler() {
                this.addForm.orderTime = moment(this.orderTime[0]).valueOf()
                    + '|' + moment(this.orderTime[1]).valueOf()
                this.getFee();
            },
            durationTimeHandler() {
                this.addForm.durationTime = this.durationTime
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
            handleChangeApp() {
                console.log(this.appSelectData)
                this.addForm.appList = this.appSelectData.join('|')
                //console.log(this.addForm.appList)
            },
            handleChangeArea () {
                console.log(this.areaSelectData)
                this.addForm.areaList = this.areaSelectData.join('|')
                // let province = this.areaOptions[0];
                // let city = this.areaOptions[1];
                // let area = this.areaOptions[2];
                // if (province !== undefined) {
                //     this.addForm.areaList = CodeToText[province] + ' ';
                // }
                // if (city !== undefined) {
                //     this.addForm.areaList += CodeToText[city] + ' ';
                // }
                // if (area !== undefined) {
                //     // 拼接公司详细地址
                //     this.addForm.areaList += CodeToText[area] + ' ';
                // }
                //
                // // 由于上面将地址转为了字符串，所以在加载页面获取数据时，要重新将字符串转为数组。下面是对数据的处理
                // if(this.addForm.areaList) {
                //     let address = this.addForm.areaList.split(' ');
                //     // 省份
                //     this.areaOptions.push(TextToCode[address[0]].code);
                //     // 城市
                //     let cityCode = TextToCode[address[0]][address[1]].code;
                //     this.areaOptions.push(cityCode);
                //     // 地区
                //     let areaCode = TextToCode[address[0]][address[1]][address[2]].code;
                //     this.areaOptions.push(areaCode);
                // }
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
        },
        mounted () {
            this.timeDisplay();
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
                    margin-right: 80px
                }
            }
            margin: 25px 0;
        }
    }
</style>