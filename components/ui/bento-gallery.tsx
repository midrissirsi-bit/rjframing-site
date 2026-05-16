"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// Defines the structure for each image item in the gallery
export type ImageItem = {
  id: number | string;
  title: string;
  desc: string;
  url: string;
  span: string; // Tailwind CSS grid span classes (e.g., "md:col-span-2")
  meta?: { left?: string; right?: string };
};

// Defines the props for the main gallery component
interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[];
  title: string;
  description: string;
  eyebrow?: string;
}

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for each gallery item
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// Modal component for displaying the selected image
const ImageModal = ({
  item,
  onClose,
}: {
  item: ImageItem;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.url}
          alt={item.title}
          className="h-auto max-h-[85vh] w-full rounded-sm object-contain"
        />
        <div className="mt-4 flex items-end justify-between">
          <div>
            <h3 className="font-display text-2xl text-bone">{item.title}</h3>
            <p className="mt-1 text-sm text-bone-dim">{item.desc}</p>
          </div>
          {item.meta && (
            <div className="text-right">
              {item.meta.left && (
                <div className="mono-label bright">{item.meta.left}</div>
              )}
              {item.meta.right && (
                <div className="mono-label">{item.meta.right}</div>
              )}
            </div>
          )}
        </div>
      </motion.div>
      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full border border-bone-mute/40 p-2 text-bone/80 transition-colors hover:border-bone hover:text-bone"
        aria-label="Close image view"
      >
        <X size={20} />
      </button>
    </motion.div>
  );
};

// Main gallery component
const InteractiveImageBentoGallery: React.FC<
  InteractiveImageBentoGalleryProps
> = ({ imageItems, title, description, eyebrow }) => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null);
  const [dragConstraint, setDragConstraint] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  // Calculate the draggable area constraint
  useEffect(() => {
    const calculateConstraints = () => {
      if (gridRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const gridWidth = gridRef.current.scrollWidth;
        const newConstraint = Math.min(0, containerWidth - gridWidth - 32);
        setDragConstraint(newConstraint);
      }
    };
    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, [imageItems]);

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  return (
    <section
      ref={targetRef}
      id="work"
      className="relative w-full overflow-hidden bg-bg py-24 md:py-32"
    >
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-6 md:px-10"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="flex flex-col gap-3 pt-3">
            <span className="mono-label">004</span>
            <span className="mono-label bright">{eyebrow ?? "Selected Work"}</span>
          </div>
          <div>
            <h2 className="display max-w-[16ch] text-[clamp(40px,5.5vw,84px)] leading-[0.96]">
              {title}
            </h2>
            <p className="mt-6 max-w-prose text-bone-dim">
              {description}
            </p>
            <p className="mono-label mt-4">↔ DRAG TO EXPLORE · CLICK TO EXPAND</p>
          </div>
        </div>
      </motion.div>

      <div
        ref={containerRef}
        className="relative mt-16 w-full cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="w-max"
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.05}
        >
          <motion.div
            ref={gridRef}
            className="grid auto-cols-[minmax(18rem,1fr)] grid-flow-col gap-4 px-6 md:px-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {imageItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={cn(
                  "group relative flex h-full min-h-[18rem] w-full min-w-[18rem] cursor-pointer items-end overflow-hidden rounded-sm border border-line bg-surface p-5 transition-shadow duration-300 ease-out hover:shadow-[0_0_40px_-10px_rgba(41,197,232,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                  item.span,
                )}
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
                tabIndex={0}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover grayscale-[15%] brightness-90 transition-all duration-700 group-hover:scale-[1.05] group-hover:grayscale-0 group-hover:brightness-100"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Corner ticks (always visible — drawing aesthetic) */}
                <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-brand/60" />
                <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-brand/60" />
                <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-brand/60" />
                <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-brand/60" />

                <div className="relative z-10 flex w-full items-end justify-between gap-3">
                  <div className="translate-y-2 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="font-display text-xl text-bone">{item.title}</h3>
                    <p className="mt-1 text-sm text-bone-dim">{item.desc}</p>
                  </div>
                  {item.meta && (
                    <div className="text-right opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {item.meta.left && (
                        <div className="mono-label bright">{item.meta.left}</div>
                      )}
                      {item.meta.right && (
                        <div className="mono-label">{item.meta.right}</div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* Edge fades for the drag rail */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveImageBentoGallery;
