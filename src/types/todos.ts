export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export type FillterType = 'all' | 'active' | 'completed';
