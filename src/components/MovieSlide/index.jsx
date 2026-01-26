import { useEffect, useRef, useState } from "react";
import classNames from 'classnames/bind';

import styles from './MovieSlide.module.scss';
import MovieCard from "~/components/MovieCard/index.jsx";
import NextIcon from '~/assests/icon/next-icon.svg?react';
import ShortNextIcon from '~/assests/icon/short-next-icon.svg?react';
import PrevIcon from '~/assests/icon/prev-icon.svg?react';

const cx = classNames.bind(styles);

export default function MovieSlide ({ data }) {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [randomColor, setRandomColor] = useState("");
  const slideRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  useEffect(() => {
    setRandomColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    var first = slideRef.current.children[0];
    var second = slideRef.current.children[1];
    setStep(second.getBoundingClientRect().left - first.getBoundingClientRect().left);
  }, [])

  useEffect(() => {
    slideRef.current.style.transform = `translateX(${- index * step}px)`;
  }, [index])
  
   return (
    <div className={cx("slide")}>
      <div className={cx("slide-title")}>
        <div className={cx("title-text")} style={{
  background: `linear-gradient(
    235deg,
    rgb(255, 255, 255) 30%,
    ${randomColor} 100%
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
      <div className={cx("slide-wrapper")}>
        <div className={cx("slide-nav")}>
          {index !=0 && 
          <button type="button" className={cx("slide-nav-prev")} ref={prevButtonRef} onClick={() => {setIndex((prev => (prev-1)))}}>
            <PrevIcon />
          </button>}
          {index != data.params.pagination.totalItemsPerPage - 3 &&
          <button type="button" className={cx("slide-nav-next")} ref={nextButtonRef} onClick={() => {setIndex((prev => (prev+1)))}}>
            <ShortNextIcon />
          </button>
          }
        </div>
        <div className={cx("slide-content")}>
          <div className={cx("slide-group")} ref={slideRef}>
            {data.items.map(movie => (
              <MovieCard key={movie._id} movieData={movie} width={step} imgDom={data.APP_DOMAIN_CDN_IMAGE}/>
            ))}
          </div>
        </div>
      </div>
    </div>
   );
}