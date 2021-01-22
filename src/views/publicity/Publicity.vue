<template>
  <div class="publicity">
    <header-two />
    <div :style="{ width: (topic_show ? 1000 : 1200) + 'px' }" class="container">
      <div class="top">
        <h1>睿读使用指南</h1>
        <!-- <input type="text" placeholder="请输入收藏夹名称" /> -->
      </div>
      <div class="content">
        <div class="content_left">
          <nav>
            <ul>
              <li @click="cur = 0" :class="{ active: cur == 0 }">
                <a class="rdgk">个人中心</a>
              </li>
              <li @click="cur = 1" :class="{ active: cur == 1 }">
                <a class="rdgk">我的关注</a>
              </li>
              <li @click="cur = 2" :class="{ active: cur == 2 }">
                <a class="rdgk">热门推荐 </a>
              </li>
              <li @click="cur = 3" :class="{ active: cur == 3 }">
                <a href="#">新闻详情</a>
              </li>
              <li @click="cur = 4" :class="{ active: cur == 4 }">
                <a href="#">聊天工具</a>
              </li>
              <li @click="cur = 5" :class="{ active: cur == 5 }">
                <a href="#">智能检索</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="content_right">
          <div class="content_right_text">
            <my-scroll>
              <div class="rdgk" v-show="cur == 0">
                <h2>1 个人中心</h2>
                <p>点击用户信息，在下拉列表中选择“个人中心”，可以进入个人中心。</p>
                <div class="tpjz">
                  <img src="../../assets/img/tp1.png" alt="" />
                </div>
                <h3>1.1 我的关注</h3>
                <p>用户可查看和修改关注的国家、媒体、人物及推荐频道。</p>
                <div class="tpjz">
                  <img src="../../assets/img/tp1.1.png" alt="" />
                </div>
                <p>
                  查看新闻详情时，也可关注此新闻发布的国家、媒体或人物，新关注的媒体就会自动增加至我的关注内。
                </p>
                <p>关注前：</p>
                <div class="tpjz">
                  <img src="../../assets/img/tp1.1.1.png" alt="" />
                </div>
                <p>关注后：</p>
                <div class="tpjz">
                  <img src="../../assets/img/tp1.1.2.png" alt="" />
                </div>
                <p>再次点击关注按钮，取消关注。</p>
                <h3>1.2 我的收藏</h3>
                <p>用户可查看日常收藏的新闻，如无分组则显示在默认标签组。</p>
                <div class="tpjz">
                  <img src="../../assets/img/wdsc1.png" alt="" />
                </div>
                <p>
                  用户可创建新的标签，对新闻有针对性的管理。新建书签时，请输入书签名称及选择或上传书签封面。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/wdsc2.png" alt="" />
                </div>
                <h4>1.2.1 新闻页收藏</h4>
                <p>
                  查看新闻详情时，收藏此篇新闻，可收藏至默认收藏夹，也可创建新的收藏夹，实现新闻信息分类管理的概念，并且收藏夹也可批量站内分享。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/xwysc1.png" alt="" />
                </div>
                <div class="tpjz">
                  <img src="../../assets/img/xwysc2.png" alt="" />
                </div>
                <p>
                  点击创建新书签，输入书签名称，上传书签封面即可完成创建，点击创建并收藏，新闻就可以收藏至新建的书签中。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/xwysc3.png" alt="" />
                </div>
                <div class="tpjz">
                  <img src="../../assets/img/xwysc4.png" alt="" />
                </div>
                <p>前往个人中心-->我的收藏即可看到刚刚创建的收藏夹。</p>
                <div class="tpjz">
                  <img src="../../assets/img/xwysc5.png" alt="" />
                </div>
                <h4>1.2.2 分享我的收藏</h4>
                <p>
                  创建成功后，可通过睿读聊天进行分享，有兴趣的小伙伴就可以一起讨论了。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/fxwdsc.png" alt="" />
                </div>
                <p>可以分享给好友或群组。</p>
                <div class="tpjz">
                  <img src="../../assets/img/fxwdsc1.png" alt="" />
                </div>
                <p>分享的同时，还可以编辑其他消息对此分享进行说明。</p>
                <div class="tpjz">
                  <img src="../../assets/img/fxwdsc2.png" alt="" />
                </div>
                <p>可在睿读聊天中查看刚刚分享的收藏夹。</p>
                <div class="tpjz">
                  <img src="../../assets/img/fxwdsc3.png" alt="" />
                </div>
                <h3>1.3 我的消息</h3>
                <p>用户可查看、删除系统发送的消息。</p>
                <div class="tpjz">
                  <img src="../../assets/img/wdxx.png" alt="" />
                </div>
                <h3>1.4 账号管理</h3>
                <p>
                  用户可绑定微信、修改昵称、修改头像。如需更换手机号码，请联系运维工作人员进行更换。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/zhgl.png" alt="" />
                </div>
                <p>点击头像框，可进行头像修改。</p>
                <div class="tpjz">
                  <img src="../../assets/img/zhgl1.png" alt="" />
                </div>
                <p>上传您喜欢的头像图片。</p>
                <div class="tpjz">
                  <img src="../../assets/img/zhgl2.png" alt="" />
                </div>
                <p>根据喜好进行调整和截取，点击保存。</p>
                <div class="tpjz">
                  <img src="../../assets/img/zhgl3.png" alt="" />
                </div>
                <p>点击确认，修改头像。</p>
                <div class="tpjz">
                  <img src="../../assets/img/zhgl4.png" alt="" />
                </div>
                <h4>1.5 1.5密码管理</h4>
                <p>用户可重置密码。</p>
                <div class="tpjz">
                  <img src="../../assets/img/mmgl.png" alt="" />
                </div>
                <p>如忘记密码，选择[忘记原密码]功能，通过绑定的手机号码进行密码重置。</p>
                <div class="tpjz">
                  <img src="../../assets/img/mmgl1.png" alt="" />
                </div>
              </div>
              <div class="yhdl" v-show="cur == 1">
                <h2>2 我的关注</h2>
                <p>
                  用户关注的国家、媒体及人物有关的新闻可在此处查看。如需修改我的关注，请前往个人中心-->我的关注进行修改。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/wdgz.png" alt="" />
                </div>
              </div>
              <div class="yhzc" v-show="cur == 2">
                <h2>热门推荐</h2>
                <p>推送用户可能感兴趣的、最新最热的新闻内容。</p>
                <div class="tpjz">
                  <img src="../../assets/img/rmtj.png" alt="" />
                </div>
                <h3>3.1 热点推荐</h3>
                <p>本站抓取最新最热的新闻资讯，会重点在此处展示，点击查看新闻内容。</p>
                <div class="tpjz">
                  <img src="../../assets/img/rdtj.png" alt="" />
                </div>
                <h3>3.2 关注窗口</h3>
                <p>此处显示您关注的国家、人物和媒体列表，点击可查看详细的新闻列表。</p>
                <div class="tpjz">
                  <img src="../../assets/img/gzck.png" alt="" />
                </div>
                <p>例如点击埃及国旗，进入我的关注-->国家-->埃及新闻列表。</p>
                <div class="tpjz">
                  <img src="../../assets/img/gzck1.png" alt="" />
                </div>
                <h3>3.3 推荐频道</h3>
                <p>睿读会对某项事件进行收集制作，形成频道。</p>
                <div class="tpjz">
                  <img src="../../assets/img/tjpd.png" alt="" />
                </div>
              </div>
              <div class="yhgz" v-show="cur == 3">
                <h2>4 新闻详情</h2>
                <h3>4.1 点赞</h3>
                <p>
                  如对谋篇新闻感兴趣，可以点击点赞按钮，系统会根据您的点赞来推送您可能感兴趣的新闻，再次点击取消点赞。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/dz.png" alt="" />
                </div>
                <h3>4.2 不感兴趣</h3>
                <p>对此类新闻不感兴趣，并希望未来减少推荐。</p>
                <div class="tpjz">
                  <img src="../../assets/img/bgxq.png" alt="" />
                </div>
              </div>
              <div class="tjxw" v-show="cur == 4">
                <h2>聊天工具</h2>
              </div>
              <div class="ptss" v-show="cur == 5">
                <h2>智能检索</h2>
              </div>
            </my-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script cript lang="ts">
import Component, { mixins } from "vue-class-component";
import PublicityCom from "./Publicity";
import HeaderTwo from "@/components/HeaderTwo.vue";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    HeaderTwo,
    MyScroll,
  },
})
export default class Publicity extends mixins(PublicityCom) {}
</script>

<style lang="scss" scoped>
@import "./Publicity.scss";
</style>
