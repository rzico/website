<template>
         <div class="cover"  v-if="vf('1002')">
            <div class="header">
                <div class="img-container">
                    <div class="avatar" style="background-image: url('http://static2.ivwen.com/users/19789287/d6b4ac60c75747dc8550dc1109780350.jpg-thumb');">
                        <img src="http://static2.ivwen.com/users/19789287/d6b4ac60c75747dc8550dc1109780350.jpg-thumb" alt="">
                    </div>
                </div>
            </div>
            <div class="article-meta">
                <div class="well">
                    <h1 class="title">《闲赏红楼：一曲直通“本质”的生命悲歌》</h1>
                    <p class="time-read">
                        <span>2017.10.14</span>
                        <span>阅读 <span class="read-count">7569</span></span>
                    </p>
                    <p class="nickname" data-author-id="19789287" data-author-url="https://www.meipian.cn/c/19789287">鲁焕清</p>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        data() {
            return {
                template:"1002"
            }
        },
        methods: {
            vf:function (id) {
                return (this.template == id);
            }
        }

    }
</script>
