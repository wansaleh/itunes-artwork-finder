import { observable, computed, action } from 'mobx';
import $ from "jquery";

class MainStore {
  @observable initialized = false;
  @observable results = [];
  @observable searchText = '';
  @observable searchCountry = 'us';
  @observable isLoading = false;

  @action runSearch = () => {
    if (this.searchText === '') return;

    // this.results = [];
    this.isLoading = true;

    $.getJSON('https://itunes.apple.com/search?callback=?', {
      entity: 'album',
      term: this.searchText,
      country: this.searchCountry,
      // limit: 200,
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

      this.results = data.results;
      this.isLoading = false;
      if (!this.initialized) this.initialized = true;
    })
    .fail(function(err) {
      console.log('Fetch Error :-S', err);
      this.isLoading = false;
    });
  }

  @computed get sortedResults() {
    const key = 'releaseDate';

    return this.results.sort((a, b) => {
      const valA = String(a[key]).toUpperCase(); // ignore upper and lowercase
      const valB = String(b[key]).toUpperCase(); // ignore upper and lowercase

      if (valA < valB) {
        return -1;
      }
      if (valA > valB) {
        return 1;
      }
      return 0;
    }).reverse();
  }

  @action reset() {
    this.results = [];
    this.searchText = '';
    this.isLoading = false;
  }
}

const mainStore = new MainStore();

export { mainStore };
