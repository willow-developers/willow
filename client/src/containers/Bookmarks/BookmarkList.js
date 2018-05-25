import React, { Component } from "react";
import { connect } from "react-redux";
import _ from 'lodash';
import Button from '../../components/UI/Button';

import styles from '../../assets/sass/BookmarkMetaPreview.module.scss';
import bookmark_icon from '../../assets/images/bookmarkIcon.svg';

class BookmarkList extends Component {
	renderList() {
		let { bookmarkListAdd, deleteBookmark } = this.props;
		return _.map(bookmarkListAdd, ({ title, url}, idx) => (
			<div key={ idx } className={` ${styles.row} ${styles.displayRow} `}>
				<a key={ idx } href={ url } target="_blank" className={`${ styles.displayLink } ${ styles.col_10_of_12 }`}>
					<div className={`${ styles.row } ${ styles.previewMode }`}>
						<div className={ styles.col_3_of_12 }>
							<div className={ styles.bookmark_icon }>
								<img src={ bookmark_icon } alt="Bookmark"/>
							</div>
						</div>
						<div className={ styles.col_9_of_12 }>
							<h4>{ title }</h4>
							<p className={ styles.url }>{ url }</p>
						</div>
					</div>
				</a>
				<div className={`${ styles.deleteLink } ${ styles.col_2_of_12 }`}>
					<Button
						icon={ 'delete' }
						type={ 'smallRound' }
						handleClick={ () => deleteBookmark(idx) }
					/>
				</div>
			</div>
		));
	}
	render() {
		return (
			<div className={ styles.row }>
				<div className={`${ styles.col_12_of_12 } ${ styles.bookmarkList }`}>
					<h2>Saved Bookmarks:</h2>
					{ this.renderList() }
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	bookmarkListAdd: state.bookmarkListAdd,
});

export default connect(mapStateToProps)(BookmarkList);
