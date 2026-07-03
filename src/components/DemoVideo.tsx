import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);

    video.addEventListener("ended", playVideo);

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", playVideo);
    };
  }, []);

  return (
    <section className="py-24 relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.025em] text-warm-900 text-center mb-4">
            See maple in action
          </h2>

          <div className="overflow-hidden rounded-3xl border border-warm-200/60 bg-white shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_8px_40px_rgba(0,0,0,0.06)]">
            <video
              ref={videoRef}
              src="/maple-demo.mov"
              className="w-full h-auto pointer-events-none select-none"
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
