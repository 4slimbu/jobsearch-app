import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import globalStyles from "../../constants/globalStyle";
import CommentList from "../../components/List/CommentList";
import {connect} from "react-redux";
import {getMyComments} from "../../store/actions/commentActions";

class MyCommentsScreen extends Component {
    constructor(props) {
        super(props);
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        this._isMounted && await this.props.onGetMyComments();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async scrollHandler(){
        if (this.props.myComments.meta.to !== this.props.myComments.meta.total) {
            await this.props.onGetMyComments({}, this.props.myComments.links.next);
        }
    }

    render() {
        const {myComments} = this.props;
        const commentListProps = {
            comments: myComments.data,
            onScroll: this.scrollHandler
        };
        return (
            <View style={styles.commentContainer}>
                <CommentList {...commentListProps} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    commentContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});

const mapStateToProps = state => {
    return {
        myComments: state.comments.myComments
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetMyComments: (queryObject, url) => dispatch(getMyComments(queryObject, url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCommentsScreen);

