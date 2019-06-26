import React from "react";
import { withRouter } from "react-router-dom";
import { Icon } from 'semantic-ui-react'

const Back = ({ history }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a onClick={history.goBack}>
      <Icon name='angle left' /> Go Back
      </a>
);

export default withRouter(Back);