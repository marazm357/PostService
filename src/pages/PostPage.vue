<template>
  <h1>Страница с постами</h1>
  <my-input v-model="searchQuery" placeholder="Поиск..." v-focus>
  </my-input>
  <div class="app_btns">
    <my-button
      @click="showDialog"
      style="margin: 15px 0;">
      Создать пост
    </my-button>
    <my-select
    v-model="selectedSort"
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
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios'
  export default {
    components: {
      PostForm, PostList
    },
    data() {
      return {
        posts: [],
        dialogVisible: false,
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По содержимому'},
        ]
      }
    }, 
    methods: {
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
      async fetchPosts() {
        try{
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit) 
          this.posts = response.data
        }
        catch {
          alert('error')
        } 
      },
      async loadMorePosts() {
        try{
          this.page += 1;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit) 
          this.posts = [...this.posts, ...response.data];
        }
        catch {
          alert('error')
        } 
      },
      // changePage(pageNumber) {
      //   this.page = pageNumber;
      // }
    },
    mounted() {
      this.fetchPosts();
      console.log(this.$refs.observer); 
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
      sortedPosts() {
        return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        )
      },
      sortedAndSearchedPosts() {
        return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
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