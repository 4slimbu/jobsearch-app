import React, {Component} from 'react';
import {Picker, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from "prop-types";
import Colors from '../../constants/colors';
import {Button, Image} from "react-native-elements";
import {ImagePicker} from "expo";
import * as _ from "lodash";
import Icon from 'react-native-vector-icons/FontAwesome';
import {loadCategories} from "../../store/actions/categoryActions";
import {connect} from "react-redux";
import DatePicker from 'react-native-datepicker';
import {getPost, updatePost} from "../../store/actions/postActions";
import {findAdditionalImages, findFeaturedImage} from "../../utils/helper/helper";
import alertMessage from "../../components/Alert";
import PickLocation from "../../components/Picker/LocationPicker";
import {setLocation} from "../../store/actions/formActions";
import ListPicker from "../../components/Picker/ListPicker";

const PostImages = (props) => {
    const {type, images, removeImageHandler} = props;
    return _.map(images, (image, key) => {
        return (
            <View key={key}>
                <Icon color={Colors.grey1} name="close" size={30} onPress={() => removeImageHandler(type, key, image)}/>
                <Image source={{uri: image.uri}} style={{width: 100, height: 100, marginTop: 10, marginBottom: 10}}/>
            </View>
        )
    });
};

class EditPostScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: null,
            postTitle: '',
            postContent: '',
            featuredImage: null,
            additionalImages: [],
            categories: [],
            selectedCategoryId: null,
            date: null,
            imagesToRemove: [],
            errors: {},
            isLoading: false
        };

        this.removeImageHandler = this.removeImageHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);

    }

    async componentDidMount() {
        this._isMounted = true;

        // Load Categories
        if (!this.props.categories.length > 0) {
            this._isMounted && await this.props.onLoadCategories().then(res => {
                this.setState({
                    categories: this.props.categories
                });
            }).catch(err => {
            });
        } else {
            this.setState({
                categories: this.props.categories
            });
        }

        // Load Post
        const {params} = this.props.navigation.state;
        const postId = params ? params.postId : null;

        this._isMounted && await this.props.getPost(postId).then(res => {
            const post= this.props.post;
            this.setState({
                postId: post.id,
                postTitle: post.title,
                postContent: post.body,
                featuredImage: findFeaturedImage(post.postImages),
                additionalImages: findAdditionalImages(post.postImages),
                selectedCategoryId: post.category && post.category.id,
                date: post.expire_at
            });

            this.props.setLocation({
                address: post.address,
                latitude: post.latitude,
                longitude: post.longitude
            })
        }).catch(err => {
        });

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    removeImageHandler(type, key, image) {
        if (type === 'featured') {
            this.setState({
                featuredImage: null,
                imagesToRemove: [
                    ...this.state.imagesToRemove,
                    ...image && image.id ? [image.id] : []
                ]
            })

        }

        if (type === 'additionalImages') {
            const additionalImages = this.state.additionalImages;

            additionalImages.splice(key, 1);

            this.setState({
                additionalImages: additionalImages,
                imagesToRemove: [
                    ...this.state.imagesToRemove,
                    ...image && image.id ? [image.id] : []
                ]
            });
        }
    }

    pickFeaturedImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.setState({featuredImage: result});
        }
    };

    pickAdditionalImagesHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

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

    isFormValid() {
        const {postTitle, postContent, selectedCategoryId, date} = this.state;
        let errors = {};

        if (!postTitle) { errors.postTitle = 'Post Title is required!'; }
        if (!postContent) { errors.postContent = 'Post Content is required!'; }
        if (!selectedCategoryId) { errors.selectedCategoryId = 'Category is required!'; }
        if (!date) { errors.date = 'Deadline is required!'; }

        this.setState({errors});
        return _.isEmpty(errors);
    }

    submitHandler() {
        const {postId, postTitle, postContent, featuredImage,additionalImages, selectedCategoryId, imagesToRemove, date} = this.state;
        const {address, latitude, longitude} = this.props.forms.location;

        if (!this.isFormValid()) {
            alertMessage({title: "Error", body: "Validation failed"});
            return;
        }

        this.setState({isLoading: true});

        let formData = new FormData();
        formData.append('post_title', postTitle);
        formData.append('post_body', postContent);
        formData.append('address', address);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('category_id', selectedCategoryId);
        formData.append('expire_at', date);
        formData.append('selected_image', 0);

        if (imagesToRemove) {
            _.forEach(imagesToRemove, (id, key) => {
                formData.append('images_to_remove[' + key +']', id)
            });
        }

        if (featuredImage &&  ('cancelled' in featuredImage)) {
            formData.append('post_images[0]', {uri: featuredImage.uri, name: 'featured.jpg', type: 'image/jpg'});
        }

        if (additionalImages && additionalImages.length > 0) {
            let i = 1;
            _.forEach(additionalImages, (additionalImage, key) => {
                if (additionalImage && ('cancelled' in additionalImage)) {
                    formData.append('post_images[' + i + ']', {uri: additionalImage.uri, name: key +'image.jpg', type: 'image/jpg'});
                    i++;
                }
            });
        }

        this.props.updatePost(postId, formData).then(res => {
            alertMessage({title: "Success", body: "Post updated successfully"});
            this.props.navigation.goBack();
        }).catch(err => {
            alertMessage({title: "Error", body: "Unable to update post"});
        });

        this._isMounted && this.setState({isLoading: false});
    }

    render() {
        const {postTitle, postContent, featuredImage, additionalImages, categories, selectedCategoryId, date, errors, isLoading} = this.state;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>Edit Post</Text>
                    </View>
                    <View style={{marginLeft: 20, marginRight: 20}}>
                        <View>
                            <Text style={styles.postTitle}>Post Title</Text>
                            <View>
                                <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                           value={postTitle}
                                           onChangeText={postTitle => this.setState({postTitle})}
                                />
                                <Text style={{color: Colors.danger, marginTop: 5}}>{errors.postTitle ? errors.postTitle: ''}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.postTitle}>Post Content</Text>
                            <View>
                                <TextInput style={{borderWidth: 1, borderColor: Colors.grey3, textAlignVertical: 'top'}}
                                           multiline={true}
                                           numberOfLines={15}
                                           value={postContent}
                                           onChangeText={postContent => this.setState({postContent})}
                                />
                                <Text style={{color: Colors.danger, marginTop: 5}}>{errors.postContent ? errors.postContent: ''}</Text>
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

                            <ListPicker
                                placeholderLabel="Select Category"
                                value={this.state.selectedCategoryId}
                                style={{height: 50, width: '100%'}}
                                onSelect={(itemValue, itemIndex) =>
                                    this.setState({selectedCategoryId: itemValue})
                                }
                                items={categories}
                            />

                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.selectedCategoryId ? errors.selectedCategoryId: ''}</Text>
                        </View>
                        <View>
                            <Text style={styles.postTitle}>Deadline</Text>
                            <DatePicker
                                style={{width: '100%'}}
                                date={date}
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
                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.date ? errors.date: ''}</Text>
                        </View>

                        <PickLocation
                            value={this.props.forms.location.address}
                            navigation={this.props.navigation}
                            errorMessage={errors.address ? errors.address : null}
                            backScreen="EditPost"
                        />

                        <Button title="Save" buttonStyle={{marginTop: 25, marginBottom: 50}} onPress={this.submitHandler}
                                buttonSize={5}
                                loading={isLoading}
                                disabled={isLoading}
                        />

                    </View>

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
        backgroundColor: '#acacac',
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

EditPostScreen.propTypes = {
    categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        categories: state.categories,
        post: state.posts.post,
        forms: state.forms
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadCategories: () => dispatch(loadCategories()),
        updatePost: (postId, formData) => dispatch(updatePost(postId, formData)),
        getPost: (postId) => dispatch(getPost(postId)),
        setLocation: (location) => dispatch(setLocation(location)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostScreen);
