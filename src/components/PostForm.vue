<template>
  <div class="app">
    <form @submit.prevent>
      <h4>CreatePost</h4>
      <my-input 
        v-focus
        v-model="post.title"
        type="text" 
        placeholder="title">
      </my-input>
      <my-input
        v-model="post.body"
        type="text" 
        placeholder="description">
      </my-input>
      <my-button 
      @click="createPost" 
      class="btn"
      style='align-self: flex-end; margin-top: 15px'
      >Создать
      </my-button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        post: {
          title: '',
          body: ''
        }
      }
    },
    methods: {
      createPost() {
        this.post.id = Date.now
        this.$emit('create', this.post)
        this.title = ''
        this.body = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
form {
display: flex;
flex-direction: column;
}


</style>