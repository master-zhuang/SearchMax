/**
 * Created by zhuangxk on 1/12/16.
 */

var PER_PAGE = 5;
var START_PAGE = 1;

var SearchBox = React.createClass({

    getInitialState: function() {
        return {data: [], search:{} };
    },

    loadSearchFromServer: function() {
       this.handleSearchSubmit({query:'', start_page:START_PAGE, per_page:PER_PAGE})
    },

    handleSearchSubmit: function(search) {
        search.sid = Date.now();
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'GET',
          data: search,
          success: function(data) {
            this.setState({data: data, search:search});
              console.log({"ajax_return":this.state});
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
                <SearchResult data={this.state.data} search={this.state.search} onPageSubmit={this.handleSearchSubmit}/>
            </div>
        );
    }

});


var SearchBanner = React.createClass({

    getInitialState: function () {
            return {query:'', start_page:START_PAGE, per_page:PER_PAGE};
        },

    handleTextChange: function (e) {
            this.setState({query:e.target.value});
        },

    handlerEnterSubmit: function(event){
         if(event.keyCode == 13){
            this.handleSubmit(event);
         }
     },

    handleSubmit: function (e) {
        e.preventDefault();
        this.setState({start_page:START_PAGE});
        if (!this.state.query.trim()) {
            return;
        }
        this.props.onSearchSubmit(this.state);
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
                    <SearchPagination search={this.props.search} onPageSubmit={this.props.onPageSubmit}/>
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


var Paginator = React.createClass({
    propTypes: {
        max: React.PropTypes.number.isRequired,
        maxVisible: React.PropTypes.number,
        onChange: React.PropTypes.func.isRequired
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
            this.props.onChange(this.state.currentPage);
        }
    },
    getDefaultProps: function() {
        return {
            maxVisible: 5
        };
    },
    getInitialState: function() {
        return {
            currentPage: this.props.currentPage
        };
    },
    goTo: function(page) {
        this.setState({currentPage: page});
    },
    onClickNext: function() {
        var page = this.state.currentPage;
        if (page < this.props.max) {
            this.goTo(page + 1);
        }
    },
    onClickPrev: function() {
        if (this.state.currentPage > 1) {
            this.goTo(this.state.currentPage - 1);
        }
    },
    render: function() {
        var className = this.props.className || '',
            p = this.props,
            s = this.state,
            skip = 0;

        if (s.currentPage > p.maxVisible - 1 && s.currentPage < p.max) {
            skip = s.currentPage - p.maxVisible + 1;
        } else if (s.currentPage === p.max) {
            skip = s.currentPage - p.maxVisible;
        }

        var iterator = Array.apply(null, Array(p.maxVisible)).map(function(v, i) {
            return skip + i + 1;
        });

        return (
            <nav>
                <ul className={'pagination ' + className}>
                    <li className={s.currentPage === 1 ? 'disabled' : ''}>
                        <a href="#" onClick={this.onClickPrev}>
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Prev</span>
                        </a>
                    </li>
                    {iterator.map(function(page) {
                        return (
                            <li key={page}
                                onClick={this.goTo.bind(this, page)}
                                className={s.currentPage === page ? 'active' : ''}>
                                <a href="#">{page}</a>
                            </li>
                        );
                    }, this)}
                    <li className={s.currentPage === p.max ? 'disabled' : ''}>
                        <a href="#" onClick={this.onClickNext}>
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
});


var SearchPagination = React.createClass({

    getInitialState: function() {
        return {
            search: this.props.search
        };
    },

    onChangePage: function(page) {
        this.state.search.start_page = page;
        console.log(this.state.search);
        this.props.onPageSubmit(this.state.search);
    },

    render: function() {
        return (
            <div>
                <Paginator max={10} onChange={this.onChangePage} currentPage={this.state.search.start_page}/>
            </div>
        );
    }

});


ReactDOM.render(

  <SearchBox url="/api/search" call_interval={3600000} />,
  document.getElementById('search-box')

);