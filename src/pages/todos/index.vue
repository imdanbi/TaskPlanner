<template>
  <div class="ml-3 mr-3">
    <div class="d-flex justify-content-between mb-3 ">
      <h2>Memo List</h2>
      <button 
      class="btn btn-info"
        @click="moveToCreatePage"
      >
        메모 추가
      </button>
    </div>
    
    <input
      class="form-control"
      type="text" 
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    >
    <hr />
    
    <div v-if="!todos.length">
      표시할 항목이 없습니다.
    </div>
    <TodoList 
      :todos="todos" 
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <Pagination 
    v-if="todos.length"
      :numberOfPages="numberOfPages"
      :currentPage="currentPage"
      @click="getTodos"
    />
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoList from '@/components/TodoList.vue';
import axios from '@/axios';
import { useToast } from '@/composables/toast';
import {useRouter} from 'vue-router';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    TodoList,
    Pagination
  },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    let limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });

    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast
    } = useToast();

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
        triggerToast('Something went wrong', 'danger')
      }    
    };

    getTodos();

    const addTodo = async (todo) => {
      //db저장

      error.value = '';
      try {
        await axios.post('todos', {
          subject: todo.subject,
          completed: todo.completed,
        });

        getTodos(1);
      } catch (err) {
        console.log(err);
        error.value = '문제가 발생하였습니다.';
        triggerToast('문제가 발생하였습니다', 'danger')
      }
    };

    const deleteTodo = async (id) => {
      error.value = '';
    
      try {
        await axios.delete('todos/' + id);
        
        getTodos(1);
      } catch (err) {
        console.log(err);
        error.value = '문제가 발생하였습니다.';
        triggerToast('문제가 발생하였습니다', 'danger')
      }
    };

    const toggleTodo = async (index, checked) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('todos/' + id, {
          completed: checked
        });

        todos.value[index].completed = checked
      } catch (err) {
        console.log(err);
        error.value = '문제가 발생하였습니다.';
        triggerToast('문제가 발생하였습니다', 'danger')
      }
      
    };

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate',
      })
    };

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000);     
    });

    return {
      searchTodo,
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      toastMessage,
      toastAlertType,
      showToast,
      moveToCreatePage,
    };
  }
}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>