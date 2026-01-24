import { useEffect, useState } from "react";
import classNames from 'classnames/bind';

import MovieSlide from "~/components/MovieSlide/index.jsx"
import HeartIcon from '~/assests/icon/heart-icon.svg?react';
import InfoIcon from '~/assests/icon/info-icon.svg?react';
import PlayIcon from '~/assests/icon/play-icon.svg?react';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [test, setTest] = useState(null);
    const [topSlideData, setTopSlideData] = useState(null);
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
        .then(json => setTopSlideData(json.data.items.slice(0, 6)))
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
    return (
        <div>
            <div className={cx("banner")}>
                <div className={cx("banner-img")}>
                    <img src="https://img.ophim.live/uploads/movies/baby-den-roi-2026-poster.jpg"/>
                    <div className={cx("overlay")}></div>
                </div>
                <div className={cx("banner-info")}>
                    <a className={cx("banner-name")}>{topSlideData?.[0].name}</a>
                    <a className={cx("banner-origin-name")}>{topSlideData?.[0].origin_name}</a>
                    <div>
                        <div className={cx("banner-tags")}>
                            <button className={cx("imdb-info")}>IMDb <span>{topSlideData?.[0].imdb.vote_count == 0 ? "No rate" : topSlideData?.[0].imdb.vote_average}</span></button>
                            <button>{topSlideData?.[0].year}</button>
                            <button>{topSlideData?.[0].type == "hoathinh" && "Hoạt hình" || topSlideData?.[0].type == "series" && "Phim bộ" || topSlideData?.[0].type == "single" && "Phim lẻ" || topSlideData?.[0].type == "tvshow" && "Truyền hình" || topSlideData?.[0].type}</button>
                            <button>{topSlideData?.[0].episode_current}</button>
                        </div>
                        <div className={cx("banner-category")}>
                            {topSlideData?.[0].category.map(item => (
                                <a key={item.id} href={`/the-loai/${item.slug}`}>{item.name}</a>
                            ))}
                        </div>
                    </div>
                    <div className={cx("banner-touch")}>
                        <a href={`/watch/${topSlideData?.[0].slug}`} className={cx("touch-play")}>
                            <PlayIcon/>
                        </a>
                        <div className={cx("touch-group")}>
                            <a className={cx("touch-item")}>
                                <HeartIcon />
                            </a>
                            <a href={`/movies/${topSlideData?.[0].slug}`} className={cx("touch-item")}>
                                <InfoIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("home-container")}>
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