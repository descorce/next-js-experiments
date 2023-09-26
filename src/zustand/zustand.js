import { prisma } from "@src/app/db";
import { create } from "zustand";

const intialState = {
	todos: [],	
}
	


export const useZustandStore = create((set, get) => ({
	...intialState,
	addTodo: async (todo) => {
		await prisma.todo.create({ data: { ...todo }})
		
		set({
			todos: [...get().todos, todo]	
		})
	},
	getTodos: async () => {
		const todos = await prisma.todo.findMany()

		set({
			todos: [...todos]
		})

		return todos
	},
	toggleTodo: async (id, complete) => {
		await prisma.todo.update({ where: { id }, data: { complete }})
	}
}))