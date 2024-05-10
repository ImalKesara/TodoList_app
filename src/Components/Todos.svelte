<script lang="ts">
    import type { ITodo } from "$root/types/todos"
    import {fade,slide} from "svelte/transition"
    import '$root/styles/Todos.css'
    type CompleteTodoType = (id:string) => void
    type RemoveTodoType = (id:string)=> void
    type EditTodoType = (id:string, newTodo : string) => void
    type DurationType = number

    export let todo :ITodo
    export let completeTodo : CompleteTodoType
    export let removeTodo : RemoveTodoType
    export let editTodo : EditTodoType
    export let duration : DurationType

    let editing =  false
    function toggleEdit(){
      editing =  true
    }

    function handleEdit(event:KeyboardEvent, id : string){
      let pressedKey = event.key
      let targetElement = event.target as HTMLInputElement
      let newTodo = targetElement.value

      switch(pressedKey){
        case 'Escape':
            targetElement.blur()
            break
        case 'Enter':
            editTodo(id,newTodo)
            targetElement.blur()
            break
      }
    }

    function handleBlur(event : FocusEvent, id : string){
        let targetElement = event.target as HTMLInputElement
        let newTodo = targetElement.value
        editTodo(id,newTodo)
        editing = false
    }

</script>

<li 
in:slide= {{duration}} out:fade = {{duration}}
class:editing class="todo">
    <div class="todo-item">
        <div>
            <input on:change={()=>completeTodo(todo.id)} checked={todo.completed} id="todo" class="toggle" type = "checkbox">
            <label for="todo" aria-label="Check todo" class="todo-check"/>
        </div>
        <span 
        on:dblclick={toggleEdit}
        class:completed={todo.completed}
        class="todo-text">{todo.text}</span>
        <button aria-label="Remove todo" class="remove" on:click={()=>removeTodo(todo.id)} />
    </div>

    {#if editing}
    <input type="text" class="edit" autofocus value={todo.text} on:keydown={(event)=> handleEdit(event,todo.id)} on:blur={(event)=> handleBlur(event,todo.id)}>
    {/if} 
</li>