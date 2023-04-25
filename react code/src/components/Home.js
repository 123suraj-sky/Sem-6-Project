// "rafce" shortcut is used
import React from 'react'
import Notes from './Notes';

const Home = (props) => {
    const { showAlert } = props;
    return (
        <div>
            <Notes showAlert={showAlert} />
        </div>
    )
}

export default Home

/*
 Above can also be wriiten as
 
 export const Home = () => {
    ...

 }

 instead of 

const Home = () => {
    ...
}
export default Home
 */

