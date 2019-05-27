import React, { Component } from 'react';
import './App.css';

import { loadResource } from './utilities/loadResources';
import { generateGroups } from './utilities/reducers';
import { selectGroupById } from './utilities/selectors';

import GroupOverview from './components/groupOverview';
import GroupDetail from './components/groupDetail';
 
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groups: {},
			tasks: {},
			view: 0
		}
	}

	componentDidMount() {
		const tasks = JSON.parse(loadResource('data.json'));
		const groups = generateGroups(tasks);

		this.setState({groups, tasks});
	}

	handleClick(group) {
		if (group) {
			this.setState({view: group.id});
		} else {
			this.setState({view: 0});
		}
	}

	renderTaskGroups() {
		const { groups, tasks } = this.state;

		const groupsArray = Object.values(groups);

		if (groupsArray.length !== 0) {
			return <div className="all groups">
				{groupsArray.map(function(group, key) {
					return <GroupOverview
						key={key}
						group={group}
						tasks={tasks}
						onClick={() => this.handleClick(group)}
					/>
				}, this)}
			</div>
		}
	}

	render() {
		const { groups, tasks, view } = this.state;

		if (view === 0) {
			return (
				<div className="task-list">
					<div className="header">
						Things To Do
					</div>
					{this.renderTaskGroups()}
				</div>
			);	
		} else {
			const group = selectGroupById(groups, view)

			return <GroupDetail
				group={group}
				tasks={tasks}
				onClick={() => this.handleClick()}
			/>;
		}
	}
}
