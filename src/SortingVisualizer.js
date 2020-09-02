import React from 'react';
import ArrayGraph from './components/ArrayGraph';
import './SortingVisualizer.css';
import { quickSort } from './sortingAlgorithms';

class SortingVisualizer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      targetArray: [],
      animating: false,
    }

    this.graphRefs = [];
    this.handleGenerateArray = this.handleGenerateArray.bind(this);
    this.handleQuickSort = this.handleQuickSort.bind(this);
    this.setRefs = this.setRefs.bind(this);
    this.handleAnimation = this.animateSortAndUpdateState.bind(this);
  }

  setRefs(ref, index) {
    this.graphRefs[index] = ref;
  }

  handleGenerateArray(length) {
    let generatedArray = [];

    for (let i = 0; i < length; i++) {
      generatedArray.push(Math.ceil(Math.random() * length));
    };

    this.setState({ targetArray: generatedArray });
  }

  handleQuickSort() { 
    var sortingArray = [...this.state.targetArray];
    var animationList = [];
    quickSort(sortingArray, 0, sortingArray.length - 1, animationList);

    this.setState({ animating: true }, () => {
      this.animateSortAndUpdateState(animationList, sortingArray);
    })
  }

  animateSortAndUpdateState(animationList, sortedArray) {
    var context = this;
    var id = setInterval(function(){

      // Pop off current animation
      let animation = animationList.shift();

      // Expect certain animation types, each with specific arguments
      if (animation === undefined) {
        context.setState({ targetArray: sortedArray, animating: false })
        clearInterval(id);
      }
      else if (animation[0] === "swap") {
        let swapOne = animation[1];
        let swapTwo = animation[2];
        let barOneHeight = context.graphRefs[swapOne].style.height;

        context.graphRefs[swapOne].style.height = context.graphRefs[swapTwo].style.height;
        context.graphRefs[swapTwo].style.height = barOneHeight;
      }
      else if (animation[0] === "color") {
        let targetBar = animation[1];
        let colorHex = animation[2];

        context.graphRefs[targetBar].style.backgroundColor = colorHex;
      }
    }, 10)
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
            disabled={this.state.animating}
          >
            Generate Random Array
          </button>

          <button 
            type="button"
            className="btn btn-primary ml-2"
            onClick={this.handleQuickSort}
            disabled={this.state.animating}
          >
            Quick Sort
          </button>
        </div>
        
        <ArrayGraph 
          itemList={this.state.targetArray}
          setRefs={this.setRefs}
        /> 
      </div>
    );
  };
}

export default SortingVisualizer;
