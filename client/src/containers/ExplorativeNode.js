import React, { Component } from 'react';
import { connect } from 'react-redux';
import { titleNode, titleFormShow, titleEdit } from '../actions/projects';

// import Loading from '../../components/UI/Loading';
import Notes from './Notes/NotesBody';
import Bookmarks from './Bookmarks/BookmarkBody';
import NodeTitleEdit from './NodeTitle/NodeTitleEdit';
import NodeTitleDisplay from './NodeTitle/NodeTitleDisplay';

import styles from '../assets/sass/ExplorativeNode.module.scss';

class ExplorativeNode extends Component {
  state = { listHeight: 0 };

  componentDidMount() {
    this.props.titleNode(this.props.nodeTitle)
  };

  getListHeight = (num) => {
    const listHeight = num;
    this.setState({ listHeight });
  };

  updateNodeTitle = (str) => {
    this.props.titleNode(str)
  };

  showDisplayTitle = () => {
    this.props.titleEdit()
  };

  showTitleForm = () => {
    this.props.titleFormShow()
  };

	render() {
		return (
      <div className={ styles.row }>
        <div className={ styles.col_12_of_12 }>
          { this.props.showTitle
            ? (<NodeTitleDisplay
                title={ this.props.setNodeTitle.length > 0
                  ? (this.props.setNodeTitle)
                  : (this.props.nodeTitle)
                }
                showTitleForm={ this.showTitleForm }
              />)
            : null
          }
          { this.props.showTitleForm
            ? (<NodeTitleEdit
                title={ this.props.setNodeTitle.length > 0
                  ? (this.props.setNodeTitle)
                  : (this.props.nodeTitle)
                }
                updateNodeTitle={ this.updateNodeTitle }
                showDisplayTitle={ this.showDisplayTitle }
              />)
            : null
          }
        </div>
        <div className={` ${styles.col_7_of_12} ${styles.holder} `}>
          <Notes />
        </div>
        <div className={ styles.col_5_of_12 }>
          <Bookmarks getListHeight={ this.getListHeight } shadowHeight={ this.state.listHeight } />
        </div>
      </div>
		);
	}
}

const mapStateToProps = (state) => ({
  setNodeTitle: state.setNodeTitle,
  showTitle: state.showTitle,
  showTitleForm: state.showTitleForm,
});

const mapDispatchToProps = (dispatch) => ({
  titleNode: (str) => dispatch(titleNode(str)),
  titleFormShow: () => dispatch(titleFormShow()),
  titleEdit: () => dispatch(titleEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorativeNode);
