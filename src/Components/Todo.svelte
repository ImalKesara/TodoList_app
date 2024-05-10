<script lang="ts">
    import type { FillterType,ITodo } from "$root/types/todos";
    import AddTodo from './Addtodos.svelte'
    import Todo from './Todos.svelte'
    import TodosLeft from './TodosLeft.svelte'
    import FilterTodos from "./FilterTodos.svelte";
    import ClearTodos from "./ClearTodos.svelte"
    import '$root/styles/Todo.css'
    import {useStorage} from '$root/stores/useStorage'

    // state
        // { id: '1e4a59703af84', text: 'Todo 1', completed: true },
        // { id: '9e09bcd7b9349', text: 'Todo 2', completed: false },
        // { id: '9e4273a51a37c', text: 'Todo 3', completed: false },
        // { id: '53ae48bf605cc', text: 'Todo 4', completed: false },
    // let todos: ITodo[] = JSON.parse(localStorage.getItem('todos')) ?? []



    let todos = useStorage<ITodo[]>('todos',[])


    // type FillterType = 'all' | 'active' | 'completed';
    let selectedFilter: FillterType = 'all'

    $: completeTodoo = $todos.filter((todo)=> todo.completed).length
    $: todosamount = $todos.length
    $: incompletetodos = $todos.filter((todo)=> !todo.completed).length
    $: filltertodos =  fillterTodos($todos,selectedFilter)

    function generateRandomId(): string{
        return Math.random().toString(16).slice(2)
    }


    // add new item
    function addTodo(todo: string): void {
      let newTodo: ITodo = {
        id: generateRandomId(),
        text: todo,
        completed: false,
      }
      $todos = [...$todos, newTodo]
    }

    // toggleCompleted
    function toggleCompleted(event:MouseEvent) : void{
        let {checked } = event.target as HTMLInputElement

        $todos = $todos.map(todo =>({
            ...todo,
            completed :checked
        }))
    }

    // completeTodo
    function completeTodo(id:string) :void{
      $todos = $todos.map(todo => {
        if(todo.id == id){
          todo.completed = !todo.completed
        }
        return todo;
      })
    }

    function removeTodo(id: string): void {
      $todos = $todos.filter(todo => {
          return todo.id !== id;
      });
    }

    // edit todo

    function editTodo(id :string, newTodo: string):void {
        let currenTodo = $todos.findIndex((todo)=>{
            return todo.id == id
        })

        $todos[currenTodo].text = newTodo
    }

    function setFilter(newFilter: FillterType):void{
      selectedFilter = newFilter
    }

    function fillterTodos(todos: ITodo[], filter: FillterType): ITodo[] {
    switch (filter) {
      case 'all':
        return todos
      case 'active':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed)
    }

    
  }

  function clearcompleted():void{
      $todos = $todos.filter(todo=> todo.completed !== true)
    }


    



</script>


<main>
    <h1 class="title">Todos</h1>
    <section class="todos">
        <AddTodo {addTodo} {toggleCompleted} {todosamount} />
        {#if todosamount}
        <ul class="todo-list">
                {#each filltertodos as todo (todo.id) }
                  <Todo {todo} {completeTodo} {removeTodo} {editTodo}/>
                {/each}
            </ul>

            <div class="actions">
                <TodosLeft {incompletetodos}/>
                <FilterTodos {selectedFilter} {setFilter} />
                <ClearTodos {clearcompleted} {completeTodoo}/>
            </div>
            {/if}

    </section>
</main>