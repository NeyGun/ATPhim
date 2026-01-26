import { useEffect, useState, useRef } from "react";
import classNames from 'classnames/bind';

import MovieSlide from "~/components/MovieSlide/index.jsx"
import HeartIcon from '~/assests/icon/heart-icon.svg?react';
import InfoIcon from '~/assests/icon/info-icon.svg?react';
import PlayIcon from '~/assests/icon/play-icon.svg?react';
import ShortNextIcon from '~/assests/icon/short-next-icon.svg?react';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);
const TOPIC = [
    { id: 1, name: "Phim mới", slug: "phim-moi" },
    { id: 2, name: "Phim bộ", slug: "phim-bo" },
    { id: 3, name: "Phim lẻ", slug: "phim-le" },
    { id: 4, name: "TV Shows", slug: "tv-shows" },
    { id: 5, name: "Hoạt hình", slug: "hoat-hinh" },
    { id: 6, name: "Phim Vietsub", slug: "phim-vietsub" },
    { id: 7, name: "Phim thuyết minh", slug: "phim-thuyet-minh" },
    { id: 8, name: "Phim lồng tiếng", slug: "phim-long-tieng" },
    { id: 9, name: "Phim bộ đang chiếu", slug: "phim-bo-dang-chieu" },
    { id: 10, name: "Phim bộ hoàn thành", slug: "phim-bo-hoan-thanh" },
    { id: 11, name: "Phim sắp chiếu", slug: "phim-sap-chieu" },
    { id: 12, name: "Subteam", slug: "subteam" },
    { id: 13, name: "Phim chiếu rạp", slug: "phim-chieu-rap" }
]

function Home() {
    const [test, setTest] = useState(null);
    const [topSlideData, setTopSlideData] = useState(null);
    const [index, setIndex] = useState(0);
    const [imgDomain, setImgDomain] = useState("");
    const topSlideRef = useRef();
    const width = document.documentElement.getBoundingClientRect().width;
    useEffect(() => {
        const url1 = 'https://ophim1.com/v1/api/quoc-gia/han-quoc';
        const options1 = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(url1, options1)
        .then(res => res.json())
        .then(json => setTest(json.data))
        .catch(err => console.error(err));

        const url = 'https://ophim1.com/v1/api/home';
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(url, options)
        .then(res => res.json())
        .then(json => (
            setImgDomain(json.data.APP_DOMAIN_CDN_IMAGE),
            setTopSlideData(json.data.items.slice(0, 6))
        ))
        .catch(err => console.error(err));
    }, [])

    const [test1, setTest1] = useState(null);
    useEffect(() => {
        const url = 'https://ophim1.com/v1/api/quoc-gia/nhat-ban';
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(url, options)
        .then(res => res.json())
        .then(json => setTest1(json.data))
        .catch(err => console.error(err));
    }, [])
    
    useEffect(() => {
        topSlideRef.current.style.transform = `translateX(${- index * width}px)`;
    }, [index])

    const url = 'https://ophim1.com/v1/api/danh-sach/phim-moi';
const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
    return (
        <div>
            <div className={cx("banner")}>
                <div className={cx("banner-container")}>
                    <div className={cx("banner-content")} ref={topSlideRef}>
                        {topSlideData?.map((item, i) => (
                        <div key={item._id} className={cx("banner-item", { active: i === index })}>
                            <div className={cx("banner-img")}>
                                <img
                                    src={imgDomain + "/uploads/movies/" + item.thumb_url.replace("thumb", "poster")}
                                    data-step="0"
                                    onError={(e) => {
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
                                        img.onerror = null; // 🔥 chặn loop
                                        }
                                    }}
                                />
                            </div>
                            <div className={cx("banner-info")}>
                                <a className={cx("banner-name")}>{item.name}</a>
                                <a className={cx("banner-origin-name")}>{item.origin_name}</a>
                                <div>
                                    <div className={cx("banner-tags")}>
                                        <button className={cx("imdb-info")}>IMDb <span>{item.imdb.vote_count == 0 ? "No rate" : item.imdb.vote_average}</span></button>
                                        <button>{item.year}</button>
                                        <button>{item.type == "hoathinh" && "Hoạt hình" || item.type == "series" && "Phim bộ" || item.type == "single" && "Phim lẻ" || item.type == "tvshow" && "Truyền hình" || item.type}</button>
                                        <button>{item.episode_current}</button>
                                    </div>
                                    <div className={cx("banner-category")}>
                                        {item.category.map(item => (
                                            <a key={item.id} href={`/the-loai/${item.slug}`}>{item.name}</a>
                                        ))}
                                    </div>
                                </div>
                                <div className={cx("banner-touch")}>
                                    <a href={`/watch/${item.slug}`} className={cx("touch-play")}>
                                        <PlayIcon/>
                                    </a>
                                    <div className={cx("touch-group")}>
                                        <a className={cx("touch-item")}>
                                            <HeartIcon />
                                        </a>
                                        <a href={`/movies/${item.slug}`} className={cx("touch-item")}>
                                            <InfoIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("overlay")}></div>
                        </div>
                        ))}
                    </div>
                    <div className={cx("top-slide")}>
                        {topSlideData?.map((item, i) => (
                            <div key={item._id} className={cx("top-slide-img", { active: i === index })} onClick={() => setIndex(i)}>
                                <img
                                    src={imgDomain + "/uploads/movies/" + item.thumb_url.replace("thumb", "poster")}
                                    data-step="0"
                                    onError={(e) => {
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
                                        img.onerror = null; // 🔥 chặn loop
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx("home-container")}>
                <div className={cx("topic")}>
                    <div className={cx("topic-header")}>Bạn đang quan tâm gì?</div>
                    <div className={cx("topic-content")}>
                        {TOPIC.slice(0, 6).map(item => (
                            <a key={item.id} href={`/chu-de/${item.slug}`} className={cx("topic-item")}>
                                <div className={cx("topic-wrapper")}>
                                    <div className={cx("topic-name")}>{item.name}</div>
                                    <div className={cx("topic-info")}>
                                        Xem chủ đề
                                        <ShortNextIcon />
                                    </div>
                                </div>
                            </a>
                        ))}
                        <a href="/chu-de" className={cx("topic-item")} style={{ textAlign: "center", fontSize: "1.1rem" }}>
                            +8 chủ đề
                        </a>
                    </div>
                </div>
                <div className={cx("slide-container")}>
                    {test && <MovieSlide data={test}/>}
                    {test1 && <MovieSlide data={test1}/>}
                    {test1 && <MovieSlide data={test1}/>}
                </div>
            </div>
        </div>
    );
}

export default Home;