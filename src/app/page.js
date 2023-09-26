import Link from "next/link"
import { useZustandStore } from "@src/zustand/zustand"
import TodoItem from "@src/components/todoItem";

async function updateToDo(id, complete) {
	'use server'
	const { toggleTodo } = useZustandStore.getState();
	
	await toggleTodo(id, complete);
}

export default async function Home() {
	const { getTodos } = useZustandStore.getState();
	const todos = await getTodos();
	
  return (
		<>
			<header className="flex justify-between items-center mb-4">
				<h1 className="text-2xl">Todos</h1>
				<Link 
					href="/new"
					className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within::bg-slate-700 outline-none"
				>
					New
				</Link>
			</header>
			<ul className="pl-4">
				{todos?.map((todo) => (
					<TodoItem
						key={todo.id}
						title={todo.title}
						id={todo.id}
						complete={todo.complete}
						toggleTodo={updateToDo}
					/>
				))}
			</ul>
		</>
  )
}
