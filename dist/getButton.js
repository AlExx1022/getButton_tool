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
    type: 'line', // 'line' or 'phone'
    qrCodeImage: './src/assets/line-qr.svg',
    lineUrl: 'url',
    phoneNumber: '+886912345678', // phone number for phone type
    buttonText: 'Line',
    theme: 'green', // green, white
    position: 'fixed', // fixed, inline
    bottom: '20px',
    right: '20px',
    buttonColor: '#00c300', // button background color
    headerColor: '#00c300'  // header background color
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
        border-radius: 20px;
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
        justify-content: start;
        border-radius: 16px 16px 0 0;
        padding: 8px;
        position: relative;
      }

      .getbutton-popup-title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        color: white;
      }

      .getbutton-close {
        position: absolute;
        top: 12px;
        right: 16px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 4px;
        color: white;
        border-radius: 4px;
        transition: background-color 0.2s ease;
      }

      .getbutton-qr-container {
        text-align: center;
        margin-top: 16px;
        margin-bottom: 12px;
      }

      .getbutton-qr-image {
        width: 180px;
        height: 180px;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        object-fit: contain;
      }

      .getbutton-qr-help {
        text-align: center;
        margin-bottom: 16px;
      }

      .getbutton-qr-help a {
        color: #333;
        text-decoration: none;
        font-size: 12px;
        transition: color 0.2s ease;
      }
      .getbutton-url {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 10px;
        font-size: 11px;
        text-align: center;
      }

      .getbutton-url a {
        text-decoration: none;
        word-break: break-all;
        transition: color 0.2s ease;
      }

      .getbutton-url a:hover {
        text-decoration: none;

      }

      .getbutton-line-icon {
        width: 20px;
        height: 20px;
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
    
    // Apply custom button color
    if (config.theme !== 'white') {
      button.style.backgroundColor = config.buttonColor;
      button.style.boxShadow = `0 4px 12px ${config.buttonColor}4D`; // 30% opacity
    }
    
    // Choose icon based on type
    let iconSvg;
    if (config.type === 'phone') {
      // Phone icon SVG
      iconSvg = `
        <svg class="getbutton-icon" viewBox="0 0 24 24" fill="none">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill="white"/>
        </svg>
      `;
    } else {
      // Line icon SVG (default)
      iconSvg = `
        <svg class="getbutton-icon" viewBox="0 0 24 24" fill="none">
          <path d="M22 10.6222C22 6.13836 17.4839 2.46094 12 2.46094C6.51613 2.46094 2 6.1061 2 10.6222C2 14.6222 5.54839 17.9771 10.3548 18.6222C10.6774 18.6545 11.129 18.848 11.2258 19.1061C11.3226 19.3319 11.2581 19.7513 11.2581 20.0093C11.2581 20.0093 11.129 20.7513 11.129 20.8803C11.0968 21.1061 10.9355 21.8803 12 21.3642C13.0323 20.9126 17.7419 17.9448 19.871 15.5577C21.3226 14.0093 22 12.3964 22 10.6222ZM8.45161 12.9771C8.45161 13.0738 8.35484 13.1706 8.25806 13.1706H5.45161C5.41935 13.1706 5.35484 13.1384 5.32258 13.1384C5.29032 13.1061 5.29032 13.0416 5.29032 13.0093V8.62223C5.29032 8.52546 5.3871 8.42868 5.48387 8.42868H6.16129C6.25806 8.42868 6.35484 8.52546 6.35484 8.62223V12.0738H8.25806C8.35484 12.0738 8.45161 12.1706 8.45161 12.2674V12.9771ZM10.129 12.9771C10.129 13.0738 10.0323 13.1706 9.93548 13.1706H9.25806C9.16129 13.1706 9.06452 13.0738 9.06452 12.9771V8.62223C9.06452 8.52546 9.16129 8.42868 9.25806 8.42868H9.93548C10.0323 8.42868 10.129 8.52546 10.129 8.62223V12.9771ZM15 12.9771C15 13.0738 14.9032 13.1706 14.8065 13.1706H14.129C14.0968 13.1706 14.0968 13.1706 14.0968 13.1706C14.0645 13.1706 14.0645 13.1384 14.0645 13.1384L12 10.4287V13.0093C12 13.1061 11.9032 13.2029 11.8065 13.2029H11.129C11.0323 13.2029 10.9355 13.1061 10.9355 13.0093V8.65449C10.9355 8.55772 11.0323 8.46094 11.129 8.46094H11.8065C11.8065 8.46094 11.8065 8.46094 11.8387 8.4932L13.8387 11.1706V8.58997C13.8387 8.4932 13.9355 8.39642 14.0323 8.39642H14.8065C14.9032 8.39642 15 8.4932 15 8.58997V12.9771ZM18.871 9.33191C18.871 9.42868 18.7742 9.52546 18.6774 9.52546H16.7742V10.2674H18.6774C18.7742 10.2674 18.871 10.3642 18.871 10.4609V11.1384C18.871 11.2351 18.7742 11.3319 18.6774 11.3319H16.7742V12.0093H18.6774C18.7742 12.0093 18.871 12.1061 18.871 12.2029V12.8803C18.871 12.9771 18.7742 13.0738 18.6774 13.0738H15.871C15.8387 13.0738 15.7742 13.0416 15.7419 13.0416C15.7097 13.0093 15.7097 12.9448 15.7097 12.9126V8.55772C15.7097 8.52546 15.7419 8.46094 15.7419 8.42868C15.7742 8.39642 15.8387 8.39642 15.871 8.39642H18.6774C18.7742 8.39642 18.871 8.4932 18.871 8.58997V9.33191Z" fill="white"/>
        </svg>
      `;
    }
    
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
      <svg class="getbutton-icon" viewBox="0 0 24 24" fill="none">
        <path d="M22 10.6222C22 6.13836 17.4839 2.46094 12 2.46094C6.51613 2.46094 2 6.1061 2 10.6222C2 14.6222 5.54839 17.9771 10.3548 18.6222C10.6774 18.6545 11.129 18.848 11.2258 19.1061C11.3226 19.3319 11.2581 19.7513 11.2581 20.0093C11.2581 20.0093 11.129 20.7513 11.129 20.8803C11.0968 21.1061 10.9355 21.8803 12 21.3642C13.0323 20.9126 17.7419 17.9448 19.871 15.5577C21.3226 14.0093 22 12.3964 22 10.6222ZM8.45161 12.9771C8.45161 13.0738 8.35484 13.1706 8.25806 13.1706H5.45161C5.41935 13.1706 5.35484 13.1384 5.32258 13.1384C5.29032 13.1061 5.29032 13.0416 5.29032 13.0093V8.62223C5.29032 8.52546 5.3871 8.42868 5.48387 8.42868H6.16129C6.25806 8.42868 6.35484 8.52546 6.35484 8.62223V12.0738H8.25806C8.35484 12.0738 8.45161 12.1706 8.45161 12.2674V12.9771ZM10.129 12.9771C10.129 13.0738 10.0323 13.1706 9.93548 13.1706H9.25806C9.16129 13.1706 9.06452 13.0738 9.06452 12.9771V8.62223C9.06452 8.52546 9.16129 8.42868 9.25806 8.42868H9.93548C10.0323 8.42868 10.129 8.52546 10.129 8.62223V12.9771ZM15 12.9771C15 13.0738 14.9032 13.1706 14.8065 13.1706H14.129C14.0968 13.1706 14.0968 13.1706 14.0968 13.1706C14.0645 13.1706 14.0645 13.1384 14.0645 13.1384L12 10.4287V13.0093C12 13.1061 11.9032 13.2029 11.8065 13.2029H11.129C11.0323 13.2029 10.9355 13.1061 10.9355 13.0093V8.65449C10.9355 8.55772 11.0323 8.46094 11.129 8.46094H11.8065C11.8065 8.46094 11.8065 8.46094 11.8387 8.4932L13.8387 11.1706V8.58997C13.8387 8.4932 13.9355 8.39642 14.0323 8.39642H14.8065C14.9032 8.39642 15 8.4932 15 8.58997V12.9771ZM18.871 9.33191C18.871 9.42868 18.7742 9.52546 18.6774 9.52546H16.7742V10.2674H18.6774C18.7742 10.2674 18.871 10.3642 18.871 10.4609V11.1384C18.871 11.2351 18.7742 11.3319 18.6774 11.3319H16.7742V12.0093H18.6774C18.7742 12.0093 18.871 12.1061 18.871 12.2029V12.8803C18.871 12.9771 18.7742 13.0738 18.6774 13.0738H15.871C15.8387 13.0738 15.7742 13.0416 15.7419 13.0416C15.7097 13.0093 15.7097 12.9448 15.7097 12.9126V8.55772C15.7097 8.52546 15.7419 8.46094 15.7419 8.42868C15.7742 8.39642 15.8387 8.39642 15.871 8.39642H18.6774C18.7742 8.39642 18.871 8.4932 18.871 8.58997V9.33191Z" fill="white"/>
      </svg>
    `;
    
    popup.innerHTML = `
      <div class="getbutton-popup-header" style="background: ${config.headerColor};">
        <div class="getbutton-popup-title">
          ${lineIconSvg}
          <span>Line</span>
        </div>
        <button class="getbutton-close">&times;</button>
      </div>
      <div class="getbutton-qr-container">
        <img src="${config.qrCodeImage}" alt="Line QR Code" class="getbutton-qr-image" />
      </div>
      <div class="getbutton-qr-help">
        <a href="https://creer-design.com/blogView.php?id=11" target="_blank" rel="noopener noreferrer">如何產生官方QRcode</a>
      </div>
      <div class="getbutton-url">
        <a href="${config.lineUrl}" target="_blank" rel="noopener noreferrer">${config.lineUrl}</a>
      </div>
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
  
  // Initialize a single button with specific config
  const initButton = (config) => {
    // Set default button text based on type if not specified
    if (config.buttonText === 'Line' && config.type === 'phone') {
      config.buttonText = 'Phone';
    }
    
    // Create button
    const { container, button } = createButton(config);
    
    // Add click handler
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      
      if (config.type === 'phone') {
        // For phone type, directly make a call
        window.location.href = `tel:${config.phoneNumber}`;
        return;
      }
      
      // For line type, show popup
      // Check if popup already exists
      const existingPopup = container.querySelector('.getbutton-popup');
      if (existingPopup) {
        // Close existing popup
        existingPopup.classList.remove('show');
        setTimeout(() => {
          if (existingPopup.parentNode) {
            existingPopup.parentNode.removeChild(existingPopup);
          }
        }, 300);
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
      const targetId = config.targetId || 'line-button';
      const target = document.getElementById(targetId);
      if (!target) {
        console.warn(`getButton: Target element #${targetId} not found, falling back to body`);
        document.body.appendChild(container);
        return;
      }
      target.appendChild(container);
    }
    
    return container;
  };

  // Initialize the button(s)
  const init = () => {
    const config = getConfig();
    injectStyles();
    
    // Check if multiple buttons are configured
    if (Array.isArray(window.getButtonConfigs)) {
      // Multiple buttons mode
      window.getButtonConfigs.forEach((buttonConfig, index) => {
        const mergedConfig = { ...defaultConfig, ...buttonConfig };
        
        // Auto-adjust position for multiple fixed buttons
        if (mergedConfig.position === 'fixed' && !buttonConfig.bottom && !buttonConfig.top) {
          mergedConfig.bottom = `${20 + (index * 80)}px`; // Stack buttons vertically
        }
        
        initButton(mergedConfig);
      });
    } else {
      // Single button mode (backwards compatibility)
      initButton(config);
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
