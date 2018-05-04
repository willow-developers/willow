import React, { Component } from 'react';

class RenderedDoc extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
           {this.props.docInfo.data}
        </div>
    );
  }
}

export default RenderedDoc;