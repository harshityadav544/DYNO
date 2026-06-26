# TruthLens AI - Interactive Landing Page

Transform TruthLens AI from a standard landing page into an interactive AI product experience that feels like users are interacting with a real AI system rather than reading a marketing page.

## 🎯 Features

### 1. **Interactive Fake News Analyzer**
- Real-time text input analyzer in hero section
- Instant credibility scoring (0-100%)
- Sample articles for quick demo
- Smooth result animations

### 2. **Real-Time AI Verification Engine**
- Animated 4-stage verification pipeline:
  - Text Processing
  - Source Analysis
  - Fact Checking
  - Bias Detection
- Visual progress indicators
- Stage descriptions and metrics

### 3. **Live Statistics Counters**
- Animated number counters that start on scroll
- Key metrics:
  - 15M+ Articles Analyzed
  - 2.8M+ Misinformation Detected
  - 156 Countries Covered
  - 98.7% Detection Accuracy
- Icon indicators for each stat

### 4. **Trust Heatmap**
- Source credibility breakdown visualization
- Real-time animated bar charts
- Four key metrics:
  - Factual Accuracy
  - Source Authority
  - Bias Detection
  - Citation Quality
- Color-coded gradient fills

### 5. **Explainable AI Results Panel**
- Transparent reasoning display
- 4+ reasoning points per analysis
- Visual indicators (✓ for verified, ⚠ for warnings)
- Animated reveal on results

### 6. **Interactive Globe Display**
- Canvas-based animated globe visualization
- Data points showing information flow worldwide
- Pulsing animations for verification status
- Connected network lines between cities
- Verified (green) vs. Unverified (red) indicators

### 7. **Floating Verification Badges**
- Animated badge indicators:
  - Verified
  - Credible Source
  - Authentic
- Floating animation effect
- Color-coded styling

### 8. **Animated Article Verification Process**
- 4-step process visualization
- Smooth card animations
- Clear descriptions for each stage
- Icon indicators

### 9. **Mouse-Reactive 3D Depth & Parallax**
- Parallax background on scroll
- Mouse position tracking (CSS variables)
- Depth effects on interactive elements
- Smooth transitions on hover

### 10. **Premium SaaS Animations**
Inspired by OpenAI, Perplexity, Stripe, and Linear:
- Smooth fade-in animations
- Slide-up entrance effects
- Gradient text effects
- Button hover states with elevation
- Card animations on hover
- Badge floating effects
- Loading spinner animation
- Scroll-triggered animations

## 📁 File Structure

```
DYNO/
├── index.html      # Main HTML structure
├── styles.css      # Comprehensive styling with animations
├── main.js         # Interactive functionality
└── README.md       # Documentation
```

## 🚀 Getting Started

### Option 1: Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. No build process or dependencies required

### Option 2: GitHub Pages
1. Go to repository settings
2. Enable GitHub Pages from main branch
3. Access your site at `https://yourusername.github.io/DYNO`

## 🎨 Design System

### Colors
- **Primary**: `#0066ff` (Bright Blue)
- **Primary Dark**: `#0052cc`
- **Primary Light**: `#e6f0ff`
- **Secondary**: `#00d4aa` (Teal)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Heading Sizes**: 2.5rem to 4rem (responsive)
- **Line Height**: 1.6

### Spacing System
- `xs`: 0.25rem
- `sm`: 0.5rem
- `md`: 1rem
- `lg`: 1.5rem
- `xl`: 2rem
- `2xl`: 3rem
- `3xl`: 4rem

### Border Radius
- `sm`: 0.375rem
- `md`: 0.5rem
- `lg`: 1rem
- `xl`: 1.5rem

## 🔧 JavaScript Features

### Analyzer System
```javascript
// Analyze button triggers:
- Input validation
- Mock API call (1.5s delay)
- Results display with animations
- Heatmap updates
- Reasoning display
```

### Canvas Animations
- **Background**: Particle system with connection lines
- **Globe**: Pulsing data points with network visualization
- **Charts**: Bar chart and line chart with gradients

### Performance Optimizations
- Intersection Observer for lazy animations
- Throttled scroll events
- Debounced resize handlers
- Efficient canvas rendering with requestAnimationFrame

### Accessibility Features
- Keyboard navigation support
- Focus management
- Semantic HTML structure
- ARIA-compatible markup

## 📊 Interactive Sections

### Hero Section
- Gradient animated title
- Interactive analyzer with real-time feedback
- Sample articles for quick demo
- Smooth entrance animations

### Verification Engine
- 4-stage pipeline visualization
- Progress bars with animations
- Responsive grid layout

### Statistics Section
- Auto-counting numbers on scroll
- Icon indicators
- Hover card elevations
- Gradient text values

### Globe Section
- Canvas-based animation
- Real-time data point updates
- Legend with color coding
- Responsive aspect ratio

### Features Grid
- 6 feature cards
- Hover animations
- Icon indicators
- Responsive layout

### Analytics Section
- Interactive bar chart (Detection by Category)
- Line chart (Accuracy Over Time)
- Lazy-loaded on scroll
- Responsive canvas sizing

### CTA Section
- Gradient background
- Dual button layout
- Hover effects
- Call-to-action messaging

## 🎬 Animation Details

### Entrance Animations
- **fadeInUp**: 0.8s ease-out
- **slideDown**: 0.4s ease-out
- **scaleIn**: 0.5s ease-out

### Interactive Animations
- **pulse**: 2s infinite (buttons, badges)
- **bounce**: 2s infinite (icons, counters)
- **float**: 3s infinite (badges with staggered delays)
- **fillBar**: 1.5s ease-out (heatmap bars)

### Hover Effects
- **translateY**: -2px to -5px depending on element
- **box-shadow**: Enhanced on hover
- **color**: Primary color transitions
- **border**: Animated underline on nav links

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: < 768px
- **Desktop**: > 768px

### Responsive Features
- **Grid Layouts**: Auto-fit with minmax()
- **Font Sizes**: Clamp() for fluid typography
- **Padding**: Responsive spacing adjustments
- **Flex Layouts**: Column on mobile, row on desktop

## 🔐 Security & Performance

### Best Practices Implemented
- No external API calls in demo (mock data)
- Efficient CSS selectors
- Optimized canvas rendering
- Lazy loading with Intersection Observer
- Debounced event handlers
- No inline scripts in HTML

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## 💡 Customization Guide

### Change Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #your-color;
    --secondary: #your-color;
    /* ... other colors */
}
```

### Modify Sample Data
Edit sample data in `main.js`:
```javascript
const sampleData = {
    1: {
        text: "Your article text",
        score: 92,
        // ... other fields
    }
}
```

### Add Real API Integration
Replace mock functions with actual API calls:
```javascript
async function analyzeArticle(text) {
    const response = await fetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify({ text })
    });
    return response.json();
}
```

### Adjust Animation Speeds
Edit transition variables:
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
```

## 📈 Performance Tips

1. **Reduce Particle Count**: Lower `particleCount` in `main.js` for older devices
2. **Disable Canvas Animations**: Comment out particle system on mobile
3. **Optimize Images**: Use WebP format where supported
4. **Enable Caching**: Set appropriate cache headers
5. **Minify CSS/JS**: Use minification tools for production

## 🤝 Contributing

Feel free to fork and improve! Suggested enhancements:
- Backend API integration
- Dark mode toggle
- Multi-language support
- Advanced filtering options
- Real-time data updates

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions:
1. Check the README thoroughly
2. Inspect browser console for errors
3. Verify all files are in correct locations
4. Test in different browsers

## 🎓 Learn More

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, flexbox, grid
- **Canvas API**: For animations and visualizations
- **Vanilla JavaScript**: No frameworks required

### Inspiration
- OpenAI design philosophy
- Perplexity smooth interactions
- Stripe premium polish
- Linear UI consistency

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
**Status**: Ready for Production

Enjoy building with TruthLens AI! 🚀
