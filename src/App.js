import React from 'react';
import './App.css';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCategory: '',
      searchFor: '',
      articles: [],
    };
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
  }
  search(){
    let query = document.getElementById("searchBar").value;
    this.setState({searchFor: query});
    this.getNews();
  }

  setCategory(cat){
    this.setState(() => { return {selectedCategory: cat}; });
    let query = document.getElementById("searchBar").value;
    this.setState((state) => { return {searchFor: document.getElementById("searchBar").value};});
    this.getNews(query, cat);
  }

  clear(){
    document.getElementById("searchBar").value = '';
  }


  getNews = async (query, cat) => {
    let url;
    if(query.length === 0){
      url =`https://newsapi.org/v2/top-headlines?category=${cat}&pageSize=50&apiKey=78b9d599c4f94f8fa3afb1a5458928d6`;

    }
    else
      url =`https://newsapi.org/v2/top-headlines?category=${cat}&q=${query}&pageSize=50&apiKey=78b9d599c4f94f8fa3afb1a5458928d6`;

    const apiCall = await fetch(url);
    const res = await apiCall.json();
    this.setState((state) => {return {articles: res.articles};});
  }



  render() {
    let entClass = this.state.selectedCategory === 'entertainment'? 'enable' : 'disable';
    let techClass = this.state.selectedCategory === 'technology'? 'enable' : 'disable';
    let sportsClass = this.state.selectedCategory === 'sports'? 'enable' : 'disable';
    let firstSearch = this.state.selectedCategory === '';
    let noArticles = this.state.articles.length === 0 && !firstSearch;
    return (
      <div className="App">
        <div class="header">
          <h2>n e w s</h2>
        </div>
        <div class="input-field">
          <input type="text" id="searchBar" placeholder="what's on your mind?"></input>
          
          <button id="clear-button" onClick={this.clear}>clear</button>
          <br></br>
          <button class={'topic-button ' + entClass} id="entertainment" onClick={ () => this.setCategory('entertainment')}>entertainment</button>
          <button class={'topic-button ' + techClass} id="technology" onClick={() => this.setCategory('technology')}>technology</button>
          <button class={'topic-button ' + sportsClass} id="sports" onClick={() => this.setCategory('sports')}>sports</button>
        </div>
        {firstSearch === true && <h3>search for something and select a category to get surfin'</h3>}
        {noArticles === true && <h3>nothing to see here...</h3>}

        <div class="container">
          {this.state.articles.map((article)=>(
            <div>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{article.title}</h5>
                <p class="card-text"><small class="text-muted">Published by {article.source.name} on {(new Date(article.publishedAt)).toDateString()}</small></p>
                <p class="card-description">{article.description || ''}</p>
                <a href={article.url} target="_blank" rel="noreferrer"  class="btn btn-secondary">Read More</a>
              </div>
              {article.urlToImage &&
                    <img class="card-img-bottom" src={article.urlToImage} alt="pic associated with news"></img>
              }
            </div>
            <br></br>
            </div>
          ))}
        </div>        
      </div>
    );
  }
}
export default App;







