import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/task/';

export default [
  <Route path="/tasks/create" component={Create} exact key="create" />,
  <Route path="/tasks/edit/:id" component={Update} exact key="update" />,
  <Route path="/tasks/show/:id" component={Show} exact key="show" />,
  <Route path="/tasks/" component={List} exact strict key="list" />,
  <Route path="/tasks/:page" component={List} exact strict key="page" />
];
