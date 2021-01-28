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
              <li @click="cur = 0,setSureTop(true)" :class="{ active: cur == 0 }">
                <a class="rdgk">热门推荐</a>
              </li>
              <li @click="cur = 1,setSureTop(true)" :class="{ active: cur == 1 }">
                <a class="rdgk">我的关注</a>
              </li>
              <li @click="cur = 2,setSureTop(true)" :class="{ active: cur == 2 }">
                <a class="rdgk">智能检索 </a>
              </li>
              <li @click="cur = 3,setSureTop(true)" :class="{ active: cur == 3 }">
                <a href="#">新闻详情</a>
              </li>
              <li @click="cur = 4,setSureTop(true)" :class="{ active: cur == 4 }">
                <a href="#">聊天工具</a>
              </li>
              <li @click="cur = 5,setSureTop(true)" :class="{ active: cur == 5 }">
                <a href="#">个人中心</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="content_right">
          <div class="content_right_text">
            <my-scroll :animate="false" thumbColor="rgb(172, 172, 181)" >
                 <!-- 热门推荐 -->
              <div class="yhzc" v-show="cur == 0">
                <h2>1 热门推荐</h2>
                <p>推送用户可能感兴趣的、最新最热的新闻内容。</p>
                <div class="tpjz">
                  <img src="../../assets/img/rmtj.png" alt="" />
                </div>
                <h3>1.1 热点推荐</h3>
                <p>本站抓取最新最热的新闻资讯，会重点在此处展示，点击查看新闻内容。</p>
                <div class="tpjz">
                  <img src="../../assets/img/rdtj.png" alt="" />
                </div>
                <h3>1.2 关注窗口</h3>
                <p>此处显示您关注的国家、人物和媒体列表，点击可查看详细的新闻列表。</p>
                <div class="tpjz">
                  <img src="../../assets/img/gzck.png" alt="" />
                </div>
                <p>例如点击埃及国旗，进入我的关注-->国家-->埃及新闻列表。</p>
                <div class="tpjz">
                  <img src="../../assets/img/gzck1.png" alt="" />
                </div>
                <h3>1.3 推荐频道</h3>
                <p>睿读会对某项事件进行收集制作，形成频道。</p>
                <div class="tpjz">
                  <img src="../../assets/img/tjpd.png" alt="" />
                </div>
              </div>
                  <!-- 我的关注-->
              <div class="yhdl" v-show="cur == 1">
                <h2>2 我的关注</h2>
                <p>
                  用户关注的国家、媒体及人物有关的新闻可在此处查看。如需修改我的关注，请前往个人中心-->我的关注进行修改。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/wdgz.png" alt="" />
                </div>
              </div>
               <!-- 智能检索 -->
              <div class="ptss" v-show="cur == 2">
                <h2>3 智能检索</h2>
                <p>搜索站内全部消息。</p>
                <div class="tpjz">
                  <img src="../../assets/img/znjs.png" alt="" />
                </div>
                <p>
                  输入关键字检索想要找的新闻，还可通过国家、媒体、人物及时间进行筛查。默认相关度排序，还可以切换为发布时间排序及热度排序。
                </p>
                <h3>
                  3.1 搜索联想
                </h3>
                <p>
                  在输入框输入关键字，系统会根据关键字联想出完整内容。关联程度与热门程度高的新闻排序越靠前。
                </p>
                    <div class="tpjz">
                  <img src="../../assets/img/sslx.png" alt="" />
                </div>
                <h3>
                  3.2 历史记录
                </h3>
                <p>
                  用户可以通过上一次的搜索内容，直接到达搜索结果页。
                </p>
                  <div class="tpjz">
                  <img src="../../assets/img/lsjl.png" alt="" />
                </div>
                <h3>
                  3.3 高级检索
                </h3>
                <h4>
                  3.3.1 国家
                </h4>
                <p>
                  文章内容中的标题或正文出现了该国家的名称或者相关事件，可通过国家进行更进一步的筛选。点击更多显示全部国家，直接选择可选择某一个国家，如需筛选多个国家，可选择多选。
                </p>
                       <div class="tpjz">
                  <img src="../../assets/img/gjssgj.png" alt="" />
                </div>
                <h4>
                  3.3.2 媒体
                </h4>
                <p>
                  关键字与国家筛选的结果，还可通过媒体进行进一步筛选，得到更加精准的搜索结果。同样支持单选和多选不同媒体。
                </p>
                <h4>
                  3.3.3 人物
                </h4>
                <p>
                  关键字、国家与媒体筛选的结果，还可通过人物进行进一步筛选，得到更加精准的搜索结果。同样支持单选和多选不同媒体。
                </p>
                 <div class="tpjz">
                  <img src="../../assets/img/gjsssrw.png" alt="" />
                </div>
                <h4>3.3.4 时间</h4>
                <p>
                  根据关键字、国家、媒体、人物层层筛选后，还可通过时间进行筛选。
                </p>
                   <div class="tpjz">
                  <img src="../../assets/img/gjsssj.png" alt="" />
                </div>
                <p> 
                  除提供今日、一周内和一个月内这类的快捷方式外，您还可以通过时间区间搜索历史新闻。
                </p>
                 <div class="tpjz">
                  <img src="../../assets/img/gjsssj1.png" alt="" />
                </div>
                <h4>
                  3.3.5 相关度排序
                </h4>
                <p>
                  默认搜索结果按照相关度排序与时间进行匹配排序。
                </p>
                <h5>  
                  3.3.6 发布时间排序
                </h5>
                <p>
                  搜索结果按照时间由近至远的顺序进行排序。
                </p>
                 <div class="tpjz">
                  <img src="../../assets/img/fbsjpx.png" alt="" />
                </div>
                <h4>3.3.7 热度排序</h4>
                <p>
                  搜索结果按照热度、相关性和时间三种因素进行排序，热度权重最高。
                </p>
                 <div class="tpjz">
                  <img src="../../assets/img/rdpx.png" alt="" />
                </div>
              </div>

              <!-- 新闻详情 -->
              <div class="yhgz" v-show="cur == 3">
                <h2>4 新闻详情</h2>
                <h3>4.1 点赞</h3>
                <p>
                  如对某篇新闻感兴趣，可以点击点赞按钮，系统会根据您的点赞来推送您可能感兴趣的新闻，再次点击取消点赞。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/dz.png" alt="" />
                </div>
                <h3>4.2 不感兴趣</h3>
                <p>对此类新闻不感兴趣，并希望未来减少推荐。</p>
                <div class="tpjz">
                  <img src="../../assets/img/bgxq.png" alt="" />
                </div>
                <h3>4.3 字体</h3>
                <p>默认显示中号字体大小，此外还可以切换小或大字体字号。</p>
                <p>小号字体：</p>
                <div class="tpjz">
                  <img src="../../assets/img/xhzt.png" alt="" />
                </div>
                <p>中号字体：</p>
                <div class="tpjz">
                  <img src="../../assets/img/zhzt.png" alt="" />
                </div>
                <p>大号字体：</p>
                <div class="tpjz">
                  <img src="../../assets/img/dhzt.png" alt="" />
                </div>
                <h3>4.4 下载</h3>
                <h4>4.4.1 新闻下载</h4>
                <p>喜欢此篇新闻，可以点击新闻最下方的下载到本地，将此篇新闻下载。</p>
                <div class="tpjz">
                  <img src="../../assets/img/xwxz.png" alt="" />
                </div>
                <p>下载后查看效果：</p>
                <div class="tpjz">
                  <img src="../../assets/img/ckxg.png" alt="" />
                </div>
                <h3>4.5 附件下载</h3>
                <p>
                  某些新闻附带其他文件，可通过新闻左下角的附件下载，将文件下载到您本地。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/fjxz.png" alt="" />
                </div>
                <h3>分享</h3>
                <p>
                  分享一篇新闻给其他的小伙伴。通过新闻内容右侧分享按钮，分享给其他用户，分享内容会显示在聊天工具内。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/fx.png" alt="" />
                </div>
                <p>分享给好友或我加入的群组。</p>
                <div class="tpjz">
                  <img src="../../assets/img/fx1.png" alt="" />
                </div>
                <p>可以选择是否附加说明。</p>
                <div class="tpjz">
                  <img src="../../assets/img/fx2.png" alt="" />
                </div>
                <p>被分享的内容显示在和好友聊天的内容中，好友上线就可以查看。</p>
                <div class="tpjz">
                  <img src="../../assets/img/fx3.png" alt="" />
                </div>
              </div>

              <!-- 聊天工具 -->
              <div class="tjxw" v-show="cur == 4">
                <h2>5 聊天工具</h2>
                <p>线上即时通讯，聊天内容受保护，好友之间快速分享感兴趣的内容。</p>
                <div class="tpjz">
                  <img src="../../assets/img/ltgj.png" alt="" />
                </div>
                <p>任意页面，点击右侧聊天工具按钮，页面左侧弹出聊天窗口。</p>
                <div class="tpjz">
                  <img src="../../assets/img/ltgj1.png" alt="" />
                </div>
                <h3>5.1 消息</h3>
                <h4>1 频道（聊天室）</h4>
                <p>
                  用户注册成功后，默认会加入到本系统默认公共频道（聊天室），本系统所有人都可在此处进行沟通交流。除默公共频道（聊天室）外，您还可以自建频道（聊天室）进行小范围的沟通交流。
                </p>
                <p>
                  频道（聊天室）是您的团队沟通的地方，分为公共频道（聊天室）、私有频道（聊天室）和讨论频道（聊天室）。公共频道（聊天室），每个人都可以访问；私人频道（聊天室），被邀请的人可以访问；讨论频道（聊天室），一个和所有频道双线关联的子频道（聊天室）。
                </p>
                <h5>1.1 创建聊天室</h5>
                <p>点击窗口列表右上角的图标，可根据您的需求创建不同的频道。</p>
                <div class="tpjz">
                  <img src="../../assets/img/cjlts.png" alt="" />
                </div>
                <h5>1.2 离开频道（聊天室）</h5>
                <p>
                  点击聊天室名称后方图标，可选则离开当前频道（聊天室）。私聊无法退出。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/lkltpd.png" alt="" />
                </div>
                <h5>1.3 收藏频道（聊天室）</h5>
                <p>点击聊天室名称后方图标，可选则喜爱，便可收藏当前频道（聊天室）。</p>
                <div class="tpjz">
                  <img src="../../assets/img/scpd.png" alt="" />
                </div>
                <div class="tpjz">
                  <img src="../../assets/img/scpd1.png" alt="" />
                </div>
                <h5>1.4 隐藏频道（聊天室）</h5>
                <p>
                  隐藏频道（聊天室），当您不想让频道（聊天室）出现在消息列表时，可选则隐藏当前聊天室。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/ycpd.png" alt="" />
                </div>
                <h5>1.5.查找频道（聊天室）</h5>
                <p>搜索频道（聊天室）名称或查看频道用户列表，可再次选择频道。</p>
                <div class="tpjz">
                  <img src="../../assets/img/czpd.png" alt="" />
                </div>
                <div class="tpjz">
                  <img src="../../assets/img/czpd1.png" alt="" />
                </div>
                <h4>2 Direct（私聊）</h4>
                <p>私聊功能与频道（讨论组）基本相同。</p>
                <h4>3 视图</h4>
                <p>是管理聊天列表聊天分类及显示效果的功能。</p>
                <div class="tpjz">
                  <img src="../../assets/img/st.png" alt="" />
                </div>
                <h5>3.1 已拓展</h5>
                <p>除显示头像昵称外，显示部分聊天内容。</p>
                <h5>3.2 中</h5>
                <p>显示头像及昵称。</p>
                <h5>3.3 简明</h5>
                <p>较“中”略小，显示头像及昵称。</p>
                <h5>3.4 隐藏头像</h5>
                <p>仅显示昵称。</p>
                <h4>4 排序方式</h4>
                <h5>4.1 按英文字母顺序</h5>
                <p>频道（讨论组）和用户都按照英文字母的顺序排列。</p>
                <h5>4.2 活动</h5>
                <p>按照活跃度排序，可以理解最后沟通过的会在上部。</p>
                <h4>5 GROUP BY</h4>
                <h5>5.1 讨论</h5>
                <p>隐藏讨论描述。</p>
                <div class="tpjz">
                  <img src="../../assets/img/yctlms.png" alt="" />
                </div>
                <div class="tpjz">
                  <img src="../../assets/img/yctlms1.png" alt="" />
                </div>
                <div class="tpjz">
                  <img src="../../assets/img/yctlms2.png" alt="" />
                </div>
                <h5>5.2 类型</h5>
                <div class="tpjz">
                  <img src="../../assets/img/lx.png" alt="" />
                </div>
                <div class="tpjz">
                  <img src="../../assets/img/lx1.png" alt="" />
                </div>
                <h5>5.3 收藏</h5>
                <div class="tpjz">
                  <img src="../../assets/img/cs.png" alt="" />
                </div>
                <div class="tpjz">
                  <img src="../../assets/img/cs1.png" alt="" />
                </div>
                <h5>5.4 未读在最上面</h5>
                <p>是指未读信息始终在聊天列表最前部分。</p>
                <h3>5.2 通讯录</h3>
                <p>
                  好友管理，可查找好友、添加好友，注意此处好友为内部人员，不可添加外部人员。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/txl.png" alt="" />
                </div>
                <h4>5.2.1 查找好友</h4>
                <p>可通过账户/用户昵称/手机号/微信昵称搜索您的好友。</p>
                <div class="tpjz">
                  <img src="../../assets/img/czhy.png" alt="" />
                </div>
                <h4>5.2.2 添加好友</h4>
                <p>
                  可通过账号/手机号/微信昵称搜索想添加的好友，点击添加好友，发送添加好友请求。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/tjhy.png" alt="" />
                </div>
                <div class="tpjz">
                  <img src="../../assets/img/tjhy1.png" alt="" />
                </div>
                <h4>5.2.3 新的朋友</h4>
                <p>
                  七天内的好友申请，在通讯录列表置顶，可随时添加，超过七天需要前往新的朋友列表同意添加好友。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/xdpy.png" alt="" />
                </div>
                <p>七天后的申请好友状态。</p>
                <div class="tpjz">
                  <img src="../../assets/img/xdpy1.png" alt="" />
                </div>
                <h3>5.3 可能认识</h3>
                <p>
                  可在此列表进行选择其他用户添加为好友，添加好友流程和通讯录中添加好友流程一致。
                </p>
                <div class="tpjz">
                  <img src="../../assets/img/knrs.png" alt="" />
                </div>
                <p>添加好友需要您输入身份信息，以便被添加人验证您的身份信息。</p>
                <div class="tpjz">
                  <img src="../../assets/img/knrs1.png" alt="" />
                </div>
              </div>
                 <!-- 个人中心 -->
              <div class="rdgk" v-show="cur == 5">
                <h2>6 个人中心</h2>
                <p>点击用户信息，在下拉列表中选择“个人中心”，可以进入个人中心。</p>
                <div class="tpjz">
                  <img src="../../assets/img/tp1.png" alt="" />
                </div>
                <h3>6.1 我的关注</h3>
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
                <h3>6.2 我的收藏</h3>
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
                <h4>6.2.1 新闻页收藏</h4>
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
                <h4>6.2.2 分享我的收藏</h4>
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
                <h3>6.3 我的消息</h3>
                <p>用户可查看、删除系统发送的消息。</p>
                <div class="tpjz">
                  <img src="../../assets/img/wdxx.png" alt="" />
                </div>
                <h3>6.4 账号管理</h3>
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
                <h4>6.5 密码管理</h4>
                <p>用户可重置密码。</p>
                <div class="tpjz">
                  <img src="../../assets/img/mmgl.png" alt="" />
                </div>
                <p>如忘记密码，选择[忘记原密码]功能，通过绑定的手机号码进行密码重置。</p>
                <div class="tpjz">
                  <img src="../../assets/img/mmgl1.png" alt="" />
                </div>
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
