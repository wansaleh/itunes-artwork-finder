import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import classnames from 'classnames'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import { MdCancel } from 'react-icons/lib/md'
import Select from 'react-select'
import MDSpinner from "react-md-spinner"

import countries from './countries'
import Results from './results'

@inject('router', 'main')
class Home extends Component {
  constructor(props) {
		super(props)
		this.store = this.props.main
	}

  componentDidMount() {
    this.store.resetSearch()
  }

  render() {
    return null
  }
}

@inject('router', 'main')
@withRouter
@observer
class App extends Component {
  constructor(props) {
		super(props)
		this.store = this.props.main
	}

  _handleKey(e) {
    if (e.key === 'Enter') {
      this.props.router.push(`/${this.store.searchCountry}/${this.store.searchTerm}`)
      this.store.runSearch()
    }
    if (e.key === 'Escape') {
      this.store.resetSearch()
    }
  }

  _changeCountry(val) {
    this.store.searchCountry = val.value
    this.props.router.push(`/${this.store.searchCountry}/${this.store.searchTerm}`)
    this.store.runSearch()
  }

  _searchCancel() {
    this.store.resetSearch()
  }

  componentDidMount() {
    // $('.search-box').focus()
    this.store.runSearch()
  }

  _renderSearchBar() {
    return (
      <div className={classnames('container py-3 header', {'has-results': this.store.hasResults})}>
        <div className="row">
          <div className="col-md-5 left">
            <h1 className="app-title">
              <Link to="/">
                iTunes<br />Artworks<br />Finder
              </Link>
            </h1>
          </div>

          <div className="col-md-7 right">
            <div className='search-bar'>
              <InputGroup className="search-box">
                <Input
                  value={this.store.searchTerm}
                  onChange={e => { this.store.searchTerm = e.target.value }}
                  onKeyDown={this._handleKey.bind(this)}
                  placeholder="Search Albums" />
                <InputGroupAddon hidden={this.store.searchTerm.length === 0}>
                  <MDSpinner
                    className={classnames('spinner', {show: this.store.isLoading})}
                    size={26}
                    hidden={!this.store.isLoading} />
                  <Button
                    className={classnames('cancel', {show: !this.store.isLoading})}
                    onClick={this._searchCancel.bind(this)}>
                    <MdCancel size={30} />
                  </Button>
                </InputGroupAddon>
              </InputGroup>

              <Select
                name='country'
                placeholder='Country'
                value={this.store.searchCountry}
                options={countries}
                onChange={this._changeCountry.bind(this)} />

              {/* <span className={cn('search-help', { show: this.store.searchTerm.length > 0 })}>
                Press enter to search.{' '}
                {!hasResults && <span className='no-result'>No result. Try another keyword.</span>}
              </span> */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this._renderSearchBar()}
        <Route exact path="/" component={Home} />
        <Route exact path="/:country/:term" component={Results} />
      </div>
    )
  }
}

export default App
