import React, { useEffect, useRef } from "react";
import classNames from 'classnames/bind';

import styles from './MovieCard.module.scss';

const cx = classNames.bind(styles);

export default function MovieCard ({ movieData, imgDom }) {
    console.log(movieData);
    
   return (
    <div className={cx("slide-card")}>
        <a className={cx("slide-poster")} href={`/phim/${movieData.slug}`}>
            <img className={cx("slide-img")} src={imgDom+'/uploads/movies/'+movieData.poster_url} alt="" />
        </a>
        <div className={cx("slide-name")}>
            <div className={cx("name")}>
                <a href={`/phim/${movieData.slug}`}>
                    {movieData.name}
                </a>
            </div>
            <div className={cx("origin-name")}>
                <a href={`/phim/${movieData.slug}`}>
                    {movieData.origin_name}
                </a>
            </div>
        </div>
    </div>
   );
}