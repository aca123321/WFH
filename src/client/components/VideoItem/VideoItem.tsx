import React from 'react';
import { VideoItemProps } from '../../../shared/Video';
import { Link } from 'react-router-dom';
import Colors from '../../styles/Colors';

const clicked = url => {
  console.log(url);
};

export default function VideoItem(props: VideoItemProps) {
  return (
    <div
      style={{ width: '100%', padding: '20px', color: Colors.lightBlue }}
      className={'videoItem'}
    >
      <Link
        style={{ color: 'inherit', textStyle: 'none', textDecoration: 'none' }}
        onClickCapture={() => clicked(props.url)}
        to={props.url}
      >
        <span>{props.title}</span>
      </Link>
    </div>
  );
}
