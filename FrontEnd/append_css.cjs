const fs = require('fs');
const path = require('path');
const cssPath = path.join('src', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

const newCSS = `

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-scale-in {
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }

/* Global Interactive Elements */
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.btn-primary:active {
  transform: translateY(0);
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  outline: none;
  transition: all var(--transition-fast);
  background: rgba(255,255,255,0.8);
}
.input-field:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(15, 76, 129, 0.1);
  background: white;
}
`;

if (!css.includes('@keyframes fadeIn')) {
  fs.appendFileSync(cssPath, newCSS);
  console.log('Appended animations to index.css');
} else {
  console.log('Animations already present.');
}
