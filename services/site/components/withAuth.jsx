import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import Router from 'next/router';
import LoginPage from '../pages/loginPage';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      fetch('http://localhost:8001/checkToken', {
        method: 'GET',
        credentials: 'include',
      })
        .then(res => {
          if (res.status === 200 || res.status === 304) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }


    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <LoginPage />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}
