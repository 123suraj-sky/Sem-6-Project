// "rafce" shortcut is used
import React from 'react'
import './css/Home.css'

const About = () => {
  return (
    <div className='title'>
      <div className="d-flex align-items-center flex-column m-4 p-5 h2">
        <p>This website is created by students of B.Sc.(Hons). Computer Science</p>
        <p>For B.Sc. 3rd year final year project</p>
      </div>

      <ul className='d-flex justify-content-between align-items-center m-5 p-5 list-unstyled h3'>
        <li className='my-5'>Suraj Kumar Yadav</li>
        <li className='my-5'>Pushkar Kumar</li>
        <li className='my-5'>Abhishek Rao</li>
        <li className='my-5'>Shashwat Dwivedi</li>
      </ul>
    </div>
  )
}

export default About;