import React from 'react';
import ArrayGraph from './components/ArrayGraph';
import './SortingVisualizer.css';
import { quickSort } from './sortingAlgorithms';

class SortingVisualizer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      initialArray: [],
      sortedArray: [],
    }

    this.graphRefs = [];
    this.handleGenerateArray = this.handleGenerateArray.bind(this);
    this.handleQuickSort = this.handleQuickSort.bind(this);
    this.setRefs = this.setRefs.bind(this);
    this.handleAnimation = this.handleAnimation.bind(this);
  }

  setRefs(ref, index) {
    this.graphRefs[index] = ref;
  }

  handleGenerateArray(length) {
    let generatedArray = [];

    for (let i = 0; i < length; i++) {
      generatedArray.push(Math.ceil(Math.random() * length));
    };

    this.setState({ initialArray: generatedArray });
  }

  handleQuickSort() { 
    var arrayToSort = [...this.state.initialArray];
    var animationList = [];
    quickSort(arrayToSort, 0, arrayToSort.length - 1, animationList);
    this.handleAnimation(animationList);
  }

  handleAnimation(animationList) {
    var graphRefs = this.graphRefs;
    var id = setInterval(function(){

      let animation = animationList.shift();

      if (animation === undefined) {
        clearInterval(id);
      }
      else if (animation[0] === "swap") {
        let swapOne = animation[1];
        let swapTwo = animation[2];

        let temp = graphRefs[swapOne].style.height;
        graphRefs[swapOne].style.height = graphRefs[swapTwo].style.height;
        graphRefs[swapTwo].style.height = temp;
      }
    }, 20)
  }

  componentDidMount() {
    this.handleGenerateArray(150);
  }

  render () {
    return (
      <div className="container">
        <h1> Sorting Visualizer </h1>

        <div className="controlPanel">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.handleGenerateArray(150)}
          >
            Generate Random Array
          </button>

          <button 
            type="button"
            className="btn btn-primary ml-2"
            onClick={this.handleQuickSort}
          >
            Quick Sort
          </button>
        </div>
        
        <ArrayGraph 
          itemList={this.state.initialArray}
          setRefs={this.setRefs}
        /> 
      </div>
    );
  };
}

export default SortingVisualizer;
