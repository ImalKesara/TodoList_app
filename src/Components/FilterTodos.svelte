<script lang="ts">
    import type { FillterType } from '$root/types/todos';
    import '$root/styles/Filter.css'
  
    type SetFilterType = (newFilter: FillterType) => void;
  
    export let selectedFilter: FillterType;
    export let setFilter: SetFilterType;
  
    function handleFilterClick(filter: FillterType) {
      setFilter(filter);
    }
  </script>
  
  <div class="filters">
    <button class="filter {selectedFilter === 'all' ? 'selected' : ''}" on:click={() => handleFilterClick('all')}>All</button>
    <button class="filter {selectedFilter === 'active' ? 'selected' : ''}" on:click={() => handleFilterClick('active')}>Active</button>
    <button class="filter {selectedFilter === 'completed' ? 'selected' : ''}" on:click={() => handleFilterClick('completed')}>Completed</button>
  </div>

  