<template>
  <!-- 智能检索 -->
  <div class="intelligentretrieval">
    <header>
      <div class="search">
        <div @click="setShowIntelligent(false)" class="gbjs">关闭检索</div>
        <input type="text" placeholder="美国大选" />
      </div>
    </header>
    <div class="content">
      <div  class="mj">
        <div class="country">
          <span>国家：</span>
          <div class="list">
            <ul>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
            </ul>
          </div>
          <div class="operation">
            <div class="more">更多+</div>
            <div class="morchoice">多选+</div>
          </div>
        </div>

        <div class="country">
          <span>媒体：</span>
          <div class="list">
            <div class="all">全部</div>
            <div class="other">
              <ul>
                <li><a href="">BBC(2)</a></li>
                <li><a href="">Hangmeiti(3)</a></li>
                <li><a href="">BBC(2)</a></li>
                <li><a href="">Hangmeiti(3)</a></li>
                <li><a href="">BBC(2)</a></li>
              </ul>
            </div>
          </div>
          <div class="operation">
            <div class="more">更多+</div>
            <div class="morchoice">多选+</div>
          </div>
        </div>
        <!-- 人物 -->
        <div class="country">
          <span>人物：</span>
          <div class="list">
            <div class="all">全部</div>
            <div class="other">
              <ul>
                <li><a href="">习近平</a></li>
                <li><a href="">习近平</a></li>
                <li><a href="">习近平</a></li>
                <li><a href="">习近平</a></li>
                <li><a href="">习近平</a></li>
              </ul>
            </div>
          </div>
          <div class="operation">
            <div class="morepe">更多+</div>
          </div>
        </div>
        <div class="time">
          <span>时间：</span>
          <div class="list">
            <div class="other">
              <ul>
                <li>
                  <div>今日(23)</div>
                </li>
                <li><div>一周内(23)</div></li>
                <li><div>一月内(23)</div></li>
                <li>
                  <input type="date" value="2015-09-24" />
                </li>
                <li><span>-</span></li>
                <li>
                  <input type="date" value="2015-09-24" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-show="show" class="mj">
        <div class="countrymore country">
          <ul style="margin-left: 55px" class="">
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li>
            <li>F</li>
            <li>G</li>
            <li>H</li>
            <li>I</li>
            <li>J</li>
            <li>K</li>
            <li>L</li>
            <li>M</li>
            <li>N</li>
            <li>O</li>
            <li>P</li>
            <li>Q</li>
            <li>R</li>
            <li>S</li>
            <li>T</li>
            <li>U</li>
            <li>V</li>
            <li>W</li>
            <li>X</li>
            <li>Y</li>
            <li>Z</li>
          </ul>
          <span>国家：</span>
          <div class="list">
            <ul>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
              <li>
                <a href=""> 中国(23) </a>
              </li>
            </ul>
          </div>
          <div class="operation">
            <div class="more">更多+</div>
            <div class="morchoice">多选+</div>
          </div>
        </div>
        <div class="cz">
          <div class="quanbu">全部</div>
          <div class="quxiao">取消</div>
        </div>
        <div class="country">
          <span>媒体：</span>
          <div class="list">
            <div class="all">全部</div>
            <div class="other">
              <ul>
                <li><a href="">BBC(2)</a></li>
                <li><a href="">Hangmeiti(3)</a></li>
                <li><a href="">BBC(2)</a></li>
                <li><a href="">Hangmeiti(3)</a></li>
                <li><a href="">BBC(2)</a></li>
              </ul>
            </div>
          </div>
          <div class="operation">
            <div class="more">更多+</div>
            <div class="morchoice">多选+</div>
          </div>
        </div>
        <!-- 人物 -->
        <div class="country">
          <span>人物：</span>
          <div class="list">
            <div class="all">全部</div>
            <div class="other">
              <ul>
                <li><a href="">习近平</a></li>
                <li><a href="">习近平</a></li>
                <li><a href="">习近平</a></li>
                <li><a href="">习近平</a></li>
                <li><a href="">习近平</a></li>
              </ul>
            </div>
          </div>
          <div class="operation">
            <div class="morepe">更多+</div>
          </div>
        </div>
        <div class="time">
          <span>时间：</span>
          <div class="list">
            <div class="other">
              <ul>
                <li>
                  <div>今日(23)</div>
                </li>
                <li><div>一周内(23)</div></li>
                <li><div>一月内(23)</div></li>
                <li>
                  <input type="date" value="2015-09-24" />
                </li>
                <li><span>-</span></li>
                <li>
                  <input type="date" value="2015-09-24" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="resultlist">
        <div class="paixu">
          <el-button type="primary"
            >相关度排序<i class="el-icon-d-caret el-icon--right"></i
          ></el-button>
          <el-button type="primary"
            >发布时间排序<i class="el-icon-d-caret el-icon--right"></i
          ></el-button>
        </div>
        <div class="result">
          <ul>
            <li>
              <div class="pic">
                <img src="../../assets/img/sylbtp.png" alt="" />
              </div>
              <div class="text">
                <p class="title">
                  美国财长谈TikTok解决方案 不涉及出售和技术转让 #新冠疫情
                  #美国大选
                </p>
                <span class="mt">媒体: TechWeb.com.cn </span>
                <span class="time">时间: 10分钟前</span>
                <span class="ll">浏览次数: 32人</span>
              </div>
            </li>
            <li>
              <div class="pic">
                <img src="../../assets/img/sylbtp.png" alt="" />
              </div>
              <div class="text">
                <p class="title">
                  美国财长谈TikTok解决方案 不涉及出售和技术转让 #新冠疫情
                  #美国大选
                </p>
                <span class="mt">媒体: TechWeb.com.cn </span>
                <span class="time">时间: 10分钟前</span>
                <span class="ll">浏览次数: 32人</span>
              </div>
            </li>
            <li>
              <div class="pic">
                <img src="../../assets/img/sylbtp.png" alt="" />
              </div>
              <div class="text">
                <p class="title">
                  美国财长谈TikTok解决方案 不涉及出售和技术转让 #新冠疫情
                  #美国大选
                </p>
                <span class="mt">媒体: TechWeb.com.cn </span>
                <span class="time">时间: 10分钟前</span>
                <span class="ll">浏览次数: 32人</span>
              </div>
            </li>
            <li>
              <div class="text">
                <p class="title">
                  美国财长谈TikTok解决方案 不涉及出售和技术转让 #新冠疫情
                  #美国大选
                </p>
                <span class="mt">媒体: TechWeb.com.cn </span>
                <span class="time">时间: 10分钟前</span>
                <span class="ll">浏览次数: 32人</span>
              </div>
            </li>
            <li>
              <div class="text">
                <p class="title">
                  美国财长谈TikTok解决方案 不涉及出售和技术转让 #新冠疫情
                  #美国大选
                </p>
                <span class="mt">媒体: TechWeb.com.cn </span>
                <span class="time">时间: 10分钟前</span>
                <span class="ll">浏览次数: 32人</span>
              </div>
            </li>
            <div class="jzgd">更多精彩内容，加载中</div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Component, { mixins } from "vue-class-component";
import IntelligentRetrievalCom from "./IntelligentRetrieval";
@Component
export default class IntelligentRetrieval extends mixins(
  IntelligentRetrievalCom
) {}
</script>


<style lang="scss">
@import "./IntelligentRetrieval.scss";
</style>
<style lang="scss">
.intelligentretrieval {
  .el-button--primary {
    background-color: #272730;
    border: none;
  }
  .el-button--primary:hover {
    background-color: #272730;
  }
  .el-button--primary:focus {
    background-color: #272730;
  }
}
</style>