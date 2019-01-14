import React, { Component } from 'react';
import "./../styles/post.css";
import { Link } from 'react-router-dom';
import { DELETE_POST_MUTATION } from "../gql-queries";
import { Mutation } from "react-apollo";

class Post extends Component {
    handleError(error) {

    }

    deletePost(data) {
        this.props.onRemove(data);
    }

    render() {
        const post = this.props.post;

        return (
            <div className="post">
                <div className="post__content">
                    <div className="post-header">
                        <h3 className="post__title">{post.title}</h3>
                        <span className="post__date">{ (new Date(+post.updatedAt)).toDateString() }</span>
                    </div>

                    <div className="post__description">
                        <p>{post.description}</p>
                    </div>
                </div>
                <div className="post__crud">
                    <Link to={{pathname: "/dashboard/update/" + post.id, post: post}}>Update</Link>

                    <Mutation mutation={DELETE_POST_MUTATION}
                              variables={{
                                  id: post.id
                              }}
                              onError={(error) => this.handleError(error)}
                              onCompleted={(data) => this.deletePost(data)}
                    >
                        {postMutation => <a className="form-control__link" onClick={postMutation}>Remove</a>}
                    </Mutation>
                </div>
            </div>
        );
    }
}

export default Post;