import React from 'react'

function NoPage() {

  return (
    <div className='p-1 m-1 text-danger fs-1'>
      <h1>Issues</h1>
        <ol className="list-group list-group-numbered">
            <li className="list-group-item">Sign In/Up page redirect to home (sign-in done, signup tbc)</li>
            <li className="list-group-item"> Learn Usecallback</li>
            <li className="list-group-item text-decoration-line-through">(almost) Popular Books in Home Page Currently the first eight books only </li>
            <li className="list-group-item">Api corrections </li>
            <li className="list-group-item">crisp the csv file</li>
            <li className="list-group-item">update to csv file when new product added </li>
        </ol>
    </div>
  )
}

export default NoPage