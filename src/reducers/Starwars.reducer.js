import axios from 'axios';

export const GET_STARWARS = "@@starwars/GET_STARWARS";

const api = "https://swapi.co/api/people/";
const searchApi = "https://swapi.co/api/people/?search=";
const config = {
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	}
}

let cacheState = [];

const fixSpecies = parentData => async dispatch => {
		let allSpeciesPromise = [], count = 0;
		parentData.data.results.forEach(result=> {
			allSpeciesPromise.push(axios.get(result.species, config));
		});
		return Promise.all(allSpeciesPromise).then(data => {
			data.forEach(species => {
		 		parentData.data.results[count].species = species.data.name;
				count++;
			});
			dispatch({type: GET_STARWARS, payload: parentData.data});
			dispatch({type:'SET_LOADER', payload: false});	
		});
}


export const getStarwars = (page=1) => async dispatch => {
	dispatch({type:"SET_LOADER", payload: true})
	const starWarsPromise = page === 1? axios.get(`${api}`, config) : axios.get(`${api}?page=${page}`, config);

	return starWarsPromise
			.then(data =>{
				console.log(data.data.results);
				dispatch(fixSpecies(data))
			})
			.catch(err => {
				dispatch({type: "ERROR", payload: true})
				dispatch({type:'SET_LOADER', payload: false})
			})
}


export const searchStarwars = (searchInput, page=1) => async dispatch => {
	dispatch({type:"SET_LOADER", payload: true})
	if (searchInput){
		const starWarsPromise = page === 1? axios.get(`${searchApi}${searchInput}`, config) : axios.get(`${searchApi}${searchInput}&page=${page}`, config);

		return starWarsPromise
				.then(data =>{
					console.log(data.data.results);
					dispatch(fixSpecies(data))
				})
				.catch( err => {
					console.log(err);
					dispatch({type: "ERROR", payload: true});
					dispatch({type:'SET_LOADER', payload: false});
				})
	}
}

export default (state = {total: 0, results: []}, action) => {
	let newStateResults;
	switch (action.type) {
		case GET_STARWARS:
			cacheState = {results : action.payload.results,
				total: action.payload.count}
			return {
				...state,
				results : action.payload.results,
				total: action.payload.count
			}
		case "ASCENDING":
			newStateResults = [...state.results];
			newStateResults = newStateResults.sort((a, b) => {
				 if(a.name < b.name) { return -1; }
				 if(a.name > b.name) { return 1; }
				 return 0;
			})
			return {
				...state,
				results: newStateResults
			}
		case "DESCENDING":
			newStateResults = [...state.results];
			newStateResults = newStateResults.sort((a, b) => {
				 if(a.name < b.name) { return 1; }
				 if(a.name > b.name) { return -1; }
				 return 0;
			});
			return {
				...state,
				results: newStateResults
			}
		case "NONE":
			return {
				...state,
				results: cacheState.results
			}

		default:
			return state
	}
}
