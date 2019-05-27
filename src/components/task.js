import React, { Component } from 'react';
import './task.css';

import { selectTaskById } from '../utilities/selectors';

import { ReactComponent as Completed } from '../assets/completed.svg';
import { ReactComponent as Incomplete } from '../assets/incomplete.svg';
import { ReactComponent as Locked } from '../assets/locked.svg';

export default class Task extends Component<Props> {

	renderSVG(completionStatus) {
		
		if (completionStatus === 'locked') {
			return (
				<Locked />
			);
		} else if (completionStatus === 'incomplete') {
			return (
				<Incomplete />
			);
		} else {
			return (
				<Completed />
			);
		}

	}

	render() {
		const { task, allTasks } = this.props;
		let completionStatus;

		if (task.completedAt !== true) {
			completionStatus = 'incomplete';

			for (var i = 0; i < task.dependencyIds.length; i++) {
				const dependentTask = selectTaskById(allTasks, task.dependencyIds[i]);
				if (dependentTask.completedAt !== true) {
					completionStatus = 'locked';
				}
			}
		} else {
			completionStatus = 'completed';
		}


		return (
			<div className="task">
				<div
					className="icon" 
					onClick={() => this.props.onClick()}
				>
					{this.renderSVG(completionStatus)}
				</div>
				<div className="title">
					<span className={completionStatus}>
						{task.task}
					</span>
				</div>
			</div>
		);
	} 
}

				