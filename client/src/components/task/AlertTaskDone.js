import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AlertTaskDone = (props) => {

  return (
    <div className={`done ${props.showAlert ? 'done--displayed': ''}`}>
      <div className='done__circle' /> 
      <img className="done__image" src={require('../../assets/image/champagne.png')} />
      <div className="done__content">
        <div>
          <p className='done__mainText'>Tâche accomplie</p>
          <p className='done__secondText'>Une bonne chose de faite</p>
        </div>
        <button onClick={props.openBalancedTab} className="done__button">Consulter l'equilibre</button>
      </div>
      <button onClick={props.displayTaskDone} className="done__close">
        <svg xmlns="http://www.w3.org/2000/svg" width="8.292" height="8.292">
          <path d="M8.111 1.06a.616.616 0 0 0 0-.87l-.01-.01a.615.615 0 0 0-.87 0l-2.96 2.96a.176.176 0 0 1-.251 0L1.06.18a.616.616 0 0 0-.87 0L.18.19a.615.615 0 0 0 0 .87l2.96 2.96a.176.176 0 0 1 0 .251L.18 7.231a.616.616 0 0 0 0 .87l.01.01a.615.615 0 0 0 .87 0l2.96-2.96a.176.176 0 0 1 .251 0l2.96 2.96a.616.616 0 0 0 .87 0l.01-.01a.615.615 0 0 0 0-.87l-2.96-2.96a.176.176 0 0 1 0-.251z" fill="#292727"/>
        </svg>
      </button>
    </div>
  )
}

export default AlertTaskDone
