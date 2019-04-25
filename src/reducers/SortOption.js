
export default (state = {option: "none"}, action) => {
	switch (action.type) {
		case "ASCENDING":
			return {
				option: "ascending"
			}
		case "DESCENDING":
			return {
				option: "descending"
			}
		case "NONE":
			return {
				option: "none"
			}

		default:
			return state
	}
}
