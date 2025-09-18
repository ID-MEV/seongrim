import axios from 'axios';

const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL; // Assuming Vite for env variables

export const getPostsByCategory = async (categoryId, page = 1, perPage = 10) => {
  try {
    const response = await axios.get(
      `${WORDPRESS_API_URL}/wp-json/wp/v2/posts`,
      {
        params: {
          categories: categoryId,
          page: page,
          per_page: perPage,
        },
      }
    );
    return {
      posts: response.data,
      totalPages: response.headers['x-wp-totalpages'],
    };
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error);
    throw error;
  }
};

// TODO: Replace with the actual category ID for '앨범' posts
const ALBUM_CATEGORY_ID = 123; // Placeholder for album category ID

export const getAlbumImages = async (page = 1, perPage = 10) => {
  try {
    const { posts, totalPages } = await getPostsByCategory(ALBUM_CATEGORY_ID, page, perPage);

    const images = [];
    posts.forEach(post => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, 'text/html');
      const imgTags = doc.querySelectorAll('img');
      imgTags.forEach(img => {
        images.push({
          src: img.src,
          alt: img.alt || post.title, // Use post title as alt if alt is missing
          postId: post.id,
          postTitle: post.title,
        });
      });
    });

    return { images, totalPages };
  } catch (error) {
    console.error('Error fetching album images:', error);
    throw error;
  }
};