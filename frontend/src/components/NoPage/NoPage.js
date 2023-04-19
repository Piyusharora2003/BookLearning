import React from 'react'

function NoPage() {

  return (
    <div className='p-1 m-1 text-danger fs-1'>
      <h1>Issues</h1>
        <ol className="list-group list-group-numbered">
            <li className="list-group-item">Sign In/Up page redirect to home (sign-in done, signup tbc)</li>
            <li className="list-group-item"> Learn Usecallback</li>
            <li className="list-group-item">Popular Books in Home Page Currently the first eight books only </li>
            <li className="list-group-item">Api corrections </li>
            <li className="list-group-item">Dotenv file creation </li>
            <li className="list-group-item">add QNA (basic one)[Accordin] to the product page </li>
            <li className="list-group-item">implement chat gpt api to product page </li>
        </ol>
    </div>
  )
}

export default NoPage