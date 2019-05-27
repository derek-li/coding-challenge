import React, { Component } from 'react';

import { selectTaskById } from '../utilities/selectors';

import Task from './task';

export default class GroupDetail extends Component<Props> {

	constructor(props) {
		super(props);
		this.state = {
			tasks: props.tasks
		}
	}

	handleClick(task, tasks) {
		let locked;
		
		if (task.completedAt !== true) {
			for (var i = 0; i < task.dependencyIds.length; i++) {
				const dependentTask = selectTaskById(tasks, task.dependencyIds[i]);
				if (dependentTask.completedAt !== true) {
					locked = true;
				}
			}
		}

		if (!locked) {
			task.completedAt = !task.completedAt;

			// Recursively check for all tasks that were dependent on the task
			// that was just toggled.
			
			this.toggleDependentTasks(task, tasks);
		}

		this.setState({tasks: tasks});
	}

	toggleDependentTasks(task, tasks) {
		for (var key in tasks) {
			for (var i = 0; i < tasks[key].dependencyIds.length; i++) {
				if (tasks[key].dependencyIds[i] === task.id) {
					tasks[key].completedAt = false;
					this.toggleDependentTasks(tasks[key], tasks);
				}
			}
		}
	}

	renderTasks() {
		const { group, tasks } = this.props;
		let tasksArray = [];

		for (var i = 0; i < group.tasks.length; i++) {
			tasksArray.push(selectTaskById(tasks, group.tasks[i]));
		}

		if (tasksArray.length !== 0) {
			return <div className="all tasks">
				{tasksArray.map(function(task, key) {
					return <Task
						key={key}
						allTasks={tasks}
						task={task}
						onClick={() => this.handleClick(task, tasks)}
					/>
				}, this)}
			</div>
		}
	}

	render() {
		const { group } = this.props;

		return (
			<div className="task-list">
				<div className="header">
					{group.title}
					<span 
						className="return-link"
						onClick={() => this.props.onClick()}

					>
						ALL GROUPS
					</span>
				</div>
				{this.renderTasks()}
			</div>
		);
	} 
}