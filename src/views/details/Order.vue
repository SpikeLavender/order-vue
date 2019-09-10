<template>
    <el-collapse v-model="activeName" accordion @change="getOrders" class="order-container">
        <el-collapse-item name="form">
            <template slot="title" >
                <span class="title-span">
                    New Order
                </span>

            </template>
            <div>
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
            </div>
        </el-collapse-item>
        <el-collapse-item name="table">
            <template slot="title">
                <span class="title-span">
                    Historical Order
                </span>
            </template>
            <div>
                <template>
                    <section>
                        <!--工具条-->
                        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                            <el-form :inline="true" :model="filters" size="small">
                                <el-form-item>
                                    <el-input v-model="filters.name" placeholder="Service Name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" v-on:click="getOrders">Select</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>

                        <!--列表-->
                        <el-table :data="orders" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                                  style="width: 100%;">
                            <el-table-column type="selection" width="55" prop="id">
                            </el-table-column>
                            <el-table-column type="index" width="60">
                            </el-table-column>
                            <el-table-column prop="serviceName" label="Service Name" width="180" sortable>
                            </el-table-column>
                            <el-table-column prop="serviceType" label="Type" min-width="140" sortable>
                            </el-table-column>
                            <el-table-column prop="serviceLevel" label="Level" width="140"  sortable>
                            </el-table-column>
                            <el-table-column prop="sliceType" label="Slice Type" width="120" sortable>
                            </el-table-column>
                            <el-table-column prop="orderTime" label="Time" width="180" :formatter="formatTime" sortable>
                            </el-table-column>
                            <el-table-column prop="areaList" label="Area" min-width="180" sortable>
                            </el-table-column>
                            <el-table-column prop="userList" label="User" min-width="180" sortable>
                            </el-table-column>
                            <el-table-column prop="appList" label="Application" min-width="180" sortable>
                            </el-table-column>
                            <el-table-column prop="fee" label="Fee" min-width="120" sortable>
                            </el-table-column>
                            <el-table-column prop="orderStatus" label="State" min-width="130" sortable>
                            </el-table-column>
                            <el-table-column label="Operation" width="150">
                                <template scope="scope">
                                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!--工具条-->
                        <el-col :span="24" class="toolbar">
                            <!--            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" size="small">批量删除</el-button>-->
                            <el-pagination layout="prev, pager, next"
                                           @current-change="handleCurrentChange"
                                           :current-page="page"
                                           :page-size="size"
                                           :total="total"
                                           style="float:right;">
                            </el-pagination>
                        </el-col>
                    </section>
                </template>
            </div>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
    import {APP_OPTIONS, SERVICE_LEVEL, SLICE_TYPE, AREA_OPTIONS} from '../../common/common'
    import moment from 'moment'

    export default {
        data () {
            return {
                activeName: 'form',
                //create page data
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

                //order list page data
                filters: {
                    name: ''
                },
                orders: [],
                total: 0,
                page: 1,
                size: 10,
                listLoading: false,
                sels: [], // 列表选中列

                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            //create order page func
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
            },

            //order list page func
            formatTime: function (row, column) {
                let orderTime = row.orderTime.split('|')
                return moment(orderTime[0]/1).format('YYYY-MM-DD') + ' - ' + moment(orderTime[0]/1).format('YYYY-MM-DD')
            },
            handleCurrentChange (val) {
                this.page = val;
                this.getOrders()
            },
            // 获取用户列表
            async getOrders () {
                //this.listLoading = true
                let data = {};
                data.page = this.page;
                data.size = this.size;
                let res = await this.$Http.getOrders(data);
                //todo: 异常处理
                if (res !== undefined) {
                    this.orders = res.data.orderInfoList;
                    this.total = res.data.total;
                }
            },
            // 删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true
                    let para = { id: row.id }
                    console.log(row.id)

                    // todo: 删除和批量删除接口

                }).catch(() => {

                })
            },
            selsChange: function (sels) {
                this.sels = sels
            },
            // 批量删除
            batchRemove: function () {
                let ids = this.sels.map(item => item.id).toString()
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true
                    let para = { ids: ids }
                    console.log(para)
                }).catch(() => {

                })
            }
        },
        mounted () {
            this.timeDisplay();
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

    //create order css
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