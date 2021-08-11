import React from 'react'
import './inforBar.css';
import closeIcon from '../icons/closeIcon.png';
import onlineIcon from '../icons/onlineIcon.png';

export default function infoBar( {room} ) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} />
                    <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close Image" /></a>
            </div>
        </div>
    )
}
