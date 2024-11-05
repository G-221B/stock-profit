<template>
    <div class="error_tips_modal" v-if="visiable">
        <svg t="1730603795835" class="error-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13671" ><path d="M827.392 195.584q65.536 65.536 97.792 147.456t32.256 167.936-32.256 167.936-97.792 147.456-147.456 98.304-167.936 32.768-168.448-32.768-147.968-98.304-98.304-147.456-32.768-167.936 32.768-167.936 98.304-147.456 147.968-97.792 168.448-32.256 167.936 32.256 147.456 97.792zM720.896 715.776q21.504-21.504 18.944-49.152t-24.064-49.152l-107.52-107.52 107.52-107.52q21.504-21.504 24.064-49.152t-18.944-49.152-51.712-21.504-51.712 21.504l-107.52 106.496-104.448-104.448q-21.504-20.48-49.152-23.04t-49.152 17.92q-21.504 21.504-21.504 52.224t21.504 52.224l104.448 104.448-104.448 104.448q-21.504 21.504-21.504 51.712t21.504 51.712 49.152 18.944 49.152-24.064l104.448-104.448 107.52 107.52q21.504 21.504 51.712 21.504t51.712-21.504z" p-id="13672"></path></svg>
        系统繁忙，请稍后再试
    </div>
</template>

<script>
export default {
    data() {
        return {
            visiable: false,
        }
    },
    methods: {
        show() {
            this.visiable = true;
            setTimeout(() => {
                this.visiable = false;
            }, 3000)
        }
    }
}
</script>

<style lang="scss">
.error_tips_modal {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    position: fixed;
    left: 50%;
    top: 6%;
    width: 4rem;
    height: .8rem;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    border-radius: .1rem;
    font-size: .3rem;
    color: #333;
    .error-icon {
        width: .4rem;
        height: .4rem;
        fill: #ff4d4f;
        margin-right: 0.1rem;
    }
}
</style>