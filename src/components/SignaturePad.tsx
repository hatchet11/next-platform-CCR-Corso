'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export interface SignaturePadRef {
  isEmpty: () => boolean;
  getSignature: () => string;
  clear: () => void;
}

const SignaturePad = forwardRef<SignaturePadRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasDrawn = useRef(false);
  const drawing = useRef(false);

  useImperativeHandle(ref, () => ({
    isEmpty: () => !hasDrawn.current,
    getSignature: () => canvasRef.current?.toDataURL() ?? '',
    clear: () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
      hasDrawn.current = false;
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.strokeStyle = '#c9a227';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let lastPos: { x: number; y: number } | null = null;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      if ('touches' in e) return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
      return { x: ((e as MouseEvent).clientX - rect.left) * scaleX, y: ((e as MouseEvent).clientY - rect.top) * scaleY };
    };

    const onDown = (e: MouseEvent | TouchEvent) => { e.preventDefault(); drawing.current = true; lastPos = getPos(e); };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!drawing.current || !lastPos) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.beginPath(); ctx.moveTo(lastPos.x, lastPos.y); ctx.lineTo(pos.x, pos.y); ctx.stroke();
      lastPos = pos;
      hasDrawn.current = true;
    };
    const onUp = () => { drawing.current = false; lastPos = null; };

    canvas.addEventListener('mousedown', onDown, { passive: false });
    canvas.addEventListener('mousemove', onMove, { passive: false });
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: false });
    canvas.addEventListener('touchmove', onMove, { passive: false });
    canvas.addEventListener('touchend', onUp);

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mouseleave', onUp);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove', onMove);
      canvas.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={160}
      style={{ display: 'block', width: '100%', height: '160px', background: '#111', border: '1px solid #333', borderRadius: '4px', cursor: 'crosshair', touchAction: 'none' }}
    />
  );
});

SignaturePad.displayName = 'SignaturePad';
export default SignaturePad;
