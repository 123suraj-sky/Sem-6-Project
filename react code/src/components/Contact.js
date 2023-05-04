import React from 'react'
import './css/Home.css'

const Contact = () => {
  return (
    <div className='title'>
      <div className="d-flex align-items-center flex-column mx-5 p-4 h2">
        <p>Connect With Us:</p>
      </div>

      <ul className='d-flex justify-content-between align-items-center mx-5 px-5 list-unstyled h3'>
        <li className='my-5'><i class="fa-brands fa-facebook"></i></li>
        <li className='my-5'><i class="fa-brands fa-instagram"></i></li>
        <li className='my-5'><i class="fa-brands fa-twitter"></i></li>
        <li className='my-5'><i class="fa-brands fa-discord"></i></li>
      </ul>

      <div className="d-flex align-items-center flex-column m-4 p-5">
        <p className='h2'>Contact Details:</p>
        <p>Email: projecthelp@gmail.com</p>
        <p>Phone: 1234567890</p>
        <p>Address: Computer Science Department, BHU</p>
      </div>


    </div>
  )
}

export default Contact;