import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap';
import { MdHighQuality } from 'react-icons/lib/md';
import LazyLoad from 'react-lazyload';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Result extends Component {
  static propTypes = {
    result: PropTypes.object.isRequired
  }

  render() {
    const { result } = this.props;

    return (
      <article className="row" key={result}>
        <div className="col-md-6 meta">
          <h1>{result.artistName}</h1>
          <h4>{result.collectionName}</h4>

          <ButtonGroup>
            <Button tag="a" href={result.artworks.l}>Standard</Button>{' '}
            <Button tag="a" href={result.artworks.xl}><MdHighQuality size={30} />&nbsp;Hi-Res</Button>
          </ButtonGroup>
        </div>
        <div className="col-md-6 image">
          <LazyLoad height={200} once>
            <CSSTransitionGroup
              transitionName="fade"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <img src={result.artworks.l} alt="" />
            </CSSTransitionGroup>
          </LazyLoad>
        </div>
      </article>
    );
  }
}

export default Result;
