export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoState {
    pending: boolean;
    todos: ITodo[];
    error: string | null;
}

export interface FetchTodoSuccessPayload {
    todos: ITodo[];
}

export interface FetchTodoFailurePayload {
    error: string;
}