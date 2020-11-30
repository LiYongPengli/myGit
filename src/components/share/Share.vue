<template>
  <div class="share">
    <div class="title">
      <span class="maybetitle">分享给Ta</span>
    </div>
    <div class="search">
      <input type="text" placeholder="搜索好友" />
      <img src="../../assets/img/search.png" alt="" />
    </div>
    <div class="content_userlists">
      <ul>
        <my-scroll>
          <li
            @mouseover="showShare(k)"
            @mouseout="hideShare(k)"
            v-for="(v, k) in userlists"
            :key="k"
          >
            <div class="content_userlist">
              <img
              class="ico"
                v-if="!v.headimg && !v.wechat_info.head_img"
                :src="v.headimg"
                alt=""
              />
              <img
              class="ico"
                v-if="!v.headimg && v.wechat_info.head_img"
                :src="v.wechat_info.head_img"
                alt=""
              />
              <p
                v-if="!v.headimg && !v.wechat_info.head_img"
                class="content_userlist_engname"
              >
                {{ v.nickname.slice(0, 1) }}
              </p>
              <p class="content_userlist_chinename">
                {{ v.nickname
                }}{{ v.remark_name ? "(" + v.remark_name + ")" : "" }}
              </p>
              
              <p @click.stop="toShare(v)" v-show="v.share" class="content_userlist_sharehe">
                  <img src="../../assets/img/share.png" alt="" />
                  分享给他
                </p>
            </div>
          </li>
        </my-scroll>
      </ul>
    </div>
    <div style="text-align:center;" class="extShare">
      <el-button @click="$emit('update:visable',1)" type="primary">暂不分享</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { baseApi } from '@/axios/axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MyScroll from '@/components/MyScroll.vue'
@Component({
  components:{
    MyScroll
  }
})
export default class Share extends Vue {
    @Prop({}) visable!:boolean;
    @Prop({}) user!:any;
    public userlists:any[] = []

    public created():void{
        this.getMailList();
    }

    //获取通讯录列表
    private getMailList():void{
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'my_friends',
        }).then(res=>{
            this.userlists = res.data.data;
            for(let i=0;i<this.userlists.length;i++){
              if(this.user.user_id==this.userlists[i].user_id){
                this.userlists.splice(i,1);
              }
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    public showShare(index:number):void{
        this.$set(this.userlists[index],'share',true);
    }

    public hideShare(index:number):void{
        this.$delete(this.userlists[index],'share')
    }

    public toShare(user:any):void{
      this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'recommend_friend',
          paras: {
            recommended_id: this.user.user_id,
            recommend_to_id: user.user_id,
          }
        }).then(res=>{
          console.log(res.data);
          this.$message.success('分享成功');
          this.$emit('update:visable',1);
        }).catch(err=>{
          console.log(err);
        })
    }
}
</script>

<style lang="scss" scoped>
.share {
    margin: 50px 32px 0;
    height: 300px;
    padding-left: 20px;
    .title {
      .maybetitle {
        color: white;
        font-size: 20px;
        padding-bottom: 33px;
      }
      .newfriend {
        background: url("../../assets/img/newfriendlogo.png") right top no-repeat;
        color: white;
        float: right;
        font-size: 16px;
        width: 105px;
        a {
          color: white;
          text-decoration: none;
        }
      }
    }
    .search {
      margin-top: 20px;
      // background: #434a55;
      position: relative;
      input {
        padding-left: 20px;
        font-size: 16px;
        height: 50px;
        line-height: 50px;
        width: 100%;
        color: white;
        background: #434a55;
        outline: medium;
        box-sizing: border-box;
        border: 1px solid #434a55;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #c1c1c1;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #c1c1c1;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #c1c1c1;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #c1c1c1;
      }
      img {
        position: absolute;
        right: 20px;
        top: 15px;
        cursor: pointer;
      }
    }
    .content_userlists {
      margin-top: 30px;
      ul {
        position: relative;
        height: 600px;
        li:hover {
          background: #434a55;
        }
        p {
          color: white;
          font-size: 14px;
          margin-bottom: 15px;
        }
        li {
          width: 95%;
          padding: 5px 20px;
          height: 50px;
          margin-bottom: 5px;
          .content_userlist {
            color: white;
            img {
              float: left;
              
            }
            img.ico{
              width: 40px;
            }
            p {
              float: left;
            }
            .content_userlist_engname,
            .content_userlist_chinename,
            .content_userlist_sendmessage,
            .content_userlist_share,
            .content_userlist_sharehe {
              width: 40px;
              height: 40px;
              line-height: 40px;
            }
            .content_userlist_engname {
              background-color: #009688;
              text-align: center;
            }
            .content_userlist_chinename {
              margin-left: 25px;
              width: 400px;
              font-size: 14px;
            }
            .content_userlist_sendmessage,
            .content_userlist_share,
            .content_userlist_sharehe {
              cursor: pointer;
              img {
                margin-top: 10px;
                padding-left: 10px;
              }
              width: 90px;
              float: right;
              text-align: right;
            }
            .content_userlist_share {
              margin-left: 30px;
            }
          }
        }
        li.cur {
          background: #434a55;
        }
      }
    }
  }
</style>