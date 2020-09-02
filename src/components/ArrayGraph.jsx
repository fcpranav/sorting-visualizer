import React from 'react';
import PropTypes from 'prop-types';
import ArrayGraphCSS from './ArrayGraph.module.css';

class ArrayGraph extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      props: null,
      sortedVisual: false
    }
  }

  componentDidMount() {
    this.setState({props: this.props, sortedVisual: false})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.props && prevState.props.animating === true && nextProps.animating === false) {
      return { props: nextProps, sortedVisual: true }
    } else {
      return { props: nextProps, sortedVisual: false }
    };
  }

  render() {
    let { itemList, setRefs } = this.props;
    let { sortedVisual } = this.state;

    let max = 0;
    
    for (let num of itemList) {
      if (num > max) {
          max = num;
      }
    };

    return (
      <div className={`${ArrayGraphCSS.graph} my-3 d-flex justify-content-center`}>
          {
              itemList.map((value, index) => {

                  const computedHeight = value/max * 100;

                  return (
                      <div 
                        key={index}
                        ref={(ref) => setRefs(ref, index)}
                        className={ArrayGraphCSS.bar}
                        style={{ 
                          height: `${computedHeight}%`, 
                          backgroundColor: (sortedVisual ? "#009f75" : "#818182")
                        }}
                      />
                  );
              })
          }
      </div>
    );
  }
}

ArrayGraph.propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.number).isRequired,
    animating: PropTypes.bool.isRequired,
    setRefs: PropTypes.func.isRequired
};

export default ArrayGraph;