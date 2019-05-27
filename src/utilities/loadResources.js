// Create-react-app restricts imports from outside the 
// src folder unless disabled with an eject operation

export function loadResource(resource) {
	const getResource = new XMLHttpRequest();
	const resourceURL = 'http://localhost:3000/' + resource;

	getResource.open('GET', resourceURL, false);
	getResource.send(null);

	if (getResource.status === 200) {
		return getResource.response;
	}
}
