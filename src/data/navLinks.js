const navLinks = [
  {
    title: '환영합니다',
    sublinks: [
      { title: '인사말', path: '/welcome/greetings' },
      { title: '새가족안내', path: '/welcome/new-family' },
      { title: '예배시간', path: '/welcome/service-times' },
      { title: '오시는길', path: '/welcome/directions' },
    ],
  },
  {
    title: '교회소개',
    sublinks: [
      { title: '비전', path: '/about/vision' },
      { title: '섬기는사람들', path: '/about/staff' },
      { title: '교회연혁', path: '/about/history' },
    ],
  },
  {
    title: '말씀/찬양',
    sublinks: [
      { title: '주일설교', path: '/sermons/sunday' },
      { title: '찬양대', path: '/sermons/choir' },
      { title: '특별찬양', path: '/sermons/special-praise' },
    ],
  },
  {
    title: '교회학교',
    sublinks: [
      { title: '유아/유치부', path: '/education/toddler' },
      { title: '초등부', path: '/education/elementary' },
      { title: '중/고등부', path: '/education/youth' },
      { title: '청년부', path: '/education/young-adult' },
    ],
  },
  {
    title: '교회소식',
    sublinks: [
      { title: '교회소식', path: '/news/church-news' },
      { title: '주보보기', path: '/news/bulletin' },
      { title: '교회앨범', path: '/news/album' },
      { title: '자유게시판', path: '/news/free-board' },
    ],
  },
];

export default navLinks;
