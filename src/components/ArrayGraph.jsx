import React from 'react';
import PropTypes from 'prop-types';
import ArrayGraphCSS from './ArrayGraph.module.css';
import { getMaxInArray } from '../util';

class ArrayGraph extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      props: props,
      syncDOM: false,
      postSort: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps === prevState.props) {
      return null;
    }

    if (prevState.props.animating === true && nextProps.animating === false) {
      return { props: nextProps, syncDOM: true, postSort: true }
    } else {
      return { props: nextProps, syncDOM: false, postSort: false }
    };
  }

  componentDidUpdate() {
    if (this.state.syncDOM === true) {
      this.setState({ syncDOM: false });
    }
  }

  render() {
    let { itemList, setRefs } = this.props;
    let { postSort, syncDOM } = this.state;

    let max = getMaxInArray(itemList);

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
                          height: (syncDOM ? "0%" : `${computedHeight}%`), 
                          backgroundColor: (postSort ? "#009f75" : "#818182")
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