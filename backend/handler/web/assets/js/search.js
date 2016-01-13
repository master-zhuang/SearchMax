/**
 * Created by zhuangxk on 1/12/16.
 */


var SearchBox = React.createClass({

    getInitialState: function() {
        return {data: []};
    },

    loadSearchFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleSearchSubmit: function(search) {
        search.id = Date.now();
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'GET',
          data: search,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },

    componentDidMount: function () {
        this.loadSearchFromServer();
        setInterval(this.loadSearchFromServer, this.props.call_interval);
    },

    render: function() {
        return (
            <div>
                <SearchBanner onSearchSubmit={this.handleSearchSubmit}/>
                <SearchResult data={this.state.data}/>
            </div>
        );
    }

});


var SearchBanner = React.createClass({

    getInitialState: function () {
            return {query: ''};
        },

    handleTextChange: function (e) {
            this.setState({query: e.target.value});
        },

    handlerEnterSubmit: function(event){
         if(event.keyCode == 13){
            this.handleSubmit(event);
         }
     },

    handleSubmit: function (e) {
        e.preventDefault();
        var query_str = this.state.query.trim();
        if (!query_str) {
            return;
        }
        this.props.onSearchSubmit({query: query_str});
        //this.setState({query: ''});
    },

    render: function() {
        return (
            <div className="search-block-v2">
            <div className="container">
                <div className="col-md-6 col-md-offset-3">
                    <h2>Just Search</h2>
                    <div className="input-group">
                        <input className="form-control"
                               placeholder="Search words with regular expressions ..."
                               value={this.state.query}
                               onChange={this.handleTextChange}
                               onKeyDown={this.handlerEnterSubmit}
                               type="text"/>
                        <span className="input-group-btn">
                            <button className="btn-u"
                                    type="button"
                                    onClick={this.handleSubmit}>
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
                    </div>

                </div>
            </div>
          </div>
        );
    }

});


var SearchResult = React.createClass({

  render: function() {
    return (
        <div className="container s-results margin-bottom-50">
            <div className="row">
                <div className="col-md-2 hidden-xs related-search">
                    <SearchRelated/>
                </div>
                <div className="col-md-10">
                    <SearchList data={this.props.data}/>
                    <SearchPagination/>
                </div>
            </div>
        </div>
    );
  }

});


var SearchRelated = React.createClass({

  render: function() {
    return (
            <div className="row">
               	<div className="col-md-12 col-sm-4">
                    <h3>Related searches</h3>
                    <ul className="list-unstyled">
                        <li><a href="#">Web design company</a></li>
                        <li><a href="#">Web design tutorials</a></li>
                        <li><a href="#">Self designing</a></li>
                    </ul>
                    <hr/>
                </div>

                <div className="col-md-12 col-sm-4">
                    <h3>Tutorials</h3>
                    <ul className="list-unstyled">
                        <li><a href="#">Basic Concepts</a></li>
                        <li><a href="#">‎Building your first web page</a></li>
                        <li><a href="#">‎Advanced HTML</a></li>
                    </ul>
                    <hr/>
                </div>

                <div className="col-md-12 col-sm-4">
                    <h3>Trending topics</h3>
                    <ul className="list-unstyled">
                        <li><a href="#">Bootstrap</a></li>
                        <li><a href="#">Wrapbootstrap</a></li>
                        <li><a href="#">Codrops</a></li>
                    </ul>
                    <hr/>
                </div>

                <div className="col-md-12 col-sm-4">
                    <h3>Search history</h3>
                    <ul className="list-unstyled">
                        <li><a href="#">Web design articles</a></li>
                        <li><a href="#">Tutorials for web design</a></li>
                    </ul>
                    <a className="see-all" href="#">See all</a>
                    <hr/>
                </div>
                <div className="col-md-12 col-sm-4">
                    <h3>Related pictures</h3>
                    <ul className="list-unstyled blog-photos margin-bottom-30">
                        <li><a href="#"><img src="assets/img/sliders/elastislide/5.jpg" alt="" className="hover-effect"/></a></li>
                        <li><a href="#"><img src="assets/img/sliders/elastislide/6.jpg" alt="" className="hover-effect"/></a></li>
                        <li><a href="#"><img src="assets/img/sliders/elastislide/8.jpg" alt="" className="hover-effect"/></a></li>
                        <li><a href="#"><img src="assets/img/sliders/elastislide/10.jpg" alt="" className="hover-effect"/></a></li>
                        <li><a href="#"><img src="assets/img/sliders/elastislide/11.jpg" alt="" className="hover-effect"/></a></li>
                        <li><a href="#"><img src="assets/img/sliders/elastislide/1.jpg" alt="" className="hover-effect"/></a></li>
                        <li><a href="#"><img src="assets/img/sliders/elastislide/2.jpg" alt="" className="hover-effect"/></a></li>
                        <li><a href="#"><img src="assets/img/sliders/elastislide/7.jpg" alt="" className="hover-effect"/></a></li>
                    </ul>
                </div>
            </div>
    );
  }

});


var SearchList = React.createClass({

    render: function() {
        var searchNodes = this.props.data.map(function(search) {
          return (
            <SearchItem title={search.title} desc={search.desc} />
          );
        });
        console.log(this.props.data);
    return (
        <div>
            <span className="results-number">共计3345个职位，耗时0.023秒</span>
            {searchNodes}
            <div className="margin-bottom-30"></div>
        </div>

    );
  }

});


var SearchItem = React.createClass({

  render: function() {
    return (
      <div className="inner-results">
            <h3><a href="#">{this.props.title}</a></h3>
            <ul className="list-inline up-ul">
                <li>en.wikipedia.org/wiki/Web_design‎</li>
                <li className="btn-group">
                    <button data-toggle="dropdown" className="btn btn-default dropdown-toggle" type="button">
                        More<i className="fa fa-caret-down margin-left-5"></i>
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <ul role="menu" className="dropdown-menu">
                        <li><a href="#">Share</a></li>
                        <li><a href="#">Similar</a></li>
                        <li><a href="#">Advanced search</a></li>
                    </ul>
                </li>
                <li><a href="#">Wrapbootstrap</a></li>
                <li><a href="#">Dribbble</a></li>
            </ul>
            <p>{this.props.desc} </p>
            <ul className="list-inline down-ul">
                <li>
                    <ul className="list-inline star-vote">
                        <li><i className="color-green fa fa-star"></i></li>
                        <li><i className="color-green fa fa-star"></i></li>
                        <li><i className="color-green fa fa-star"></i></li>
                        <li><i className="color-green fa fa-star"></i></li>
                        <li><i className="color-green fa fa-star-half-o"></i></li>
                    </ul>
                </li>
                <li>3 years ago - By Anthon Brandley</li>
                <li>234,034 views</li>
                <li><a href="#">Web designer</a></li>
            </ul>
             <hr/>
         </div>
    );
  }

});


var SearchPagination = React.createClass({

  render: function() {
    return (
        <div className="text-left">
            <ul className="pagination">
                <li><a href="#">«</a></li>
                <li className="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">6</a></li>
                <li><a href="#">7</a></li>
                <li><a href="#">8</a></li>
                <li><a href="#">9</a></li>
                <li><a href="#">10</a></li>
                <li><a href="#">...</a></li>
                <li><a href="#">199</a></li>
                <li><a href="#">200</a></li>
                <li><a href="#">»</a></li>
            </ul>
        </div>
    );
  }

});


ReactDOM.render(

  <SearchBox url="/api/search" call_interval={3600000} />,
  document.getElementById('search-box')

);







