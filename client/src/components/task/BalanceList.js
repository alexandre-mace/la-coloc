import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { doneList, reset } from '../../actions/task/doneList';
import { Doughnut } from 'react-chartjs-2';

class BalanceList extends Component {
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
    this.props.doneList();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page)
      nextProps.doneList(
        nextProps.match.params.page &&
        decodeURIComponent(nextProps.match.params.page)
      );
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  render() {
    const data = {
      labels: [],
      datasets: [{
        label: '# of Votes',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }

    if (this.props.retrieved) {
      const userBalanceDatas = {};
      this.props.retrieved['hydra:member'].forEach((task) => {
        let userFirstName = task.createdBy.firstName

        if (!(userBalanceDatas.hasOwnProperty(task.createdBy.firstName))) {
          userBalanceDatas[userFirstName] = task.hardness + 1
        } else {
          userBalanceDatas[userFirstName] = userBalanceDatas[userFirstName] + task.hardness + 1
        }
      })


      for (let [key, value] of Object.entries(userBalanceDatas)) {
        data.labels.push(key)
        data.datasets[0].data.push(value)
      }
    }



    return (
      <div className={"container"}>
        <div className={"row"}>
          <div className="col">
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
          </div>
        </div>
        <div className={"row"}>
          <div className="col">
            {this.props.retrieved &&
            <Doughnut data={data} />
            }
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Historique des tâches</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ul className={""}>
              {this.props.retrieved &&
              this.props.retrieved['hydra:member'].map(item => (
                <li key={item['@id']} className={"d-flex justify-content-between"}>
                    <div className={"mr-3"}>{item['name']}</div>
                    <div>{item['hardness']}</div>
                    <div>{item.createdBy && `Ajouté par ${item.createdBy.firstName}`}</div>
                </li>
              ))}
            </ul>
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
  } = state.task.doneList;
  return { retrieved, loading, error, eventSource, deletedItem };
};

const mapDispatchToProps = dispatch => ({
  doneList: page => dispatch(doneList(page, '?done=true')),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BalanceList);
