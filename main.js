// ============================================
// INTERACTIVE ANALYZER FUNCTIONALITY
// ============================================

const analyzerInput = document.getElementById('analyzer-input');
const analyzeBtn = document.getElementById('analyze-btn');
const analyzerResults = document.getElementById('analyzer-results');
const sampleArticles = document.getElementById('sample-articles');

// Sample data for demo
const sampleData = {
    1: {
        text: "AI Breakthrough in Medicine",
        score: 92,
        accuracy: 85,
        authority: 78,
        bias: 72,
        citation: 88,
        reasoning: [
            "Sources are cited from established medical journals",
            "Language patterns indicate peer-reviewed research",
            "Minor promotional language detected",
            "Cross-referenced with 450+ verified medical sources"
        ]
    },
    2: {
        text: "Climate Report Released",
        score: 87,
        accuracy: 89,
        authority: 82,
        bias: 65,
        citation: 91,
        reasoning: [
            "Based on official government data",
            "Multiple international organizations cited",
            "Moderate bias towards environmental concerns",
            "Supported by scientific consensus"
        ]
    },
    3: {
        text: "Tech Stock Surge",
        score: 78,
        accuracy: 76,
        authority: 72,
        bias: 68,
        citation: 75,
        reasoning: [
            "Market data verified from reliable sources",
            "Some speculation mixed with facts",
            "Sensationalized headlines detected",
            "Missing context about market volatility"
        ]
    }
};

// Analyze button click handler
analyzeBtn.addEventListener('click', () => {
    const text = analyzerInput.value.trim();
    if (text.length < 5) {
        alert('Please enter text to analyze');
        return;
    }
    
    analyzeBtn.classList.add('loading');
    
    // Simulate API call with realistic delay
    setTimeout(() => {
        displayResults(generateAnalysis(text));
        analyzeBtn.classList.remove('loading');
        sampleArticles.style.display = 'none';
    }, 1500);
});

// Sample articles click handler
document.querySelectorAll('.sample-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const sampleId = btn.dataset.sample;
        const sample = sampleData[sampleId];
        analyzerInput.value = sample.text;
        analyzeBtn.click();
    });
});

// Generate analysis (mock)
function generateAnalysis(text) {
    const sample = sampleData[Object.keys(sampleData)[Math.floor(Math.random() * 3)]];
    return {
        score: sample.score + Math.floor(Math.random() * 10 - 5),
        accuracy: sample.accuracy + Math.floor(Math.random() * 10),
        authority: sample.authority + Math.floor(Math.random() * 10),
        bias: sample.bias + Math.floor(Math.random() * 10),
        citation: sample.citation + Math.floor(Math.random() * 5),
        reasoning: sample.reasoning
    };
}

// Display results
function displayResults(analysis) {
    // Clamp values between 0-100
    const score = Math.min(100, Math.max(0, analysis.score));
    const accuracy = Math.min(100, Math.max(0, analysis.accuracy));
    const authority = Math.min(100, Math.max(0, analysis.authority));
    const bias = Math.min(100, Math.max(0, analysis.bias));
    const citation = Math.min(100, Math.max(0, analysis.citation));

    // Update verdict
    document.getElementById('verdict-score').textContent = score + '%';
    const verdictBadge = document.getElementById('verdict-badge');
    if (score >= 80) {
        verdictBadge.classList.add('verified');
    } else if (score >= 60) {
        verdictBadge.classList.add('credible');
    } else {
        verdictBadge.classList.add('authentic');
    }

    // Update heatmap
    animateHeatmapValue('accuracy-fill', accuracy);
    animateHeatmapValue('authority-fill', authority);
    animateHeatmapValue('bias-fill', bias);
    animateHeatmapValue('citation-fill', citation);

    document.getElementById('accuracy-value').textContent = accuracy + '%';
    document.getElementById('authority-value').textContent = authority + '%';
    document.getElementById('bias-value').textContent = bias + '%';
    document.getElementById('citation-value').textContent = citation + '%';

    // Update reasoning
    const reasoningContainer = document.getElementById('ai-reasoning');
    reasoningContainer.innerHTML = analysis.reasoning.map((point, index) => `
        <div class="reasoning-point" style="animation-delay: ${index * 0.1}s">
            <span class="reasoning-icon">${index < 3 ? '✓' : '⚠'}</span>
            <span class="reasoning-text">${point}</span>
        </div>
    `).join('');

    // Show results
    analyzerResults.style.display = 'block';
    analyzerResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Animate heatmap fill
function animateHeatmapValue(elementId, targetValue) {
    const element = document.getElementById(elementId);
    element.style.width = targetValue + '%';
}

// ============================================
// STATISTICS COUNTER ANIMATION
// ============================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        element.textContent = formatNumber(current);
    }, 30);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return Math.floor(num).toString();
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));

// ============================================
// CANVAS BACKGROUND ANIMATION
// ============================================

const canvas = document.getElementById('canvas-background');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system for background
    const particles = [];
    const particleCount = 30;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 102, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 102, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawLines();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// GLOBE VISUALIZATION
// ============================================

const globeCanvas = document.getElementById('globe-canvas');
if (globeCanvas) {
    const globeCtx = globeCanvas.getContext('2d');
    
    function resizeGlobeCanvas() {
        const container = globeCanvas.parentElement;
        globeCanvas.width = container.clientWidth;
        globeCanvas.height = container.clientHeight;
    }
    
    resizeGlobeCanvas();
    window.addEventListener('resize', resizeGlobeCanvas);
    
    // Animated globe data points
    const dataPoints = [];
    const cityCount = 20;
    
    for (let i = 0; i < cityCount; i++) {
        dataPoints.push({
            x: Math.random() * globeCanvas.width,
            y: Math.random() * globeCanvas.height,
            isVerified: Math.random() > 0.4,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.02 + 0.01
        });
    }
    
    function drawGlobeAnimation() {
        globeCtx.clearRect(0, 0, globeCanvas.width, globeCanvas.height);
        
        // Draw grid
        globeCtx.strokeStyle = 'rgba(0, 102, 255, 0.1)';
        globeCtx.lineWidth = 0.5;
        
        for (let i = 0; i < globeCanvas.width; i += 50) {
            globeCtx.beginPath();
            globeCtx.moveTo(i, 0);
            globeCtx.lineTo(i, globeCanvas.height);
            globeCtx.stroke();
        }
        
        for (let i = 0; i < globeCanvas.height; i += 50) {
            globeCtx.beginPath();
            globeCtx.moveTo(0, i);
            globeCtx.lineTo(globeCanvas.width, i);
            globeCtx.stroke();
        }
        
        // Draw data points
        dataPoints.forEach((point, index) => {
            point.pulse += point.pulseSpeed;
            
            const pulseSize = Math.sin(point.pulse) * 3 + 4;
            const opacity = Math.sin(point.pulse) * 0.3 + 0.5;
            
            // Draw pulse
            globeCtx.fillStyle = point.isVerified 
                ? `rgba(16, 185, 129, ${opacity * 0.3})`
                : `rgba(239, 68, 68, ${opacity * 0.3})`;
            globeCtx.beginPath();
            globeCtx.arc(point.x, point.y, pulseSize * 2, 0, Math.PI * 2);
            globeCtx.fill();
            
            // Draw point
            globeCtx.fillStyle = point.isVerified 
                ? 'rgb(16, 185, 129)'
                : 'rgb(239, 68, 68)';
            globeCtx.beginPath();
            globeCtx.arc(point.x, point.y, pulseSize, 0, Math.PI * 2);
            globeCtx.fill();
        });
        
        // Draw connections
        for (let i = 0; i < dataPoints.length; i++) {
            for (let j = i + 1; j < dataPoints.length; j++) {
                const dx = dataPoints[i].x - dataPoints[j].x;
                const dy = dataPoints[i].y - dataPoints[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = 1 - distance / 150;
                    globeCtx.strokeStyle = `rgba(0, 102, 255, ${opacity * 0.2})`;
                    globeCtx.lineWidth = 1;
                    globeCtx.beginPath();
                    globeCtx.moveTo(dataPoints[i].x, dataPoints[i].y);
                    globeCtx.lineTo(dataPoints[j].x, dataPoints[j].y);
                    globeCtx.stroke();
                }
            }
        }
        
        requestAnimationFrame(drawGlobeAnimation);
    }
    
    drawGlobeAnimation();
}

// ============================================
// CHART VISUALIZATION
// ============================================

function initializeCharts() {
    const categoryCanvas = document.getElementById('category-chart');
    const accuracyCanvas = document.getElementById('accuracy-chart');
    
    if (categoryCanvas) {
        const categoryCtx = categoryCanvas.getContext('2d');
        drawCategoryChart(categoryCtx);
    }
    
    if (accuracyCanvas) {
        const accuracyCtx = accuracyCanvas.getContext('2d');
        drawAccuracyChart(accuracyCtx);
    }
}

function drawCategoryChart(ctx) {
    const canvasWidth = ctx.canvas.clientWidth;
    const canvasHeight = ctx.canvas.clientHeight;
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;
    
    const categories = ['Politics', 'Health', 'Tech', 'Finance', 'Science'];
    const misinformation = [35, 28, 15, 22, 18];
    const colors = ['#0066ff', '#00d4aa', '#f59e0b', '#ef4444', '#10b981'];
    const barWidth = canvasWidth / (categories.length * 2);
    const maxValue = Math.max(...misinformation);
    const padding = 40;
    const chartHeight = canvasHeight - 2 * padding;
    
    // Draw axes
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvasHeight - padding);
    ctx.lineTo(canvasWidth - padding, canvasHeight - padding);
    ctx.stroke();
    
    // Draw bars
    misinformation.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + (index + 0.5) * (canvasWidth - 2 * padding) / categories.length - barWidth / 2;
        const y = canvasHeight - padding - barHeight;
        
        // Gradient
        const gradient = ctx.createLinearGradient(x, y, x, canvasHeight - padding);
        gradient.addColorStop(0, colors[index]);
        gradient.addColorStop(1, colors[index] + '80');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Label
        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(categories[index], x + barWidth / 2, canvasHeight - padding + 20);
        
        // Value
        ctx.fillStyle = '#0066ff';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(value + '%', x + barWidth / 2, y - 10);
    });
}

function drawAccuracyChart(ctx) {
    const canvasWidth = ctx.canvas.clientWidth;
    const canvasHeight = ctx.canvas.clientHeight;
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const accuracy = [78, 82, 85, 88, 91, 94];
    const padding = 40;
    const chartWidth = canvasWidth - 2 * padding;
    const chartHeight = canvasHeight - 2 * padding;
    const pointSpacing = chartWidth / (accuracy.length - 1);
    
    // Draw axes
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvasHeight - padding);
    ctx.lineTo(canvasWidth - padding, canvasHeight - padding);
    ctx.stroke();
    
    // Draw line
    ctx.strokeStyle = '#0066ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    accuracy.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = canvasHeight - padding - (value / 100) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw points and labels
    accuracy.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = canvasHeight - padding - (value / 100) * chartHeight;
        
        // Point
        ctx.fillStyle = '#0066ff';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Label
        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(months[index], x, canvasHeight - padding + 20);
        
        // Value
        ctx.fillStyle = '#0066ff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(value + '%', x, y - 15);
    });
}

// Initialize charts when in view
const analyticsSection = document.querySelector('.analytics');
if (analyticsSection) {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeCharts();
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    chartObserver.observe(analyticsSection);
}

// ============================================
// MOUSE REACTIVE EFFECTS
// ============================================

document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

// Observe fade-in elements
document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    scrollObserver.observe(el);
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const gradientBlur = document.querySelector('.gradient-blur');
    if (gradientBlur) {
        gradientBlur.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// KEYBOARD SUPPORT
// ============================================

analyzerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        analyzeBtn.click();
    }
});

// ============================================
// ACCESSIBILITY
// ============================================

// Focus management
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('TruthLens AI loaded successfully');
    
    // Add any additional initialization here
    initializeAnalyzer();
});

function initializeAnalyzer() {
    // Focus on input for better UX
    analyzerInput.focus();
}

// ============================================
// UTILS
// ============================================

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
