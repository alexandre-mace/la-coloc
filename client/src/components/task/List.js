import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/task/list';
import CustomMaterialIconDoneButton from "../../utils/CustomMaterialIconDoneButton";
import CustomMaterialIconAddButton from "../../utils/CustomMaterialIconAddButton";
import {
  fetch,
} from '../../utils/dataAccess';

class List extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    deletedItem: PropTypes.object,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.list(
      this.props.match.params.page &&
        decodeURIComponent(this.props.match.params.page)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page)
      nextProps.list(
        nextProps.match.params.page &&
          decodeURIComponent(nextProps.match.params.page)
      );
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  finishTask = (id) => {
    fetch(`${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        done: true
      })
    }).then(response => response
        .json()
        .then((data) => {
          this.props.list(
            this.props.match.params.page &&
              decodeURIComponent(this.props.match.params.page)
          );
        })
      )
  }

  render() {
    return (
      <div>
        {this.props.loading && (
          <div className="alert alert-info">Loading...</div>
        )}
        {this.props.deletedItem && (
          <div className="alert alert-success">
            {this.props.deletedItem['@id']} deleted.
          </div>
        )}
        {this.props.error && (
          <div className="alert alert-danger">{this.props.error}</div>
        )}
        <div>
          <ul>
            {this.props.retrieved &&
            this.props.retrieved['hydra:member'].map(item => (
              <li key={item['@id']} className={"p-0 d-flex align-items-center justify-content-between task-list-item"}>
                <div className={"d-flex align-items-center align-self-start mt-3"}>
                  <div className={`hardness-indicator hardness-indicator-${item.hardness}`}>
                  </div>
                  <div className={`mr-2 hardness-round-indicator hardness-round-indicator-${item.hardness}`}>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <p className={"mr-3 task-list-item-title font-weight-bold"}>{item['name']}</p>
                  <p className={"task-list-item-subtitle"}>{`Tâche ajoutée par ${item.createdBy.firstName}`}</p>
                  <p className={"task-list-item-secondary-action mt-2"}>Supprimer cette tâche</p>
                </div>
                <div className={"d-flex task-list-item-button-wrapper ml-auto"}>
                  <div className="m-auto">
                    <CustomMaterialIconDoneButton onPress={() => this.finishTask(item['@id'])} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {this.props.retrieved && this.props.retrieved['hydra:totalItems'] === 0 &&
          <div className="row">
            <div className="col">
              <p className={'text-center'}>
                Il n’y a aucune tâche à réaliser pour le moment. Crée en une et commence une liste.
              </p>
            </div>
          </div>
        }
        <div className="row mt-3">
          <div className="col">
            <div className="d-flex">
              <div className="m-auto">
                <Link to="/tasks/create">
                  <CustomMaterialIconAddButton/>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/*// {this.pagination()}*/}
      </div>
    );
  }

  pagination() {
    const view = this.props.retrieved && this.props.retrieved['hydra:view'];
    if (!view) return;

    const {
      'hydra:first': first,
      'hydra:previous': previous,
      'hydra:next': next,
      'hydra:last': last
    } = view;

    return (
      <nav aria-label="Page navigation">
        <Link
          to="."
          className={`btn btn-primary${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&lArr;</span> First
        </Link>
        <Link
          to={
            !previous || previous === first ? '.' : encodeURIComponent(previous)
          }
          className={`btn btn-primary${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&larr;</span> Previous
        </Link>
        <Link
          to={next ? encodeURIComponent(next) : '#'}
          className={`btn btn-primary${next ? '' : ' disabled'}`}
        >
          Next <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link
          to={last ? encodeURIComponent(last) : '#'}
          className={`btn btn-primary${next ? '' : ' disabled'}`}
        >
          Last <span aria-hidden="true">&rArr;</span>
        </Link>
      </nav>
    );
  }

  renderLinks = (type, items) => {
    if (Array.isArray(items)) {
      return items.map((item, i) => (
        <div key={i}>{this.renderLinks(type, item)}</div>
      ));
    }

    return (
      <Link to={`../${type}/show/${encodeURIComponent(items)}`}>{items}</Link>
    );
  };
}

const mapStateToProps = state => {
  const {
    retrieved,
    loading,
    error,
    eventSource,
    deletedItem
  } = state.task.list;
  return { retrieved, loading, error, eventSource, deletedItem };
};

const mapDispatchToProps = dispatch => ({
  list: page => dispatch(list(page)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
