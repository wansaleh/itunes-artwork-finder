import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import cn from 'classnames';
import _ from 'lodash';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';
import { MdCancel } from 'react-icons/lib/md';
import Select from 'react-select';

import countries from './countries';
import Result from './result';

import 'react-select/dist/react-select.css';
import './app.scss';

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }


  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.store.runSearch();
    }
  }

  _changeCountry(val) {
    this.store.searchCountry = val.value;
    this.store.runSearch();
  }

  _searchCancel() {
    this.store.reset();
  }

  componentDidMount() {
    // $('.search-box').focus()
    this.store.runSearch();
  }

  _renderSearchBar() {
    const optionCountries = _.map(countries, (name, code) => {
      return { value: code, label: name };
    });

    return (
      <div className='container py-3'>
        <section className='search-bar'>
          <InputGroup className="search-box">
            <Input
              value={this.store.searchText}
              onChange={e => { this.store.searchText = e.target.value }}
              onKeyPress={this._handleKeyPress.bind(this)}
              placeholder="Search Albums" />
            <InputGroupButton hidden={this.store.searchText.length === 0}>
              <Button onClick={this._searchCancel.bind(this)}><MdCancel size={30} /></Button>
            </InputGroupButton>
          </InputGroup>
          <Select
            name='country'
            placeholder='Country'
            value={this.store.searchCountry}
            options={optionCountries}
            onChange={this._changeCountry.bind(this)} />

          {/* <span className={cn('search-help', { show: this.store.searchText.length > 0 })}>
            Press enter to search.{' '}
            {!hasResults && <span className='no-result'>No result. Try another keyword.</span>}
          </span> */}
        </section>
      </div>
    );
  }

  render() {
    // const results = this.store.results;
    const results = this.store.sortedResults;
    const hasResults = results.length > 0;

    return (
      <div>
        {this._renderSearchBar()}
        <div className='container py-3'>
          <section className='results'>
            {hasResults ? (
              results.map(result =>
                <Result result={result} key={result.collectionId} />
              )
            ) : (
              <div className="no-result">
                No results.
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
