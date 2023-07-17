<template>
    <div class="text-center">
    <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li v-if="currentPage !== 1" class="page-item">
              <a 
                  style="cursor: pointer" 
                  class="page-link" 
                  @click="onClick(currentPage - 1)"
              >
                 ◀
              </a>
          </li>
          <li
            v-for="page in numberOfPages"
            :key="page" 
            class="page-item"
            :class="currentPage === page ? 'active' : ''"
          >
              <a 
                  style="cursor: pointer" 
                  class="page-link" 
                  @click="onClick(page)"
              >{{page}}</a>
          </li>
          <li v-if="numberOfPages !== currentPage" class="page-item">
              <a 
                  style="cursor: pointer" 
                  class="page-link" 
                  @click="onClick(currentPage + 1)"
              >▶</a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  import { getCurrentInstance } from 'vue';
  export default {
      props: {
          numberOfPages: {
              type: Number,
              required: true
          },
          currentPage: {
              type: Number,
              required: true
          }
      },
      emits: ['click'],
      setup() {
          const { emit } = getCurrentInstance();
          const onClick = (page) => {
              emit('click', page)
          };
  
          return {
              onClick
          }
      }
  }
  </script>
  
  <style>
  .pagination{
      justify-content: center;
  }
  </style>