import React, {Component} from 'react';
import globalStyles from "../../constants/globalStyle";
import {Picker, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
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
import alertMessage from "../../components/Alert";
import PickLocation from "../../components/Picker/LocationPicker";
import {resetLocation} from "../../store/actions/formActions";
import ListPicker from "../../components/Picker/ListPicker";

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
            postTitle: '',
            postContent: '',
            featuredImage: null,
            additionalImages: [],
            categories: [],
            selectedCategoryId: null,
            date: null,
            errors: {},
            isLoading: false
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
            });
        } else {
            this.setState({
                categories: this.props.categories
            });
        }

        this.props.resetLocation();

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    removeImageHandler(type, key) {
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
            aspect: [5, 3],
        });

        if (!result.cancelled) {
            this.setState({featuredImage: result});
        }
    };

    pickAdditionalImagesHandler = async () => {
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
        const {postTitle, postContent, selectedCategoryId, date} = this.state;
        const {address} = this.props.forms.location;
        let errors = {};

        if (!postTitle) { errors.postTitle = 'Post Title is required!'; }
        if (!postContent) { errors.postContent = 'Post Content is required!'; }
        if (!selectedCategoryId) { errors.selectedCategoryId = 'Category is required!'; }
        if (!date) { errors.date = 'Deadline is required!'; }
        if (_.isEmpty(address)) { errors.address = "Location is required"; }

        this.setState({errors});
        return _.isEmpty(errors);
    }

    submitHandler() {
        const {postTitle, postContent, featuredImage,additionalImages, selectedCategoryId, date} = this.state;
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

        if (featuredImage && featuredImage.length > 0) {
            formData.append('post_images[0]', {uri: featuredImage.uri, name: 'featured.jpg', type: 'image/jpg'});
        }

        if (additionalImages && additionalImages.length > 0) {
            _.forEach(additionalImages, (additionalImage, key) => {
                formData.append('post_images[' + (key + 1) + ']', {uri: additionalImage.uri, name: key +'image.jpg', type: 'image/jpg'});
            });
        }

        this.props.addPost(formData).then(res => {
            this.setState({isLoading: false});
            alertMessage({title: "Success", body: "Post created successfully"});
            this.props.navigation.goBack();
        }).catch(err => {
            this.setState({isLoading: false});
        });
    }

    render() {
        const {featuredImage, additionalImages, categories, errors, isLoading} = this.state;

        return (
            <ScrollView style={globalStyles.scrollViewContainer}>
                <View style={globalStyles.scrollViewContentView}>
                    <View style={globalStyles.headerContainer}>
                        <Text style={globalStyles.heading}>Add Post</Text>
                    </View>
                    <View style={{marginLeft: 20, marginRight: 20}}>
                        <View>
                            <Text style={globalStyles.formTitle}>Post Title</Text>
                            <View>
                                <TextInput
                                    style={globalStyles.textInput}
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
                                           onChangeText={postContent => this.setState({postContent})}
                                />
                                <Text style={globalStyles.error}>{errors.postContent ? errors.postContent: ''}</Text>
                            </View>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={globalStyles.formTitle}>Featured Image</Text>
                            {
                                featuredImage &&
                                <PostImages type="featured" images={[featuredImage]}
                                            removeImageHandler={this.removeImageHandler}/>
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
                                        <PostImages type="additionalImages" images={additionalImages}
                                                    removeImageHandler={this.removeImageHandler}/>
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
                        {/* <View>
                            <Text style={globalStyles.formTitle}>Category</Text>

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
                        </View> */}
                        <View style={globalStyles.formRow}>
                            <Text style={globalStyles.formTitle}>Post Location</Text>
                            <PickLocation
                                value={this.props.forms.location.address}
                                navigation={this.props.navigation}
                                errorMessage={errors.address ? errors.address : null}
                                backScreen="AddPost"
                            />
                        </View>
                       
                        <View>
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
});

AddPostScreen.propTypes = {
    categories: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        categories: state.categories,
        forms: state.forms
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadCategories: () => dispatch(loadCategories()),
        addPost: (formData) => dispatch(addPost(formData)),
        resetLocation: () => dispatch(resetLocation()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostScreen);
