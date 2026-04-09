import classNames from "classnames/bind";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import styles from "./CommentSlide.module.scss";
import CircleUpIcon from "~/assests/icon/circle-up.svg?react";
import CircleDownIcon from "~/assests/icon/circle-down.svg?react";
import MessageIcon from "~/assests/icon/message.svg?react";
import PrevIcon from "~/assests/icon/prev-icon.svg?react";
import NextIcon from "~/assests/icon/short-next-icon.svg?react";

const cx = classNames.bind(styles);

const demoData = [
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        like: 10,
        disLike: 10,
        reply: 10,
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
        poster: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-poster.jpg",
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        like: 10,
        disLike: 10,
        reply: 10,
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
        poster: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-poster.jpg",
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        like: 10,
        disLike: 10,
        reply: 10,
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
        poster: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-poster.jpg",
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        like: 10,
        disLike: 10,
        reply: 10,
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
        poster: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-poster.jpg",
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        like: 10,
        disLike: 10,
        reply: 10,
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
        poster: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-poster.jpg",
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        like: 10,
        disLike: 10,
        reply: 10,
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
        poster: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-poster.jpg",
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        like: 10,
        disLike: 10,
        reply: 10,
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
        poster: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-poster.jpg",
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        like: 10,
        disLike: 10,
        reply: 10,
        url: "/movies/anh-sang-cua-doi-ta",
        thumb: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-thumb.jpg",
        poster: "https://img.ophim.live/uploads/movies/anh-sang-cua-doi-ta-poster.jpg",
    },
]

const CommentItem = ({ data }) => {
    return (
        <div className={cx("cmt-item")}>
            <div className={cx("cmt-poster")}>
                <img src={data.poster} alt="Poster"/>
            </div>
            <div className={cx("cmt-thumb")}>
                <Link to={data.url}>
                    <img src={data.thumb} alt="Thumb"/>
                </Link>
            </div>
            <div className={cx("user")}>
                <div className={cx("user-wrapper")}>
                    <div className={cx("user-avt")}>
                        <img src={data.avt} alt="User avatar"/>
                    </div>
                    <div className={cx("user-name")}>{data.name}</div>
                    <div className={cx("user-cmt")}>{data.cmt}</div>
                </div>
                <div className={cx("cmt-action")}>
                    <div className={cx("act")}>
                        <CircleUpIcon />
                        {data.like}
                    </div>
                    <div className={cx("act")}>
                        <CircleDownIcon />
                        {data.disLike}
                    </div>
                    <div className={cx("act")}>
                        <MessageIcon />
                        {data.reply}
                    </div>
                </div>
            </div>
        </div>
    )
}

function CommentSlide() {
    const prevButtonRef = useRef();
    const nextButtonRef = useRef();

    return (
        <div className={cx("container")}>
            <div className={cx("button", "prev")} ref={prevButtonRef}>
                <PrevIcon />
            </div>
            <div className={cx("button", "next")} ref={nextButtonRef}>
                <NextIcon />
            </div>
            <Swiper
                slidesPerView={5}
                spaceBetween={15}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    reverseDirection: false
                }}
                navigation={{
                    nextEl: prevButtonRef.current,
                    prevEl: nextButtonRef.current
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevButtonRef.current;
                    swiper.params.navigation.nextEl = nextButtonRef.current;
                }}
                modules={[Autoplay, Navigation]}
            >   
                {demoData.map((item, index) => (
                    <SwiperSlide key={index}>
                        <CommentItem data={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default CommentSlide;