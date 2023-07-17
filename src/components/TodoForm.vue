<template>
  <div v-if="loading">
    Loading..
  </div>
  <form 
    v-else
    @submit.prevent="onSave"
    class="ml-3 mr-3"
  >
    <div class="row">
      <div class="col-6">
        <Input 
          label="제목" 
          v-model:subject="todo.subject"
          :error="subjectError"
        />
      </div>
      <div v-if="editing" class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button 
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? '완료' : '미완료' }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group"> 
          <label>내용</label>
          <textarea v-model="todo.body" class="form-control" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>
    
    <button 
      type="submit" 
      class="btn btn-primary"
      :disabled="!todoUpdated"
    >
      {{ editing ? '수정 되었습니다' : '추가'}}
    </button>
    <button 
      class="btn btn-outline-dark ml-2"
      @click="moveToTodoListPage"
    >
      취소
    </button>
  </form>

</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import { ref, computed } from 'vue';
import _ from 'lodash';
import { useToast } from '@/composables/toast';
import Input from '@/components/Input.vue';

export default {
  components: {
    Input
  },
  props: {
      editing: {
          type: Boolean,
          default: false
      }
  },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            completed: false,
            body: ''
        });

        const subjectError = ref('');
        const originalTodo = ref(null);
        const loading = ref(false);
        const {
          toastMessage,
          toastAlertType,
          showToast,
          triggerToast
        } = useToast();

        const todoId = route.params.id      

        const getTodo = async () => {
            loading.value = true;
          try {
            const res = await axios.get(`todos/${todoId}`);

            todo.value = { ...res.data };
            originalTodo.value = { ...res.data };

            loading.value = false;
          } catch (error) {
            loading.value = false;
            console.log(error);
            triggerToast('문제가 발생하였습니다.', 'danger');
          }
        };

        const todoUpdated = computed(() => {
          return !_.isEqual(todo.value, originalTodo.value)
        });

        const toggleTodoStatus = () => {
          todo.value.completed = !todo.value.completed;
        };

        const moveToTodoListPage = () => {
          router.push({
            name: 'Todos'
          })
        };

        if (props.editing) {
            getTodo();
        }

        const onSave = async () => {
          subjectError.value = '';
          if (!todo.value.subject) {
            subjectError.value = '제목은 필수 항목입니다.';
            return;
          }

          try {
            let res;
            const data = {
              subject: todo.value.subject,
              completed: todo.value.completed,
              body: todo.value.body,
            };
            if (props.editing) {
              res = await axios.put(`todos/${todoId} `, data);
              originalTodo.value = {...res.data};
            } else {
              res = await axios.post('todos', data);
              todo.value.subject = '';
              todo.value.body = '';
            }
            
            const message = '항목이 ' + (props.editing ? '수정되었습니다.' : '생성되었습니다.');
            triggerToast(message);

            if(!props.editing){
              router.push({
                name:'Todos'
              })
            }
          } catch (error) {
            console.log(error);
            triggerToast('Something went wrong', 'danger')
          }
        };

        return {
          todo,
          loading,
          toggleTodoStatus,
          moveToTodoListPage,
          onSave,
          todoUpdated,
          showToast,
          toastMessage,
          toastAlertType,
          subjectError,
        };
    }
}
</script>

<style scoped>

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateY(0px);
  }
</style>