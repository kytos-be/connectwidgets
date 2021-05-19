/**
 * rsccard main component
 * React provided at window via reactR
 */

import PropTypes from 'prop-types';
import ContentImage from '@/ContentImage';
import { contentImgSrc } from '@/utils';
import './card.scss';

dayjs.extend(dayjs_plugin_localizedFormat);

function Card({ data }) {
  const content = HTMLWidgets.dataframeToD3(data);

  return content.map((item, index) => {
    const imgUrl = contentImgSrc(item.url, item.guid);
    return (
      <div
        key={index}
        className="rsccard__card"
      >
        <div
          className='rsccard__img'
        >
          <ContentImage
            imageUrl={imgUrl}
            contentUrl={item.url}
            contentType={item.app_mode}
          />
        </div>
        <div className="rsccard__meta">
          <span>{item.owner_username}</span> • <time>{dayjs(item.updated_time).format('ll')}</time>
          <h2 className="rsccard__meta-title">
            {item.title || item.name}
          </h2>
          <p className="rsccard__meta-description">
            {item.description}
          </p>
          <a
            className="rsccard__meta-link"
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >Open Content</a>
        </div>
      </div>
    );
  });
}

Card.propTypes = {
  data: PropTypes.object,
}

export default Card;
