<!-- eslint-disable vue/valid-v-for -->

<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <TransitionGroup name="post-list">
      <post-item
      v-for="post in posts"
      :post="post"
      :key='post.id'
      @remove="$emit('remove', post)">
      </post-item>
    </TransitionGroup>
    
  </div>
  <h2 v-else style="color: red;"> Список постов пуст</h2>
</template>

<script>
import PostItem from './PostItem.vue';
  export default {
    components: {
      PostItem
    },
    props: {
      posts: {
        type: Array,
        requred: true
      }}
  }
</script>

<style lang="scss" scoped>
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-list-move {
  transition: transform 0.6s ease;
}
</style>