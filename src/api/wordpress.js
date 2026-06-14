import axios from 'axios';

const WORDPRESS_API_URL = import.meta.env.VITE_API_URL; // Assuming Vite for env variables

export const getPostsByCategory = async (categoryId, page = 1, perPage = 10) => {
  try {
    const response = await axios.get(
      `${WORDPRESS_API_URL}/wp/v2/posts`,
      {
        params: {
          categories: categoryId,
          page: page,
          per_page: perPage,
          _fields: 'id,title,date,content',
        },
      }
    );
    return {
      posts: response.data,
      totalPages: parseInt(response.headers['x-wp-totalpages'], 10) || 1,
    };
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Extracts the first image URL from an HTML string.
 * @param {string} htmlString - The HTML string to parse.
 * @returns {string|null} The URL of the first image found, or null if no image is found.
 */
export const extractImageUrlFromHtml = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const imgTag = doc.querySelector('img');
  return imgTag ? imgTag.src : null;
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/wp/v2/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const ALBUM_CATEGORY_ID = 4; // 앨범 카테고리 ID
const FREE_BOARD_CATEGORY_ID = 2; // 자유게시판 카테고리 ID

export const getAlbumImages = async (page = 1, perPage = 10) => {
  try {
    const { posts, totalPages } = await getPostsByCategory(ALBUM_CATEGORY_ID, page, perPage);

    const images = [];
    posts.forEach(post => {
      // WordPress API에서 content는 { rendered, protected } 객체로 반환됨
      const htmlContent = post.content?.rendered || '';
      if (!htmlContent) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const imgTags = doc.querySelectorAll('img');
      const postTitle = post.title?.rendered || '제목 없음';

      imgTags.forEach(img => {
        // srcset에서 가장 큰 원본 이미지를 추출하거나 src 사용
        const srcset = img.getAttribute('srcset');
        let bestSrc = img.getAttribute('src') || '';
        if (srcset) {
          const parts = srcset.split(',').map(s => s.trim().split(' '));
          // 가장 큰 너비의 이미지 선택
          const largest = parts.reduce((max, curr) => {
            const w = parseInt(curr[1]) || 0;
            const maxW = parseInt(max[1]) || 0;
            return w > maxW ? curr : max;
          }, parts[0]);
          if (largest && largest[0]) bestSrc = largest[0];
        }
        if (bestSrc) {
          images.push({
            src: bestSrc,
            alt: img.alt || postTitle,
            postId: post.id,
            postTitle: postTitle,
          });
        }
      });
    });

    return { images, totalPages };
  } catch (error) {
    console.error('Error fetching album images:', error);
    throw error;
  }
};

// ─── 자유게시판 WordPress 연동 ───────────────────────────────────────────────

export const getFreePosts = async () => {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/wp/v2/posts`, {
      params: {
        categories: FREE_BOARD_CATEGORY_ID,
        per_page: 100,
        orderby: 'date',
        order: 'desc',
        _fields: 'id,title,content,date',
      },
    });
    return response.data.map(post => ({
      id: post.id,
      title: post.title?.rendered || '',
      content: post.content?.rendered || '',
      date: post.date,
    }));
  } catch (error) {
    console.error('Error fetching free board posts:', error);
    throw error;
  }
};

export const createFreePost = async (nickname, text) => {
  // WordPress REST API에 새 포스트 등록 (Application Password 또는 백엔드 프록시 필요)
  // 현재는 백엔드 프록시 엔드포인트를 통해 처리
  const BACKEND_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL || 'https://api.mev.o-r.kr';
  const response = await axios.post(`${BACKEND_URL}/api/wp-memo`, {
    nickname: nickname.trim(),
    content: text.trim(),
    categoryId: FREE_BOARD_CATEGORY_ID,
  });
  return response.data;
};

export const deleteFreePost = async (postId) => {
  const BACKEND_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL || 'https://api.mev.o-r.kr';
  const response = await axios.delete(`${BACKEND_URL}/api/wp-memo/${postId}`);
  return response.data;
};