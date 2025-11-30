// Initialize particles background
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.getElementById('particles-js').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        resizeCanvas();
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    init();
    animate();
}

// Chat functionality
class AnnaLauraAI {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.bindEvents();
        initParticles();
        this.showWelcomeMessage();
    }

    bindEvents() {
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        const quickBtns = document.querySelectorAll('.quick-btn');

        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });

        quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                userInput.value = e.target.dataset.prompt;
                this.sendMessage();
            });
        });
    }

    async sendMessage() {
        const userInput = document.getElementById('userInput');
        const message = userInput.value.trim();

        if (!message || this.isTyping) return;

        this.addMessage(message, 'user');
        userInput.value = '';
        this.playSound();

        await this.showTypingIndicator();
        const response = await this.generateResponse(message);
        this.hideTypingIndicator();
        this.addMessage(response, 'ai');
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async showTypingIndicator() {
        this.isTyping = true;
        const indicator = document.getElementById('typingIndicator');
        indicator.classList.add('active');
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = document.getElementById('typingIndicator');
        indicator.classList.remove('active');
    }

    async generateResponse(userMessage) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        const responses = {
            'python': "Python functions are defined using the 'def' keyword. Here's a simple example:\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"Anna Laura\"))\n```\nThis function takes a name parameter and returns a greeting message!",
            'debug': "To debug code effectively:\n1. Read error messages carefully\n2. Use print statements\n3. Check variable values\n4. Test small parts individually\n5. Use a debugger if available",
            'html': "Here's a simple HTML/CSS example:\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        .card {\n            padding: 20px;\n            background: #f0f0f0;\n            border-radius: 10px;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"card\">Hello World!</div>\n</body>\n</html>```",
            'algorithms': "Algorithms are step-by-step procedures for solving problems. Common types include:\n• Sorting (QuickSort, MergeSort)\n• Searching (Binary Search)\n• Graph algorithms (Dijkstra, BFS)\n• Dynamic Programming"
        };

        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('python') || lowerMessage.includes('function')) {
            return responses.python;
        } else if (lowerMessage.includes('debug') || lowerMessage.includes('error')) {
            return responses.debug;
        } else if (lowerMessage.includes('html') || lowerMessage.includes('css')) {
            return responses.html;
        } else if (lowerMessage.includes('algorithm')) {
            return responses.algorithms;
        } else {
            return "I'm Anna Laura AI, your coding assistant! I can help you with:\n• Python programming\n• Debugging code\n• Web development (HTML/CSS/JS)\n• Algorithm explanations\n• Best coding practices\n\nWhat specific coding topic would you like to explore?";
        }
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage("Hello! I'm Anna Laura AI, your intelligent coding assistant. I can help you with programming concepts, debugging, web development, and algorithms. What would you like to learn today?", 'ai');
        }, 1000);
    }

    playSound() {
        const sound = document.getElementById('messageSound');
        sound.currentTime = 0;
        sound.play().catch(() => {}); // Ignore autoplay restrictions
    }
}

// Initialize the AI when page loads
document.addEventListener('DOMContentLoaded', () => {
    new AnnaLauraAI();
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translate(${x * speed}%, ${y * speed}%)`;
    });
});
