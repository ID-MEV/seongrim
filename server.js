/**
 * Seongrim Church Admin Backend Server Template
 * Express + MariaDB 구조로 되어 있으며, 실제 작동하지 않는 골격만 제공합니다.
 * DB 연결, PM2 등록, 환경변수 설정은 직접 구성해 주세요.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// ──────────────────────────────────────────────
// Middleware
// ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 서빙 (업로드된 이미지)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 업로드 디렉토리 생성
const uploadDir = path.join(__dirname, 'uploads', 'members');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ──────────────────────────────────────────────
// MariaDB Connection Pool (미구현 - 직접 설정 필요)
// ──────────────────────────────────────────────
/*
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'seongrim',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 연결 테스트
pool.getConnection()
  .then(conn => {
    console.log('✅ MariaDB 연결 성공');
    conn.release();
  })
  .catch(err => {
    console.error('❌ MariaDB 연결 실패:', err.message);
  });

module.exports = pool;
*/

// ──────────────────────────────────────────────
// Multer 설정 (회원 사진 업로드)
// ──────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('이미지 파일만 업로드 가능합니다. (jpeg, png, webp, gif)'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ──────────────────────────────────────────────
// JWT 인증 미들웨어 (미구현 - 직접 구현 필요)
// ──────────────────────────────────────────────
/*
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: '토큰이 필요합니다.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
    }
    req.user = user;
    next();
  });
};
*/

// 임시: 인증 미들웨어 스킵용 (개발용)
const authenticateToken = (req, res, next) => {
  // TODO: 실제 JWT 검증 구현 후 주석 해제
  // 현재는 개발 편의를 위해 통과시킴
  req.user = { id: 1, username: 'admin' };
  next();
};

// ──────────────────────────────────────────────
// 라우트: 회원 관리 (Members)
// ──────────────────────────────────────────────

// 회원 전체 조회 (검색 지원)
app.get('/api/admin/members', authenticateToken, async (req, res) => {
  try {
    const { search = '', page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    // TODO: 실제 DB 쿼리 구현
    /*
    let query = 'SELECT * FROM members WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (name LIKE ? OR position LIKE ? OR gender LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY `order` ASC, id DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM members WHERE 1=1' + (search ? ' AND (name LIKE ? OR position LIKE ? OR gender LIKE ?)' : ''),
      search ? [searchTerm, searchTerm, searchTerm] : []
    );

    res.json({
      members: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        totalPages: Math.ceil(countResult[0].total / limit),
      },
    });
    */

    // 임시 더미 데이터 반환 (개발용)
    const dummyMembers = [
      { id: 1, name: '김철수', gender: '남', position: '장로', order: 1, photo_url: null, phone: '010-1234-5678', address: '서울시 강남구', created_at: '2024-01-15' },
      { id: 2, name: '이영희', gender: '여', position: '권사', order: 2, photo_url: null, phone: '010-2345-6789', address: '서울시 서초구', created_at: '2024-01-20' },
      { id: 3, name: '박민수', gender: '남', position: '집사', order: 3, photo_url: null, phone: '010-3456-7890', address: '서울시 송파구', created_at: '2024-02-01' },
    ];

    const filtered = search
      ? dummyMembers.filter(m =>
          m.name.includes(search) ||
          m.position.includes(search) ||
          m.gender.includes(search)
        )
      : dummyMembers;

    res.json({
      members: filtered.slice(offset, offset + parseInt(limit)),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
      },
    });
  } catch (err) {
    console.error('회원 조회 오류:', err);
    res.status(500).json({ error: '회원 목록을 불러올 수 없습니다.' });
  }
});

// 회원 단일 조회
app.get('/api/admin/members/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: 실제 DB 쿼리 구현
    // const [rows] = await pool.query('SELECT * FROM members WHERE id = ?', [id]);
    // if (rows.length === 0) return res.status(404).json({ error: '회원을 찾을 수 없습니다.' });
    // res.json(rows[0]);

    // 임시 더미 데이터
    const member = { id: parseInt(id), name: '김철수', gender: '남', position: '장로', order: 1, photo_url: null, phone: '010-1234-5678', address: '서울시 강남구', created_at: '2024-01-15' };
    res.json(member);
  } catch (err) {
    console.error('회원 조회 오류:', err);
    res.status(500).json({ error: '회원 정보를 불러올 수 없습니다.' });
  }
});

// 회원 등록 (사진 업로드 포함)
app.post('/api/admin/members', authenticateToken, upload.single('photo'), async (req, res) => {
  try {
    const { name, gender, position, order, phone, address } = req.body;
    const photo_url = req.file ? `/uploads/members/${req.file.filename}` : null;

    // 유효성 검사
    if (!name || !gender || !position) {
      return res.status(400).json({ error: '이름, 성별, 직분은 필수입니다.' });
    }

    // TODO: 실제 DB INSERT 구현
    /*
    const [result] = await pool.query(
      'INSERT INTO members (name, gender, position, `order`, photo_url, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, gender, position, order || 0, photo_url, phone || null, address || null]
    );
    const [rows] = await pool.query('SELECT * FROM members WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
    */

    // 임시 응답
    const newMember = {
      id: Date.now(),
      name,
      gender,
      position,
      order: parseInt(order) || 0,
      photo_url,
      phone: phone || null,
      address: address || null,
      created_at: new Date().toISOString().split('T')[0],
    };
    res.status(201).json(newMember);
  } catch (err) {
    console.error('회원 등록 오류:', err);
    res.status(500).json({ error: '회원 등록에 실패했습니다.' });
  }
});

// 회원 수정 (사진 업로드 포함)
app.put('/api/admin/members/:id', authenticateToken, upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, position, order, phone, address } = req.body;
    const photo_url = req.file ? `/uploads/members/${req.file.filename}` : req.body.existing_photo_url;

    // TODO: 실제 DB UPDATE 구현
    /*
    await pool.query(
      'UPDATE members SET name=?, gender=?, position=?, `order`=?, photo_url=?, phone=?, address=? WHERE id=?',
      [name, gender, position, order || 0, photo_url, phone || null, address || null, id]
    );
    const [rows] = await pool.query('SELECT * FROM members WHERE id = ?', [id]);
    res.json(rows[0]);
    */

    // 임시 응답
    const updatedMember = {
      id: parseInt(id),
      name,
      gender,
      position,
      order: parseInt(order) || 0,
      photo_url,
      phone: phone || null,
      address: address || null,
      updated_at: new Date().toISOString().split('T')[0],
    };
    res.json(updatedMember);
  } catch (err) {
    console.error('회원 수정 오류:', err);
    res.status(500).json({ error: '회원 수정에 실패했습니다.' });
  }
});

// 회원 삭제
app.delete('/api/admin/members/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: 실제 DB DELETE 구현 (사진 파일도 함께 삭제)
    /*
    const [rows] = await pool.query('SELECT photo_url FROM members WHERE id = ?', [id]);
    if (rows.length > 0 && rows[0].photo_url) {
      const photoPath = path.join(__dirname, rows[0].photo_url);
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
    }
    await pool.query('DELETE FROM members WHERE id = ?', [id]);
    */

    res.json({ success: true, message: '회원이 삭제되었습니다.' });
  } catch (err) {
    console.error('회원 삭제 오류:', err);
    res.status(500).json({ error: '회원 삭제에 실패했습니다.' });
  }
});

// ──────────────────────────────────────────────
// 라우트: 설정 (Settings)
// ──────────────────────────────────────────────

// 설정 조회
app.get('/api/admin/settings', authenticateToken, async (req, res) => {
  try {
    // TODO: 실제 DB 쿼리 구현
    // const [rows] = await pool.query('SELECT * FROM settings LIMIT 1');
    // res.json(rows[0] || { background_image_url: '', theme_color: '#1E4040' });

    res.json({ background_image_url: '', theme_color: '#1E4040' });
  } catch (err) {
    console.error('설정 조회 오류:', err);
    res.status(500).json({ error: '설정을 불러올 수 없습니다.' });
  }
});

// 설정 저장
app.put('/api/admin/settings', authenticateToken, async (req, res) => {
  try {
    const { background_image_url, theme_color } = req.body;

    // TODO: 실제 DB UPSERT 구현
    /*
    await pool.query(
      'INSERT INTO settings (background_image_url, theme_color) VALUES (?, ?) ON DUPLICATE KEY UPDATE background_image_url=?, theme_color=?',
      [background_image_url, theme_color, background_image_url, theme_color]
    );
    */

    res.json({ background_image_url, theme_color });
  } catch (err) {
    console.error('설정 저장 오류:', err);
    res.status(500).json({ error: '설정 저장에 실패했습니다.' });
  }
});

// ──────────────────────────────────────────────
// 라우트: 통계 (Dashboard Stats)
// ──────────────────────────────────────────────
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    // TODO: 실제 DB 쿼리 구현
    /*
    const [memos] = await pool.query('SELECT COUNT(*) as count FROM memos');
    const [wpPosts] = await pool.query('SELECT COUNT(*) as count FROM wp_posts');
    const [videos] = await pool.query('SELECT COUNT(*) as count FROM cached_videos');
    const [members] = await pool.query('SELECT COUNT(*) as count FROM members');

    res.json({
      memos: memos[0].count,
      wpPosts: wpPosts[0].count,
      videos: videos[0].count,
      members: members[0].count,
    });
    */

    // 임시 더미 데이터
    res.json({
      memos: 12,
      wpPosts: 45,
      videos: 8,
      members: 156,
    });
  } catch (err) {
    console.error('통계 조회 오류:', err);
    res.status(500).json({ error: '통계를 불러올 수 없습니다.' });
  }
});

// ──────────────────────────────────────────────
// 라우트: 로그인 (Auth)
// ──────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // TODO: 실제 DB에서 사용자 조회 및 비밀번호 검증 (bcrypt 등)
    /*
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token, username: user.username });
    */

    // 임시: 하드코딩된 관리자 계정 (개발용)
    if (username === 'admin' && password === 'admin123') {
      const token = 'dummy-jwt-token-' + Date.now();
      res.json({ token, username: 'admin' });
    } else {
      res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다. (개발용: admin / admin123)' });
    }
  } catch (err) {
    console.error('로그인 오류:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// ──────────────────────────────────────────────
// 에러 핸들링
// ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: '파일 크기는 5MB 이하여야 합니다.' });
    }
  }
  res.status(500).json({ error: err.message || '서버 내부 오류' });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({ error: '요청한 경로를 찾을 수 없습니다.' });
});

// ──────────────────────────────────────────────
// 서버 시작
// ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Upload directory: ${uploadDir}`);
  console.log('⚠️  주의: 이 서버는 템플릿입니다. DB 연결, JWT, bcrypt 등 실제 구현이 필요합니다.');
});

module.exports = app;