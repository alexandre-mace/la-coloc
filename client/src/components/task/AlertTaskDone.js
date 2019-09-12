import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AlertTaskDone = (props) => {

  return (
    <div className={`done ${props.showAlert ? 'done--displayed': ''}`}>
      <div className="done__square">
        
      </div>
      <div>
        <div>
          <p>Tâche accomplie</p>
          <p>Une bonne chose de faite</p>
        </div>
        <p>consulter l'equilibre</p>
      </div>
      <div>

      </div>
    </div>
  )
}

export default AlertTaskDone
