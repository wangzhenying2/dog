<template>
    <div>
        <!--遮罩层-->
        <div class="mark"></div>
        <div class="dialog_out">
            <div class="dialog" :style="style">
                <!--弹窗头部-->
                <div class="dialog_t">
                    <div class="dialog_text">{{title}}</div>
                    <div class="dialog_closebtn" @click="closeEvent"></div>
                </div>
                <!--弹窗内容-->
                <div class="dialog_c">
                    <slot></slot>
                </div>
                <!--弹窗按钮组-->
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            style: ''
        }
    },
    props: ['title', 'width'],
    watch: {
        data (val, oldVal) {
        }
    },
    mounted () {
        this.style = 'width:' + this.width
    },
    methods: {
        init () {
        },
        closeEvent () {
            this.$emit('close')
        }
    }
}
</script>
<style>
.dialog_out, .mark {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
}
.dialog_out {
    display:flex;
    justify-content:center;
    vertical-align: middle;
}
.dialog {
    background-color: #fff;
    border: 1px solid #35a8be;
}
.mark{
    background-color: #999;
    opacity:0.5;
    height: 100%;
}
.dialog_t {
    border-bottom: 1px solid #35a8be;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.5rem;
    padding: 0 0.5rem;
    display: -webkit-flex; /* Safari */
    -webkit-justify-content: space-between; /* Safari 6.1+ */
    display: flex;
    justify-content: space-between;
    -webkit-box-pack:justify;

}
.dialog_t .dialog_closebtn{
    width: 2rem;
    height: 2rem;
    background: url(../assets/img/close_btn.png) no-repeat 0 0;
    background-size: cover;
    margin-top: 0.5rem;
    cursor: pointer;
}
.dialog-footer {
    text-align: center;
    padding: 1rem 0;
}
.dialog-footer span {
    display: inline-block;
    width: 4rem;
    height: 2rem;
    line-height: 2rem;
    border:1px solid #35a8be;
    border-radius: 0.5rem;
    color: #35a8be;
    cursor: pointer;
}
.dialog-footer .submit {
    background-color: #35a8be;
    color: #fff;
    margin-right: 1rem;
}
</style>