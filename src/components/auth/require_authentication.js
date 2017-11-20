import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is the scaffold of a Higher Order Component
export default function (ComposedComponent) {
  class Authentication extends Component {
    // context is easily abused in React applications since it breaks from
    // the idea of unidirectional data flow.
    // To combat this, React makes you define a property called contextTypes
    // on each of your components.  That way, you can only use context as you
    // declare your need for each part.

    // static keyword creates a class-level property
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    // this is called whenever the component is about to be handed a new set
    // of props (nextProps), or about to be rerendered
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
  }



  return connect(mapStateToProps)(Authentication);
}
