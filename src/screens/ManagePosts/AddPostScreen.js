import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View, Picker, ActivityIndicator} from 'react-native';
import PropTypes from "prop-types";
import Colors from '../../constants/colors';
import {Button, Image} from "react-native-elements";
import {ImagePicker} from "expo";
import * as _ from "lodash";
import Icon from 'react-native-vector-icons/FontAwesome';
import {loadCategories} from "../../store/actions/categoryActions";
import {connect} from "react-redux";
import DatePicker from 'react-native-datepicker';
import {addPost} from "../../store/actions/postActions";

const PostImages = (props) => {
    const {type, images, removeImageHandler} = props;
    return _.map(images, (image, key) => {
        return (
            <View key={key}>
                <Icon color={Colors.grey1} name="close" size={30} onPress={() => removeImageHandler(type, key)}/>
                <Image source={{uri: image.uri}} style={{width: 100, height: 100, marginTop: 10, marginBottom: 10}}/>
            </View>
        )
    });
};

class AddPostScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            isLoading: false,
            postTitle: '',
            postContent: '',
            featuredImage: null,
            additionalImages: [],
            categories: [],
            selectedCategoryId: null,
            date: null,
            errors: {}
        };

        this.removeImageHandler = this.removeImageHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

    }

    async componentDidMount() {
        this._isMounted = true;
        if (!this.props.categories.length > 0) {
            this._isMounted && await this.props.onLoadCategories().then(res => {
                this.setState({
                    categories: this.props.categories
                });
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.setState({
                categories: this.props.categories
            });
        }

        this.setState({isReady: true});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    removeImageHandler(type, key) {
        console.log('additional iamge leng', this.state.additionalImages.length);
        console.log('remove image handler pressed', type, key);
        if (type === 'featured') {
            this.setState({
                featuredImage: null
            })
        }

        if (type === 'additionalImages') {
            const additionalImages = this.state.additionalImages;

            additionalImages.splice(key, 1);

            this.setState({
                additionalImages: additionalImages
            });
        }
    }

    pickFeaturedImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({featuredImage: result});
        }
    };

    pickAdditionalImagesHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({
                ...this.state,
                additionalImages: [
                    ...this.state.additionalImages,
                    result
                ]
            });
        }
    };

    submitHandler() {
        const {postTitle, postContent, featuredImage,additionalImages, selectedCategoryId, date} = this.state;

        let error = '';
        if (!postTitle) { error += 'Post Title is required! \n'; }
        if (!postContent) { error += 'Post Content is required! \n'; }
        if (!postContent) { error += 'Post Content is required! \n'; }
        if (!selectedCategoryId) { error += 'Category is required! \n'; }
        if (!date) { error += 'Deadline is required! \n'; }

        if (error) {
            alert(error);
            return;
        }

        this.setState({isLoading: true});
        let formData = new FormData();
        formData.append('post_title', postTitle);
        formData.append('post_body', postContent);
        formData.append('location_id', "1");
        formData.append('category_id', selectedCategoryId);
        formData.append('expire_at', date);
        formData.append('selected_image', 0);

        if (featuredImage && featuredImage.length > 0) {
            formData.append('post_images[0]', {uri: featuredImage.uri, name: 'featured.jpg', type: 'image/jpg'});
        }

        if (additionalImages && additionalImages.length > 0) {
            _.forEach(additionalImages, (additionalImage, key) => {
                formData.append('post_images[' + (key + 1) + ']', {uri: additionalImage.uri, name: key +'image.jpg', type: 'image/jpg'});
            });
        }

        this.props.addPost(formData).then(res => {
            alert('Post created successfully');
            this.props.navigation.goBack();
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
        
        this._isMounted && this.setState({isLoading: false});
    }

    render() {
        const {isReady, isLoading, featuredImage, additionalImages, categories} = this.state;

        return (
            <ScrollView style={styles.container}>
                {
                    ! isReady ?
                        <ActivityIndicator size="large" color={Colors.primary} style={{marginTop: 100}}/>
                        :
                        <View style={styles.contentView}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.heading}>Add Post Test</Text>
                            </View>
                            <View style={{marginLeft: 20, marginRight: 20}}>
                                <View>
                                    <Text style={styles.postTitle}>Post Title</Text>
                                    <View>
                                        <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                                   onChangeText={postTitle => this.setState({postTitle})}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.postTitle}>Post Content</Text>
                                    <View>
                                        <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                                   multiline={true}
                                                   numberOfLines={15}
                                                   onChangeText={postContent => this.setState({postContent})}
                                        />

                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.postTitle}>Featured Image</Text>
                                    {
                                        featuredImage &&
                                        <PostImages type="featured" images={[featuredImage]}
                                                    removeImageHandler={this.removeImageHandler}/>
                                    }
                                    {
                                        !featuredImage &&
                                        <Button title="Pick Image"
                                                buttonStyle={{marginBottom: 5, paddingTop: 5, paddingBottom: 5}}
                                                buttonSize={5} type="outline"
                                                onPress={this.pickFeaturedImageHandler}
                                        />
                                    }
                                </View>

                                <View>
                                    <Text style={styles.postTitle}>Additional Images</Text>
                                    <View>
                                        {
                                            additionalImages &&
                                            <View style={{
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                justifyContent: 'space-around'
                                            }}>
                                                <PostImages type="additionalImages" images={additionalImages}
                                                            removeImageHandler={this.removeImageHandler}/>
                                            </View>
                                        }
                                        {
                                            additionalImages.length < 6 &&
                                            <Button title="Pick Image"
                                                    buttonStyle={{marginBottom: 5, paddingTop: 5, paddingBottom: 5}}
                                                    buttonSize={5} type="outline"
                                                    onPress={this.pickAdditionalImagesHandler}
                                            />
                                        }
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.postTitle}>Category</Text>

                                    <Picker
                                        selectedValue={this.state.selectedCategoryId}
                                        style={{height: 50, width: '100%'}}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({selectedCategoryId: itemValue})
                                        }>
                                        <Picker.Item value="" label="Select Category"/>
                                        {
                                            _.map(categories, (category, key) => {
                                                return (
                                                    <Picker.Item key={key} value={category.id} label={category.name}/>
                                                )
                                            })
                                        }
                                    </Picker>
                                </View>
                                <View>
                                    <Text style={styles.postTitle}>Deadline</Text>
                                    <DatePicker
                                        style={{width: '100%'}}
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="select date"
                                        format="YYYY-MM-DD"
                                        minDate="2019-05-01"
                                        maxDate="2050-01-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 36
                                            }
                                            // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(date) => {
                                            this.setState({date: date})
                                        }}
                                    />
                                </View>

                                <Button title="Save" buttonStyle={{marginTop: 25, marginBottom: 50}} onPress={this.submitHandler}
                                        buttonSize={5} isLoading={isLoading} isDisabled={isLoading}/>

                            </View>

                        </View>
                }
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
        backgroundColor: Colors.primary,
        marginBottom: 20,
    },
    contentView: {
        flex: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 20,
    },
    categoryItem: {
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    postTitle: {
        color: Colors.grey1,
        marginTop: 25,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    postAuthorMeta: {
        color: Colors.grey1,
        marginBottom: 3,
        fontSize: 14,
    },
    postDateMeta: {
        color: Colors.grey1,
        marginBottom: 15,
        fontSize: 14,
        fontStyle: 'italic'
    },
    postContent: {
        color: Colors.grey1,
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 15
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
    autocompletesContainer: {
        paddingTop: 0,
        zIndex: 1,
        width: "100%",
        paddingHorizontal: 8,
    },
    input: {maxHeight: 40},
    inputContainer: {
        display: "flex",
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#c7c6c1",
        paddingVertical: 13,
        paddingLeft: 12,
        paddingRight: "5%",
        width: "100%",
        justifyContent: "flex-start",
    },
    plus: {
        position: "absolute",
        left: 15,
        top: 10,
    },
});

AddPostScreen.propTypes = {
    categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        categories: state.categories,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadCategories: () => dispatch(loadCategories()),
        addPost: (formData) => dispatch(addPost(formData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostScreen);
