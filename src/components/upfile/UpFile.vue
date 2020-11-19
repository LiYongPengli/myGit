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
      <el-button @click="$refs.cropper.refresh()">恢复默认</el-button>
      <el-button @click="sure">确定</el-button>
      <el-button @click="ext">取消</el-button>
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
  public options = {
    img: "",
    autoCrop: true,
    fixedBox: true,
    canMoveBox: false,
    autoCropWidth: 400,
    autoCropHeight: 223,
    outputType:'png'
  };

  public created(): void {
    this.options.img = URL.createObjectURL(this.img);
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
        this.$emit('ext',data);
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
    width: 400px;
    height: 400px;
  }
  .controls {
    flex: 1;
    padding-left: 20px;
    text-align: center;
    .upfile_btn {
      span {
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>