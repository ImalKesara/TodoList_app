import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// export function useStorage<Value>(
//   key: string,
//   initalValue: Value
// ): Writable<Value> {
//   let serialize = JSON.stringify;
//   let deserialize = JSON.parse;

//   let storedValues: Value | null = deserialize(localStorage.getItem(key));

//   let store = writable(storedValues !== null ? storedValues : initalValue);

//   store.subscribe((value) => localStorage.setItem(key, serialize(value)));

//   return store;
// }
export function useStoragee<Value>(
  key: string,
  initialValue: Value
): Writable<Value> {
  let serialize = JSON.stringify;
  let deserialize = JSON.parse;

  // Retrieve the value from localStorage or use the initial value if not found
  let storedValue: Value | null = deserialize(localStorage.getItem(key));
  let store = writable(storedValue !== null ? storedValue : initialValue);

  store.subscribe((value) => localStorage.setItem(key, serialize(value)));

  return store;
}
