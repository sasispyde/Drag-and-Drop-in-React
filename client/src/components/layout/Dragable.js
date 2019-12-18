import React, {useState, useCallback } from 'react';
import styled from 'styled-components';
import { inRange} from 'lodash';
import Draggable from './Drag';
import Navbar from "../layout/Navbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './css/Dragable.css';

const HEIGHT = 60;

var items = [1,2,3,4,5];
const Dragable = () => {
  const [state, setState] = useState({
    order: items,
    dragOrder: items, // items order while dragging
    draggedIndex: null
  });
	
  const handleDrag = useCallback(({translation, id}) => {
    const delta = Math.round(translation.y / HEIGHT);
    const index = state.order.indexOf(id);
    const dragOrder = state.order.filter(index => index !== id);
		
    if (!inRange(index + delta, 0, items.length)) {
      return;
    }
		
    dragOrder.splice(index + delta, 0, id);
		items = dragOrder;
    setState(state => ({
      ...state,
      draggedIndex: id,
      dragOrder
    }));
  }, [state.order, items.length]);
	
  const handleDragEnd = useCallback(() => {

    setState(state => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null
    }));

  }, []);

  return (
    <div>
    <Navbar />
    <Container>
      {items.map(index => {
        const isDragging = state.draggedIndex === index;
        const top = state.dragOrder.indexOf(index) * (HEIGHT + 10);
        const draggedTop = state.order.indexOf(index) * (HEIGHT + 10);
				
        return (
          <div className="left" key={index}>
          <Draggable
            key={index}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Rect
              isDragging={isDragging}
              top={isDragging ? draggedTop : top}
            >
             {index}
            </Rect>
          </Draggable>
          </div>
        );
      })}
    </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 75vh;
`;

const Rect = styled.div.attrs(props => ({
  style: {
    transition: props.isDragging ? 'none' : 'all 500ms'
  }
}))`
  width: 300px;
  height:250px;
  user-select: none;
  height: ${HEIGHT}px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({top}) => 100 + top}px;
  left: calc(50vw - 150px);
  font-size: 20px;
  color: #777;
`;

Dragable.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(Dragable);