/**
 * Created by zhuangxk on 1/12/16.
 */


var SearchBox = React.createClass({

    handleSearchSubmit: function(search) {
    var searchs = this.state.data;
    // Optimistically set an id on the new search. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    search.id = Date.now();
    var newsearchs = searchs.concat([search]);
    this.setState({data: newsearchs});
        console.log(newsearchs);
        console.log(this.props.url);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      data: search,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: searchs});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
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
            return {text: ''};
        },

    handleTextChange:
        function (e) {
            this.setState({text: e.target.value});
        },

    handleSubmit: function (e) {
        e.preventDefault();
        var text_v = this.state.text.trim();
        if (!text_v) {
            return;
        }
        console.log(text_v);
        console.log({text: text_v});
        this.props.onSearchSubmit({text: text_v});
        this.setState({text: ''});
    },

  render: function() {
    return (
        <div class="search-block-v2">
        <div class="container">
            <div class="col-md-6 col-md-offset-3">
                <h2>立即搜索</h2>
                 <form onSubmit={this.handleSubmit}>
                    <input
                      type="text"
                      placeholder="Say something..."
                      value={this.state.text}
                      onChange={this.handleTextChange}
                    />
                    <input type="submit" value="Search" />
                 </form>
            </div>
        </div>
      </div>
    );
  }

});


var SearchResult = React.createClass({

  render: function() {
    return (
    <div class="container s-results margin-bottom-50">
        <div class="row">
            <SearchRelated/>
            <div class="col-md-10">
                <span class="results-number">共计3345个职位，耗时0.023秒</span>
            <SearchList/>
            <div class="margin-bottom-30"></div>
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
                    <div class="col-md-2 hidden-xs related-search">
                <div class="row">
                    <div class="col-md-12 col-sm-4">
                        <h3>相关搜索 </h3>
                        <ul class="list-unstyled">
                            <li><a href="#">Web 开发工程师</a></li>
                            <li><a href="#">JS工程师</a></li>
                            <li><a href="#">前端工程师</a></li>
                        </ul>
                        <hr>
                    </div>

                    <div class="col-md-12 col-sm-4">
                        <h3>Tutorials</h3>
                        <ul class="list-unstyled">
                            <li><a href="#">Basic Concepts</a></li>
                            <li><a href="#">‎Building your first web page</a></li>
                            <li><a href="#">‎Advanced HTML</a></li>
                        </ul>
                        <hr>
                    </div>

                    <div class="col-md-12 col-sm-4">
                        <h3>Trending topics</h3>
                        <ul class="list-unstyled">
                            <li><a href="#">Bootstrap</a></li>
                            <li><a href="#">Wrapbootstrap</a></li>
                            <li><a href="#">Codrops</a></li>
                        </ul>
                        <hr>
                    </div>

                    <div class="col-md-12 col-sm-4">
                        <h3>Search history</h3>
                        <ul class="list-unstyled">
                            <li><a href="#">Web design articles</a></li>
                            <li><a href="#">Tutorials for web design</a></li>
                        </ul>
                        <a class="see-all" href="#">See all</a>
                        <hr>
                    </div>

                    <div class="col-md-12 col-sm-4">
                        <h3>Related pictures</h3>
                        <ul class="list-unstyled blog-photos margin-bottom-30">
                            <li><a href="#"><img src="assets/img/sliders/elastislide/5.jpg" tppabs="http://htmlstream.com/preview/unify-v1.9/assets/img/sliders/elastislide/5.jpg" alt="" class="hover-effect"></a></li>
                            <li><a href="#"><img src="assets/img/sliders/elastislide/6.jpg" tppabs="http://htmlstream.com/preview/unify-v1.9/assets/img/sliders/elastislide/6.jpg" alt="" class="hover-effect"></a></li>
                            <li><a href="#"><img src="assets/img/sliders/elastislide/8.jpg" tppabs="http://htmlstream.com/preview/unify-v1.9/assets/img/sliders/elastislide/8.jpg" alt="" class="hover-effect"></a></li>
                            <li><a href="#"><img src="assets/img/sliders/elastislide/10.jpg" tppabs="http://htmlstream.com/preview/unify-v1.9/assets/img/sliders/elastislide/10.jpg" alt="" class="hover-effect"></a></li>
                            <li><a href="#"><img src="assets/img/sliders/elastislide/11.jpg" tppabs="http://htmlstream.com/preview/unify-v1.9/assets/img/sliders/elastislide/11.jpg" alt="" class="hover-effect"></a></li>
                            <li><a href="#"><img src="assets/img/sliders/elastislide/1.jpg" tppabs="http://htmlstream.com/preview/unify-v1.9/assets/img/sliders/elastislide/1.jpg" alt="" class="hover-effect"></a></li>
                            <li><a href="#"><img src="assets/img/sliders/elastislide/2.jpg" tppabs="http://htmlstream.com/preview/unify-v1.9/assets/img/sliders/elastislide/2.jpg" alt="" class="hover-effect"></a></li>
                            <li><a href="#"><img src="assets/img/sliders/elastislide/7.jpg" tppabs="http://htmlstream.com/preview/unify-v1.9/assets/img/sliders/elastislide/7.jpg" alt="" class="hover-effect"></a></li>
                        </ul>
                    </div>
                </div>
            </div><!--/col-md-2-->
    );
  }

});


var SearchList = React.createClass({

  render: function() {
    return (
          <!-- Begin Inner Results -->
            <div class="inner-results">
                <h3><a href="#">前端工程师</a></h3>
                <ul class="list-inline up-ul">
                    <li>en.wikipedia.org/wiki/Web_design‎</li>
                    <li><a href="#">Wrapbootstrap</a></li>
                    <li><a href="#">Dribbble</a></li>
                </ul>
                <!--<p>1.计算机等相关专业本科毕业，有5年以上前端开发工作经验 2. 精通JavaScript、html语法；熟悉TCP/IP、HTTP基本工作原理，及web常用开发工具； 3. 精通HTML5、CSS，熟悉页面架构和布局，对Web标准和标签语义化有深入理解; 4. 对Web前台的性能优化以及web常见漏洞有一定的理解和相关实践； 5. 丰富的Web前端架构经验，精通各种前端技术，对于Web性能问题的定位和解决有经验者更佳； 6. 对HTML5技术领域、新兴Web标准和Web发展趋势有良好洞察力和极高的关注度，有强烈的求知欲； 7. 有良好的团队合作能力，善于沟通，工作自主驱动，具备良好的问题定位分析能力。</p>-->
                <p>this is the content</p>
                <ul class="list-inline down-ul">
                    <li>
                        <ul class="list-inline star-vote">
                            <li><i class="color-green fa fa-star"></i></li>
                            <li><i class="color-green fa fa-star"></i></li>
                            <li><i class="color-green fa fa-star"></i></li>
                            <li><i class="color-green fa fa-star"></i></li>
                            <li><i class="color-green fa fa-star-half-o"></i></li>
                        </ul>
                    </li>
                    <li>3 天前 - 阿里巴巴</li>
                    <li>234,034 次查看</li>
                    <li><a href="#">Web designer</a></li>
                </ul>
            </div>
            <!-- Begin Inner Results -->

            <hr>

            <!-- Begin Inner Results -->
            <div class="inner-results">
                <h3><a href="#">Web Design - 1 - Introduction to Web Design</a></h3>
                <ul class="list-inline up-ul">
                    <li>thenewboston.org‎/webdesign-tutorials</li>
                    <li><a href="#">HTML/CSS</a></li>
                    <li><a href="#">Javascript</a></li>
                    <li><a href="#">PHP</a></li>
                </ul>
                <p>Lorem tempus in placerat non</p>
                <ul class="list-inline down-ul">
                    <li>
                        <ul class="list-inline star-vote">
                            <li><i class="color-green fa fa-star"></i></li>
                            <li><i class="color-green fa fa-star"></i></li>
                            <li><i class="color-green fa fa-star"></i></li>
                            <li><i class="color-green fa fa-star-o"></i></li>
                            <li><i class="color-green fa fa-star-o"></i></li>
                        </ul>
                    </li>
                    <li>2 years ago - By Bucky Roberts</li>
                    <li>594,184 views</li>
                    <li><a href="#">Videos &amp; Tutorials</a></li>
                </ul>
            </div>
            <!-- Begin Inner Results -->

            <hr>
    );
  }

});


var SearchItems = React.createClass({

  render: function() {
    return (
      <div className="">

      </div>
    );
  }

});


var SearchPagination = React.createClass({

  render: function() {
    return (
        <div class="text-left">
            <ul class="pagination">
                <li><a href="#">«</a></li>
                <li class="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">...</a></li>
                <li><a href="#">157</a></li>
                <li><a href="#">158</a></li>
                <li><a href="#">»</a></li>
            </ul>
        </div>
    );
  }

});

ReactDOM.render(
  <SearchBox url="/api/search" pollInterval={3600000} />,
  document.getElementById('search-box')
);







