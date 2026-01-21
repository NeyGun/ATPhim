import classNames from "classnames/bind";

import styles from "./MovieHover.module.scss";
import PlayIcon from '~/assests/icon/play-icon.svg?react';
import HeartIcon from '~/assests/icon/heart-icon.svg?react';
import InfoIcon from '~/assests/icon/info-icon.svg?react';

const cx = classNames.bind(styles);

export default function MovieHover({ movieData, imgDom }) {
  console.log(movieData);
  
  return (
    <div className={cx("hover-container")}>
      <div className={cx("hover")}>
        <div className={cx("hover-poster")}>
          <img src={imgDom + "/uploads/movies/" + movieData.poster_url} />
        </div>
        <div className={cx("hover-info")}>
          <div className={cx("hover-name")} >{movieData.name}</div>
          <div className={cx("hover-origin-name")}>{movieData.origin_name}</div>
          <div className={cx("hover-control")}>
            <button className={cx("control-play")}>
              <PlayIcon />
              Xem ngay
            </button>
            <button className={cx("control-like")}>
              <HeartIcon />
              Thích
            </button>
            <button className={cx("control-detail")}>
              <InfoIcon />
              Chi tiết
            </button>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
