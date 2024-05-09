<script lang="ts">
    export let incompletetodos : number
</script>

<span class="todo-count">
    {incompletetodos} 
    {incompletetodos == 1 ? 'item' : 'items'}
</span>