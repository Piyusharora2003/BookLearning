import React from 'react'

function NoPage() {

  return (
    <div className='p-1 m-1 text-danger fs-1'>
      <h1>Issues</h1>
        <ol className="list-group list-group-numbered">
            <li className="list-group-item bg-danger text-warning">Sign In/Up page redirect to home (sign-in done, signup tbc)</li>
            <li className="list-group-item bg-danger text-warning">Middleware for login neccesity pages</li>
            <li className="list-group-item text-decoration-line-through">Token retriving from browser </li>
            <li className="list-group-item"> state management properly</li>
            <li className="list-group-item"> Learn Usecallback</li>
            <li className="list-group-item">Popular Books in Home Page Currently the first eight books only </li>
        </ol>
    </div>
  )
}

export default NoPage