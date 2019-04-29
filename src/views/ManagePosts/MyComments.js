import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';
import CommentList from "../../components/List/CommentList";
import {connect} from "react-redux";
import {getMyComments} from "../../store/actions/comment";

class MyComments extends Component {
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
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>My Comments</Text>
                    </View>

                    <CommentList {...commentListProps} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headerContainer: {
        justifyContent: 'center',
        padding: 40,
        paddingLeft: 20,
        backgroundColor: Colors.primary1,
        marginBottom: 20,
    },
    contentView: {
        flex: 1,
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(MyComments);

