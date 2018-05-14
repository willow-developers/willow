import React, { Component } from 'react';

import Modals from './Modals';
import Confirmation from './types/Confirmation';
import Custom from './types/Custom';
import Notification from './types/Notification';

class DisplayModal extends Component {
  render() {
    const { type, id, body, action, value, icon } = this.props;

    if (type === 'confirmation') {
      return (
        <div>
          <Confirmation id={ id } />
          <Modals />
        </div>
      );
    }
    if (type === 'custom') {
      return (
        <div>
          <Custom body={ body } id={ id } value={ value } icon={ icon }/>
          <Modals />
        </div>
      );
    }
    if (type === 'notification') {
      return (
        <div>
          <Notification action={ action } />
          <Modals />
        </div>
      );
    }
    return <div></div>;
  }
}

export default DisplayModal;
