// Button component
const createButton = (config) => {
  const container = document.createElement('div');
  container.className = 'getbutton-container';
  
  const button = document.createElement('button');
  button.className = `getbutton-btn${config.theme === 'white' ? ' theme-white' : ''}`;
  
  // Line icon SVG
  const iconSvg = `
    <svg class="getbutton-icon" viewBox="0 0 24 24">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.28-.63.626-.63.352 0 .631.285.631.63v4.771z"/>
      <path d="M17.108 1.807c-7.7-.838-14.429 4.755-15.267 12.455-.838 7.7 4.755 14.429 12.455 15.267 7.7.838 14.429-4.755 15.267-12.455.838-7.7-4.755-14.429-12.455-15.267zM12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
    </svg>
  `;
  
  button.innerHTML = iconSvg + config.buttonText;
  
  container.appendChild(button);
  return { container, button };
};
