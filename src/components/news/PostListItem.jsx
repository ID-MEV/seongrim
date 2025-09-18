import React from 'react';

const PostListItem = ({ post }) => {
  return (
    <div className="post-list-item">
      <h3>{post.title.rendered}</h3>
      <p>{post.date}</p>
      {/* Add more post details as needed */}
    </div>
  );
};

export default PostListItem;