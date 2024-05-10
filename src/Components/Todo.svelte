<script lang="ts">
    import type { FillterType,ITodo } from "$root/types/todos";
    import {useStorage} from '$root/types/useStorage';

    import AddTodo from './Addtodos.svelte'
    import Todo from './Todos.svelte'
    import TodosLeft from './TodosLeft.svelte'
    import {tick} from 'svelte'
    import FilterTodos from "./FilterTodos.svelte";
    import ClearTodos from "./ClearTodos.svelte"
    import '$root/styles/Todo.css'

    
    let todos: ITodo[] = [
      { id: '1e4a59703af84', text: 'DutchTodos van der Linde', completed: true },
      { id: '9e09bcd7b9349', text: 'Arthur Morgan', completed: false },
    ]
    
    // todos = useStorage<ITodo[]>('todos',[]);
    // let todos: ITodo[] = useStorage<ITodo[]>('todos', []);


    let filtering = false

    // type FillterType = 'all' | 'active' | 'completed';
    let selectedFilter: FillterType = 'all'
    $: console.log(todos)
    $: completeTodoo = todos.filter(todo=> todo.completed).length
    $: todosamount = todos.length
    $: incompletetodos = todos.filter((todo)=> !todo.completed).length
    $: filltertodos =  fillterTodos(todos,selectedFilter)
    $: {localStorage.setItem('todos', JSON.stringify(todos))}
    $: duration = filtering ? 0 : 250

    console.log(duration)

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
      todos = [...todos, newTodo]
    }

    // toggleCompleted
    function toggleCompleted(event:MouseEvent) : void{
        let {checked } = event.target as HTMLInputElement

        todos = todos.map(todo =>({
            ...todo,
            completed :checked
        }))
    }

    // completeTodo
    function completeTodo(id:string) :void{
      todos = todos.map(todo => {
        if(todo.id == id){
          todo.completed = !todo.completed
        }
        return todo;
      })
    }

    function removeTodo(id: string): void {
      todos = todos.filter(todo => {
          return todo.id !== id;
      });
    }

    // edit todo

    function editTodo(id :string, newTodo: string):void {
        let currenTodo = todos.findIndex((todo)=>{
            return todo.id == id
        })
        todos[currenTodo].text = newTodo
    }

    async function setFilter(newFilter: FillterType):Promise <void>{
      filtering = false
      await tick()
      selectedFilter = newFilter
      await tick()
      filtering = true
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
      todos = todos.filter(todo=> todo.completed !== true)
    }
</script>


<main>
    <h1 class="title">#Blacklist</h1>
    <section class="todos">
        <AddTodo {addTodo} {toggleCompleted} {todosamount} />
        {#if todosamount}
        <ul class="todo-list">
                {#each filltertodos as todo (todo.id) }
                  <Todo {todo} {completeTodo} {removeTodo} {editTodo} {duration}/>
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