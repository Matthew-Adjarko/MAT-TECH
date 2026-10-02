
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
