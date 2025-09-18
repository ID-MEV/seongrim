import React from 'react';
import HeroBanner from './HeroBanner';

export default {
  title: 'Components/HeroBanner',
  component: HeroBanner,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    imageUrl: {
      control: 'text',
      description: '배경 이미지 URL',
    },
    title: {
      control: 'text',
      description: '페이지 제목',
    },
  },
};

export const Default = {
  args: {
    imageUrl: 'https://via.placeholder.com/1500x400?text=Default+Banner',
    title: '기본 히어로 배너',
  },
};

export const LongTitle = {
  args: {
    imageUrl: 'https://via.placeholder.com/1500x400?text=Long+Title+Banner',
    title: '매우 길고 긴 페이지 제목이 여기에 표시됩니다. 이 제목은 여러 줄로 표시될 수 있습니다.',
  },
};

export const DifferentImage = {
  args: {
    imageUrl: 'https://via.placeholder.com/1500x400/FF5733/FFFFFF?text=Another+Image',
    title: '다른 배경 이미지',
  },
};

export const NoImage = {
  args: {
    imageUrl: '',
    title: '이미지 없는 배너',
  },
};
