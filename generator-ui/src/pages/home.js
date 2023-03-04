import React, { useRef, useEffect } from 'react';

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Draw a rectangle on the canvas
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 50, 50);
    
    // Draw a circle on the canvas
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
  }, []);

  return (
    <canvas ref={canvasRef} width={300} height={200} />
  );
}

function HomePage() {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>Here's an example of an embedded canvas:</p>
      <Canvas />
    </div>
  );
}

export default HomePage;
