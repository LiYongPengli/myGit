<template>
  <div class="upfile">
    <div class="cut">
      <vueCropper
        :can-move-box="options.canMoveBox"
        :fixed-box="options.fixedBox"
        :auto-crop-width="options.autoCropWidth"
        :auto-crop-height="options.autoCropHeight"
        :auto-crop="options.autoCrop"
        :img="options.img"
        :output-type="options.outputType"
        class="cropper"
        ref="cropper"
      />
    </div>
    <div class="controls">
      <div class="upfile_btn">
        <div style="margin-top:0;" class="other_btn">
          <span @click="$refs.cropper.refresh()">恢复默认</span>
        </div>
        <label for="upfile">
          <input
            @change="chooseFile"
            ref="chooseFile"
            style="display: none"
            type="file"
            accept="image/*"
            id="upfile"
          />
          <span>重新选择</span>
        </label>
      </div>

      <div class="other_btn" style="margin-top: 220px">
        <el-button style="width: 200px" type="primary" @click="sure"
          >保存</el-button
        >
      </div>
      <div class="other_btn" style="margin-bottom:0;">
        <el-button style="width: 200px" @click="ext">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import VueCropper from "../../../node_modules/vue-cropper/src/vue-cropper.vue";
@Component({
  components: {
    VueCropper,
  },
})
export default class UpFile extends Vue {
  @Prop({}) img!: any;
  @Prop({}) width!: number;
  @Prop({}) height!: number;
  public options = {
    img: "",
    autoCrop: true,
    fixedBox: true,
    canMoveBox: false,
    autoCropWidth: 400,
    autoCropHeight: 223,
    outputType: "png",
  };

  public created(): void {
    this.options.img = URL.createObjectURL(this.img);
    if (this.width) {
      this.options.autoCropWidth = this.width;
      this.options.autoCropHeight = this.height;
    }
  }

  public chooseFile(): void {
    let file = this.$refs.chooseFile as HTMLInputElement;
    if (!file.files?.length) {
      return;
    } else {
      this.options.img = URL.createObjectURL(file.files[0]);
    }
  }
  public sure(): void {
    (this.$refs.cropper as any).getCropBlob((data: Blob) => {
      this.$emit("ext", data);
    });
  }

  @Emit("ext")
  public ext(): any {
    return false;
  }
}
</script>

<style lang="scss" scoped>
.upfile {
  display: flex;
  .cut {
    width: 540px;
    height: 420px;
  }
  .controls {
    flex: 1;
    padding-left: 20px;
    text-align: center;
    .upfile_btn {
      span {
        display: block;
        width: 200px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        margin: auto;
        border-radius: 3px;
        color: white;
        border: 1px solid white;
      }
    }
    .other_btn {
      margin: 20px 0;
    }
  }
}
</style>