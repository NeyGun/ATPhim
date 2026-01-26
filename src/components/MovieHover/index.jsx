import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./MovieHover.module.scss";
import PlayIcon from '~/assests/icon/play-icon.svg?react';
import HeartIcon from '~/assests/icon/heart-icon.svg?react';
import InfoIcon from '~/assests/icon/info-icon.svg?react';

const cx = classNames.bind(styles);

export default function MovieHover({ movieData, imgDom }) {
  
  return (
    <div className={cx("hover-container")}>
      <div className={cx("hover")}>
        <div className={cx("hover-poster")}>
          <img src={imgDom + "/uploads/movies/" + movieData.poster_url} />
        </div>
        <div className={cx("info-container")}>
          <div className={cx("hover-info")}>
            <div className={cx("hover-name")} >{movieData.name}</div>
            <div className={cx("hover-origin-name")}>{movieData.origin_name}</div>
            <div className={cx("hover-control")}>
              <Link to={`/watch/${movieData.slug}`}>
                <button className={cx("control-play")}>
                  <PlayIcon />
                  Xem ngay
                </button>
              </Link>
              <a>
                <button>
                  <HeartIcon />
                  Thích
                </button>
              </a>
              <Link to={`/movies/${movieData.slug}`}>
                <button>
                  <InfoIcon />
                  Chi tiết
                </button>
              </Link>
            </div>
            <div className={cx("other-info")}>
              <button className={cx("imdb-info")}>IMDb <span>{movieData.imdb.vote_count == 0 ? "No rate" : movieData.imdb.vote_average}</span></button>
              <button>{movieData.year}</button>
              <button>{movieData.type == "hoathinh" && "Hoạt hình" || movieData.type == "series" && "Phim bộ" || movieData.type == "single" && "Phim lẻ" || movieData.type == "tvshow" && "Truyền hình" || movieData.type}</button>
              <button>{movieData.episode_current}</button>
            </div>
            <div className={cx("category-info")}>
                {movieData.category.map(item => (
                  <span key={item.id} className={cx("category-item")}>{item.name}</span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
