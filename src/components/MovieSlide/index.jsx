import { useEffect, useRef, useState } from "react";
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import styles from './MovieSlide.module.scss';
import MovieCard from "~/components/MovieCard/index.jsx";
import NextIcon from '~/assests/icon/next-icon.svg?react';
import ShortNextIcon from '~/assests/icon/short-next-icon.svg?react';
import PrevIcon from '~/assests/icon/prev-icon.svg?react';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const handleBreakPoints = (type) => {
  switch (type) {
    
    case "thumb":
      return {
        0: {
          slidesPerView: 1,
          spaceBetween: 8
        },
        320: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 10
        },
        740: {
          slidesPerView: 5,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 15
        }
      }
    case "top-10":
      return {
        0: {
          slidesPerView: 1,
          spaceBetween: 8
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        760: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        980: {
          slidesPerView: 4,
          spaceBetween: 10
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 15
        },
        1600: {
          slidesPerView: 6,
          spaceBetween: 15
        }
      }
    default:
      return {
        0: {
          slidesPerView: 1,
          spaceBetween: 8
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 15
        }
      }
  }
}

export default function MovieSlide ({ data, title = "", type = "default" }) {
  // type = ["default", "thumb", "poster", "poster-thumb", "top-10"]
  const [randomColor, setRandomColor] = useState("");
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const breakPoints = handleBreakPoints(type);
  useEffect(() => {
    setRandomColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }, [])
  
  return (
    <div className={cx("slide", type)}>
      <div className={cx("slide-title")}>
        <div className={cx("title-text")}
          style={{
            background: `linear-gradient(
              235deg,
              rgb(255, 255, 255) 30%,
              ${randomColor} 100%
            )`
          }}
        >{title === "" ? data.seoOnPage.titleHead + " mới" : title}</div>
        <div className={cx("title-info")}>
          <Link to={data.seoOnPage.og_url}>
            <span>Xem toàn bộ</span>
            <NextIcon />
          </Link>
        </div>
      </div>
      <div className={cx("slide-wrapper")}>
        {/* {Chỉ có navigation khi type = ""} */}
        {type === "default"  &&
          (<div className={cx("slide-nav")}>
            <button type="button" className={cx("slide-nav-prev")} ref={prevButtonRef} >
              <PrevIcon />
            </button>
            <button type="button" className={cx("slide-nav-next")} ref={nextButtonRef} >
              <ShortNextIcon />
            </button>
          </div>)
        }
        <Swiper
          breakpoints={breakPoints}
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
          {data.items.map((movie, index) => ( // Dùng index để đếm rank vì api chx có sẵn rank
            <SwiperSlide key={movie._id}>
              <MovieCard movieData={movie} imgDom={data.APP_DOMAIN_CDN_IMAGE} type={type} rank={index+1}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}