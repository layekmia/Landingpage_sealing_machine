"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductConfig } from "@/lib/products/types";

interface Props {
  product: ProductConfig;
}

type ActiveTab = "image" | "video";

export default function GallerySection({ product }: Props) {
  const { images, videoSrc, videoPoster, name } = product;
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<ActiveTab>("image");

  return (
    <section
      className="py-8"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="section-container">
        <h2 className="section-heading">পণ্যের বিস্তারিত</h2>

        {/* Main display */}
        <div
          className="relative w-full rounded-2xl overflow-hidden mb-3"
          style={{
            aspectRatio: "1 / 1",
            background: "var(--color-bg)",
            border: "1px solid var(--color-border)",
          }}
        >
          {activeTab === "video" && videoSrc ? (
            <video
              src={videoSrc}
              poster={videoPoster || images[0]}
              controls
              playsInline
              className="w-full h-full object-contain"
              style={{ background: "#000" }}
            />
          ) : (
            <Image
              key={activeImage}
              src={images[activeImage]}
              alt={`${name} — ছবি ${activeImage + 1}`}
              fill
              sizes="(max-width: 520px) 100vw, 520px"
              className="object-contain"
              style={{ transition: "opacity 0.2s ease" }}
            />
          )}
        </div>

        {/* Thumbnail strip */}
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Image thumbnails */}
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => {
                setActiveImage(i);
                setActiveTab("image");
              }}
              className={`shrink-0 rounded-xl overflow-hidden transition-all duration-150 ${
                activeTab === "image" && activeImage === i ? "thumb-active" : ""
              }`}
              style={{
                width: 64,
                height: 64,
                border: "1.5px solid var(--color-border)",
                background: "var(--color-bg)",
              }}
              aria-label={`ছবি ${i + 1}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`thumb ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            </button>
          ))}

          {/* Video thumbnail */}
          {videoSrc && (
            <button
              onClick={() => setActiveTab("video")}
              className={`shrink-0 rounded-xl overflow-hidden relative transition-all duration-150 flex items-center justify-center ${
                activeTab === "video" ? "thumb-active" : ""
              }`}
              style={{
                width: 64,
                height: 64,
                border: "1.5px solid var(--color-border)",
                background: "#0a0a0a",
              }}
              aria-label="Video দেখুন"
            >
              {videoPoster && (
                <Image
                  src={videoPoster}
                  alt="video thumb"
                  fill
                  sizes="64px"
                  className="object-cover opacity-50"
                />
              )}
              {/* Play icon */}
              <span
                className="relative z-10 text-white text-xl"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
              >
                ▶
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
