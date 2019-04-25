import React,{Component} from 'react';
import {connect} from 'react-redux';
import './Nav.scss';

class Nav extends Component {
	state = {
		searchInput : '',
		shouldShowOptions: false,
		showSortOptions: "noAnimation"
	}

	handleChange = e => {
		this.setState({
			searchInput: e.target.value
		})
	}

	handleKeyPress = e => {
		if (e.key === 'Enter' && this.state.searchInput) {
      			this.props.doSearch(this.state.searchInput);				
    	}
	}
	render(){
	const { sortOption, sortSearch } = this.props;
	const showSortOptions = this.state.shouldShowOptions? "animate" : "noAnimation";

	const sortText = () => {
		switch (sortOption.option){
			case "none":
				return <>Sort results...</>
			case "ascending":
				return <>Ascending</>
			case "descending":
				return <>Descending</>
			default:
				return <>Sort results...</>
		}
	}
	return (
		<div className="nav">
			<input type="text" placeholder="Search..." className="search-input"
					onChange={e => this.handleChange(e)} 
					onKeyPress={e => this.handleKeyPress(e)}/>
			<div>
				<div className="dropdown" onClick={()=> this.setState({shouldShowOptions:!this.state.shouldShowOptions})}>
					<div className="dropdown-btn">
						{sortText()}
						<i className="fa fa-caret-down"></i>
					</div>
				</div>
				<div className={`dropdown-options ${showSortOptions}`} onClick={()=> this.setState({shouldShowOptions:!this.state.shouldShowOptions})}>
						<div className="opt" onClick={() => sortSearch("NONE")}>None</div>
						<div className="opt" onClick={() => sortSearch("ASCENDING")}>Ascending</div>
						<div className="opt" onClick={() => sortSearch("DESCENDING")}>Descending</div>
				</div>
			</div>
		</div>
	)
 }
}

const mapStateToProps = state => {
	return {
		sortOption: state.SortOption	
	}
}

const mapDispatchToProps = dispatch => {
	return {
		sortSearch: (order) => dispatch({type: order})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

