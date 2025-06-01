import { useEffect, useState } from 'react'
import darkIcon from '../assets/Color Scheme (1).svg'
import searchIcon from '../assets/Vector.svg'
import Item from '../components/Item'
import Modal from '../components/Modal'
import styles from '../styles/Main.module.scss'

export type Task = {
	id: number
	title: string
	description: string
	deadline: string
	status: 'in_progress' | 'completed'
}

const Main = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [tasks, setTasks] = useState<Task[]>([])
	const [filter, setFilter] = useState('all')
	const [search, setSearch] = useState('')
	const [editingTask, setEditingTask] = useState<Task | null>(null)

	useEffect(() => {
		const saved = localStorage.getItem('tasks')
		if (saved) setTasks(JSON.parse(saved))
	}, [])

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const handleOpenModal = () => {
		setEditingTask(null)
		setIsModalOpen(true)
	}

	const handleEdit = (task: Task) => {
		setEditingTask(task)
		setIsModalOpen(true)
	}

	const handleSave = (
		newTask: Omit<Task, 'id' | 'status'> & { id?: number }
	) => {
		if (newTask.id != null) {
			setTasks(prev =>
				prev.map(task =>
					task.id === newTask.id ? { ...task, ...newTask } : task
				)
			)
		} else {
			setTasks(prev => [
				...prev,
				{
					id: Date.now(),
					...newTask,
					status: 'in_progress',
				},
			])
		}
		setIsModalOpen(false)
	}

	const handleDelete = (id: number) => {
		setTasks(prev => prev.filter(task => task.id !== id))
	}

	const handleToggleStatus = (id: number) => {
		setTasks(prev =>
			prev.map(task =>
				task.id === id
					? {
							...task,
							status: task.status === 'completed' ? 'in_progress' : 'completed',
					  }
					: task
			)
		)
	}

	const filteredTasks = tasks.filter(task => {
		const matchesStatus = filter === 'all' || task.status === filter
		const matchesSearch = task.title
			.toLowerCase()
			.includes(search.toLowerCase())
		return matchesStatus && matchesSearch
	})

	return (
		<main className={styles.main}>
			<div className={styles.main_block}>
				<h2 className={styles.title}>TODO LIST</h2>
				<div className={styles.search}>
					<div className={styles.input_wrapper}>
						<input
							type='text'
							placeholder='Search note...'
							className={styles.input_field}
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
						<img src={searchIcon} alt='search' className={styles.searchIcon} />
					</div>
					<select
						className={styles.select}
						value={filter}
						onChange={e => setFilter(e.target.value)}
					>
						<option value='all'>ALL</option>
						<option value='in_progress'>IN PROGRESS</option>
						<option value='completed'>COMPLETED</option>
					</select>
					<img src={darkIcon} alt='theme' className={styles.icon_dark} />
				</div>
				{filteredTasks.map(task => (
					<Item
						key={task.id}
						task={task}
						onDelete={handleDelete}
						onToggleStatus={handleToggleStatus}
						onEdit={handleEdit}
					/>
				))}
				<button onClick={handleOpenModal}>Добавить задачу</button>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSave}
				editingTask={editingTask}
			/>
		</main>
	)
}

export default Main
