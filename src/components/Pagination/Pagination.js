import React from 'react';
import './Pagination.scss';

const Pagination = ({total, Page, updatePage}) => {

	const pages = Math.ceil(total / 10)
	let pagination = []
	if (pages) {		
		pagination.push(
			<div className="page-numbers" key={'<'} style={{display: (Page - 1 < 1)? 'none': 'block'}}>
				<button className="page-btns" alt="go four pages back" onClick={()=>updatePage(Page-1)}>{'<'}</button>
			</div>
		)
		if (pages <= 5) {
			for(let i=1; i <= pages; i++) {
				pagination.push(
					<div className="page-numbers" key={i}>
							<button className="page-btns" onClick={()=>updatePage(i)} style={{backgroundColor: (Page === i)? '#000' : '#fff', color: (Page === i)? '#fff' : '#000'}}>
								{i}
							</button>
					</div>
					)
			}	
		} else {
			const middle = Page
				for(let i = 1; i <= pages; i++) {
					if ( i === 1 || i === middle - 1 || i === middle || i === middle + 1 || i === pages) {
						pagination.push(
							<div className="page-numbers" key={i}>
									<button className="page-btns" onClick={()=>updatePage(i)} style={{backgroundColor: (Page === i)? '#000' : '#fff', color: (Page === i)? '#fff' : '#000'}}>
										{i}
									</button>
							</div>
						)
					}
					else if (i === middle - 2 || i === middle + 2) {
							pagination.push(
								<div className="page-numbers" key={i}>
									{"..."}
								</div>
						)
					}

				}	
			}	

		pagination.push(
			<div className="page-numbers" key={'>'} style={{display: (Page + 1 > pages)? 'none': 'block'}}>
				<button className="page-btns" alt="go a page forward" onClick={()=>updatePage(Page+1)}>{'>'}</button>
			</div>
		)
	
	}

	return (
		<>
			<p style={{margin: '0', padding: '0'}}>{pages === Page? total: Page * 10} of {total}</p>
			<div className="pagination-div">
				{pagination}
			</div>
		</>
	)
}


export default Pagination