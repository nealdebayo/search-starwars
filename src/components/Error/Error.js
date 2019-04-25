import React from 'react'

const Error = (props) => {
	return (
		<div style={{width: '100%', textAlign: 'center', marginTop: '40px', fontSize: '24px'}}>
			Error in connection<br />
			Please refresh the page to retry
			<p>Use Chrome with 
			<a href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en"
				target="_blank" rel="noopener noreferrer">
				 &nbsp;this plugin
				</a>
			</p>
		</div>
	)
}

export default Error