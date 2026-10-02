document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuButton = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", isOpen);
            mobileMenu.setAttribute("aria-hidden", !isOpen);
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                mobileMenu.setAttribute("aria-hidden", "true");
            });
        });
    }


    /* =========================================
       SMOOTH SCROLLING
    ========================================= */

    const navLinks = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections = document.querySelectorAll("main section[id]");
    const desktopNavLinks = document.querySelectorAll(
        '.desktop-nav a[href^="#"]'
    );

    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }
        });

        desktopNavLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();


    /* =========================================
       BACK TO TOP
    ========================================= */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        const toggleBackToTop = () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        };

        window.addEventListener("scroll", toggleBackToTop);

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        toggleBackToTop();
    }


    /* =========================================
       PROJECT RENDERING + FILTERING
    ========================================= */

    const projectsContainer = document.querySelector("#projects-container");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const renderProjectLink = (url, label, className, icon = "") => {

        if (!url || url === "#") {
            return `
                <span
                    class="${className} is-placeholder"
                    aria-disabled="true"
                    title="Project link will be added later"
                >
                    ${label}
                    ${icon ? `<span aria-hidden="true">${icon}</span>` : ""}
                </span>
            `;
        }

        return `
            <a
                href="${url}"
                class="${className}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${label}
                ${icon ? `<span aria-hidden="true">${icon}</span>` : ""}
            </a>
        `;
    };


    const renderProjects = (filter = "all") => {

        if (!projectsContainer || !Array.isArray(projects)) {
            return;
        }

        const selectedProjects = filter === "all"
            ? projects
            : projects.filter(project =>
                String(project.category).toLowerCase() === String(filter).toLowerCase()
            );

        projectsContainer.innerHTML = "";

        if (!selectedProjects.length) {

            projectsContainer.innerHTML = `
                <div class="projects-empty">
                    <strong>No projects in this category yet.</strong>
                    <span>More work will be added here soon.</span>
                </div>
            `;

            return;
        }

        selectedProjects.forEach((project, index) => {

            const card = document.createElement("article");

            card.className = "project-card reveal";
            card.style.setProperty("--reveal-delay", `${index * 70}ms`);

            card.innerHTML = `
                <div class="project-image">
                    <img
                        src="${project.image}"
                        alt="${project.title} preview"
                        loading="lazy"
                    >
                </div>

                <div class="project-content">

                    <span class="project-category">
                        ${project.categoryLabel}
                    </span>

                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <div class="project-technologies">
                        ${project.technologies.map(tech => `
                            <span>${tech}</span>
                        `).join("")}
                    </div>

                    <div class="project-links">
                        ${renderProjectLink(
                            project.liveUrl,
                            "View Project",
                            "project-link",
                            "→"
                        )}

                        ${renderProjectLink(
                            project.githubUrl,
                            "GitHub",
                            "project-github"
                        )}
                    </div>

                </div>
            `;

            projectsContainer.appendChild(card);
        });

        observeRevealElements();
    };


    if (projectsContainer) {
        renderProjects("all");
    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter || "all";

            filterButtons.forEach(btn => {
                btn.classList.toggle("active", btn === button);
                btn.setAttribute(
                    "aria-pressed",
                    btn === button ? "true" : "false"
                );
            });

            renderProjects(selectedFilter);
        });

    });


    /* =========================================
       CONTACT FORM VALIDATION
    ========================================= */

    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {

        const status = contactForm.querySelector(".form-status");

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            clearFormErrors();

            const name = document.querySelector("#name");
            const email = document.querySelector("#email");
            const subject = document.querySelector("#subject");
            const message = document.querySelector("#message");

            const fields = [name, email, subject, message];
            let isValid = true;
            let firstInvalidField = null;

            const invalidate = (input, message) => {
                showError(input, message);
                input.setAttribute("aria-invalid", "true");

                if (!firstInvalidField) {
                    firstInvalidField = input;
                }

                isValid = false;
            };

            if (!name.value.trim()) {
                invalidate(name, "Please enter your name.");
            }

            if (!email.value.trim()) {
                invalidate(email, "Please enter your email.");
            } else if (!isValidEmail(email.value)) {
                invalidate(email, "Please enter a valid email address.");
            }

            if (!subject.value.trim()) {
                invalidate(subject, "Please enter a subject.");
            }

            if (!message.value.trim()) {
                invalidate(message, "Please enter a message.");
            }

            if (!isValid) {

                if (status) {
                    status.textContent = "Please correct the highlighted fields.";
                }

                firstInvalidField?.focus();
                return;
            }

            if (status) {
                status.textContent =
                    "Thanks! Your message has been validated successfully.";
            }

            contactForm.reset();

            fields.forEach(field => {
                field.setAttribute("aria-invalid", "false");
            });
        });
    }


    /* =========================================
       FORM HELPER FUNCTIONS
    ========================================= */

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }


    function showError(input, message) {

        input.classList.add("input-error");

        const error = document.createElement("small");

        error.className = "form-error";
        error.id = `${input.id}-error`;
        error.textContent = message;

        input.setAttribute("aria-describedby", error.id);

        input.parentElement.appendChild(error);
    }


    function clearFormErrors() {

        document
            .querySelectorAll(".form-error")
            .forEach(error => error.remove());

        document
            .querySelectorAll(".input-error")
            .forEach(input => {
                input.classList.remove("input-error");
                input.setAttribute("aria-invalid", "false");
                input.removeAttribute("aria-describedby");
            });

        const status = document.querySelector(".form-status");

        if (status) {
            status.textContent = "";
        }
    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    let revealObserver = null;

    function observeRevealElements() {

        const revealElements = document.querySelectorAll(
            ".reveal:not(.reveal-observed)"
        );

        if (!("IntersectionObserver" in window)) {
            revealElements.forEach(element => {
                element.classList.add("visible", "reveal-observed");
            });
            return;
        }

        if (!revealObserver) {
            revealObserver = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("visible");
                        entry.target.classList.add("reveal-observed");
                        revealObserver.unobserve(entry.target);

                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );
        }

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    observeRevealElements();

    /* =========================================
       TECH STACK INTERACTION
    ========================================= */

    const techCards = document.querySelectorAll(".tech-node");

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

        techCards.forEach(card => {

            card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `
                perspective(700px)
                rotateX(${y * -5}deg)
                rotateY(${x * 5}deg)
                translateY(-4px)
            `;
        });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

});