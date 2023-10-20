<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="post">
    <div>
      <div> {{ post.id }} likes = {{ $store.state.likes }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{post.body}}</div>
    </div>
    <div class="post_btn">
      <my-button
      @click="$emit('remove', post)">
        Удалить
      </my-button>
      <my-button
      @click="$router.push(`/posts/${post.id}`)">
        Открыть
      </my-button>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      post: {
        type: Object,
        requred: true,
      }
    }
  }
</script>

<style lang="scss" scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between
  }
</style>