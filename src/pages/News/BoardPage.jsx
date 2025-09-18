import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostList from '../../components/news/PostList';
import Pagination from '../../components/news/Pagination';
import { getPostsByCategory } from '../../api/wordpress'; // Assuming this function exists from Task 4.4

const BoardPage = ({ categoryId, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get('page')) || 1;

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Calling getPostsByCategory with:', categoryId, currentPage);
        const response = await getPostsByCategory(categoryId, currentPage); // Assuming getPostsByCategory handles pagination
        setPosts(Array.isArray(response.posts) ? response.posts : []); // Ensure posts is always an array
        setTotalPages(response.totalPages); // Assuming response has totalPages
      } catch (err) {
        setError('Failed to fetch posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="board-page">
      <h2>{title}</h2>
      <PostList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BoardPage;
