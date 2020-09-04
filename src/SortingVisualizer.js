import React from 'react';
import ArrayGraph from './components/ArrayGraph';
import './SortingVisualizer.css';
import { quickSort, bubbleSort, mergeSort } from './sortingAlgorithms';
import { getMaxInArray, generateArray } from './util';

class SortingVisualizer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      targetArray: [],
      sortedArray: [],
      animating: false,
      animationIntervalId: null
    }

    this.graphRefs = [];
    this.handleGenerateArray = this.handleGenerateArray.bind(this);
    this.handleQuickSort = this.handleQuickSort.bind(this);
    this.handleBubbleSort = this.handleBubbleSort.bind(this);
    this.handleMergeSort = this.handleMergeSort.bind(this);
    this.setRefs = this.setRefs.bind(this);
    this.handleAnimation = this.animateSortAndUpdateState.bind(this);
  }

  setRefs(ref, index) {
    this.graphRefs[index] = ref;
  }

  handleGenerateArray(length) {
    this.setState({ targetArray: generateArray(length) });
  }

  handleSkipAnimation() {
    clearInterval(this.state.animationIntervalId);

    this.setState( state => ({ 
      targetArray: state.sortedArray, animating: false, animationIntervalId: null
    }));
  }

  handleQuickSort() { 
    var sortingArray = [...this.state.targetArray];
    var animationList = [];
    quickSort(sortingArray, 0, sortingArray.length - 1, animationList);

    this.setState({ animating: true, sortedArray: sortingArray }, () => {
      this.animateSortAndUpdateState(animationList);
    })
  }

  handleBubbleSort() { 
    var sortingArray = [...this.state.targetArray];
    var animationList = [];
    bubbleSort(sortingArray, animationList);

    this.setState({ animating: true, sortedArray: sortingArray }, () => {
      this.animateSortAndUpdateState(animationList);
    })
  }

  handleMergeSort() { 
    var sortingArray = [...this.state.targetArray];
    var animationList = [];

    mergeSort(sortingArray, 0, sortingArray.length - 1, animationList);

    this.setState({ animating: true, sortedArray: sortingArray }, () => {
      this.animateSortAndUpdateState(animationList);
    })
  }


  animateSortAndUpdateState(animationList) {
    var context = this;
    var maxVal = getMaxInArray(context.state.targetArray);
    var id = setInterval(function(){
      // Pop off current animation
      let animation = animationList.shift();

      // Expect certain animation types, each with specific arguments
      if (animation === undefined) {
        context.setState( state => ({ 
          targetArray: state.sortedArray, animating: false, animationIntervalId: null
        }))
        clearInterval(id);
      }
      else if (animation.type === "swap") {
        let { targetOne, targetTwo } = animation;
        let barOneHeight = context.graphRefs[targetOne].style.height;

        context.graphRefs[targetOne].style.height = context.graphRefs[targetTwo].style.height;
        context.graphRefs[targetTwo].style.height = barOneHeight;
      }
      else if (animation.type === "color") {
        let { targetBar, colorHex } = animation;

        context.graphRefs[targetBar].style.backgroundColor = colorHex;
      }
      else if (animation.type === "set") {
        let { targetBar, colorHex, barVal } = animation;
        let barComputedHeight = barVal / maxVal * 100;

        context.graphRefs[targetBar].style.height = barComputedHeight + "%";
        context.graphRefs[targetBar].style.backgroundColor = colorHex;
      }
    }, 10)

    this.setState({ animationIntervalId: id })
  }

  componentDidMount() {
    this.handleGenerateArray(50);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.animationIntervalId !== null) {
      return false;
    } 

    return true;
  }

  render () {
    return (
      <div className="container">
        <h1> Sorting Visualizer </h1>

        <div className="controlPanel">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.handleGenerateArray(50)}
            disabled={this.state.animating}
          >
            Generate Random Array
          </button>

          <button 
            type="button"
            className="btn btn-secondary ml-2"
            onClick={this.handleQuickSort}
            disabled={this.state.animating}
          >
            Quick Sort
          </button>

          <button 
            type="button"
            className="btn btn-secondary ml-2"
            onClick={this.handleBubbleSort}
            disabled={this.state.animating}
          >
            Bubble Sort
          </button>

          <button 
            type="button"
            className="btn btn-secondary ml-2"
            onClick={this.handleMergeSort}
            disabled={this.state.animating}
          >
            Merge Sort
          </button>

          <button
            type="button"
            className="btn btn-danger ml-2"
            onClick={() => this.handleSkipAnimation()}
            disabled={!this.state.animating}
          >
            Skip Animation
          </button>
        </div>
        
        <ArrayGraph 
          itemList={this.state.targetArray}
          animating={this.state.animating}
          setRefs={this.setRefs}
        /> 
      </div>
    );
  };
}

export default SortingVisualizer;
