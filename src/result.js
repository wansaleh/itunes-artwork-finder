import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap';
import { MdHighQuality } from 'react-icons/lib/md';
import LazyLoad from 'react-lazyload';
import TimeAgo from 'react-timeago';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Result extends Component {
  static propTypes = {
    result: PropTypes.object.isRequired
  }

  render() {
    const { result } = this.props;

    if (result.country === 'MYS' && result.copyright)
      result.copyright = result.copyright.replace(/sdn\.?\s?bhd\.?/gi, 'Sdn. Bhd.');

    return (
      <LazyLoad height={200} once>
        <CSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}>
          <article className="row">
            <div className="col-md-6 meta">
              <div className="wrapper">
                <h1>{result.artistName}</h1>
                <h4>{result.collectionName}</h4>

                <ButtonGroup>
                  <Button tag="a" href={result.artworks.l}>Standard</Button>{' '}
                  <Button tag="a" href={result.artworks.xl}><MdHighQuality size={30} />&nbsp;Hi-Res</Button>
                </ButtonGroup>

                <div className="released">
                  Released <TimeAgo date={result.releaseDate} />
                </div>

                {result.copyright && <div className="copyright">{result.copyright}</div>}
              </div>
            </div>

            <div className="col-md-6 image">
              <img src={result.artworks.l} alt="" />
            </div>
          </article>
        </CSSTransitionGroup>
      </LazyLoad>
    );
  }
}

export default Result;
