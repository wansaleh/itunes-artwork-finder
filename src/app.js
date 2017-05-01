import React, { Component } from 'react';
import $ from "jquery";
// import linkState from 'linkstate';
import cn from 'classnames';
// import DebounceInput from 'react-debounce-input';
// import Pace from 'react-pace-progress'

import Result from './result';

import './app.scss';

class App extends Component {
  state = {
    initialized: false,
    results: undefined,
    searchText: '',
    isLoading: false
  };

  runSearch() {
    let term = this.state.searchText;
    this.setState({ isLoading: true });

    $.getJSON('https://itunes.apple.com/search?callback=?', {
      entity: 'album',
      term: term,
      // country: 'my',
      // limit: 5,
      explicit: 'Y'
    })
    .done(data => {
      data.results.forEach(result => {
        result.artworks = {
          s:  result.artworkUrl60,
          m:  result.artworkUrl100,
          l:  result.artworkUrl100,
          xl: result.artworkUrl100
        };
        result.artworks.l  = result.artworkUrl100.replace('100x100', '600x600');
        result.artworks.xl = result.artworkUrl100.replace('100x100bb', '100000x100000-999');
        let url = new URL(result.artworks.xl)
    		result.artworks.xl = 'http://is5.mzstatic.com' + url.pathname;
      });

      this.setState({ results: data.results });
      this.setState({ isLoading: false });
      !this.state.initialized && this.setState({ initialized: true });
    })
    .fail(function(err) {
      console.log('Fetch Error :-S', err);
      this.setState({ isLoading: false });
    });
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.runSearch()
      // console.log('do validate');
    }
  }

  componentDidMount() {
    $('.search-box').focus()
    this.runSearch();
  }

  render() {
    const { results } = this.state;

    let hasResults = results !== undefined && results.length > 0

    return (
      <div className="container py-3">
        {/* {this.state.isLoading && <Pace color="#27ae60"/>} */}
        <section className="search-bar">
          {/* <DebounceInput
            className="search-box"
            minLength={2}
            debounceTimeout={500}
            value={this.state.searchText}
            onChange={e => {
              this.setState({ searchText: e.target.value });
              this.runSearch();
            }}
            placeholder="Search Albums" /> */}

          <input
            className="search-box"
            value={this.state.searchText}
            onChange={e => { this.setState({ searchText: e.target.value })}}
            onKeyPress={this._handleKeyPress.bind(this)}
            placeholder="Search Albums" />

          <span className={cn('search-help', { show: this.state.searchText.length > 0 })}>
            Press enter to search.{' '}
            {!hasResults && <span className="no-result">No result. Try another keyword.</span>}
          </span>
        </section>

        <section className="results">
          {hasResults &&
            results.map(result =>
              <Result result={result} key={result.collectionId} />
            )
          }
        </section>
      </div>
    );
  }
}

export default App;
