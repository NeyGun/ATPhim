import { useEffect, useState, useRef } from "react";
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";

import ShortNextIcon from '~/assests/icon/short-next-icon.svg?react';
import styles from './Home.module.scss';
import MovieSlide from "~/components/MovieSlide/index.jsx"
import TopSlide from "~/components/TopSlide/index.jsx"

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
    const [imgDomain, setImgDomain] = useState("");
    useEffect(() => {
        const url1 = 'https://ophim1.com/v1/api/quoc-gia/han-quoc?limit=12';
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
        const url = 'https://ophim1.com/v1/api/quoc-gia/nhat-ban?limit=12';
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(url, options)
        .then(res => res.json())
        .then(json => setTest1(json.data))
        .catch(err => console.error(err));
    }, [])
    

    return (
        <div>
            <TopSlide topSlideData={topSlideData} imgDomain={imgDomain} />
            <div className={cx("home-container")}>
                <div className={cx("topic")}>
                    <div className={cx("topic-header")}>Bạn đang quan tâm gì?</div>
                    <div className={cx("topic-content")}>
                        {TOPIC.slice(0, 6).map(item => (
                            <Link key={item.id} to={`/topic/${item.slug}`} className={cx("topic-item")}>
                                <div className={cx("topic-wrapper")}>
                                    <div className={cx("topic-name")}>{item.name}</div>
                                    <div className={cx("topic-info")}>
                                        Xem chủ đề
                                        <ShortNextIcon />
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <Link to="/" className={cx("topic-item")} style={{ textAlign: "center", fontSize: "1.1rem" }}>
                            +8 chủ đề
                        </Link>
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