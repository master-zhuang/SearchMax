/**
 * Created by zhuangxk on 1/12/16.
 */


var SearchBox = React.createClass({

  render: function() {
    return (
      <h1>
        This is the search box !
      </h1>
    );
  }

});


var SearchBlock = React.createClass({

  render: function() {
    return (
      <div className="">

      </div>
    );
  }

});


var SearchResult = React.createClass({

  render: function() {
    return (
      <div className="">

      </div>
    );
  }

});


var SearchRelate = React.createClass({

  render: function() {
    return (
      <div className="">

      </div>
    );
  }

});


var SearchContent = React.createClass({

  render: function() {
    return (
      <div className="">

      </div>
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
      <div className="">

      </div>
    );
  }

});

ReactDOM.render(
  <SearchBox url="/api/comments" pollInterval={3600000} />,
  document.getElementById('search-box')
);







