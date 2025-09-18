import React from 'react';
import PostListItem from './PostListItem';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map(post => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
