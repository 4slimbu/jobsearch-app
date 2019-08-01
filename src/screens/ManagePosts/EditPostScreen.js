import React, {Component} from 'react';
import globalStyles from "../../constants/globalStyle";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import PropTypes from "prop-types";
import Colors from '../../constants/colors';
import {Button, Image} from "react-native-elements";
import {ImagePicker, Permissions} from "expo";
import * as _ from "lodash";
import Icon from 'react-native-vector-icons/FontAwesome';
import {loadCategories} from "../../store/actions/categoryActions";
import {connect} from "react-redux";
import {getPost, updatePost} from "../../store/actions/postActions";
import {findAdditionalImages, findFeaturedImage} from "../../utils/helper/helper";
import alertMessage from "../../components/Alert";
import PickLocation from "../../components/Picker/LocationPicker";
import {resetCategory, resetLocation, setCategory, setLocation} from "../../store/actions/formActions";
import CategoryPicker from "../../components/Picker/CategoryPicker";

const PostImages = (props) => {
    const {type, images, removeImageHandler} = props;
    return _.map(images, (image, key) => {
        return (
            <View style={{}} key={key}>
                <Icon
                    color={Colors.primary}
                    style={styles.postThumbnailRemover}
                    name="trash"
                    type="font-awesome"
                    size={22}
                    onPress={() => removeImageHandler(type, key, image)}
                />
                <Image
                    source={{uri: image.uri}}
                    style={styles.postThumbnail}
                />
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
                date: post.expire_at
            });

            this.props.setLocation({
                address: post.address,
                latitude: post.latitude,
                longitude: post.longitude
            });

            this.props.setCategory(post.category);
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
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [5, 3],
        });

        if (!result.cancelled) {
            this.setState({featuredImage: result});
        }
    };

    pickAdditionalImagesHandler = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [5, 3],
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
        const {postTitle, postContent} = this.state;
        const {address} = this.props.forms.location;
        const {category} = this.props.forms;
        let errors = {};

        if (!postTitle) { errors.postTitle = 'Post Title is required!'; }
        if (!postContent) { errors.postContent = 'Post Content is required!'; }
        if (_.isEmpty(category)) { errors.category = 'Category is required!'; }
        if (_.isEmpty(address)) { errors.address = "Location is required"; }

        this.setState({errors});
        return _.isEmpty(errors);
    }

    submitHandler() {
        const {postId, postTitle, postContent, featuredImage,additionalImages, selectedCategoryId, imagesToRemove, date} = this.state;
        const {address, latitude, longitude} = this.props.forms.location;
        const {category} = this.props.forms;

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
        formData.append('category_id', category.id);
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
        const {postTitle, postContent, featuredImage, additionalImages, errors, isLoading} = this.state;

        return (
            <ScrollView style={globalStyles.scrollViewContainer}>
                <View style={globalStyles.scrollViewContentView}>
                    <View style={globalStyles.headerContainer}>
                        <Text style={globalStyles.heading}>Edit Post</Text>
                    </View>
                    <View style={{marginLeft: 20, marginRight: 20}}>
                        <View>
                            <Text style={globalStyles.formTitle}>Post Title</Text>
                            <View>
                                <TextInput
                                    style={globalStyles.textInput}
                                    value={postTitle}
                                    onChangeText={postTitle => this.setState({postTitle})}
                                />
                                <Text style={globalStyles.error}>{errors.postTitle ? errors.postTitle: ''}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={globalStyles.formTitle}>Post Content</Text>
                            <View>
                                <TextInput
                                    style={globalStyles.textAreaLight}
                                    multiline={true}
                                    numberOfLines={15}
                                    value={postContent}
                                    onChangeText={postContent => this.setState({postContent})}
                                />
                                <Text style={globalStyles.error}>{errors.postContent ? errors.postContent: ''}</Text>
                            </View>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={globalStyles.formTitle}>Featured Image</Text>
                            {
                                featuredImage &&
                                <PostImages
                                    type="featured"
                                    images={[featuredImage]}
                                    removeImageHandler={this.removeImageHandler}
                                />
                            }
                            {
                                !featuredImage &&
                                <TouchableOpacity onPress={this.pickFeaturedImageHandler}>
                                    <View style={styles.imagePicker}>
                                        <Icon
                                            name="photo"
                                            type="font-awesome"
                                            color={Colors.primary}
                                            size={45}
                                        />
                                        <Text style={styles.imagePickerTitle}>Browse Image</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>

                        <View style={styles.formRow}>
                            <Text style={globalStyles.formTitle}>Additional Images</Text>
                            <View>
                                {
                                    additionalImages &&
                                    <View style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-around'
                                    }}>
                                        <PostImages
                                            type="additionalImages"
                                            images={additionalImages}
                                            removeImageHandler={this.removeImageHandler}
                                        />
                                    </View>
                                }
                                {
                                    additionalImages.length < 6 &&
                                    <TouchableOpacity onPress={this.pickAdditionalImagesHandler}>
                                        <View style={styles.imagePicker}>
                                            <Icon
                                                name="photo"
                                                type="font-awesome"
                                                color={Colors.primary}
                                                size={45}
                                            />
                                            <Text style={styles.imagePickerTitle}>Browse Image</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View>
                            <Text style={globalStyles.formTitle}>Category</Text>

                            <CategoryPicker
                                category={this.props.forms.category}
                                navigation={this.props.navigation}
                                backScreen="AddPost"
                            />
                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.category ? errors.category: ''}</Text>
                        </View>
                        <View>
                            <Text style={globalStyles.formTitle}>Post Location</Text>
                            <PickLocation
                                value={this.props.forms.location.address}
                                navigation={this.props.navigation}
                                backScreen="EditPost"
                            />
                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.address ? errors.address: ''}</Text>
                        </View>

                        <Button
                            title="Save"
                            onPress={this.submitHandler}
                            buttonStyle={globalStyles.btnPrimary}
                            containerStyle={globalStyles.btnPrimaryContainer}
                            titleStyle={globalStyles.btnPrimaryTitle}
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

    formRow: {
        marginBottom: 15,
    },

    imagePicker: {
        flex: 1,
        borderColor: Colors.greyOutline,
        borderRadius: 5,
        borderWidth: 1,
        padding: 20,
        alignItems: "center",
    },

    imagePickerTitle: {
        color: Colors.mediumGray,
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },

    postThumbnail: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginBottom: 10,
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
        resetLocation: () => dispatch(resetLocation()),
        setCategory: (category) => dispatch(setCategory(category)),
        resetCategory: () => dispatch(resetCategory()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostScreen);
