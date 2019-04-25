import React from 'react'
import './EachStarwar.scss'

const EachStarwar = ({ name, mass, height, gender, species }) => {
	const speciesAvatar = _ => {
		switch(species){
			case "Droid":
				return <i className="fa fa-android"></i>
			case "Human":
				return <i className="fa fa-user-circle"></i>
			default:
				return <i className="fa fa-question"></i>
		}
	}

	return (
		<div className="eachstarwar">
			<div className="avatar">
				{speciesAvatar()}
			</div>
			<div className="key-details">
				<div className="name">
					<p>{name}</p>
				</div>
				<div className="other-details">
				<p>Height: {height} &nbsp;&nbsp;<font className="full-stop">.</font>&nbsp;Mass: {mass}&nbsp;&nbsp; 
					<font className="full-stop">.</font>&nbsp;Gender: {gender}</p>
				</div>
			</div> 
		</div>
	)
}

export default EachStarwar