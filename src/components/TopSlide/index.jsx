import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import classNames from "classnames/bind";

import HeartIcon from '~/assests/icon/heart-icon.svg?react';
import InfoIcon from '~/assests/icon/info-icon.svg?react';
import PlayIcon from '~/assests/icon/play-icon.svg?react';
import styles from "./TopSlide.module.scss";

const cx = classNames.bind(styles);

function TopSlide({ topSlideData, imgDomain }) {
    const swiperRef = useRef();
    const [active, setActive] = useState(0);

    const handleImgError = (e, item) => {
        const img = e.currentTarget;
        const step = Number(img.dataset.step);

        if (step === 0) {
            img.dataset.step = "1";
            img.src = imgDomain + "/uploads/movies/" + item.slug + "-poster.jpg";
        } 
        else if (step === 1) {
            img.dataset.step = "2";
            img.src = imgDomain + "/uploads/movies/" + item.thumb_url;
        } 
        else {
            img.onerror = null;
        }
    };

    return (
        <div className={cx("container")}>
            <Swiper
                spaceBetween={30}
                effect="fade"
                modules={[EffectFade]}
                className={cx("banner")}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActive(swiper.realIndex)}
            >
                {topSlideData?.map((item) => (
                    <SwiperSlide key={item._id}>
                        <div className={cx("banner-item")}>

                            <div className={cx("banner-img")}>
                                <img
                                    src={
                                        imgDomain +
                                        "/uploads/movies/" +
                                        item.thumb_url.replace("thumb", "poster")
                                    }
                                    data-step="0"
                                    onError={(e) => handleImgError(e, item)}
                                />
                            </div>

                            <div className={cx("banner-info")}>

                                <Link to={`/watch/${item.slug}`} className={cx("banner-name")}>{item.name}</Link>

                                <Link to={`/watch/${item.slug}`} className={cx("banner-origin-name")}>
                                    {item.origin_name}
                                </Link>

                                <div>
                                    <div className={cx("banner-tags")}>

                                        <button className={cx("imdb-info")}>
                                            IMDb
                                            <span>
                                                {item.imdb.vote_count == 0
                                                    ? "No rate"
                                                    : item.imdb.vote_average}
                                            </span>
                                        </button>

                                        <button>{item.year}</button>

                                        <button>
                                            {item.type == "hoathinh" && "Hoạt hình" ||
                                            item.type == "series" && "Phim bộ" ||
                                            item.type == "single" && "Phim lẻ" ||
                                            item.type == "tvshow" && "Truyền hình" ||
                                            item.type}
                                        </button>

                                        <button>{item.episode_current}</button>

                                    </div>

                                    <div className={cx("banner-category")}>
                                        {item.category.map((cat) => (
                                            <Link key={cat.id} to={`/the-loai/${cat.slug}`}>
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className={cx("banner-touch")}>

                                    <Link
                                        to={`/watch/${item.slug}`}
                                        className={cx("touch-play")}
                                    >
                                        <PlayIcon />
                                    </Link>

                                    <div className={cx("touch-group")}>

                                        <a className={cx("touch-item")}>
                                            <HeartIcon />
                                        </a>

                                        <Link
                                            to={`/movies/${item.slug}`}
                                            className={cx("touch-item")}
                                        >
                                            <InfoIcon />
                                        </Link>

                                    </div>

                                </div>

                            </div>

                            <div className={cx("overlay")} />

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={cx("top-slide")}>
                {topSlideData?.map((item, i) => (
                    <div
                    key={item._id}
                    className={cx("top-slide-img", { active: i === active })}
                    onClick={() => swiperRef.current.slideToLoop(i)}
                    >
                        <img
                            src={
                                imgDomain +
                                "/uploads/movies/" +
                                item.thumb_url.replace("thumb", "poster")
                            }
                            data-step="0"
                            onError={(e) => handleImgError(e, item)}
                        />
                    </div>
                ))}
            </div>  
        </div>
    );
}

export default TopSlide;