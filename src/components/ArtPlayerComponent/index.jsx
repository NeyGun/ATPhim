import React, { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";

export default function ArtPlayerComponent({ url, containerRef }) {
    const artInstance = useRef(null);

    useEffect(() => {
        if (!containerRef?.current) return;

        const art = new Artplayer({
            container: containerRef.current,
            url: url,
            type: "m3u8",
            autoSize: true,
            fullscreen: true,
            fullscreenWeb: true,
            playbackRate: true,
            aspectRatio: true,
            setting: true,
            customType: {
                m3u8: (video, url) => {
                    if (Hls.isSupported()) {
                        const hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                        video.src = url;
                    }
                },
            },
        });

        artInstance.current = art;

        const handleKey = (e) => {
             if (e.key === 'f' || e.key === 'F') {
                 art.fullscreen = !art.fullscreen;
             }
        }
        
        let keyListenerAdded = false;
        art.on('focus', () => {
            if (!keyListenerAdded) {
                window.addEventListener('keydown', handleKey);
                keyListenerAdded = true;
            }
        });
        art.on('blur', () => {
            if (keyListenerAdded) {
                window.removeEventListener('keydown', handleKey);
                keyListenerAdded = false;
            }
        });

        return () => {
            if (art) {
                art.destroy(true);
            }
        };
    }, []);

    useEffect(() => {
        if (artInstance.current && artInstance.current.url !== url) {
            artInstance.current.switchUrl(url, `Tập mới`);
        }
    }, [url]); // Chỉ chạy khi url thay đổi

    return null; // Component này không render gì, nó chỉ gắn vào container
}