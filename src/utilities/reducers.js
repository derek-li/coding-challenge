export function generateGroups(tasks) {

	let groupId = 1;

	return tasks.reduce(function(groups, task) {
		

		if (groups[task.group] !== undefined) {
			groups[task.group].tasks.push(task.id);
		} else {
			groups[task.group] = {
				id: groupId,
				title: task.group,
				tasks: [task.id]
			};

			groupId++;
		}

		return groups;
	}, {});

}
