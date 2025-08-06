"use client";

import React, { useEffect, useRef } from 'react';
import { EditorJSOutput } from '@/types/landingPageAdmin';

interface EditorJSRendererProps {
  data: EditorJSOutput;
}

const EditorJSRenderer: React.FC<EditorJSRendererProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !data.blocks || !containerRef.current) {
      return;
    }

    const renderBlock = (block: any) => {
      const { type, data: blockData } = block;

      switch (type) {
        case 'paragraph':
          return `<p style="margin-bottom: 1rem; line-height: 1.7; color: #000000;">${blockData.text || ''}</p>`;
        
        case 'header':
          const level = blockData.level || 2;
          const tag = `h${level}`;
          const fontSize = level === 1 ? '2rem' : level === 2 ? '1.5rem' : '1.25rem';
          return `<${tag} style="font-size: ${fontSize}; font-weight: 600; margin: 1.5rem 0 1rem 0; color: hsl(var(--primary));">${blockData.text || ''}</${tag}>`;
        
        case 'list':
          const listType = blockData.style === 'ordered' ? 'ol' : 'ul';
          const listItems = blockData.items.map((item: string) => `<li style="margin-bottom: 0.5rem; color: #000000;">${item}</li>`).join('');
          return `<${listType} style="margin: 1rem 0; padding-left: 1.5rem; color: #000000;">${listItems}</${listType}>`;
        
        case 'quote':
          return `
            <blockquote style="
              border-left: 4px solid #166534; 
              padding-left: 1rem; 
              margin: 1.5rem 0; 
              font-style: italic; 
              color: #000000;
              background: #f8f9fa;
              padding: 1rem;
              border-radius: 0 8px 8px 0;
            ">
              <p style="margin: 0 0 0.5rem 0; color: #000000;">${blockData.text || ''}</p>
              ${blockData.caption ? `<cite style="font-size: 0.9rem; color: #000000;">— ${blockData.caption}</cite>` : ''}
            </blockquote>
          `;
        
        case 'image':
          const imageUrl = blockData.file?.url || blockData.url || '';
          return `
            <div style="margin: 1.5rem 0; text-align: center; width: 100%;">
              <img 
                src="${imageUrl}" 
                alt="${blockData.caption || ''}"
                style="width: 100%; height: auto; border-radius: 8px; max-width: 100%;"
                onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop';"
              />
              ${blockData.caption ? `<p style="margin-top: 0.5rem; font-size: 0.9rem; color: #000000; font-style: italic;">${blockData.caption}</p>` : ''}
            </div>
          `;
        
        case 'code':
          return `
            <pre style="
              background: #f4f4f4; 
              padding: 1rem; 
              border-radius: 8px; 
              overflow-x: auto; 
              margin: 1rem 0;
              font-family: 'Courier New', monospace;
              font-size: 0.9rem;
            "><code>${blockData.code || ''}</code></pre>
          `;
        
        case 'table':
          if (!blockData.content || !Array.isArray(blockData.content)) return '';
          
          const tableRows = blockData.content.map((row: string[]) => 
            `<tr>${row.map(cell => `<td style="border: 1px solid #ddd; padding: 0.5rem;">${cell}</td>`).join('')}</tr>`
          ).join('');
          
          return `
            <div style="overflow-x: auto; margin: 1rem 0;">
              <table style="border-collapse: collapse; width: 100%;">
                <tbody>${tableRows}</tbody>
              </table>
            </div>
          `;
        
        default:
          return `<p style="margin-bottom: 1rem;">${JSON.stringify(blockData)}</p>`;
      }
    };

    const renderedContent = data.blocks.map(renderBlock).join('');
    containerRef.current.innerHTML = renderedContent;
  }, [data]);

  return <div ref={containerRef} />;
};

export default EditorJSRenderer; 