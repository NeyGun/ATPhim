import * as HoverCard from "@radix-ui/react-hover-card";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import MovieHover from "~/components/MovieHover/index.jsx"
import styles from "./MovieCard.module.scss";

const cx = classNames.bind(styles);

export default function MovieCard({ movieData, imgDom, type, rank }) {
  
  return (
    <div className={cx("slide-card", type)}>
      <HoverCard.Root openDelay={600} closeDelay={150}>
        
        {/* CHỈ POSTER LÀ TRIGGER */}
        <HoverCard.Trigger asChild>
          <Link
            className={cx("slide-poster")}
            to={`/movies/${movieData.slug}`}
          >
            <img
              className={cx("slide-img")}
              src={imgDom + "/uploads/movies/" + (type === "thumb" || type === "top-10" ? movieData.thumb_url : movieData.poster_url)}
            />
          </Link>
        </HoverCard.Trigger>

        <HoverCard.Portal>
          <HoverCard.Content
            side="center"
            align="top"
            sideOffset={-35}
            alignOffset={-50}
            className={cx("hover-preview")}
          >
            <MovieHover movieData={movieData} imgDom={imgDom} />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>

      <div className={cx("slide-name")}>
        {type === "top-10" && (
          <div className={cx("rank")}>
            {rank}
          </div>
        )}
        {type === "poster-thumb" && (
          <Link to={`/movies/${movieData.slug}`} className={cx("thumb-url")}>
            <img
              className={cx("slide-thumb")}
              src={imgDom + "/uploads/movies/" + movieData.thumb_url}
            />
          </Link>
        )}
        <div className={cx("name-wrapper")}>
          <div className={cx("name")}>
            <Link to={`/movies/${movieData.slug}`}>{movieData.name}</Link>
          </div>
          <div className={cx("origin-name")}>
            <Link to={`/movies/${movieData.slug}`}>
              {movieData.origin_name}
            </Link>
          </div>
          {type === "top-10" && (
            <div className={cx("current-ep")}>
              {movieData.episode_current}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


