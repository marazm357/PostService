<template>
  <h1>Страница с постами</h1>
  <my-input 
  :model-value="searchQuery"
  @update:model-value="setSearchQuery"
  placeholder="Поиск..." 
  v-focus>
  </my-input>
  <div class="app_btns">
    <my-button
      @click="showDialog"
      style="margin: 15px 0;">
      Создать пост
    </my-button>
    <my-select
    :model-value="selectedSort"
    @update:model-value="setSelectedSort"
    :options="sortOptions"
    >
  </my-select>
  </div>
  
  <my-dialog v-model:show="dialogVisible">
    <post-form
    @create="createPost">
    </post-form>
  </my-dialog>

  <post-list
    :posts="sortedAndSearchedPosts"
    @remove="removePost"
    v-if="!isPostsLoading">
  </post-list>
  <div v-else>Идет загрузка ...</div>
  <div v-intersection="loadMorePosts" class="observer"></div>
  <!-- <div class="page_wrapper">
    <div v-for="pageNumber in totalPages" 
    :key="pageNumber" class="page" 
    :class="{
      'current-page': page === pageNumber
      }"
      @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
    </div>
  </div> -->
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  export default {
    components: {
      PostForm, PostList
    },
    data() {
      return {
        dialogVisible: false
      }
    }, 
    methods: {
      ...mapMutations({
        setPage: 'post/setPage',
        setSearchQuery: 'post/setSearchQuery',
        setSelectedSort: 'post/setSelectedSort'
      }),
      ...mapActions({
        loadMorePosts: 'post/loadMorePosts',
        fetchPosts: 'post/fetchPosts'
      }),
      createPost(post) {
        this.posts.push(post);
        this.dialogVisible = false
      },
      removePost(post) {
        this.posts = this.posts.filter(p => p.id !== post.id)
      },
      showDialog() {
        this.dialogVisible = true
      },
      // changePage(pageNumber) {
      //   this.page = pageNumber;
      // }
    },
    mounted() {
      this.fetchPosts();
      // console.log(this.$refs.observer); 
      //   const options = {
      //     rootMargin: "0px",
      //     threshold: 1.0,
      //   };
      //   const callback = (entires) => {
      //     if(entires[0].isIntersecting && this.page < this.totalPages) {
      //       this.loadMorePosts()
      //     }
      //   };
      // const observer = new IntersectionObserver(callback, options);
      // observer.observe(this.$refs.observer);

    },
    // watch: {
    //   page() {
    //     this.fetchPosts()
    //   }
    // },
    computed: {
      ...mapState({
        posts: state => state.post.posts,
        isPostsLoading: state => state.post.isPostsLoading,
        selectedSort: state => state.post.selectedSort,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPages: state => state.post.totalPages,
        sortOptions: state => state.post.sortOptions
      }),
      ...mapGetters({
        sortedPosts: 'post/sortedPosts',
        sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
      })
    },
  }
</script>

<style lang="scss">

.app_btns {
  display: flex;
  justify-content: space-between;
}
.page_wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}




.observer {
  height: 30px;
  background: green;
}

</style>