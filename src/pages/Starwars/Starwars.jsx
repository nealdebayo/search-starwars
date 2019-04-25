import React,{Component} from 'react';
import { connect } from 'react-redux';
import './Starwars.scss';
import EachStarwar from './../../components/EachStarwar/EachStarwar';
import Pagination from './../../components/Pagination/Pagination';
import Loader from './../../components/Loader/Loader';
import Error from './../../components/Error/Error';
import Nav from './../../components/Nav/Nav';
import queryString from 'query-string';
import {getStarwars, searchStarwars} from './../../reducers/Starwars.reducer'

class Starwars extends Component {

	constructor(props){
		super(props);
		const thePage = parseInt(queryString.parse(props.location.search).page);
		const theSearchInput = queryString.parse(props.location.search).search;
		this.state = {
			currentSearch: (theSearchInput)? theSearchInput: '',
			currentPage: (thePage && !isNaN(thePage))? thePage: 1
		}
	}
	componentDidMount(){
		const { currentSearch, currentPage } = this.state;
		if(currentSearch){
			return this.props.makeSearch(currentSearch, currentPage)
		}
		return this.props.getPeople(currentPage);
	}

	getSearch = s => {
		this.props.history.push(`/?search=${s}`);
		this.props.makeSearch(s);
		this.setState({
			currentSearch: s,
			currentPage: 1
		})
	}

	updatePage = p => {
		const {currentSearch} = this.state;
		this.setState({
			currentPage: p
		})
		if (this.state.currentSearch){
			this.props.makeSearch(currentSearch,p);
			return this.props.history.push(`/?search=${currentSearch}&page=${p}`);
		}
		this.props.getPeople(p);
		return this.props.history.push(`/?page=${p}`);
	}

	render(){
	const { currentPage } = this.state;
	const { starwars, loading, error } = this.props;

	const starwarLogic = () => {
		if (loading.value){
			return <Loader />
		}
		if (error.value){
			return <Error />
		}
		if (starwars.results.length > 0){
			return(
				<div className="starwars">
					{starwars.results.map(eachStarWar => <EachStarwar key={eachStarWar.name} species={eachStarWar.species} name={eachStarWar.name} height={eachStarWar.height} mass={eachStarWar.mass} gender={eachStarWar.gender}/>)}
				</div>
			);
		}
		return(
			<div className="no-starwar">
				<div className="danger">
					<i className="fa fa-exclamation-triangle"></i>
				</div>
				<div className="message">
					<p>We couldn&apos;t find the droids you were looking for</p>
					<p className="extra">please try a different search query</p>
				</div>
			</div>
			);
	}
	return (
		<>
          <Nav doSearch={(s) => this.getSearch(s)}/>
          {starwarLogic()}
          <section style={{display: loading.value || error.value || starwars.results.length === 0? 'none': ''}}>
          <Pagination total={starwars.total} Page={currentPage} updatePage={this.updatePage}/>
          </section>
		</>
	)
 }
}

const mapStateToProps = state => {
	return {
		starwars: state.Starwars,
		loading: state.Loading,
		error: state.Error	
	}
}

const mapDispatchToProps = dispatch => {
	return {
		makeSearch: (s, p) => dispatch(searchStarwars(s, p)),
		getPeople: (p) => dispatch(getStarwars(p))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Starwars);