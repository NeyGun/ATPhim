import * as HoverCard from "@radix-ui/react-hover-card";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import MovieHover from "~/components/MovieHover/index.jsx"
import styles from "./MovieCard.module.scss";

const cx = classNames.bind(styles);

export default function MovieCard({ movieData, width, imgDom }) {
  
  return (
    <div className={cx("slide-card")}>
      <HoverCard.Root openDelay={250} closeDelay={150}>
        
        {/* 🎯 CHỈ POSTER LÀ TRIGGER */}
        <HoverCard.Trigger asChild>
          <Link
            className={cx("slide-poster")}
            to={`/phim/${movieData.slug}`}
          >
            <img
              className={cx("slide-img")}
              src={imgDom + "/uploads/movies/" + movieData.poster_url}
            />
          </Link>
        </HoverCard.Trigger>

        {/* 🚀 PREVIEW RENDER RA NGOÀI SLIDER */}
        <HoverCard.Portal>
          <HoverCard.Content
            side="center"
            align="top"
            sideOffset={-35}
            alignOffset={-50}
            className={cx("hover-preview")}
            style={{width: `${width}px`, height: `${width}px`}}
          >
            <MovieHover movieData={movieData} imgDom={imgDom} />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>

      {/* ❌ KHÔNG nằm trong trigger */}
      <div className={cx("slide-name")}>
        <div className={cx("name")}>
          <Link to={`/phim/${movieData.slug}`}>Xử lý scroll cho slide{movieData.name}</Link>
        </div>
        <div className={cx("origin-name")}>
          <Link to={`/phim/${movieData.slug}`}>
            {movieData.origin_name}
          </Link>
        </div>
      </div>
    </div>
  );
}


