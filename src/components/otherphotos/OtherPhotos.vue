<template>
  <div class="otherphotos">
    <div class="photo_list_wrap">
      <my-scroll>
        <div class="photo_list">
          <div class="default_photo" v-for="(v, i) in default_photos" :key="i">
            <img v-show="choose_photo == v" class="duigou" src="../../assets/img/duigouf.png" alt="">
            <el-image
              :style="{
                border:
                  choose_photo == v
                    ? '1px solid white'
                    : '1px solid transparent',
              }"
              @click="choose_photo = v"
              
              class="img"
              :src="~v.indexOf('http')?v:axios.defaults.baseURL+v"
            >
              <div slot="error" class="image-slot">
                <img
                  style="width: 233px"
                  src="../../assets/img/404.png"
                  alt=""
                />
              </div>
            </el-image>
            <img src="" alt="" />
          </div>
        </div>
      </my-scroll>
    </div>
    <label for="file" class="other_photo">
      <input
        @change="chooseFile"
        ref="fileipt"
        style="display: none"
        accept="image/*"
        type="file"
        id="file"
      />
      <span>上传其他封面...</span>
    </label>
    <div class="dialog-footer">
      <el-button @click="sure" style="width: 80px" size="small" type="primary"
        >确 定</el-button
      >
      <el-button @click="ext" style="width: 80px" size="small">取 消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class OtherPhotos extends Vue {
  //默认图片列表
  @Prop({}) default_photos!: string[];
  public choose_photo: string = "";
  @Emit("filechange")
  public chooseFile() {
    let file = this.$refs.fileipt as HTMLInputElement;
    let fileList = file.files as FileList;
    let file1 = fileList[0];
    file.value = "";
    if (file1) {
      return file1;
    }
    return false;
  }

  public sure() {
    if (!this.choose_photo) {
      this.$message.error("请选择要上传的封面图片");
      return;
    }
    this.$emit('default_chg',this.choose_photo);
  }

  @Emit("close")
  public ext():boolean{
      return false;
  }
}
</script>

<style lang="scss" scoped>
.otherphotos {
  .photo_list_wrap {
    height: 300px;
    .photo_list {
      display: flex;
      flex-wrap: wrap;

      .default_photo {
        width: 253px;
        height: 130px;
        text-align: center;
        margin-bottom: 20px;
        position: relative;
        .duigou{
          position: absolute;
          z-index: 10;
          bottom: -1px;
          right: 9px;
        }
        .img {
          width: 233px;
          height: 100%;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }
  /* 上传其他封面 */
  .other_photo {
    span {
      font-size: 16px;
      color: #b2d5ff;
      cursor: pointer;
      margin-left: 10px;
    }
  }
  .dialog-footer {
    margin-top: 20px;
    text-align: center;
  }
}
</style>