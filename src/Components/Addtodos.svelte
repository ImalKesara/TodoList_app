<script lang="ts">

    type AddTodoType = (todo:string) => void
    type ToggleCompleted = (event:MouseEvent) =>void
    type todoAmount = (number)


    export let addTodo : AddTodoType
    export let toggleCompleted :ToggleCompleted
    export let todosamount :todoAmount

    let todo = ''
    function handleSubmit(){
        addTodo(todo)
        todo = ''
    }
</script>

<form  on:submit|preventDefault={handleSubmit}>
    {#if todosamount > 0}
    <input type="checkbox" class="toggle-all" id ="toggle-all" on:click={toggleCompleted}>
    <label for="toggle-all" aria-label="Marks all as complete">Marks all as complete</label>
    <input bind:value={todo} id="new-todo" class="new-todo" placeholder="What needs to be done" type="text" autofocus>
    {/if}
</form>

<style>

    
  
    .toggle-all {
        width: 1px;
        height: 1px;
        position: absolute;
        opacity: 0;
    }
    
    .toggle-all + label {
        position: absolute;
        font-size: 0;
    }
    
    .toggle-all + label:before {
        content: '❯';
        display: block;
        padding: var(--spacing-16);
        font-size: var(--font-24);
        color: var(--color-gray-58);
        transform: rotate(90deg);
    }
    
    .toggle-all:checked + label:before {
        color: var(--color-gray-28);
    }

    @media only screen and (max-width: 412px) {
        .new-todo {
            background-color: rgb(0, 0, 0);
            width: 100%;
            padding: var(--spacing-16);
            padding-left: 60px;
            font-size: 10px;
            border: none;
            border-bottom: 1px solid var(--shadow-1);
    }
    }

    
    .new-todo {
        background-color: white;
        width: 100%;
        padding: var(--spacing-16);
        padding-left: 60px;
        font-size: var(--font-24);
        border: none;
        border-bottom: 1px solid var(--shadow-1);
    }
    
    
    
</style>