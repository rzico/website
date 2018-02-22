<template>
<div class="main-box">
  <div class="main-box">
    <div class="root moipian" data-mask-id="13yy1mbc">
      <download_bar :isShow="downloadShow" :authorId="watchArticle.member.id" @closeDownload="closeDownload" templateId=1002 ></download_bar>
      <div class="cover">
        <div class="header">
        </div>
        <div class="auther-header-box">
          <div class="article-meta">
            <h1 class="title">啊啊啊啊啊</h1>
            <p class="nickname" data-author-id="34351379" data-author-url="https://www.meipian.cn/c/34351379">
                        <span>
                            <span class="nigname">凉快</span>
                            <span class="focus__root"><div class="focus"><a class="clearfix">关注</a></div></span>
                        </span>
            </p>
            <p class="time-read">
              <span>2018.02.22</span>
              <span>阅读 <span class="read-count">14</span></span>
            </p>
            <span class="sign__root"><div class="sign"></div></span>
          </div>
        </div>
        <div class="leaves-box">
          <div class="leaves"></div>
        </div>
      </div>
      <div class="music-icon__root"><!----></div>
      <div class="content_foot">
        <div class="mp-content">
          <div class="well content-container">
            <div class="section">
              <div class="img-outbox">
                <div class="img-box rotate-0" style="-webkit-transform: rotate(-3deg);-ms-transform: rotate(-3deg); transform: rotate(-3deg);">
                  <img show-img="https://ss2.meipian.me/users/34351379/8dac0e6b0f6348e685c6e08a9e3e9583.jpg?meipian-raw/bucket/ivwen/key/dXNlcnMvMzQzNTEzNzkvOGRhYzBlNmIwZjYzNDhlNjg1YzZlMDhhOWUzZTk1ODMuanBn/sign/0614a9c947e0633254a5a5b37b1d9df1.jpg" src="https://ss2.meipian.me/users/34351379/8dac0e6b0f6348e685c6e08a9e3e9583.jpg-mobile">
                </div>
              </div>
            </div>
          </div>
          <div class="vote__root"></div>
          <div class="readmore" style="display: none;">
            <a href="javascript:;">
              <div>展开阅读全文</div>
              <i class="iconfont icon-arrow"></i>
            </a>
          </div>
        </div>
        <div class="footer__root"><!----> <div class="report" red-packet-type=""><div class="well">
          阅读 <span class="read-count">14</span> <!----></div></div> <!----> <!---->
      </div>
    </div>
  </div>
</div>
</div>
</template>
<style>
  .mp-dialog .inner.comment > textarea {
    width: 100%;
    height: 90px;
    resize: none;
    border-radius: 7px;
    background: #fff;
    padding: 7px;
    border: 1px solid #ccc;
    outline: 0;
    font-size: 15px; }
  .mp-dialog .inner.comment > button {
    float: right;
    height: 100%;
    width: 56px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    border-radius: 7px;
    background: #2887f0;
    border: none;
    color: #fff;
    margin-top: 5px;
    text-align: center;
    outline: 0; }
  .mp-dialog .inner.comment > button[disabled] {
    background: #999; }
  .mp-dialog .inner.download {
    width: 285px;
    border-radius: 13px;
    height: 420px; }
  .mp-dialog .inner.download .main {
    background: #fff;
    height: 362px;
    border-radius: 13px;
    background: url(https://ss2.meipian.me/qrcode/qrcode-bg.png) 0 0 no-repeat;
    background-size: 100%; }
  .mp-dialog .inner.download .main .title {
    height: 78px;
    line-height: 78px;
    font-size: 20px;
    color: #000000;
    text-align: center; }
  .mp-dialog .inner.download .main .content img.logo {
    display: block;
    margin: 24px auto 0;
    width: 60px;
    height: 60px; }
  .mp-dialog .inner.download .main .content p.logo-name {
    text-align: center;
    font-size: 20px;
    color: #333;
    margin-top: 6px;
    margin-bottom: 0; }
  .mp-dialog .inner.download .main .content p.t1 {
    margin-top: 15px;
    margin-bottom: 0;
    font-size: 18px;
    color: #5c5e61;
    text-align: center;
    text-shadow: none;
    line-height: 1; }
  .mp-dialog .inner.download .main .content p.t2 {
    margin-top: 15px;
    font-size: 15px;
    color: #aeb1b6;
    line-height: 1.5;
    text-align: center;
    text-shadow: none; }
  .mp-dialog .inner.download .main .content button.click {
    display: block;
    margin: 20px auto 0;
    width: 180px;
    height: 39px;
    background: #0097ff;
    border-radius: 50px;
    color: #fff;
    line-height: 39px;
    font-size: 18px;
    text-align: center;
    outline: 0;
    border: none; }
  .mp-dialog .inner.download button.close {
    display: block;
    width: 33px;
    height: 33px;
    margin: 0 auto;
    background: url(http://static2.ivwen.com/theme/v2/img/cancel.png) 0 0 no-repeat;
    background-size: 100%;
    border: none;
    margin-top: 24px;
    outline: 0; }

  body.top-banner-show {
    padding-bottom: 40px; }

  * {
    margin: 0;
    padding: 0;
    font-style: normal;
    -webkit-box-sizing: border-box;
    box-sizing: border-box; }

  html,
  body {
    color: #4A9C95;
    font-family: PingFangSC-Regular;
    font-size: 16px; }

  a {
    text-decoration: none;
    color: #3B8FD3; }
  a:hover, a:active, a:visited, a:focus {
    text-decoration: none; }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
    font-size: 16px; }

  h1 {
    font-size: 24px;
    font-weight: normal;
    color: #4A9C95;
    letter-spacing: 0;
    line-height: 36px;
    margin: 0; }

  ul,
  ol {
    list-style: none; }

  img {
    vertical-align: middle; }
  img[lazy] {
    background-color: rgba(223, 226, 231, 0.7); }

  i,
  i * {
    font-style: italic; }

  .clearfix {
    zoom: 1; }

  .clearfix:before {
    display: table;
    content: ""; }

  .clearfix:after {
    display: table;
    content: "";
    clear: both; }

  .well {
    padding: 0 30px; }

  .footer-section {
    margin: 8px 0; }

  .line-clamp-1 {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all; }

  .line-clamp-2 {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all; }

  .line-clamp-3 {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all; }

  .text {
    text-align: justify; }

  .root {
    height: 100%; }

  .music-icon {
    position: fixed;
    top: 15px;
    z-index: 1;
    right: 15px;
    background-color: rgba(59, 143, 211, 0.8);
    border-radius: 50%; }
  .music-icon .iconfont {
    color: #fff;
    font-size: 32px;
    line-height: 1; }
  .music-icon[play='on'] {
    animation: rotate 4s linear infinite;
    -webkit-animation: rotate 4s linear infinite; }

  @keyframes rotate {
    from {
      transform: rotate(0);
      -webkit-transform: rotate(0); }
    to {
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg); } }

  @-webkit-keyframes rotate {
    from {
      transform: rotate(0);
      -webkit-transform: rotate(0); }
    to {
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg); } }

  .top-fixed-download {
    display: none;
    position: fixed;
    z-index: 3;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 0;
    height: 40px;
    background: rgba(255, 255, 255, 0.9);
    text-shadow: none;
    -webkit-animation-duration: .5s;
    animation-duration: .5s; }
  .top-fixed-download .title {
    float: left;
    white-space: nowrap;
    height: 39px; }
  .top-fixed-download .title img {
    width: 26px;
    height: 26px;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -13px; }
  .top-fixed-download .title > p {
    text-align: left;
    word-break: break-word;
    color: #333;
    padding-left: 42px;
    height: 39px;
    margin: 0; }
  .top-fixed-download .title > p span.name {
    line-height: 40px;
    white-space: normal;
    font-size: 18px;
    float: left; }
  .top-fixed-download .title > p span.desc {
    line-height: 40px;
    font-size: 14px;
    margin-left: 4px;
    float: left; }
  .top-fixed-download .title button.download-btn {
    position: absolute;
    right: 30px;
    vertical-align: middle;
    color: #fff;
    padding: 6px;
    font-size: 12px;
    line-height: 1;
    text-align: center;
    border-radius: 5px;
    border: none;
    top: 50%;
    margin-top: -12px;
    background: #57A7FF; }
  .top-fixed-download button.close {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -5px;
    width: 11px;
    height: 11px;
    background: url(http://static2.ivwen.com/web/a/close.png) no-repeat 0 0;
    background-size: 100% 100%;
    border: none;
    padding: 0; }

  body.top-banner-show .top-fixed-download {
    display: block; }

  .root.moipian {
    background-image: url("../img/t1005/95_bg_moblie_1.jpg");
    background-repeat: repeat;
    background-size: 100%; }

  .cover {
    position: relative;
    font-family: PingFangSC-Regular; }
  .cover .header {
    position: relative;
    background-image: url("../img/t1005/95_bg_mobile_a.jpg");
    background-size: 100% 100%;
    padding-bottom: 93.33333%; }
  .cover .auther-header-box {
    padding: 0px 34px;
    min-height: 115px;
    background-image: url("../img/t1005/95_bg_mobile_b.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: top;
    overflow: hidden;
    width: 100%;
    font-family: PingFangSC-Regular;
    text-align: center;
    word-wrap: break-word; }
  .cover .auther-header-box .title {
    font-size: 24px;
    color: #4A9C95;
    letter-spacing: 0;
    line-height: 1.37em;
    padding-bottom: 15px;
    word-wrap: break-word;
    white-space: pre-wrap; }
  .cover .auther-header-box p.nickname {
    font-size: 16px;
    letter-spacing: 0;
    line-height: 22px;
    width: 100%;
    padding-bottom: 15px; }
  .cover .auther-header-box p.nickname .nigname {
    display: inline-block;
    color: #3B8FD3;
    max-width: 75%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom; }
  .cover .auther-header-box p.nickname .focus__root {
    display: inline-block; }
  .cover .auther-header-box p.nickname .focus__root .focus {
    background-color: #3B8FD3;
    width: 44px;
    text-align: center;
    border-radius: 4px;
    margin-left: 10px; }
  .cover .auther-header-box p.nickname .focus__root .focus a {
    color: #FFFFFF;
    font-size: 12px;
    line-height: 20px;
    font-family: PingFangSC-Regular; }
  .cover .auther-header-box p.time-read {
    font-size: 14px;
    color: #96BFBF;
    letter-spacing: 0;
    line-height: 24px;
    width: 100%; }
  .cover .auther-header-box p.time-read > span:nth-child(2) {
    margin-left: 10px; }
  .cover .leaves-box {
    width: 100%;
    padding-bottom: 20%;
    position: relative;
    top: 0px;
    left: 0px; }
  .cover .leaves-box .leaves {
    width: 53px;
    height: 19px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: url("../img/t1005/95_leaf.png") no-repeat 100% 100%; }

  .mp-content {
    color: #4A9C95; }
  .mp-content .well {
    padding: 0px 30px; }
  .mp-content .section {
    padding: 15px 0px; }
  .mp-content .section:first-child {
    padding-top: 0px; }
  .mp-content .section .text {
    margin: 15px 0px;
    line-height: 1.8em;
    word-wrap: break-word;
    font-weight: normal;
    white-space: pre-wrap; }
  .mp-content .section h1 {
    font-size: 20px;
    line-height: 1.5em; }
  .mp-content .section h3 {
    font-size: 17px;
    line-height: 1.8em; }
  .mp-content .section h5 {
    font-size: 15px;
    line-height: 2em; }
  .mp-content .section img {
    width: 100%;
    vertical-align: bottom; }
  .mp-content .section a {
    color: #3B8FD3;
    display: block;
    margin: 15px 0px;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 16px; }
  .mp-content .section video {
    width: 100%;
    background: #000000; }
  .mp-content .section div.video {
    margin: 15px 0px; }
  .mp-content .section iframe {
    width: 100%; }
  .mp-content .section .img-outbox {
    padding: 15px 15px;
    position: relative; }
  .mp-content .section .img-outbox .right, .mp-content .section .img-outbox .rotate-0::after {
    width: 60px;
    height: 48px;
    position: absolute;
    bottom: -5px;
    left: -5px;
    background-image: url("../img/t1005/95_d2.png");
    background-size: 100%;
    background-repeat: no-repeat; }
  .mp-content .section .img-outbox .rotate0 {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-box-shadow: 0px 0px 8px #E2E3E0;
    box-shadow: 0px 0px 8px #E2E3E0; }
  .mp-content .section .img-outbox .rotate0::after {
    content: "";
    display: block; }
  .mp-content .section .img-outbox .rotate-0 {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-box-shadow: 0px 0px 8px #E2E3E0;
    box-shadow: 0px 0px 8px #E2E3E0; }
  .mp-content .section .img-outbox .rotate-0::after {
    content: "";
    display: block; }
  .mp-content .section .img-outbox .img-box {
    padding: 16px 16px 46px;
    background: #fff; }
  .mp-content .section .img-outbox img {
    width: 100%;
    vertical-align: bottom; }
  .mp-content .section .img-outbox span.gif-img-tips {
    position: absolute;
    bottom: 50px;
    left: 20px;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 1.2em;
    line-height: 2.3;
    font-size: 12px;
    color: #fff;
    text-align: center;
    min-width: 65px; }
  .mp-content .section .img-outbox span.gif-img-tips i {
    display: inline-block;
    width: 0;
    height: 0;
    border: 8px dashed transparent;
    border-right-width: 0;
    border-left-color: #fff;
    border-left-style: solid;
    border-width: 5px 0 5px 8px;
    vertical-align: middle;
    margin: -.2em .73em 0 -2px; }

  .vote .well {
    background-color: transparent;
    border: 1px solid #96BFBF;
    border-radius: 7px;
    padding: 0;
    margin: 30px 30px 24px 30px; }
  .vote .well .option-area {
    padding: 19px 15px 0; }
  .vote .well .option-area h2.title {
    font-size: 20px;
    color: #4A9C95;
    letter-spacing: 0;
    line-height: 30px;
    margin-bottom: 9px;
    word-wrap: break-word;
    white-space: pre-wrap; }
  .vote .well .option-area h2.title em {
    font-size: 12px;
    margin-left: 10px; }
  .vote .well .option-area .time {
    font-size: 12px;
    color: #96BFBF; }
  .vote .well .option-area ul.unvote {
    padding: 0 0 0 0;
    margin: 0 -15px 0 0; }
  .vote .well .option-area ul.unvote li {
    list-style: none;
    padding: 15px 25px;
    position: relative;
    border-top: 1px solid #96BFBF;
    overflow: hidden; }
  .vote .well .option-area ul.unvote li:first-child {
    border-top: none; }
  .vote .well .option-area ul.unvote li > i.radio {
    position: absolute;
    top: 19px;
    left: 0;
    width: 16px;
    height: 16px;
    padding: 2px;
    border: 1px solid #96BFBF;
    border-radius: 50%;
    cursor: pointer; }
  .vote .well .option-area ul.unvote li > i.radio:before {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: 0;
    background: #4A9C95;
    content: "";
    display: none; }
  .vote .well .option-area ul.unvote li > p.title {
    font-size: 16px;
    line-height: 24px;
    color: #4A9C95;
    margin: 0;
    overflow: hidden;
    word-wrap: break-word; }
  .vote .well .option-area ul.unvote li.active i.radio:before {
    display: block; }
  .vote .well .option-area ul.option-list {
    padding: 22px 0 28px; }
  .vote .well .option-area ul.option-list li {
    margin-top: 29px;
    font-size: 12px;
    color: #96BFBF; }
  .vote .well .option-area ul.option-list li .option {
    margin-bottom: 25px;
    font-size: 16px;
    word-wrap: break-word;
    white-space: pre-wrap; }
  .vote .well .option-area ul.option-list li .vote-bar {
    color: #96BFBF; }
  .vote .well .option-area ul.option-list li .vote-bar .bar-outer {
    display: inline-block;
    width: 60%;
    height: 5px;
    background-color: rgba(74, 156, 149, 0.2); }
  .vote .well .option-area ul.option-list li .vote-bar .bar-outer .bar-inner {
    height: 5px;
    background-color: #4A9C95; }
  .vote .well .option-area ul.option-list li .vote-bar .vote-count {
    display: inline-block;
    width: 18%;
    text-align: right; }
  .vote .well .option-area ul.option-list li .vote-bar .vote-percentage {
    display: inline-block;
    float: right; }
  .vote .well .option-area ul.option-list li:first-child {
    margin-top: 0; }
  .vote .well button.vote-btn {
    display: block;
    text-align: center;
    width: 100%;
    font-size: 18px;
    color: #4A9C95;
    letter-spacing: 0;
    line-height: 44px;
    border: none;
    border-top: 1px solid #96BFBF;
    outline: none;
    background: transparent; }
  .vote .well button.vote-btn[disabled] {
    color: #96BFBF; }

  .readmore {
    display: none;
    padding-top: 30px;
    text-align: center; }
  .readmore .iconfont.icon-arrow {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    display: inline-block;
    margin: 10px 0 30px; }

  .reward {
    padding: 28px 0 20px;
    text-align: center;
    background-color: transparent; }
  .reward .reward-quote {
    font-size: 14px;
    color: #96BFBF;
    letter-spacing: 0;
    margin-bottom: 12px; }
  .reward .btn-reward {
    display: inline-block;
    color: #fff;
    background-color: #4A9C95;
    padding: 8px 22px;
    border-radius: 6px; }
  .reward .reward-tip {
    margin-top: 12px;
    font-size: 14px;
    color: #96BFBF; }
  .reward .reward-count {
    font-size: 14px;
    color: #96BFBF;
    letter-spacing: 0;
    line-height: 14px;
    margin: 21px 0 12px; }
  .reward .reward-count span {
    color: #73C8FF; }
  .reward .reward-user-list {
    width: 272px;
    margin: 0 auto; }
  .reward .reward-user-list img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 2px; }

  .report {
    font-size: 16px;
    color: #96BFBF;
    letter-spacing: 0;
    line-height: 24px;
    background-color: transparent;
    padding: 20px 0 28px; }
  .report .well {
    padding: 0 30px; }
  .report a.btn-admire {
    margin-left: 20px; }
  .report a.btn-admire span.admire-count {
    color: #96BFBF; }
  .report .btn-report {
    float: right; }

  .share {
    background-color: transparent;
    padding-top: 20px;
    padding-bottom: 40px; }
  .share .share-text {
    font-size: 14px;
    line-height: 14px;
    color: #73C8FF;
    margin-bottom: 20px;
    text-align: center; }
  .share ul.share-list {
    text-align: justify;
    font-size: 0; }
  .share ul.share-list li {
    float: left;
    width: 20%;
    text-align: center; }
  .share ul.share-list li img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 auto 4px; }
  .share ul.share-list li .caption {
    font-size: 12px;
    line-height: 17px;
    color: #73C8FF; }

  .author-link {
    background-color: transparent; }
  .author-link .well {
    padding: 15px 30px; }
  .author-link .well img.avatar {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    float: left;
    margin-right: 12px; }
  .author-link .well i {
    float: right;
    line-height: 54px;
    color: #4A9C95;
    margin-left: 12px; }
  .author-link .well .nickname {
    font-size: 16px;
    color: #4A9C95;
    letter-spacing: 0;
    line-height: 19px;
    margin: 5px 0 10px; }
  .author-link .well .signature {
    font-size: 14px;
    color: #96BFBF;
    letter-spacing: 0;
    line-height: 17px; }

  .loading-icon {
    width: 100%;
    height: 20px;
    padding: 20px;
    background: rgba(241, 242, 246, 0.5);
    position: absolute; }
  .loading-icon .loadEffect {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 50%;
    right: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); }
  .loading-icon .loadEffect > span {
    display: inline-block;
    width: 6px;
    height: 2px;
    border-top-left-radius: 1px;
    border-bottom-left-radius: 1px;
    background: #ccc;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
    animation: load 1.04s ease infinite; }
  .loading-icon .loadEffect > span:nth-child(1) {
    left: 0;
    top: 50%;
    margin-top: -1px;
    -webkit-animation-delay: 0.13s;
    animation-delay: 0.13s; }
  .loading-icon .loadEffect > span:nth-child(2) {
    left: 2px;
    top: 4px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation-delay: 0.26s;
    animation-delay: 0.26s; }
  .loading-icon .loadEffect > span:nth-child(3) {
    left: 50%;
    top: 2px;
    margin-left: -3px;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation-delay: 0.39s;
    animation-delay: 0.39s; }
  .loading-icon .loadEffect > span:nth-child(4) {
    top: 4px;
    right: 2px;
    -webkit-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    transform: rotate(135deg);
    -webkit-animation-delay: 0.52s;
    animation-delay: 0.52s; }
  .loading-icon .loadEffect > span:nth-child(5) {
    right: 0;
    top: 50%;
    margin-top: -1px;
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-animation-delay: 0.65s;
    animation-delay: 0.65s; }
  .loading-icon .loadEffect > span:nth-child(6) {
    right: 2px;
    bottom: 4px;
    -webkit-transform: rotate(225deg);
    -ms-transform: rotate(225deg);
    transform: rotate(225deg);
    -webkit-animation-delay: 0.78s;
    animation-delay: 0.78s; }
  .loading-icon .loadEffect > span:nth-child(7) {
    bottom: 2px;
    left: 50%;
    margin-left: -3px;
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
    -webkit-animation-delay: 0.91s;
    animation-delay: 0.91s; }
  .loading-icon .loadEffect > span:nth-child(8) {
    bottom: 4px;
    left: 2px;
    -webkit-transform: rotate(315deg);
    -ms-transform: rotate(315deg);
    transform: rotate(315deg);
    -webkit-animation-delay: 1.04s;
    animation-delay: 1.04s; }

  @-webkit-keyframes load {
    0% {
      opacity: 1; }
    100% {
      opacity: 0.2; } }

  @keyframes load {
    0% {
      opacity: 1; }
    100% {
      opacity: 0.2; } }

  .comment {
    margin-top: 8px;
    position: relative;
    font-family: PingFangSC-Light;
    background-color: transparent; }
  .comment:before {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 8px;
    background: rgba(74, 156, 149, 0.2);
    top: -8px; }
  .comment .well {
    padding: 20px 0px 0px 0px; }
  .comment .well h3.title {
    color: #4A9C95;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 20px;
    padding-left: 15px; }
  .comment .well h3.title:before {
    width: 4px;
    height: 16px;
    border-radius: 2px;
    background-color: #3B8FD3;
    content: "";
    display: inline-block;
    margin-right: 6px;
    vertical-align: bottom; }
  .comment .well h3.title > span {
    margin-left: 10px; }
  .comment .well a.add-comment {
    display: block;
    color: #4A9C95;
    font-size: 16px;
    text-align: center;
    line-height: 26px;
    margin: 0px auto 24px; }
  .comment .well a.add-comment i {
    margin-right: 6px; }
  .comment .well a.btn-block {
    display: block; }
  .comment .well a.btn-block.btn-comment {
    color: #fff;
    background-color: #4A9C95;
    border-radius: 7px;
    padding: 15px 0;
    text-align: center; }
  .comment .well .comment-item:nth-child(1) {
    border-top: 1px solid rgba(74, 156, 149, 0.2); }
  .comment .well .border-none {
    border: none !important; }
  .comment .well .compatible-left {
    position: absolute;
    right: 15px; }
  .comment .well .padding-bottom {
    width: 100%;
    height: 40px; }

  .comment-item {
    position: relative;
    padding-left: 15px; }
  .comment-item .hot-image {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0px;
    left: 0px; }
  .comment-item .comment-box {
    position: relative;
    border-bottom: 1px solid rgba(74, 156, 149, 0.2);
    padding-bottom: 15px;
    padding-top: 15px;
    position: relative;
    padding-right: 15px;
    padding-left: 46px; }
  .comment-item .comment-box .avatar-box {
    position: absolute;
    width: 36px;
    height: 36px;
    top: 15px;
    left: 0px; }
  .comment-item .comment-box .avatar-box .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%; }
  .comment-item .comment-box .avatar-box .vip {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    bottom: 0px;
    right: 0px; }
  .comment-item .comment-box .bedge-img {
    position: absolute;
    width: 12px;
    top: 0;
    left: 27px; }
  .comment-item .comment-box .nickname {
    font-size: 14px;
    color: #96BFBF;
    letter-spacing: 0;
    line-height: 18px;
    height: 18px;
    margin-bottom: 4px;
    width: 100%;
    padding-right: 52px; }
  .comment-item .comment-box .btn-admire {
    font-size: 12px;
    padding: 10px 0px 10px 20px;
    position: absolute;
    top: 4px;
    color: #96BFBF;
    right: 15px; }
  .comment-item .comment-box .btn-admire i {
    margin-right: 5px; }
  .comment-item .comment-box .btn-admire .admire-count {
    color: #96BFBF; }
  .comment-item .comment-box .level-two-comment {
    display: block;
    background: rgba(74, 156, 149, 0.2);
    border-radius: 4px;
    padding: 5px 10px;
    color: #4A9C95;
    margin-bottom: 10px; }
  .comment-item .comment-box .level-two-comment .level-two-comment-item p {
    font-size: 14px;
    line-height: 18px;
    padding: 10px 0px 0px; }
  .comment-item .comment-box .level-two-comment .level-two-comment-item p .nickname {
    color: #3B8FD3;
    margin-right: 3px;
    padding-right: 0; }
  .comment-item .comment-box .level-two-comment .level-two-comment-item p .comment1 {
    margin-left: 5px; }
  .comment-item .comment-box .level-two-comment .level-two-comment-item:last-child {
    padding-bottom: 10px; }
  .comment-item .comment-box .comment-time {
    font-size: 12px;
    color: #96BFBF;
    line-height: 18px; }
  .comment-item .comment-box .icon-close {
    float: right;
    padding: 4px 0px;
    font-size: 10px;
    color: #96BFBF; }
  .comment-item .comment-box .comment-detail {
    width: 100%;
    font-size: 16px;
    color: #4A9C95;
    letter-spacing: 0;
    line-height: 26px;
    margin-bottom: 5px; }
  .comment-item .comment-box .all-content {
    display: none;
    width: 100%;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 26px;
    color: #3B8FD3;
    margin-bottom: 5px; }
  .comment-item .border-none {
    border: none; }
  .comment-item .more {
    padding: 25px 15px 25px 0px;
    text-align: center;
    font-size: 16px;
    color: #3B8FD3; }
  .comment-item .more .add-btn-text {
    display: block;
    margin-bottom: 25px;
    height: 36px;
    background: rgba(74, 156, 149, 0.2);
    line-height: 36px;
    text-align: left;
    border-radius: 8px;
    padding-left: 10px;
    color: #96BFBF; }
  .comment-item .more .add-btn-margin-bottom {
    margin-bottom: 20px; }

  .comment-item-nolist {
    padding: 0px 15px; }

  html[data-pc] .comment .well h3.title {
    padding-left: 50px; }

  html[data-pc] .comment .well .comment-item {
    border-top: 1px solid rgba(74, 156, 149, 0.2); }

  html[data-pc] .comment .well .compatible-left {
    right: 50px; }

  html[data-pc] .comment-item {
    position: relative;
    padding-left: 50px; }
  html[data-pc] .comment-item .comment-box {
    border: none;
    padding-right: 50px; }
  html[data-pc] .comment-item .comment-box .btn-admire {
    right: 50px; }
  html[data-pc] .comment-item .more {
    padding: 25px 50px 25px 0px; }

  .line-clamp-6 {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    word-break: break-all; }

  .mp-dialog .inner.comment:before {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 0;
    background: none;
    top: 0; }

  .qrcode-banner {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 0 30px 0; }
  .qrcode-banner img {
    width: 100%; }

  .recommend {
    background-color: transparent; }
  .recommend .well {
    padding: 25px 30px; }
  .recommend .well h3.title {
    color: #4A9C95;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 24px; }
  .recommend .well h3.title:before {
    width: 4px;
    height: 16px;
    border-radius: 2px;
    background-color: #3B8FD3;
    content: "";
    display: inline-block;
    margin-right: 6px;
    vertical-align: bottom; }

  img.ads {
    width: 100%;
    margin-bottom: 15px; }

  img.ads-stand-alone {
    width: 100%; }

  .recommend-item {
    margin-bottom: 20px; }
  .recommend-item:last-child {
    margin-bottom: 0; }
  .recommend-item .img-container {
    float: left;
    width: 115px;
    height: 70px;
    margin-right: 10px;
    overflow: hidden; }
  .recommend-item .img-container img {
    width: 100%;
    height: 100%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    margin-top: 35px;
    -o-object-fit: cover;
    object-fit: cover; }
  .recommend-item h4.article-title {
    height: 46px;
    font-size: 18px;
    color: #4A9C95;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 7px; }
  .recommend-item .view-count {
    font-size: 12px;
    color: #96BFBF;
    letter-spacing: 0;
    line-height: 15px; }
  .recommend-item .view-count i {
    vertical-align: -2px; }

  .introduce-meipian img {
    width: 100%; }

  .circle-link {
    background-color: transparent;
    position: relative; }
  .circle-link .well {
    padding: 15px 30px; }
  .circle-link .well img.avatar {
    width: 54px;
    height: 54px;
    border-radius: 8px;
    float: left;
    margin-right: 10px; }
  .circle-link .well i {
    float: right;
    line-height: 12px;
    color: #3B8FD3;
    margin-top: 14px;
    display: inline-block;
    border: 1px solid #3B8FD3;
    padding: 6px 14px;
    font-size: 12px;
    border-radius: 4px; }
  .circle-link .well .circlename {
    font-size: 16px;
    color: #4A9C95;
    letter-spacing: 0;
    line-height: 19px;
    margin: 5px 0 10px; }
  .circle-link .well .circleinfo {
    font-size: 14px;
    color: #96BFBF;
    letter-spacing: 0;
    line-height: 17px;
    width: 60%; }
  .circle-link:before {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 8px;
    background: rgba(74, 156, 149, 0.2);
    top: -8px; }

  @media screen and (min-width: 600px) {
    .circle-link .well {
      padding: 15px 50px; } }

  .sign__root .sign {
    text-align: center;
    width: 100%;
    margin: 0px auto 20px; }
  .sign__root .sign span {
    display: inline-block;
    border: 1px solid #96BFBF;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #96BFBF;
    letter-spacing: 0;
    line-height: 20px;
    padding: 0px 8px;
    margin-bottom: 10px; }
  .sign__root .sign span:nth-child(1) {
    margin-right: 5px; }
  .sign__root .sign span:nth-child(2) {
    margin-left: 5px; }

  .ads {
    padding: 0 30px; }
  .ads .footer-section {
    margin-bottom: 33px; }

  .footer-section {
    margin: 0; }

  .sign__root .sign {
    margin: 20px auto 0px; }

  .report {
    line-height: 30px; }

  .circle-link:before {
    left: 50%;
    width: 88.26%;
    -webkit-transform: translate(-50%);
    -ms-transform: translate(-50%);
    transform: translate(-50%); }

  .comment:before {
    left: 50%;
    width: 97%;
    -webkit-transform: translate(-50%);
    -ms-transform: translate(-50%);
    transform: translate(-50%); }

  .author-link .well .nickname {
    padding-right: 26px; }

  .author-link .well .signature {
    padding-right: 80px; }

  .author-link .footer-section .clearfix i.iconfont {
    margin: 0;
    display: block;
    width: 54px;
    height: 27px;
    line-height: 27px;
    border-radius: 4px;
    border: 1px solid #4A9C95;
    color: #4A9C95;
    text-align: center;
    position: relative;
    top: 13.5px;
    font-size: 12px !important; }
  .author-link .footer-section .clearfix i.iconfont::before {
    content: "关注"; }

  .space-bg-color:before, .author-link:before, .introduce-meipian:before {
    position: absolute;
    content: "";
    display: block;
    left: 50%;
    width: 88.26%;
    height: 8px;
    background: rgba(74, 156, 149, 0.2);
    top: -8px;
    -webkit-transform: translate(-50%);
    -ms-transform: translate(-50%);
    transform: translate(-50%); }

  .author-link {
    background-color: transparent;
    position: relative;
    margin-bottom: 8px; }

  .introduce-meipian {
    position: relative; }

  .qrcode-banner {
    background-color: transparent; }
  .qrcode-banner img {
    border: 1px solid rgba(74, 156, 149, 0.2); }

  .recommend .well h3.title {
    padding: 5px 0px;
    margin-bottom: 15px; }
  .recommend .well h3.title:before {
    border-radius: 2px; }

  .comment .well a.add-comment {
    margin: 24px auto; }

  .introduce-meipian {
    padding: 0px 30px; }

  #comment {
    padding: 0 15px; }

  html[data-pc] .vote .well button.vote-btn {
    color: #96BFBF; }

  @media screen and (min-width: 500px) {
    .root.moipian {
      background-image: url("../img/t1005/95_bg_pc_1.jpg");
      background-repeat: repeat;
      background-size: 100%; }
    .cover {
      position: relative;
      font-family: PingFangSC-Regular; }
    .cover .header {
      position: relative;
      background-image: url("../img/t1005/95_bg_pc_a.jpg");
      background-size: 100% 100%;
      padding-bottom: 46.66667%; }
    .cover .auther-header-box {
      padding: 0px 74px;
      min-height: 115px;
      background-image: url("../img/t1005/95_bg_pc_b.jpg");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: top; }
    .cover .leaves-box {
      width: 100%;
      padding-bottom: 17.20%;
      position: relative;
      top: 0px;
      left: 0px; }
    .cover .leaves-box .leaves {
      width: 53px;
      height: 19px;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      background: url("../img/t1005/95_leaf.png") no-repeat 100% 100%; }
    .cover .well {
      padding: 32px 74px 20px; }
    .mp-content .well {
      padding: 0px 60px; }
    .mp-content .section {
      padding: 25px 0px; }
    .mp-content .section .img-outbox {
      padding: 30px 15px; }
    .section {
      padding: 15px 0px; }
    .section .text {
      margin: 30px 0px; }
    .section a {
      margin: 30px 0px; }
    .section video {
      width: 100%;
      background: #000000; }
    .section div.video {
      margin: 30px 0px; }
    .vote .well {
      padding: 0;
      margin: 30px 50px 24px 50px; }
    .well {
      padding: 0 50px; }
    .report .well {
      padding: 20px 50px 28px; }
    .author-link .well {
      padding: 15px 50px; }
    .qrcode-banner {
      background-color: transparent;
      padding: 24px 50px 24px; }
    .recommend .well {
      padding: 0px 50px 24px; }
    .ads {
      padding: 0px 50px 32px; }
    .space-bg-color-after:after {
      position: absolute;
      content: "";
      left: 50%;
      display: block;
      width: 96%;
      height: 8px;
      background: rgba(74, 156, 149, 0.2);
      bottom: -8px;
      -webkit-transform: translate(-50%);
      -ms-transform: translate(-50%);
      transform: translate(-50%); }
    .space-bg-color:before, .author-link:before, .introduce-meipian:before {
      position: absolute;
      content: "";
      display: block;
      left: 50%;
      width: 96%;
      height: 8px;
      background: rgba(74, 156, 149, 0.2);
      top: -8px;
      -webkit-transform: translate(-50%);
      -ms-transform: translate(-50%);
      transform: translate(-50%); } }

  .comment-item .comment-box .btn-admire {
    color: #3B8FD3; }

  .comment-item .comment-box .nickname {
    color: #3B8FD3; }

</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST,GET,AUTH,SHARE} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import download_bar from './article/download_bar.vue';
  import article_meta from './article/t1002/meta.vue';
  import article_cover from './article/t1002/cover.vue';
  import music from './article/music.vue';
  import article_content from './article/content.vue';
  import vote from './article/vote.vue';
  import reward from './article/reward.vue';
  import report from './article/report.vue';
  import coupon from './article/coupon.vue';
  import auther from './article/auther.vue';
  import recommend from './article/recommend.vue';
  import review from './article/review.vue';
  import ad from './article/ad.vue';
  import rewardDialog from './article/rewardDialog.vue';
  import Toast from '../widget/toast.vue';
  import payment from '../widget/payment.vue';
  import buyGoods from '../widget/buyGoods.vue';
  import card from './member/card.vue';
  import getCoupon from './coupon/activate.vue';
  import Dialog from '../widget/dialog.vue';
  export default {
    data() {
      return {
        logined:false,
        msg:"",
        watchTemplates: this.templates,
        watchMusicData: this.musicData,
        watchArticle: this.article,
        downloadShow:true,
        musicPlay:0,
        noWeex:true,
        isPublish:true,
//      payWay:'账户余额',
//      payPrice:'299',
        sn:'',
      }
    },
    components: {
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      Toast,
      download_bar,
      article_meta,
      music,
      article_content,
      reward,
      report,
      coupon,
      auther,
      recommend,
      review,
      ad,
      rewardDialog,
      payment,
      vote,
      card,
      buyGoods,
      article_cover
//      'weui-dialog':Dialog,
    },
    props: {
      article: {
        article: { default: function () {
          return {hits:0,title:"样例",nickName:"author",createDate:null,member:{}}
        }
        },
        musicData: { default: function () {
          return {id: ""}
        }
        },
        templates: { default: function () {
          return []
        }
        },
        htmlStr :{default:""},
      },
      created() {
        var _this = this;
        AUTH("",function (authed) {
          _this.logined  = authed;
        })
        if(utils.isweex()==true){
          this.downloadShow = false;
          this.noWeex = false;
        }
        let id = utils.getUrlParameter("id");
        this.go(id);
      },
      methods: {
        loadTop:function() { //组件提供的下拉触发方法
          this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
        },
        loadBottom:function() {
          this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        },
        onPayNotify:function (data) {
          if ("success"==data.type) {
          } else {
            this.$refs.toast.show(data.content);
          }
        },
        fetchData:function (id) {
          this.go(id);
          this.$refs.review.open(id);
          this.$refs.cardImg.open(id);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        },
        go:function (id) {
          var _this = this;
          GET('website/article/view.jhtml?id='+id).then(
            function (response) {
              if (response.type=="success") {
                _this.watchArticle = response.data;
                _this.isPublish = response.data.isPublish;
//              _this.$refs.coupon.open(response.data.member.id);
                //设置分享标题
                utils.setConfig({
                  title:_this.watchArticle.title,
                  desc:_this.watchArticle.htmlTag,
                  link:_this.watchArticle.url,
                  thumbnail:_this.watchArticle.thumbnail
                });
                SHARE(location.href);
                if (!utils.isNull(response.data.music)) {
                  _this.watchMusicData = JSON.parse(response.data.music);
                }
                if (!utils.isNull(response.data.templates)) {
                  if (response.data.mediaType==0) {
                    _this.htmlStr = response.data.templates;
                  } else {
//                  图片预览
                    var previewList = [];
                    response.data.templates.forEach(function (item) {
                      if(item.mediaType == 'product'){
                        GET('website/article/goods.jhtml?id=' + item.id).then(
                          function (data) {
                            if(data.type == 'success'){
//                           对数组对象进行操作需要 这样子才能重新渲染界面
                              _this.$set(item, 'name', data.data.name);
                              _this.$set(item, 'price', data.data.price);
                            }else{
                              _this.$refs.toast.show("服务器繁忙");
                            }
                          },function (err) {
                            _this.$refs.toast.show("网络不稳定");
                          }
                        )
                      }
//                    图片预览
                      if(item.mediaType == 'product' || item.mediaType == 'image' && !utils.isNull(item.original)){
                        previewList.push({
                          src: utils.filterThumbnail(item.original),
                          w: 900,
                          h: 1000
                        })
                      }
                    })
                    _this.$set(response.data.templates, 'previewList', previewList);
                    _this.watchTemplates = response.data.templates;
                  }
                }

              } else {
                _this.$refs.toast.show("网络不稳定");
//                 _this.$refs.toast.show('website/article/view.jhtml?id='+id);
              }
            }, function () {
              _this.$refs.toast.show("网络不稳定");
//                _this.$refs.toast.show('ssssswebsite/article/view.jhtml?id='+id);

            });
        },
        showRewardDialog:function () {
          this.$refs.rwd.show();
        },
        rewardNumber:function (m) {
          var _this = this;
          _this.$refs.toast.loading();
          POST("website/member/reward/submit.jhtml?amount="+m+"&articleId="+this.watchArticle.id).then(
            function (data) {
              if (data.type=="success") {
                _this.$refs.toast.hide();
                _this.$refs.toast.show(data);
                _this.$refs.pay.show(data.data);
              } else {
                _this.$refs.toast.hide();
                _this.$refs.toast.show(data.content);
              }
            },
            function (err) {
              _this.$refs.toast.hide();
              _this.$refs.toast.show("网络不稳定");
            }
          )
        },
        closeDownload:function () {//关闭顶部下载组件。并控制页面上移
          this.downloadShow = false;
        },
        onscroll(e){
          if(this.musicPlay == 0){//控制判断音乐。来判断从未触发音乐时滚动触发音乐，而在触发过音乐后滚动时不触发音乐事件。
            this.musicPlay = 1;
            this.$refs.musicTemplete.openPlayer();
          }
        },
        judgeMusic:function () {//控制判断音乐。来判断从未触发音乐时滚动触发音乐，而在触发过音乐后滚动时不触发音乐事件。
          this.musicPlay = 1;
        },
        buyNow:function (id) {
          if(utils.isweex()==true){
            this.$refs.toast.show('请分享到微信进行购买');
            return;
          }

          let _this = this;
          AUTH(location.href,function (authed) {
            if (authed) {
              _this.$refs.buy.show(id,_this.watchArticle.id);
            }
          })

        },
        onscroll(e){
          if(this.musicPlay == 0){//控制判断音乐。来判断从未触发音乐时滚动触发音乐，而在触发过音乐后滚动时不触发音乐事件。
            this.musicPlay = 1;
            this.$refs.musicTemplete.openPlayer();
          }
        },
      }
    }
  }
  </script>
