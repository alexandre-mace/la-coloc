import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, reset } from '../../actions/task/create';
import { list } from '../../actions/task/list';

class Create extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    created: PropTypes.object,
    create: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
    };
}

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    if (this.props.created){
      this.props.list()
      this.props.hide()
      return (
        <Redirect
          to={`/`}
        />
      );
    }


    return (
      <div>
        {this.props.loading && (
          <div className="alert alert-info" role="status">
            Loading...
          </div>
        )}
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.error}
          </div>
        )}
        <Form onSubmit={this.props.create} values={this.props.item} hide={() => this.props.hide()}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { created, error, loading } = state.task.create;
  return { created, error, loading };
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  list: page => dispatch(list(page)),
  reset: () => dispatch(reset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
