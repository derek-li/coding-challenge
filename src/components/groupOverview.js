import React, { Component } from 'react';
import './groupOverview.css';

import { selectTaskById } from '../utilities/selectors';

import { ReactComponent as Group } from '../assets/group.svg';

export default class GroupOverview extends Component<Props> {

	render() {
		const { group, tasks } = this.props;

		const totalTasksPerGroup = group.tasks.length;
		let tasksCompleted = 0;

		for (var i = 0; i < group.tasks.length; i++) {
			let task = selectTaskById(tasks, group.tasks[i]);
			if (task.completedAt === true) {
				tasksCompleted++;
			}
		}

		return (
			<div 
				className="group-overview"
				onClick={() => this.props.onClick()}
			>
				<Group className="icon" />
				<div>
					<div className="title">
						{group.title}
					</div>	
					<div className="tasks-completed">
						{tasksCompleted} OF {totalTasksPerGroup} COMPLETE
					</div>
				</div>

			</div>
		);
	} 
}

				