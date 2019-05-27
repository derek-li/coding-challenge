export function selectGroupById(groups, id) {
	for (var key in groups) {
		if (groups[key].id === id) {
			return groups[key];
		}
	}
}

export function selectTaskById(tasks, id) {
	for (var key in tasks) {
		if (tasks[key].id === id) {
			return tasks[key];
		}
	}
}