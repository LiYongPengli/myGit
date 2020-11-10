<template>
  <div class="my-scroll" ref="vueScrollW">
    <div class="vue-scroll-w" ref="vueScroll">
      <div class="vue-scroll-c" :style="{ width: cWidth }">
        <slot></slot>
      </div>
    </div>
    <div class="vue-scrollbar" v-if="rate < 1">
      <div
        class="vue-scrollbar-thumb"
        :style="{ height: thumbH, top: thumbTop }"
        @mousedown="onmousedown"
        @mouseup="onmouseup"
      ></div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "my-scroll",
  data() {
    return {
      thumb: 0,
      top: 0,
      rate: 2,
      moveTop: null,
      isDrag: false,
      cw: 10,
      observer: null,
    };
  },
  computed: {
    thumbH() {
      return this.thumb + "px";
    },
    thumbTop() {
      return this.top + "px";
    },
    cWidth() {
      return this.cw + "%";
    },
  },
  updated() {
    if (!window.MutationObserver) {
      this.refresh();
    }
  },
  mounted() {
    var me = this;
    me.$refs.vueScroll.addEventListener("scroll", me.onscroll.bind(me));
    window.addEventListener("mouseup", me.onmouseup.bind(me));
    window.addEventListener("mousemove", me.onmousemove.bind(me));

    if (window.MutationObserver) {
      //MutationObserver 最低只兼容 ie11
      me.observer = new window.MutationObserver(me.mutationCallback.bind(me));
      me.observer.observe(me.$refs.vueScroll, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    me.refresh();
  },
  methods: {
    mutationCallback(mutationsList) {
      this.refresh();
    },
    onscroll() {
      this.top = this.$refs.vueScroll.scrollTop * this.rate; //计算滚动条所在的高度
      if(this.$refs.vueScroll.clientHeight+this.$refs.vueScroll.scrollTop==this.$refs.vueScroll.scrollHeight){
        this.$emit('loading','');
      }
      if (this.rate < 1) {
        this.eventTrigger(this.top);
      }
    },
    refresh() {
      var me = this;
      var vueScroll = me.$refs.vueScroll;
      var rate = vueScroll.clientHeight / vueScroll.scrollHeight; //滚动条高度的比例,也是滚动条top位置的比例
      me.rate = rate;
      if (rate < 1) {
        //需要出现滚动条,并计算滚动条的高度
        me.thumb = rate * vueScroll.clientHeight; //滚动条的 bar 的高度
        //计算出原生的滚动条的宽度
        var w = me.$refs.vueScrollW.clientWidth;
        //根据比例，转换为内容的百分比
        me.cw = (w / vueScroll.clientWidth) * 100;
      } else {
        //不需要出现滚动条
        me.thumb = 0;
        me.cw = 10;
      }
    },

    onmousedown() {
      this.isDrag = true;
      this.moveTop = null;
    },
    onmouseup() {
      this.isDrag = false;
    },
    onmousemove(e) {
      if (this.isDrag) {
        if (this.moveTop !== null) {
          var speed = e.screenY - this.moveTop;
          var top = this.top + speed;
          this.scrollThumb(top);
        }
        this.moveTop = e.screenY;
        e.preventDefault();
      }
    },
    scrollThumb(top) {
      if (top < 0) {
        top = 0;
      }
      if (top > this.$refs.vueScroll.clientHeight - this.thumb) {
        top = this.$refs.vueScroll.clientHeight - this.thumb;
      }

      this.$refs.vueScroll.scrollTop = top / this.rate;
      this.top = top;
    },
    eventTrigger(top) {
      if (top === 0) {
        this.$emit("reachTop"); //到达顶部
      }
      if (top === this.$refs.vueScroll.clientHeight - this.thumb) {
        this.$emit("reachBottom"); //到达底部与
      }
      this.$emit("vuescroll", this.$refs.vueScroll.scrollTop, this.top); //返回内容滚动的高度 和 滚动条所在的高度
    },
    scrollTo(scrollTop) {
      //对外的api，滚动的内容的哪里
      this.$refs.vueScroll.scrollTop = scrollTop;
      this.$nextTick(() => {
        this.onscroll();
      });
    },
  },
  destroyed() {
    var me = this;
    me.$refs.vueScroll &&
      me.$refs.vueScroll.removeEventListener("scroll", me.onscroll.bind(me));
    window.removeEventListener("mouseup", me.onmouseup.bind(me));
    window.removeEventListener("mousemove", me.onmousemove.bind(me));
    me.observer && me.observer.disconnect();
  },
};
</script>
  
<style lang="scss" scoped>
.my-scroll {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  .vue-scroll-w {
    width: 1000%;
    height: 100%;
    overflow: auto;
    .vue-scroll-c {
      position: relative;
      width: 10%;
    }
  }
  .vue-scrollbar {
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    width: 6px;
    height: 100%;
    //background: #eeeeee;
    opacity: 0.6;
    .vue-scrollbar-thumb {
      position: absolute;
      top: 0;
      right: 0;
      width: 6px;
      border-radius: 4px;
      background:rgb(61, 61, 73);
      cursor: pointer;
      &:hover {
        background: #bbb;
      }
      &:active {
        background: #aaa;
      }
    }
  }
}
</style>