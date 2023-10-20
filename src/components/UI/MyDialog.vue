<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin'
  export default {
    name: 'my-dialog',
    mixins: [toggleMixin],
    mounted() {
      console.log('dialog mounted')
    }
  }
</script>

<style lang="scss" scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0, 0.5);
  position: fixed;
  display: flex;
}
.dialog_content {
  margin: auto;
  background-color: white;
  border-radius: 12px;
  min-width: 300px;
  min-height: 50px;
  }
</style>