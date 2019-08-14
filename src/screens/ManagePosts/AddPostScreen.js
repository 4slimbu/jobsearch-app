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
import {addPost} from "../../store/actions/postActions";
import alertMessage from "../../components/Alert";
import {resetCategory, resetLocation} from "../../store/actions/formActions";
import CategoryPicker from "../../components/Picker/CategoryPicker";
import LocationPicker from "../../components/Picker/LocationPicker";

const PostImages = (props) => {
    const {type, images, removeImageHandler} = props;
    return _.map(images, (image, key) => {
        return (
            <View key={key}>
                <FontAwesome color={Colors.darkGray} name="close" size={30}
                             onPress={() => removeImageHandler(type, key)}/>
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
            date: null,
            location: {
                address: "",
                latitude: "",
                longitude: ""
            },
            errors: {},
            isLoading: false
        };

        this.removeImageHandler = this.removeImageHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
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

        this.props.resetCategory();
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
        let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

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
        let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

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
        const {postTitle, postContent, location} = this.state;
        const {address} = location;
        const {category} = this.props.forms;
        let errors = {};

        if (!postTitle) {
            errors.postTitle = 'Post Title is required!';
        }
        if (!postContent) {
            errors.postContent = 'Post Content is required!';
        }
        if (_.isEmpty(category)) {
            errors.category = 'Category is required!';
        }
        if (_.isEmpty(address)) {
            errors.address = "Location is required";
        }

        this.setState({errors});
        return _.isEmpty(errors);
    }

    submitHandler() {
        const {postTitle, postContent, featuredImage, additionalImages, date, location} = this.state;
        const {address, latitude, longitude} = location;
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
        formData.append('expire_at', date);
        formData.append('selected_image', 0);

        if (featuredImage && featuredImage.length > 0) {
            formData.append('post_images[0]', {uri: featuredImage.uri, name: 'featured.jpg', type: 'image/jpg'});
        }

        if (additionalImages && additionalImages.length > 0) {
            _.forEach(additionalImages, (additionalImage, key) => {
                formData.append('post_images[' + (key + 1) + ']', {
                    uri: additionalImage.uri,
                    name: key + 'image.jpg',
                    type: 'image/jpg'
                });
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

    changeHandler(data) {
        this.setState(data);
    }

    render() {
        const {featuredImage, additionalImages, errors, isLoading, location} = this.state;

        return (
            <ScrollView style={globalStyles.scrollViewContainer}>
                <View style={globalStyles.scrollViewContentView}>
                    <View style={{marginLeft: 20, marginRight: 20}}>
                        <View style={styles.formRow}>
                            <Text style={globalStyles.formTitle}>Post Title</Text>
                            <TextInput
                                style={globalStyles.textInput}
                                onChangeText={postTitle => this.changeHandler({postTitle})}
                            />
                            {errors.postTitle &&
                            <Text style={globalStyles.error}>{errors.postTitle}</Text>
                            }
                        </View>
                        <View style={styles.formRow}>
                            <Text style={globalStyles.formTitle}>Post Content</Text>
                            <View>
                                <TextInput
                                    style={globalStyles.textAreaLight}
                                    multiline={true}
                                    numberOfLines={15}
                                    onChangeText={postContent => this.changeHandler({postContent})}
                                />
                                {errors.postContent &&
                                <Text style={globalStyles.error}>{errors.postContent}</Text>
                                }
                            </View>
                        </View>
                        <View style={styles.formFlexColumn}>
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
                                        <PostImages type="additionalImages" images={additionalImages}
                                                    removeImageHandler={this.removeImageHandler}/>
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

                            <CategoryPicker
                                category={this.props.forms.category}
                                navigation={this.props.navigation}
                                backScreen="AddPost"
                            />
                            <Text style={{
                                color: Colors.danger,
                                marginTop: 5
                            }}>{errors.category ? errors.category : ''}</Text>
                        </View>
                        <View style={globalStyles.formRow}>
                            <Text style={globalStyles.formTitle}>Post Location</Text>
                            <LocationPicker
                                location={location.address}
                                onChange={location => this.changeHandler({location})}
                            />
                            <Text style={{
                                color: Colors.danger,
                                marginTop: 5
                            }}>{errors.address ? errors.address : ''}</Text>
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

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
        forms: state.forms
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadCategories: () => dispatch(loadCategories()),
        addPost: (formData) => dispatch(addPost(formData)),
        resetLocation: () => dispatch(resetLocation()),
        resetCategory: () => dispatch(resetCategory()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostScreen);
