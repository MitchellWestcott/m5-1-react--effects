import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Item = ({ item, purchasedItems, handleClick, firstName }) => {
  const ref = useRef(null);

  const buttonFocused = () => {
    // console.log(item);
    if (item.firstName === true) {
      ref.current.focus();
      // console.log("hello");
    }
  };

  useEffect(() => {
    buttonFocused();
  });

  const { id, name, cost, value } = item;
  //   console.log("purchasedItems", purchasedItems);

  return (
    <Wrapper ref={ref} onClick={() => handleClick(id, cost)}>
      <Name>{name}</Name>
      <Resources>
        Cost: {cost} cookies. Produces {value} cookies/second.
        <Span> {purchasedItems[id]}</Span>
      </Resources>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  border-bottom: 1px solid grey;
  padding: 10px;
  background: none;
  border: none;
  border-bottom: 1px solid grey;
  text-align: left;
  text-decoration: none;
`;

const Name = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: white;
`;
const Resources = styled.p`
  color: lightgrey;
`;

const Span = styled.span`
  font-size: 30px;
`;
export default Item;
