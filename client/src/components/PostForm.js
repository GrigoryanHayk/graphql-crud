import React, { Component } from 'react';
import { CREATE_POST_MUTATION, UPDATE_POST_MUTATION } from './../gql-queries';
import { Mutation, withApollo } from "react-apollo";
import "../styles/form.css";


class PostForm extends Component {
    state = {
        id: '',
        title: '',
        description: '',
        text: '',
        errorMessage: ''
    };

    handleError(error) {
        const message = error.message;

        this.setState({
            errorMessage: message
        });
    }

    isValidForm() {
        const { title, description, text } = this.state;

        if (!title.length || !description.length || !text.length) {
            this.setState({
                errorMessage: 'Please fill all fields.'
            })
        } else {
            return true;
        }

        return false;
    }

    handelMutateForm(callback) {
        if (this.isValidForm()) {
            callback();
        }
    }

    createPost(data) {
        if (data && data.createPost) {
            this.props.client.resetStore();
        }
    }

    updatePost(data) {
        if (data && data.updatePost) {
            this.props.client.resetStore();
        }
    }

    componentDidMount() {
        const updatePost = this.props.location.post;

        if (updatePost) {
            this.setState({
                id: updatePost.id,
                title: updatePost.title,
                description: updatePost.description,
                text: updatePost.text,
            });
        }

        this.props.client.onResetStore(
            () => this.props.history.push("/dashboard")
        );
    }

    render() {
        const locationPathName = this.props.location.pathname;
        const isUpdate = locationPathName.includes("update");

        console.log(this.props, 'PostForm');

        return (
            <div className="posts-form">
                <h3 className="form-header">{ isUpdate ? 'Update Post' : 'Create Post' }</h3>

                <div className="form-control__error-bar">
                    <p>{ this.state.errorMessage }</p>
                </div>

                <div>
                    <div className="form-group">
                        <label htmlFor="titleID">Title:</label>
                        <input id="titleID"
                               type="text"
                               value={this.state.title}
                               onChange={(e) => this.setState({title: e.target.value})}
                               className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descriptionId">Description:</label>
                        <textarea
                            id="descriptionId"
                            value={this.state.description}
                            onChange={(e) => this.setState({description: e.target.value})}
                            className="form-control form-control__textarea">
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="textId">Text:</label>
                        <textarea
                            id="textId"
                            value={this.state.text}
                            onChange={(e) => this.setState({text: e.target.value})}
                            className="form-control form-control__textarea">
                        </textarea>
                    </div>

                    {
                        isUpdate ?
                            <Mutation mutation={UPDATE_POST_MUTATION}
                                      variables={{
                                          id: this.state.id,
                                          title: this.state.title,
                                          description: this.state.description,
                                          text: this.state.text
                                      }}
                                      onError={error => this.handleError(error)}
                                      onCompleted={data => this.updatePost(data)}
                            >
                                {postMutation => <button className="form-control__buttons" onClick={() => this.handelMutateForm(postMutation)}>Update Post</button>}
                            </Mutation>
                            :
                            <Mutation mutation={CREATE_POST_MUTATION}
                                      variables={{
                                          title: this.state.title,
                                          description: this.state.description,
                                          text: this.state.text
                                      }}
                                      onError={error => this.handleError(error)}
                                      onCompleted={data => this.createPost(data)}
                            >
                                {postMutation => <button className="form-control__buttons" onClick={() => this.handelMutateForm(postMutation)}>Create Post</button>}
                            </Mutation>
                    }
                </div>
            </div>

        );
    }
}

export default withApollo(PostForm);