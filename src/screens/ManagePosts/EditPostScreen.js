import React, {Component} from 'react';
import globalStyles from "../../constants/globalStyle";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Colors from '../../constants/colors';
import {Button, Image} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as _ from "lodash";
import {FontAwesome} from '@expo/vector-icons';
import {loadCategories} from "../../store/actions/categoryActions";
import {connect} from "react-redux";
import {getPost, updatePost} from "../../store/actions/postActions";
import {findAdditionalImages, findFeaturedImage} from "../../utils/helper/helper";
import alertMessage from "../../components/Alert";
import {resetCategory, resetLocation, setCategory, setLocation} from "../../store/actions/formActions";
import LocationPicker from "../../components/Picker/LocationPicker";
import CategoryPicker from "../../components/CategoryPicker";
import NavigationService from "../../services/NavigationService";
import PostImages from "../../components/PostImages";

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
            selectedCategory: {},
            location: {
                address: "",
                latitude: "",
                longitude: ""
            },
            imagesToRemove: [],
            errors: {},
            isLoading: false
        };

        this.removeImageHandler = this.removeImageHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
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
                selectedCategory: post.category,
                location: {
                    address: post.address,
                    latitude: post.latitude,
                    longitude: post.longitude
                }
            });

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
        const {postTitle, postContent, location, selectedCategory} = this.state;
        const {address} = location;
        let errors = {};

        if (!postTitle) { errors.postTitle = 'Post Title is required!'; }
        if (!postContent) { errors.postContent = 'Post Content is required!'; }
        if (_.isEmpty(selectedCategory)) { errors.category = 'Category is required!'; }
        if (_.isEmpty(address)) { errors.address = "Location is required"; }

        this.setState({errors});
        return _.isEmpty(errors);
    }

    submitHandler() {
        const {postId, postTitle, postContent, featuredImage,additionalImages, selectedCategory, imagesToRemove, location} = this.state;
        const {address, latitude, longitude} = location;

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
        formData.append('category_id', selectedCategory.id);
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
            this.props.navigation.state.params.onRefresh();
            NavigationService.navigateBack();
        }).catch(err => {
            alertMessage({title: "Error", body: "Unable to update post"});
        });

        this._isMounted && this.setState({isLoading: false});
    }

    changeHandler(data) {
        this.setState(data);
    }

    render() {
        const {postTitle, postContent, featuredImage, additionalImages, location, errors, isLoading, selectedCategory} = this.state;
        const {categories} = this.props;
        const categoryPickerProps = {
            categories: categories,
            selectedCategory: selectedCategory,
            onChange: this.changeHandler
        };

        return (
            <ScrollView style={globalStyles.scrollViewContainer}>
                <View style={globalStyles.scrollViewContentView}>
                    <View style={{marginLeft: 20, marginRight: 20}}>
                        <View>
                            <Text style={globalStyles.formTitle}>Post Title</Text>
                            <View>
                                <TextInput
                                    style={globalStyles.textInput}
                                    value={postTitle}
                                    onChangeText={postTitle => this.changeHandler({postTitle})}
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
                                    onChangeText={postContent => this.changeHandler({postContent})}
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
                                        <FontAwesome
                                            name="photo"
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
                                            <FontAwesome
                                                name="photo"
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

                            <CategoryPicker {...categoryPickerProps}/>
                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.category ? errors.category: ''}</Text>
                        </View>
                        <View>
                            <Text style={globalStyles.formTitle}>Post Location</Text>
                            <LocationPicker
                                location={location.address}
                                onChange={location => this.changeHandler({location})}
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

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
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
