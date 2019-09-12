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
          'rgba(255, 126, 71, 1)',
          'rgba(93, 163, 152, 1)',
          'rgba(255, 183, 22, 1)',
          'rgba(50, 119, 107, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }

    let laziestUser = null;
    const userColors = {};

    if (this.props.retrieved) {
      function checkTaskIsDone(task) {
        return task.done === true;
      }
      function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }

      const doneTasks =  this.props.retrieved['hydra:member'].filter(checkTaskIsDone)
      const userBalanceDatas = {};
      doneTasks.forEach((task) => {
        if (task.doneBy && !(userBalanceDatas.hasOwnProperty(task.doneBy))) {
          userBalanceDatas[task.doneBy] = task.hardness + 1
        }
        else {
          userBalanceDatas[task.doneBy] = userBalanceDatas[task.doneBy] + task.hardness + 1
        }
      })


      for (let [key, value] of Object.entries(userBalanceDatas)) {
        data.labels.push(key)
        data.datasets[0].data.push(value)
      }
      data.labels.forEach((label, index) => {
        userColors[label] = data.datasets[0].backgroundColor[index]
      })

      console.log(userColors);

      const smallestPointAmount = Math.min(data.datasets[0].data);
      laziestUser = getKeyByValue(userBalanceDatas, smallestPointAmount);
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
            <>
            <Doughnut data={data} />
              {laziestUser !== undefined &&
              <p className={'text-center'}>{`Courage ${laziestUser}`}</p>
              }
            </>
            }
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <p className={"last-done-tasks mb-3"}>Dernières tâches réalisées</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ul className={""}>
              {this.props.retrieved &&
              this.props.retrieved['hydra:member'].map((item, index) => {
                let color = userColors[item.doneBy];
                return (
                <li key={item['@id']} className={"d-flex last-done-task-item justify-content-between"}>
                  <div className={"mr-3 last-done-task-item-title"}>{item['name']}</div>
                  <div className={"d-flex align-items-center last-done-task-item-subinfos-wrapper"}>
                    <div>
                      <div style={{backgroundColor: color, width: '15px', height: '15px', borderRadius: '50%'}}></div>
                    </div>
                    <div className={"ml-2 last-done-task-item-subtitle"}>{`${item.doneBy}`}</div>
                  </div>
                </li>)
              })}
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
