import React from 'react';
import FadeIn from '../components/FadeIn'; // Adjust path as needed

const TestPage = () => {
  return (
    <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <h1>FadeIn Animation Test Page</h1>

      <FadeIn>
        <p style={{ fontSize: '1.2em', lineHeight: '1.5' }}>
          This is a paragraph that will fade in when it enters the viewport.
          It demonstrates the basic functionality of the FadeIn component.
        </p>
      </FadeIn>

      <FadeIn>
        <img
          src="https://via.placeholder.com/400x200?text=Image+1"
          alt="Placeholder 1"
          style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        />
      </FadeIn>

      <FadeIn>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: '150px', height: '100px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Card 1</div>
          <div style={{ width: '150px', height: '100px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Card 2</div>
          <div style={{ width: '150px', height: '100px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Card 3</div>
        </div>
      </FadeIn>

      <div style={{ height: '800px' }}></div> {/* Spacer to allow scrolling and trigger animation */}

      <FadeIn>
        <p style={{ fontSize: '1.2em', lineHeight: '1.5' }}>
          This content is further down the page and will fade in as you scroll.
          This helps verify the `once: true` option in `useVisibility` and the overall scroll-triggered animation.
        </p>
      </FadeIn>
    </div>
  );
};

export default TestPage;
