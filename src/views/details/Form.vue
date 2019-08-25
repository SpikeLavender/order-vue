<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit"
           style="margin:20px;width:60%;min-width:600px;">
    <el-form-item label="Service Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Service Level">
      <el-radio-group v-model="form.serviceLevel">
        <el-radio label="Standard"></el-radio>
        <el-radio label="Golden"></el-radio>
        <el-radio label="Diamond"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Slice Type">
      <el-radio-group v-model="form.sliceType">
        <el-radio label="eMBB"></el-radio>
        <el-radio label="uRLLC"></el-radio>
        <el-radio label="mIoT"></el-radio>
      </el-radio-group>

    </el-form-item>
    <el-form-item label="Order Time">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="Choose Date" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="Choose Time" v-model="form.date2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Area List">
      <el-select v-model="form.area" placeholder="Choose Area List">
        <el-option label="Beijing" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="User List">
      <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
        <el-button size="small" type="primary">up load</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="Application List">
      <el-select v-model="form.app" placeholder="Choose Area List">
        <el-option label="Beijing" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
<!--    <el-form-item label="特殊资源">-->
<!--      <el-radio-group v-model="form.resource">-->
<!--        <el-radio label="线上品牌商赞助"></el-radio>-->
<!--        <el-radio label="线下场地免费"></el-radio>-->
<!--      </el-radio-group>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="活动形式">-->
<!--      <el-input type="textarea" v-model="form.desc"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item label="fee">
      <i aria-label=""></i>{{form.fee}}
    </el-form-item>
    <el-form-item>
      <el-button type="primary">Subscribe</el-button>
      <el-button @click.native.prevent>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        serviceLevel: '',
        serviceType: '',
        region: '',
        app: '',
        area: '',
        date1: '',
        date2: '',
        fee: '900'
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}

</script>
