import React, { Component } from 'react';
import { GET_POSTS } from './../gql-queries';
import { Query, withApollo } from 'react-apollo';
import Post from './Post';
import { Link } from 'react-router-dom';
import "../styles/form.css";


class Posts extends Component {
    onRemoveHandler(data) {
        console.log(data, 'onremove works');

        if (data && data.deletePost) {
            this.props.client.resetStore();
        }
    }

    componentDidMount() {
        this.props.client.onResetStore(
            () => this.props.history.push("/dashboard")
        );
    }


    render() {
        return (
            <Query query={GET_POSTS}>
            {
                ({loading, error, data}) => {
                    console.log('data coming', loading, error, data);


                    if (loading) return <div>Loading Posts ...</div>
                    if (error) return <div>Error fetching Posts</div>

                    const POSTS_DATA = data.posts;

                    if (!POSTS_DATA.length) {
                        return (
                            <div className="posts-content">
                                <span>You don't have any post yet, go to <Link to="/dashboard/create">"Create Post"</Link>  to add a Post</span>
                            </div>
                        )
                    }

                    return (
                        <div className="posts-content">
                           {POSTS_DATA.map(postData => <Post key={postData.id} post={postData} {...this.props} onRemove={this.onRemoveHandler.bind(this)}></Post>)}
                        </div>
                    )
                }
            }
            </Query>
        );
    }
}

export default withApollo(Posts);