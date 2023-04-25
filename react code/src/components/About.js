// "rafce" shortcut is used
// import React, { useContext, useEffect } from 'react'
import React from 'react'
// import noteContext from '../context/notes/noteContext'

const About = () => {
  /*
  * notes
  const a = useContext(noteContext);

  useEffect(() => {
    a.update();
    // below comment is to make sure that it will run only time so don't give warning for that
    // eslint-disable-next-line
  }, []);
  */

  return (
    <div>
      {/* This is About page {a.state.name} and he is in class {a.state.class} */}
      {/* This is About page {a.name} and he is in class {a.class} */}
      {/* use a.name and a.class when not using 
      useEffect */}

      this is about page
    </div>
  )
}

export default About;