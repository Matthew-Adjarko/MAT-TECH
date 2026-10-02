
document.addEventListener("DOMContentLoaded", () => {

    /*
     * GSAP + ScrollTrigger provide the main motion system.
     * The portfolio still works if the CDN is unavailable;
     * native CSS/IntersectionObserver behavior remains as fallback.
     */

    if (!window.gsap) {
        return;
    }

    document.documentElement.classList.add("motion-ready");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
        return;
    }

    const { gsap } = window;

    if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }


    /* =========================================
       HERO ENTRANCE
    ========================================= */

    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    heroTimeline
        .from(".hero .eyebrow", {
            y: 24,
            autoAlpha: 0,
            duration: .65
        })
        .from(".hero-title", {
            y: 45,
            autoAlpha: 0,
            duration: .9
        }, "-=.35")
        .from(".hero-description", {
            y: 24,
            autoAlpha: 0,
            duration: .7
        }, "-=.55")
        .from(".hero-actions", {
            y: 20,
            autoAlpha: 0,
            duration: .6
        }, "-=.4")
        .from(".hero-visual", {
            x: 55,
            scale: .94,
            autoAlpha: 0,
            duration: 1
        }, "-=.8");


    /* =========================================
       HERO FLOATING ORBS
    ========================================= */

    gsap.to(".hero-orb-one", {
        x: 45,
        y: -30,
        scale: 1.12,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

    gsap.to(".hero-orb-two", {
        x: -35,
        y: 25,
        scale: 1.08,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

    gsap.to(".hero-orb-three", {
        x: -20,
        y: 35,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });

    gsap.to(".hero-particle", {
        y: "random(-22, 22)",
        x: "random(-18, 18)",
        duration: "random(2.5, 4.5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
            each: .25,
            from: "random"
        }
    });

    gsap.to(".hero-cross", {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1
    });


    /* =========================================
       SCROLL-TRIGGERED SECTION HEADINGS
    ========================================= */

    if (window.ScrollTrigger) {

        gsap.utils.toArray(".section-heading").forEach((heading) => {

            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: "top 82%",
                    once: true
                },
                y: 45,
                autoAlpha: 0,
                duration: .8,
                ease: "power3.out"
            });

        });


        /* =====================================
           SKILLS — STAGGER
        ===================================== */

        gsap.utils.toArray(".skills-grid").forEach((grid) => {

            gsap.from(grid.querySelectorAll(".skill-card"), {
                scrollTrigger: {
                    trigger: grid,
                    start: "top 82%",
                    once: true
                },
                y: 35,
                scale: .94,
                autoAlpha: 0,
                duration: .65,
                stagger: .09,
                ease: "back.out(1.4)"
            });

        });


        /* =====================================
           PROCESS — CARDS + ARROWS
        ===================================== */

        gsap.utils.toArray(".process-flow").forEach((flow) => {

            const cards = flow.querySelectorAll(".process-card");
            const arrows = flow.querySelectorAll(".process-arrow");

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: flow,
                    start: "top 78%",
                    once: true
                }
            });

            timeline
                .from(cards, {
                    y: 50,
                    autoAlpha: 0,
                    duration: .65,
                    stagger: .12,
                    ease: "power3.out"
                })
                .from(arrows, {
                    scale: .3,
                    autoAlpha: 0,
                    duration: .35,
                    stagger: .08,
                    ease: "back.out(2)"
                }, "-=.35");

        });


        /* =====================================
           TECH ORBIT — REVEAL + FLOAT
        ===================================== */

        gsap.utils.toArray(".tech-showcase").forEach((showcase) => {

            const floats = showcase.querySelectorAll(".tech-float");
            const center = showcase.querySelector(".tech-center");
            const rings = showcase.querySelectorAll(".orbit-ring");

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: showcase,
                    start: "top 78%",
                    once: true
                }
            });

            timeline
                .from(showcase, {
                    y: 45,
                    scale: .97,
                    autoAlpha: 0,
                    duration: .8,
                    ease: "power3.out"
                })
                .from(center, {
                    scale: .45,
                    rotation: -15,
                    autoAlpha: 0,
                    duration: .7,
                    ease: "back.out(1.7)"
                }, "-=.45")
                .from(floats, {
                    scale: .3,
                    autoAlpha: 0,
                    duration: .55,
                    stagger: .1,
                    ease: "back.out(1.8)"
                }, "-=.45")
                .from(rings, {
                    scale: .5,
                    autoAlpha: 0,
                    duration: .8,
                    stagger: .12,
                    ease: "power2.out"
                }, "-=.65");

            gsap.to(floats, {
                y: "random(-9, 9)",
                duration: "random(2.4, 4)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                stagger: {
                    each: .15,
                    from: "random"
                }
            });

            gsap.to(center, {
                y: -8,
                duration: 2.7,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            gsap.to(rings, {
                rotation: 360,
                duration: 22,
                ease: "none",
                repeat: -1,
                stagger: .7
            });

        });


        /* =====================================
           PROJECT CARDS — DEPTH ON SCROLL
        ===================================== */

        gsap.utils.toArray("#projects-container").forEach((grid) => {

            ScrollTrigger.create({
                trigger: grid,
                start: "top 82%",
                once: true,
                onEnter: () => {

                    gsap.from(grid.querySelectorAll(".project-card"), {
                        y: 55,
                        scale: .96,
                        autoAlpha: 0,
                        duration: .7,
                        stagger: .12,
                        ease: "power3.out"
                    });

                }
            });

        });


        /* =====================================
           CONTACT CARD
        ===================================== */

        gsap.from(".contact-wrapper", {
            scrollTrigger: {
                trigger: ".contact-wrapper",
                start: "top 82%",
                once: true
            },
            y: 55,
            scale: .97,
            autoAlpha: 0,
            duration: .9,
            ease: "power3.out"
        });

        gsap.from(".contact-links a", {
            scrollTrigger: {
                trigger: ".contact-links",
                start: "top 88%",
                once: true
            },
            x: -20,
            autoAlpha: 0,
            duration: .5,
            stagger: .1,
            ease: "power2.out"
        });


        /* =====================================
           PARALLAX TECH SHOWCASE
        ===================================== */

        gsap.to(".tech-orbit", {
            y: -25,
            scrollTrigger: {
                trigger: ".tech-showcase",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            ease: "none"
        });

    }


    /* =========================================
       PROJECT CARD POINTER TILT
    ========================================= */

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

        document.addEventListener("mousemove", (event) => {

            const card = event.target.closest(".project-card");

            if (!card) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;

            gsap.to(card, {
                rotateY: x * 3,
                rotateX: y * -3,
                duration: .3,
                ease: "power2.out",
                transformPerspective: 900
            });

        });

        document.addEventListener("mouseleave", () => {
            gsap.to(".project-card", {
                rotateX: 0,
                rotateY: 0,
                duration: .35
            });
        });

    }

});

/* =========================================================
   ENHANCED FLOATING / INTERACTIVE LAYER
========================================================= */

(function initEnhancedMotion() {
    const start = () => {
        /* Defensive rule: decorative motion is homepage-only. */
        document.querySelectorAll(".hero-floating-ui, .hero-motion-layer, .hero-particles-canvas").forEach((el) => {
            if (!el.closest("#home")) el.remove();
        });

        document.querySelectorAll(".floating-chip, .floating-code, .floating-spark, .hero-diamond, .hero-line, .hero-orb, .hero-particle, .hero-cross").forEach((el) => {
            if (!el.closest("#home")) el.remove();
        });

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        /* -----------------------------------------
           tsParticles — subtle interactive field
        ----------------------------------------- */
        const particleHost = document.querySelector("#home #tsparticles");
        if (window.particles && particleHost) {
            window.particles({
                id: particleHost.id,
                count: window.innerWidth < 700 ? 28 : 46,
                color: ["#1B42CB", "#FF2F6C"],
                links: true,
                linksColor: "#1B42CB",
                linksWidth: .35,
                radius: 1.7,
                speed: .55,
                opacity: .34,
                shape: ["circle"]
            }).catch(() => {});
        }

        if (!window.gsap) return;
        const gsap = window.gsap;

        /* -----------------------------------------
           Floating chips — each moves on its own
        ----------------------------------------- */
        gsap.utils.toArray(".floating-chip").forEach((chip, index) => {
            const depth = Number(chip.dataset.floatDepth || 1);

            gsap.to(chip, {
                y: () => gsap.utils.random(-16, 16) * depth,
                x: () => gsap.utils.random(-9, 9) * depth,
                rotation: () => gsap.utils.random(-2, 2),
                duration: 3.2 + index * .35,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * .18
            });
        });

        gsap.to(".floating-code", {
            y: -14,
            rotation: 4,
            duration: 3.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: .4
        });

        gsap.to(".floating-spark", {
            scale: 1.25,
            rotation: 90,
            autoAlpha: .35,
            duration: 1.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: .35
        });

        gsap.to(".hero-diamond", {
            rotation: 405,
            y: -10,
            duration: 5.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: .5
        });

        /* -----------------------------------------
           Mouse parallax — hero elements respond to cursor
        ----------------------------------------- */
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            const hero = document.querySelector(".hero");
            const glow = document.createElement("div");
            glow.className = "cursor-glow";

            if (hero) {
                hero.appendChild(glow);

                hero.addEventListener("pointermove", (event) => {
                    const heroRect = hero.getBoundingClientRect();
                    const glowX = event.clientX - heroRect.left;
                    const glowY = event.clientY - heroRect.top;

                    gsap.to(glow, {
                        x: glowX,
                        y: glowY,
                        autoAlpha: .9,
                        duration: .35,
                        ease: "power2.out",
                        overwrite: true
                    });
                    const rect = hero.getBoundingClientRect();
                    const x = (event.clientX - rect.left) / rect.width - .5;
                    const y = (event.clientY - rect.top) / rect.height - .5;

                    gsap.to(".hero-floating-ui .floating-chip", {
                        x: (i, target) => {
                            const depth = Number(target.dataset.floatDepth || 1);
                            return x * 18 * depth;
                        },
                        y: (i, target) => {
                            const depth = Number(target.dataset.floatDepth || 1);
                            return y * 12 * depth;
                        },
                        duration: .7,
                        ease: "power3.out",
                        overwrite: "auto"
                    });

                    gsap.to(".hero-motion-layer .hero-orb", {
                        x: x * -22,
                        y: y * -16,
                        duration: 1.1,
                        ease: "power3.out",
                        overwrite: "auto"
                    });
                });

                hero.addEventListener("pointerleave", () => {
                    gsap.to(glow, { autoAlpha: 0, duration: .25 });
                    gsap.to(".hero-floating-ui .floating-chip", {
                        x: 0,
                        y: 0,
                        duration: .6,
                        ease: "power3.out"
                    });
                    gsap.to(".hero-motion-layer .hero-orb", {
                        x: 0,
                        y: 0,
                        duration: .8,
                        ease: "power3.out"
                    });
                });
            }
        }

        /* -----------------------------------------
           Magnetic CTA buttons
        ----------------------------------------- */
        gsap.utils.toArray(".btn, .nav-cta").forEach((button) => {
            button.classList.add("magnetic");

            button.addEventListener("pointermove", (event) => {
                const rect = button.getBoundingClientRect();
                const x = event.clientX - (rect.left + rect.width / 2);
                const y = event.clientY - (rect.top + rect.height / 2);

                gsap.to(button, {
                    x: x * .12,
                    y: y * .16,
                    duration: .25,
                    ease: "power2.out",
                    overwrite: true
                });
            });

            button.addEventListener("pointerleave", () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: .5,
                    ease: "elastic.out(1, .45)"
                });
            });
        });

        /* -----------------------------------------
           Project card hover spotlight
        ----------------------------------------- */
        document.querySelectorAll(".project-card").forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty("--spot-x", `${x}%`);
                card.style.setProperty("--spot-y", `${y}%`);
            });
        });

        /* -----------------------------------------
           Hero ambient breathing scale
        ----------------------------------------- */
        gsap.to(".hero-motion-layer", {
            scale: 1.025,
            duration: 8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start, { once: true });
    } else {
        start();
    }
})();
