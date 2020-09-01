import React from 'react';
import PropTypes from 'prop-types';
import ArrayGraphCSS from './ArrayGraph.module.css';

const ArrayGraph = ({ itemList, setRefs }) => {

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
                      style={{ height: `${computedHeight}%` }}
                    />
                );
            })
        }
    </div>
  );
}

ArrayGraph.propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.number).isRequired,
    setRefs: PropTypes.func.isRequired
};

export default ArrayGraph;