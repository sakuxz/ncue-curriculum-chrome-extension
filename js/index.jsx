import React from 'react'
import { render } from 'react-dom'


require('index.scss');

// data: [
//   {
//     name: '計算機圖學',
//     place: '電腦教室',
//     dpt: "資工系",
//     week: "二",
//     pos: "02-04"
//   },
//   {
//     name: '資料探勘',
//     place: '33305',
//     dpt: "資工系",
//     week: "二",
//     pos: "01-03"
//   }
// ]

var Course = React.createClass({
  getInitialState: function() {
    return {
      unit: 0
    }
  },
  render: function() {
    var topOffset = ( parseInt(this.props.data.pos.slice(0,2)) >= 5 )?parseInt(this.props.data.pos.slice(0,2))+1:parseInt(this.props.data.pos.slice(0,2));
    var bottomOffset = ( parseInt(this.props.data.pos.slice(3,5)) >= 5 )?parseInt(this.props.data.pos.slice(3,5))+1:parseInt(this.props.data.pos.slice(3,5));
    return (
      <div className="course" onClick={this.deleteCourse} style={{
          top: this.state.unit * ( topOffset -1 ),
          height: this.state.unit * ( bottomOffset +1 - topOffset ),
        }}>
        <h5>{this.props.data.name}</h5>
        <p>
          {this.props.data.place}
        </p>
        <span>
          {this.props.data.dpt[0]}
        </span>
      </div>
    );
  },
  deleteCourse: function(e) {
    this.props.delete(this.props.data);
  },
  componentDidMount: function() {
    this.setState({
      unit: $(".schedule .time-boble:first-child")[0].offsetHeight
    });
  }
});

var DaySheet = React.createClass({
  render: function() {
    return (
      <div>
        {
          this.props.data.map(function(e, i) {
            return <Course delete={this.props.delete} data={e} key={i} />;
          }.bind(this))
        }
      </div>
    );
  }
});

var Schedule = React.createClass({
  getInitialState: function() {
    return {
      open: false,
      data: [
      ]
    };
  },
  render: function() {
    var days = [];
    var week = ['一','二','三','四','五'];
    for (var i = 0; i < 5; i++) {
      let t = this.state.data.filter(function(e, ind) {
        if(e.week === week[i])
          return true;
        else
          return false;
      });
      days.push(<DaySheet delete={this.delete} data={t} key={i} />);
    }
    return (
      <div className={(this.state.open)?"schedule-ctn open":"schedule-ctn"} >
        <div className="hint" ><i className="material-icons">error_outline</i>點擊課程可以取消</div>
        <div className="btn" onClick={this.toggleOpen} ><i className="material-icons">event</i></div>
        <div className="schedule">
          <div>
            <div className="time-boble" ref="block">
              1
            </div>
            <div className="time-boble">
              2
            </div>
            <div className="time-boble">
              3
            </div>
            <div className="time-boble">
              4
            </div>
            <div className="time-boble" style={{fontFamily:'微軟正黑體'}}>
              吃飯
            </div>
            <div className="time-boble">
              5
            </div>
            <div className="time-boble">
              6
            </div>
            <div className="time-boble">
              7
            </div>
            <div className="time-boble">
              8
            </div>
            <div className="time-boble">
              9
            </div>
            <div className="time-boble">
              10
            </div>
            <div className="time-boble">
              11
            </div>
            <div className="time-boble">
              12
            </div>
          </div>
          {days}
        </div>
      </div>
    );
  },
  firstOpen: true,
  toggleOpen: function() {
    this.setState({
      open: (this.state.open)?false:true
    });
    if(this.firstOpen){
      this.firstOpen = false;
      $('.hint').css('animation','hint-in-out 3s 0.5s');
    }
  },
  delete: function(data) {
    this.state.data = this.state.data.filter(function(e, i) {
      if(e.name === data.name && e.pos === data.pos){
        return false;
      }else{
        return true;
      }
    });
    this.setState({
      data: this.state.data
    });
  },
  componentDidMount: function() {
    $('#result').delegate('#table1 > tbody > tr', "click", function(event) {
      var t = {};
      t.dpt = $("td:nth-child(3)", event.currentTarget).text();
      t.name = $("td:nth-child(4)", event.currentTarget).text();
      var d = $("td:nth-child(12)", event.currentTarget).text();
      t.week = d[1];
      t.pos = d.slice(4,9);
      t.place = d.slice(10).trim();
      var duplicate = false;
      this.state.data.forEach(function(e, i) {
        if(e.name === t.name && e.pos === t.pos){
          duplicate = true;
        }
      });
      if(duplicate) return;
      this.state.data.push(t);
      this.setState({
        data: this.state.data
      });
    }.bind(this));

  }
});

$('body').append('<div class="schedule-container"></div>')

render(
  <Schedule />, document.querySelector(".schedule-container"));
