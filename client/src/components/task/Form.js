import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

  const options = [
  { value: 1, label: 'Facile' },
  { value: 2, label: 'Moyen' },
  { value: 3, label: 'Difficile' },
  ]

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  constructor(props) {
    super(props)
    this.state = {
    };
}

  goBack =() => {
    this.props.hide();
  }

  renderField = data => {
    data.input.className = 'form-control';

    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return (
      <div className={`form-group`}>
        <label
          htmlFor={`task_${data.input.name}`}
          className="form-control-label"
        >
          {data.label}
        </label>
        <input
          {...data.input}
          type={data.type}
          step={data.step}
          required={data.required}
          placeholder={data.placeholder}
          id={`task_${data.input.name}`}
        />
        {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
      </div>
    );
  };

  render() {
    return (
      <div className="addTaskForm">
        <h1>Nouvelle tâche</h1>
        <form onSubmit={this.props.handleSubmit}>
          <Field
            component={this.renderField}
            name="name"
            type="text"
            label="Nom de la tâche"
            placeholder="Ex: Passer la sepillière..."
          />

          {/* <Dropdown id="task_hardness" name="hardness" options={options} onChange={this._onSelect} placeholder="Choisir la difficulté" /> */}
          <label for="hardness">Complexité de la tâche</label>
          <Field id="task_hardness" name="hardness" component="select">
              <option hidden value="default">Niveau</option>
              <option value="1">Facile</option>
              <option value="2">Moyen</option>
              <option value="3">Difficile</option>
            </Field>

          <button type="submit" className="">
            Ajouter
          </button>
          <button type="button" onClick={() => this.goBack()} id="quitAddTask">
            Annuler
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'task',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);



