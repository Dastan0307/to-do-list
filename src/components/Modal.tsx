import React, { useEffect } from 'react'
import type { Task } from '../pages/MainPage'
import styles from '../styles/Modal.module.scss'

interface Props {
	isOpen: boolean
	onClose: () => void
	onSave: (task: Omit<Task, 'status'>) => void
	editingTask: Task | null
}

const Modal: React.FC<Props> = ({ isOpen, onClose, onSave, editingTask }) => {
	const [title, setTitle] = React.useState('')
	const [description, setDescription] = React.useState('')
	const [deadline, setDeadline] = React.useState('')

	useEffect(() => {
		if (editingTask) {
			setTitle(editingTask.title)
			setDescription(editingTask.description)
			setDeadline(editingTask.deadline)
		} else {
			setTitle('')
			setDescription('')
			setDeadline('')
		}
	}, [editingTask])

	if (!isOpen) return null

	const handleSave = () => {
		if (!title.trim()) return alert('Введите заголовок')
		onSave({
			id: editingTask?.id,
			title,
			description,
			deadline,
		})

    setTitle('')
    setDescription('')
    setDeadline('')
	}

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) onClose()
	}

	return (
		<div className={styles.overlay} onClick={handleOverlayClick}>
			<div className={styles.modal}>
				<h2 className={styles.title}>
					{editingTask ? 'Edit Note' : 'New Note'}
				</h2>
				<input
					className={styles.input}
					value={title}
					onChange={e => setTitle(e.target.value)}
					placeholder='Title'
				/>
				<input
					className={styles.input}
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder='Description'
				/>
				<input
					type='date'
					className={styles.input}
					value={deadline}
					onChange={e => setDeadline(e.target.value)}
				/>
				<div className={styles.buttons}>
					<button className={styles.btnClose} onClick={onClose}>
						Cancel
					</button>
					<button className={styles.btnSave} onClick={handleSave}>
						{editingTask ? 'Update' : 'APPLY'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Modal
