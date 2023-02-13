<template>
    <div class="panelBox">
        <div v-if="hasHeader" class="header"><slot name="header"></slot></div>
        <slot />
    </div>

</template>

<script>
    export default {
        computed: {
            hasHeader() {
                return !!this.$slots['header'];
            }
        }
    }
</script>


<style>
    .panelBox {
        border: 1px solid white;
        border-radius: 10px;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 10px;
    }

    .panelBox .header {
        font-weight: bold;
        font-size: 20px;
        text-align:center;
    }
</style>
