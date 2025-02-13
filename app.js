gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const cards = gsap.utils.toArray(".card");
const cardCount = cards.length;

gsap.set(cards, (index) => ({
  opacity: 0.5,
  scale: 1,
  x: 0,
  y: 0,
  z: -200,
  filter: "blur(20px)",
  transformStyle: "preserve-3d",
}));

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".canvas",
    start: "top top",
    end: `+=${window.innerHeight * cards.length}`, // Extend scroll area
    pin: true,
    scrub: 1,
  },
});

// Animate Cards One by One
cards.forEach((card, index) => {
  const randomY = Math.random() * 70 + 20;
  tl.to(
    card,
    {
      opacity: 1,
      scale: 1,
      x: index % 2 === 0 ? "-80%" : "80%",
      // y: index % 2 === 0 ? `-${randomY}%` : `${randomY}%`, // Move to cente
      filter: "blur(0px)", // Remove blur
      z: 1000, // Add slight rotation
      duration: 0.8,
      ease: "none",
    },
    `<-=0.4`
  ).to(
    card,
    {
      opacity: 0.5,
      scale: 1.2,
      x: index % 2 === 0 ? "-120%" : "120%",
      // y: index % 2 === 0 ? `-${randomY + 120}% ` : `${randomY + 120}%`,
      // filter: "blur(10px)", // Reapply blur
      z: 2000, // Reset rotation
      duration: 0.8,
      ease: "none",
    },
    `<+=0.1` // Delay before fading out
  );
});
