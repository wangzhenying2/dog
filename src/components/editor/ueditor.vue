<template>
    <div>
        <el-upload class="hide" action="/api/uploadimg" name="imageFile" :data="fileArg" :multiple="true" :on-success="onUploadSuccess" :file-list="fileList" style="display:none">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <iframe :ref="frameId" :src="frameSrc" :width="config.frameWidth" :height="config.frameHeight" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name: 'ueditor',
    props: {
        config: {
            type: Object
        },
        value: {
            type: String,
            default: ''
        }
    },
    watch: {
        value (val, oldVal) {
            if (val !== null) {
                this.initEditor()
            }
        }
    },
    data () {
        return {
            fileArg: {
                width: '*',
                height: '*',
                dir: this.config.id + '/'
            },
            fileList: [],
            frameId: Math.random().toString(16).substring(2) + 'ueditorId',
            frameSrc: 'static/ueditor/editor.html'
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.initEditor()
            // 临听子iframe及孙子iframe事件
            window.addEventListener('message', (e) => {
                if (typeof e.data === 'string') {
                    var data = JSON.parse(e.data)
                    switch (data.ret) {
                    case 'change':
                        this.$emit('change', data.content)
                        break
                    case 'upload':
                        // 清空之前的列表
                        this.fileList = []
                        document.querySelector('.el-upload').click()
                        break
                    default:
                        break
                    }
                }
            }, false)
        })
    },
    methods: {
        initEditor () {
            let data = {
                ret: 'init',
                content: this.value
            }
            window.frames[0].postMessage(JSON.stringify(data), '*')
        },
        onUploadSuccess (res, file, list) {
            this.fileList.push({
                name: res.filename,
                url: res.path
            })
            let data = {
                ret: 'sendFile',
                list: this.fileList
            }
            window.frames[0].postMessage(JSON.stringify(data), '*')
        }
    }
}
</script>
