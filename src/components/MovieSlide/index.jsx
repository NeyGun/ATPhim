import React, { useEffect, useRef } from "react";
import classNames from 'classnames/bind';

import styles from './MovieSlide.module.scss';
import MovieCard from "~/components/MovieCard/index.jsx";
import NextIcon from '~/assests/icon/next-icon.svg?react';

const cx = classNames.bind(styles);

export default function MovieSlide ({ data }) {
  
   const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;


   return (
    <div className={cx("slide")}>
      <div className={cx("slide-title")}>
        <div className={cx("title-text")} style={{
  background: `linear-gradient(
    235deg,
    rgb(255, 255, 255) 30%,
    ${randomColor()} 100%
  )`
}}
>{data.seoOnPage.titleHead} mới</div>
        <div className={cx("title-info")}>
          <a href={data.seoOnPage.og_url}>
            <span>Xem toàn bộ</span>
            <NextIcon />
          </a>
        </div>
      </div>
      <div className={cx("slide-content")}>
        <div className={cx("slide-group")}>
          {data.items.map(movie => (
            <MovieCard key={movie._id} movieData={movie} imgDom={data.APP_DOMAIN_CDN_IMAGE}/>
          ))}
        </div>
      </div>
    </div>
   );
}