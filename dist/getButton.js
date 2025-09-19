/*!
 * getButton v1.0.0
 * A lightweight Line QR code button widget
 * https://github.com/yourusername/getButton
 * 
 * Copyright (c) 2025
 * Licensed under MIT
 */
// Core getButton functionality
(function() {
  'use strict';
  
  // Default configuration
  const defaultConfig = {
    qrCodeImage: './src/assets/line-qr.svg',
    lineUrl: 'https://lin.ee/mk5SfVU',
    buttonText: 'Line',
    theme: 'green', // green, white
    position: 'fixed', // fixed, inline
    bottom: '20px',
    right: '20px'
  };
  
  // Merge user config with defaults
  const getConfig = () => {
    const userConfig = window.getButtonConfig || {};
    return { ...defaultConfig, ...userConfig };
  };
  
  // Inject CSS styles
  const injectStyles = () => {
    if (document.getElementById('getbutton-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'getbutton-styles';
    style.textContent = `
      /* Button Styles */
      .getbutton-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .getbutton-container.inline {
        position: static;
        display: inline-block;
      }

      .getbutton-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        padding: 0;
        background: #00c300;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 195, 0, 0.3);
      }

      .getbutton-btn:active {
        transform: scale(0.95);
      }

      .getbutton-icon {
        width: 40px;
        height: 40px;
        fill: currentColor;
      }

      .getbutton-btn.theme-white {
        background: white;
        color: #00c300;
        border: 2px solid #00c300;
        box-shadow: 0 4px 12px rgba(0, 195, 0, 0.2);
      }

      .getbutton-btn.theme-white:active {
        transform: scale(0.95);
      }

      /* Popup Styles */
      .getbutton-popup {
        position: absolute;
        bottom: 80px;
        right: 0;
        background: white;
        border-radius: 16px;
        padding: 20px;
        width: 280px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px);
        transition: all 0.3s ease;
        z-index: 10001;
      }

      .getbutton-popup.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .getbutton-popup::after {
        content: '';
        position: absolute;
        bottom: -8px;
        right: 20px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid white;
      }

      .getbutton-popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #e9ecef;
      }

      .getbutton-popup-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #00c300;
      }

      .getbutton-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 4px;
        color: #6c757d;
        border-radius: 4px;
        transition: background-color 0.2s ease;
      }

      .getbutton-close:hover {
        background: #f8f9fa;
      }

      .getbutton-qr-container {
        text-align: center;
        margin-bottom: 16px;
      }

      .getbutton-qr-image {
        width: 180px;
        height: 180px;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        object-fit: contain;
      }

      .getbutton-url {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 10px;
        font-size: 11px;
        color: #6c757d;
        word-break: break-all;
        text-align: center;
      }

      .getbutton-line-icon {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }
    `;
    
    document.head.appendChild(style);
  };
  
  // Create button component
  const createButton = (config) => {
    const container = document.createElement('div');
    container.className = config.position === 'inline' ? 'getbutton-container inline' : 'getbutton-container';
    
    // Apply custom positioning for fixed mode
    if (config.position === 'fixed') {
      if (config.bottom) container.style.bottom = config.bottom;
      if (config.right) container.style.right = config.right;
      if (config.top) container.style.top = config.top;
      if (config.left) container.style.left = config.left;
    }
    
    const button = document.createElement('button');
    button.className = `getbutton-btn${config.theme === 'white' ? ' theme-white' : ''}`;
    
    // Line icon SVG
    const iconSvg = `
      <svg class="getbutton-icon" viewBox="0 0 48 48">
        <path fill="#00c300" d="M12.5,42h23c3.59,0,6.5-2.91,6.5-6.5v-23C42,8.91,39.09,6,35.5,6h-23C8.91,6,6,8.91,6,12.5v23C6,39.09,8.91,42,12.5,42z"></path>
        <path fill="#fff" d="M37.113,22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108,4.772-13.108,10.637c0,5.258,4.663,9.662,10.962,10.495c0.427,0.092,1.008,0.282,1.155,0.646c0.132,0.331,0.086,0.85,0.042,1.185c0,0-0.153,0.925-0.187,1.122c-0.057,0.331-0.263,1.296,1.135,0.707c1.399-0.589,7.548-4.445,10.298-7.611h-0.001C36.203,26.879,37.113,24.764,37.113,22.417z M18.875,25.907h-2.604c-0.379,0-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687c0.379,0,0.687,0.308,0.687,0.687v4.521h1.917c0.379,0,0.687,0.308,0.687,0.687C19.562,25.598,19.254,25.907,18.875,25.907z M21.568,25.219c0,0.379-0.308,0.688-0.687,0.688s-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687s0.687,0.308,0.687,0.687V25.219z M27.838,25.219c0,0.297-0.188,0.559-0.47,0.652c-0.071,0.024-0.145,0.036-0.218,0.036c-0.215,0-0.42-0.103-0.549-0.275l-2.669-3.635v3.222c0,0.379-0.308,0.688-0.688,0.688c-0.379,0-0.688-0.308-0.688-0.688V20.01c0-0.296,0.189-0.558,0.47-0.652c0.071-0.024,0.144-0.035,0.218-0.035c0.214,0,0.42,0.103,0.549,0.275l2.67,3.635V20.01c0-0.379,0.309-0.687,0.688-0.687c0.379,0,0.687,0.308,0.687,0.687V25.219z M32.052,21.927c0.379,0,0.688,0.308,0.688,0.688c0,0.379-0.308,0.687-0.688,0.687h-1.917v1.23h1.917c0.379,0,0.688,0.308,0.688,0.687c0,0.379-0.309,0.688-0.688,0.688h-2.604c-0.378,0-0.687-0.308-0.687-0.688v-2.603c0-0.001,0-0.001,0-0.001c0,0,0-0.001,0-0.001v-2.601c0-0.001,0-0.001,0-0.002c0-0.379,0.308-0.687,0.687-0.687h2.604c0.379,0,0.688,0.308,0.688,0.687s-0.308,0.687-0.688,0.687h-1.917v1.23H32.052z"></path>
      </svg>
    `;
    
    button.innerHTML = iconSvg;
    container.appendChild(button);
    
    return { container, button };
  };
  
  // Create popup component (shows above button)
  const createPopup = (config, buttonContainer) => {
    const popup = document.createElement('div');
    popup.className = 'getbutton-popup';
    
    // Line icon SVG for header
    const lineIconSvg = `
      <svg class="getbutton-line-icon" viewBox="0 0 48 48">
        <path fill="#00c300" d="M12.5,42h23c3.59,0,6.5-2.91,6.5-6.5v-23C42,8.91,39.09,6,35.5,6h-23C8.91,6,6,8.91,6,12.5v23C6,39.09,8.91,42,12.5,42z"></path>
        <path fill="#fff" d="M37.113,22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108,4.772-13.108,10.637c0,5.258,4.663,9.662,10.962,10.495c0.427,0.092,1.008,0.282,1.155,0.646c0.132,0.331,0.086,0.85,0.042,1.185c0,0-0.153,0.925-0.187,1.122c-0.057,0.331-0.263,1.296,1.135,0.707c1.399-0.589,7.548-4.445,10.298-7.611h-0.001C36.203,26.879,37.113,24.764,37.113,22.417z M18.875,25.907h-2.604c-0.379,0-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687c0.379,0,0.687,0.308,0.687,0.687v4.521h1.917c0.379,0,0.687,0.308,0.687,0.687C19.562,25.598,19.254,25.907,18.875,25.907z M21.568,25.219c0,0.379-0.308,0.688-0.687,0.688s-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687s0.687,0.308,0.687,0.687V25.219z M27.838,25.219c0,0.297-0.188,0.559-0.47,0.652c-0.071,0.024-0.145,0.036-0.218,0.036c-0.215,0-0.42-0.103-0.549-0.275l-2.669-3.635v3.222c0,0.379-0.308,0.688-0.688,0.688c-0.379,0-0.688-0.308-0.688-0.688V20.01c0-0.296,0.189-0.558,0.47-0.652c0.071-0.024,0.144-0.035,0.218-0.035c0.214,0,0.42,0.103,0.549,0.275l2.67,3.635V20.01c0-0.379,0.309-0.687,0.688-0.687c0.379,0,0.687,0.308,0.687,0.687V25.219z M32.052,21.927c0.379,0,0.688,0.308,0.688,0.688c0,0.379-0.308,0.687-0.688,0.687h-1.917v1.23h1.917c0.379,0,0.688,0.308,0.688,0.687c0,0.379-0.309,0.688-0.688,0.688h-2.604c-0.378,0-0.687-0.308-0.687-0.688v-2.603c0-0.001,0-0.001,0-0.001c0,0,0-0.001,0-0.001v-2.601c0-0.001,0-0.001,0-0.002c0-0.379,0.308-0.687,0.687-0.687h2.604c0.379,0,0.688,0.308,0.688,0.687s-0.308,0.687-0.688,0.687h-1.917v1.23H32.052z"></path>
      </svg>
    `;
    
    popup.innerHTML = `
      <div class="getbutton-popup-header">
        <div class="getbutton-popup-title">
          ${lineIconSvg}
          <span>Line</span>
        </div>
        <button class="getbutton-close">&times;</button>
      </div>
      <div class="getbutton-qr-container">
        <img src="${config.qrCodeImage}" alt="Line QR Code" class="getbutton-qr-image" />
      </div>
      <div class="getbutton-url">${config.lineUrl}</div>
    `;
    
    // Position popup above button
    buttonContainer.appendChild(popup);
    
    // Event listeners
    const closeBtn = popup.querySelector('.getbutton-close');
    const closePopup = () => {
      popup.classList.remove('show');
      setTimeout(() => {
        if (popup.parentNode) {
          popup.parentNode.removeChild(popup);
        }
      }, 300);
    };
    
    closeBtn.addEventListener('click', closePopup);
    
    // Close when clicking outside
    document.addEventListener('click', function handleOutsideClick(e) {
      if (!popup.contains(e.target) && !buttonContainer.querySelector('.getbutton-btn').contains(e.target)) {
        closePopup();
        document.removeEventListener('click', handleOutsideClick);
      }
    });
    
    // ESC key to close
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closePopup();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
    
    return { 
      popup, 
      show: () => {
        setTimeout(() => popup.classList.add('show'), 10);
      }
    };
  };
  
  // Initialize the button
  const init = () => {
    const config = getConfig();
    injectStyles();
    
    // Create button
    const { container, button } = createButton(config);
    
    // Add click handler
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      // Check if popup already exists
      if (container.querySelector('.getbutton-popup')) {
        return;
      }
      const popup = createPopup(config, container);
      popup.show();
    });
    
    // Handle different positioning modes
    if (config.position === 'fixed') {
      // For fixed positioning, append directly to body
      document.body.appendChild(container);
    } else {
      // For inline positioning, find target container
      const target = document.getElementById('line-button');
      if (!target) {
        console.warn('getButton: Target element #line-button not found, falling back to body');
        document.body.appendChild(container);
        return;
      }
      target.appendChild(container);
    }
  };
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose API for manual initialization
  window.getButton = {
    init: init,
    version: '1.0.0'
  };
  
})();
