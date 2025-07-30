
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Carbon offset calculator
        function calculateOffset() {
            const area = parseFloat(document.getElementById('rooftop-area').value);
            const companySize = document.getElementById('company-size').value;
            const location = document.getElementById('location').value;

            if (!area || !companySize || !location) {
                alert('Please fill in all fields!');
                return;
            }

            // Simple calculations (not real-world accurate, just for demo)
            let co2PerSqFt = 0.5; // kg CO2 per sq ft per year
            let multiplier = 1;

            // Adjust based on company size
            switch(companySize) {
                case 'small': multiplier = 1; break;
                case 'medium': multiplier = 1.5; break;
                case 'large': multiplier = 2; break;
            }

            // Adjust based on location (air quality factor)
            switch(location) {
                case 'delhi': multiplier *= 1.3; break;
                case 'mumbai': multiplier *= 1.2; break;
                case 'bangalore': multiplier *= 1.1; break;
                case 'chennai': multiplier *= 1.15; break;
                default: multiplier *= 1; break;
            }

            const totalCO2 = area * co2PerSqFt * multiplier;
            const creditValue = totalCO2 * 50; // ₹50 per kg CO2
            const paybackYears = Math.round((area * 500) / creditValue); // Rough calculation

            document.getElementById('co2-capture').textContent = 
                `CO₂ Capture Potential: ${totalCO2.toFixed(1)} kg/year`;
            document.getElementById('credit-value').textContent = 
                `Estimated Credit Value: ₹${creditValue.toLocaleString()}/year`;
            document.getElementById('payback-period').textContent = 
                `Estimated Payback Period: ${paybackYears} years`;

            document.getElementById('result').style.display = 'block';
        }

        // Contact form submission
        function submitForm(event) {
            event.preventDefault();
            
            // Simple form validation
            const companyName = document.getElementById('company-name').value;
            const contactName = document.getElementById('contact-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            if (!companyName || !contactName || !email || !phone) {
                alert('Please fill in all required fields!');
                return;
            }

            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address!');
                return;
            }

            // Simulate form submission
            alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
            
            // Reset form
            document.querySelector('.contact-form').reset();
        }

        // Simple animation on scroll
        window.addEventListener('scroll', function() {
            const elements = document.querySelectorAll('.step, .stat');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('fade-in');
                }
            });
        });

        // Simple stats counter animation
        function animateStats() {
            const stats = document.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const finalNumber = stat.textContent;
                let currentNumber = 0;
                const increment = parseInt(finalNumber) / 50;
                
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= parseInt(finalNumber)) {
                        stat.textContent = finalNumber;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(currentNumber) + (finalNumber.includes('+') ? '+' : '');
                    }
                }, 50);
            });
        }

        // Trigger stats animation when stats section is visible
        let statsAnimated = false;
        window.addEventListener('scroll', function() {
            const statsSection = document.querySelector('.stats');
            const rect = statsSection.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0 && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });