export interface Todo {
  id: number;  // номер задачи
  text: string;  //название задачи
  completed: boolean; //готова/не готова 
  createdAt: Date; //дата создания
}