// let currentLang = localStorage.getItem('language') || 'en';

document.addEventListener('DOMContentLoaded', () => {
  // Handle preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Remove no-js class from body
    document.body.classList.remove('no-js');
    
    // Hide preloader after content loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('preloader-inactive');
      }, 500);
    });
  }

  // Immediately activate animations in the hero section
  const heroAnimatedElements = document.querySelectorAll('.hero .animate-on-scroll');
  heroAnimatedElements.forEach(el => {
    el.classList.add('active');
  });
  
  // Enhanced custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if(cursor && cursorFollower) {
    // Variables for smoother animation
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    let speed = 0.1; // Cursor speed
    let followerSpeed = 0.05; // Follower speed
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Show cursor elements when mouse moves
      cursor.style.opacity = 1;
      cursorFollower.style.opacity = 1;
    });
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = 0;
      cursorFollower.style.opacity = 0;
    });
    
    document.addEventListener('mousedown', () => {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
    });
    
    // Special effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .filter-btn, .menu-toggle, .lang-switcher');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
      });
      
      // Add slight magnetic effect on hover
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
        
        // Only apply magnetic effect when close to the center
        if (distance < rect.width) {
          const pull = 0.15; // Strength of magnetic pull
          mouseX += (centerX - mouseX) * pull;
          mouseY += (centerY - mouseY) * pull;
        }
      });
    });
    
    // Animation loop for smooth cursor movement
    function animateCursor() {
      // Calculate cursor position with easing
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      
      // Calculate follower position with different easing (more delay)
      followerX += (mouseX - followerX) * followerSpeed;
      followerY += (mouseY - followerY) * followerSpeed;
      
      // Apply positions
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      
      requestAnimationFrame(animateCursor);
    }
    
    // Start animation
    animateCursor();
    
    // Hide cursor initially on page load
    cursor.style.opacity = 0;
    cursorFollower.style.opacity = 0;
  }

  // Initialize particles.js
  if(document.getElementById('particles-js')) {
    if(typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#6e44ff"
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#6e44ff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    }
  }

  // Mobile Menu Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  
  if(mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Navigation active state
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if(pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if(link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
    
    // Header background on scroll
    const header = document.querySelector('.site-header');
    if(header) {
      if(window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Activate animations for elements in viewport
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if(elementTop < window.innerHeight - 100) {
        el.classList.add('active');
      }
    });
  });

  // Games data and rendering
  const gamesGrid = document.querySelector('.games-grid');
  if(gamesGrid) {
    const gamesData = [
      {
        title: "Legend of the Simurg",
        description: "An epic adventure game based on ancient legends, where players embark on a quest to find the mythical Simurg bird.",
        image: "images/simurg_library_header.png",
        platforms: ["pc", "console"],
        link: "https://store.steampowered.com/app/3796670/Simurg_Efsanesi/"
      },
      {
        title: "Rhythm of The Rain",
        description: "This game is about Shaman Ritual. This ritual is to call the sky god, which is Kök Tengri. In the ritual, some shapes (like ancient Turkish symbols) are seen in rhythm and our aim is to shape the character body like these symbols.",
        image: "images/rhytmQardas.png",
        platforms: ["pc", "console"],
        link: "https://pixelnodesstudio.itch.io/rhythm-of-the-rain"
      },
      {
        title: "Error 404: Still working",
        description: "Json, is having a tough day at work. His boss has tasked him with sending important files, but his biggest enemy is the computer’s glitches and bugs.",
        image: "images/error404.png",
        platforms: ["pc", "console"],
        link: "https://pixelnodesstudio.itch.io/error-404-still-working"
      },
      {
        title: "Tower of Seven",
        description: "This is a casual puzzle game where the goal is to build a tower by creating the sum of 7 using cards numbered between 1 and 6.",
        image: "images/towerOfSeveb.png",
        platforms: ["pc","mobile"],
        link: "https://pixelnodesstudio.itch.io/tower-of-seven"
      },
      {
        title: "Snake On The Line",
        description: "Snake On The Line is a horror game where you must escape from a mysterious labyrinth by solving puzzles and avoiding a deadly threat. But you're not alone... the snake from the classic Nokia mobile game!",
        image: "images/snakeOnTheLine.png",
        platforms: ["pc"],
        link: "https://pixelnodesstudio.itch.io/snake-on-the-line"
      }
      // {
      //   title: "Epic of Gorgud",
      //   description: "A storytelling RPG inspired by the tales of Dede Gorgud, featuring rich narrative and strategic combat.",
      //   image: "images/epic_of_gorgud_xsolla.png",
      //   platforms: ["pc", "mobile"],
      //   link: "#"
      // },
      // {
      //   title: "Tuana",
      //   description: "A visually stunning puzzle game with elements of Azerbaijani folklore and mesmerizing soundscapes.",
      //   image: "images/tuana_xsolla.png",
      //   platforms: ["mobile"],
      //   link: "#"
      // },
      // {
      //   title: "Desert Storm",
      //   description: "A fast-paced action game where players navigate through sandstorms while battling ancient desert spirits.",
      //   image: "images/tuana_xsolla.png", // Placeholder image
      //   platforms: ["pc", "console", "mobile"],
      //   link: "#"
      // }
    ];
    
    gamesData.forEach(game => {
      const platformIcons = {
        pc: '<i class="fas fa-desktop platform-icon" title="PC"></i>',
        mobile: '<i class="fas fa-mobile-alt platform-icon" title="Mobile"></i>',
        console: '<i class="fas fa-gamepad platform-icon" title="Console"></i>'
      };
      
      let platformsHTML = '';
      game.platforms.forEach(platform => {
        platformsHTML += platformIcons[platform] || '';
      });
      
      const gameCard = document.createElement('div');
      gameCard.className = 'game-card animate-on-scroll';
      gameCard.setAttribute('data-categories', game.platforms.join(' '));
      gameCard.innerHTML = `
        <img src="${game.image}" alt="${game.title}" class="game-card-img">
        <div class="game-card-content">
          <h3 class="game-card-title">${game.title}</h3>
          <p class="game-card-text">${game.description}</p>
          <div class="game-card-footer">
            <div class="game-platform">
              ${platformsHTML}
            </div>
            <a href="${game.link}" class="game-link">Learn more <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      `;
      
      gamesGrid.appendChild(gameCard);
    });
    
    // Games filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        const gameCards = document.querySelectorAll('.game-card');
        
        gameCards.forEach(card => {
          if(filterValue === 'all') {
            card.style.display = 'block';
          } else {
            const categories = card.getAttribute('data-categories');
            if(categories.includes(filterValue)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }
  
  // Team members data and rendering
  const teamGrid = document.querySelector('.team-grid');
  if(teamGrid) {
    const teamData = [
      {
        name: "Nurlan Osmanov",
        role: "Team Lead",
        image: "./images/profile/nurlan.png",
        social: {
          linkedin: "https://linkedin.com/",
          github: "https://github.com/"
        }
      },
      {
        name: "Riad Veliyev",
        role: "Lead Designer",
        image: "./images/profile/riad.png",
        social: {
          github: "https://github.com/Roronoa1331",
          linkedin: "https://www.linkedin.com/in/riad-veliyev-8ba04814b/"
        }
      },
      {
        name: "Amina Islam",
        role: "Senior Developer",
        image: "./images/profile/amiba.png",
        social: {
          behance: "https://www.behance.net/w9rm0000",
          linkedin: "https://www.linkedin.com/in/amina-islam-232338273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        }
      },
      {
        name: "Leyla Haqverdi",
        role: "Sound Engineer",
        image: "./images/profile/leyla.png",
        social: {
          behance: "https://www.behance.net/w9rm0000"
        }
      },
      {
        name: "Qazanfar Seferov",
        role: "Developer",
        image: "./images/profile/nurlan.png",
        social: {
          linkedin: "https://www.linkedin.com/in/qezenfer-seferov-628072207/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          github: "https://github.com/Qezenfer10"
        
        }
      }
    ];
    
    // Clear any existing content
    teamGrid.innerHTML = '';
    
    // Generate team cards and inject into the DOM
    teamData.forEach(member => {
      let socialHTML = '';
      if(member.social) {
        if(member.social.twitter) {
          socialHTML += `<a href="${member.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>`;
        }
        if(member.social.linkedin) {
          socialHTML += `<a href="${member.social.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>`;
        }
        if(member.social.github) {
          socialHTML += `<a href="${member.social.github}" target="_blank"><i class="fab fa-github"></i></a>`;
        }
        if(member.social.behance) {
          socialHTML += `<a href="${member.social.behance}" target="_blank"><i class="fab fa-behance"></i></a>`;
        }
      }
      
      const teamCard = document.createElement('div');
      teamCard.className = 'team-card animate-on-scroll';
      teamCard.innerHTML = `
        <img src="${member.image}" alt="${member.name}" class="team-img">
        <div class="team-info">
          <h3 class="team-name">${member.name}</h3>
          <p class="team-role">${member.role}</p>
          <div class="team-social">
            ${socialHTML}
          </div>
        </div>
      `;
      
      teamGrid.appendChild(teamCard);
    });
  }
  
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Create mailto link with form data
      const mailtoLink = `mailto:pixelnodesofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset the form
      contactForm.reset();
    });
  }

  const floatingElements = document.querySelectorAll('.floating-element');
  if(floatingElements.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      floatingElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.1;
        const xOffset = (x - 0.5) * 50 * speed;
        const yOffset = (y - 0.5) * 50 * speed;
        
        el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    });
  }
});

// Language switcher
let currentLang = 'en';

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'az' : 'en';
  
  document.querySelectorAll('[data-en][data-az]').forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
  
  // Update button text
  const exploreBtn = document.getElementById('explore-btn');
  if(exploreBtn) {
    exploreBtn.textContent = exploreBtn.getAttribute(`data-${currentLang}`);
  }
  
  const contactBtn = document.getElementById('contact-btn');
  if(contactBtn) {
    contactBtn.textContent = contactBtn.getAttribute(`data-${currentLang}`);
  }
}