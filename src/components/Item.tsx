import editIcon from '../assets/Frame 6.svg'
import deleteIcon from '../assets/trash-svgrepo-com 1.svg'
import type { Task } from '../pages/MainPage'
import styles from '../styles/Item.module.scss'

interface Props {
	task: Task
	onDelete: (id: number) => void
	onToggleStatus: (id: number) => void
	onEdit: (task: Task) => void
}

const Item = ({ task, onDelete, onToggleStatus, onEdit }: Props) => {
	return (
		<div className={styles.item_wrapper}>
			<div className={styles.item}>
				<label className={styles.checkboxContainer}>
					<input
						type='checkbox'
						checked={task.status === 'completed'}
						onChange={() => onToggleStatus(task.id)}
						className={styles.checkboxInput}
					/>
					<span className={styles.checkmark}></span>
				</label>

				<div
					className={`${styles.textBlock} ${
						task.status === 'completed' ? styles.completed : ''
					}`}
				>
					<p className={styles.text}>{task.title}</p>
					<p className={styles.text}>{task.description}</p>
					<p className={styles.text}>DEADLINE: {task.deadline}</p>
				</div>

				<div className={styles.icons}>
					<img
						src={editIcon}
						alt='edit'
						onClick={() => onEdit(task)}
						className={styles.icon}
					/>
					<img
						src={deleteIcon}
						alt='delete'
						onClick={() => onDelete(task.id)}
						className={styles.icon}
					/>
				</div>
			</div>
		</div>
	)
}

export default Item
