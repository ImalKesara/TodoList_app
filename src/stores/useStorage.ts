import type { Writable } from 'svelte/store';

export function useStorage<Value>(
  key: string,
  initalValue: Value
): Writable<Value> {
  let serialize = JSON.stringify;
  let deserialize = JSON.parse;

  let storedValues: Value | null = deserialize(localStorage.getItem(key));

  let store = writable(storedValues ? storedValues : initalValue);
  store.subscribe((value) => localStorage.setItem(key, serialize(value)));

  return store;
}
