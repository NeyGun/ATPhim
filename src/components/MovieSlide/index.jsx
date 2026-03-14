import { useEffect, useRef, useState } from "react";
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import styles from './MovieSlide.module.scss';
import MovieCard from "~/components/MovieCard/index.jsx";
import NextIcon from '~/assests/icon/next-icon.svg?react';
import ShortNextIcon from '~/assests/icon/short-next-icon.svg?react';
import PrevIcon from '~/assests/icon/prev-icon.svg?react';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

export default function MovieSlide ({ data }) {
  const [index, setIndex] = useState(0);
  const [randomColor, setRandomColor] = useState("");
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  useEffect(() => {
    setRandomColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }, [])
  
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
          <Link to={data.seoOnPage.og_url}>
            <span>Xem toàn bộ</span>
            <NextIcon />
          </Link>
        </div>
      </div>
      <div className={cx("slide-wrapper")}>
        <div className={cx("slide-nav")}>
          {/* {index !=0 &&  */}
          <button type="button" className={cx("slide-nav-prev")} ref={prevButtonRef} >
            <PrevIcon />
          </button>
          {/* } */}
          {/* {index != data.params.pagination.totalItemsPerPage - 3 && */}
          <button type="button" className={cx("slide-nav-next")} ref={nextButtonRef} >
            <ShortNextIcon />
          </button>
          {/* } */}
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          navigation={{
            nextEl: prevButtonRef.current,
            prevEl: nextButtonRef.current
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevButtonRef.current;
            swiper.params.navigation.nextEl = nextButtonRef.current;
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {data.items.map(movie => (
            <SwiperSlide key={movie._id}>
              <MovieCard movieData={movie} imgDom={data.APP_DOMAIN_CDN_IMAGE}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
   );
}