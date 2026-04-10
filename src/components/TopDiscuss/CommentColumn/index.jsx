import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import styles from "./CommentColumn.module.scss";
import PlayIcon from "~/assests/icon/play-icon.svg?react";

const cx = classNames.bind(styles);

const demoData = [
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        movie_name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta"
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        movie_name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta"
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        movie_name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta"
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        movie_name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta"
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        movie_name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta"
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        movie_name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta"
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        movie_name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta"
    },
    {
        name: "Admin",
        avt: "/ATPhim/default_avt.jpg",
        cmt: "Tính năng tạo tài khoản và comment chưa được hoàn thiện",
        movie_name: "Ánh sáng của đôi ta",
        url: "/movies/anh-sang-cua-doi-ta"
    },
]

const CommentItem = ({ data }) => {
    return (
        <Link to={data.url}>
            <div className={cx("cmt-item")}>
                <img src={data.avt} alt={data.name} className={cx("cmt-avt")}/>
                <div className={cx("wrapper")}>
                    <div className={cx("cmt-user")}>
                        <div className={cx("user-name")}>{data.name}</div>
                        <div className={cx("user-cmt")}>{data.cmt}</div>
                    </div>
                    <div className={cx("movie")}>
                        <PlayIcon />
                        {data.movie_name}
                    </div>
                </div>
            </div>
        </Link>
    )
}

function CommentColumn() {
    const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://ophim1.com/v1/api/danh-sach/phim-bo?sort_field=modified.time', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
    return (
        <div className={cx("container")}>
            <Swiper
                direction="vertical"
                slidesPerView={4}
                spaceBetween={5}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    reverseDirection: false
                }}
                modules={[Autoplay]}
                style={{ height: "282px" }}
            >   
                {demoData.map((item, index) => (
                    <SwiperSlide key={index} style={{ height: "68px" }}>
                        <CommentItem data={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default CommentColumn;