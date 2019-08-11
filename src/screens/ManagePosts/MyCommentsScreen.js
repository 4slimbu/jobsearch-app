import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import globalStyles from "../../constants/globalStyle";
import CommentList from "../../components/List/CommentList";
import {connect} from "react-redux";
import {getMyComments} from "../../store/actions/commentActions";

class MyCommentsScreen extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this._isMounted = true;
        this._isMounted && await this.props.onGetMyComments();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {myComments} = this.props;
        const commentListProps = {
            comments: myComments.data
        };
        return (
            <ScrollView style={globalStyles.scrollViewContainer}>
                <View style={globalStyles.scrollViewContentView}>
                    <View style={globalStyles.headerContainer}>
                        <Text style={globalStyles.heading}>My Activities</Text>
                    </View>

                    <CommentList {...commentListProps} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    return {
        myComments: state.comments.myComments
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetMyComments: () => dispatch(getMyComments())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCommentsScreen);

