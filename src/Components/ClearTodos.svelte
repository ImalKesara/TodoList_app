<script lang="ts">
    type ClearCompletedType = () => void
    type CompletedTodosType = number

    export let clearcompleted : ClearCompletedType
    export let completeTodoo : CompletedTodosType
</script>

<button
on:click={clearcompleted}
class:hidden={completeTodoo===0}
class="clear-completed">Clear Todos</button>