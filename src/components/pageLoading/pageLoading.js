import React from 'react';

import LoadingGif from '../../assets/svg/Pulse-0.9s-60px.svg';

export default function PageLoading(props) {

    return (
        <div className="page-loader-container">
          <div className="page-loading">
            <img src={LoadingGif} alt="page loading"/>
          </div>
        </div>
      )
}