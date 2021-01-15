import  PostApi from './utils/PostApi'
import React, { useContext } from 'react'







function Postes({data}) {
    const postApi = useContext(PostApi)


    return (
        <div className='Outer'>
            <div className="top">
                <h1>Tittle :{ data.name}</h1>
            </div>
            <div className="bottom">
                <h1>Content : {data.body}</h1>
            </div>
        </div>
    )
}

export default Postes
