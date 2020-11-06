import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useInterval from "../hooks/use-interval.hook";
import useEventListener from "../hooks/useEventListener.hook";
import useDocumentTitle from "../hooks/useDocumentTitle.hook";
import cookieSrc from "../cookie.svg";

import Item from "./Item";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1, firstName: true },
  { id: "grandma", name: "Grandma", cost: 100, value: 10, firstName: false },
  { id: "farm", name: "Farm", cost: 1000, value: 80, firstName: false },
  { id: "megaCursor", name: "Mega cursor", cost: 5000, value: 0 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);
  const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const title = `${numCookies} cookies - Cookie Clicker Workshop`;
  const fallbackTitle = `Cookie Clicker Workshop`;
  useDocumentTitle(title, fallbackTitle);

  const handleClick = (id, cost) => {
    // console.log("click");
    if (numCookies >= cost) {
      const itemToIncrement = purchasedItems[id] + 1;
      setPurchasedItems({ ...purchasedItems, [id]: itemToIncrement });
      // console.log("purchasedItems", purchasedItems);
      setNumCookies(numCookies - cost);
    } else {
      window.alert("Not enough cookie buddy");
    }
  };

  useEventListener("spacebar", handleClick);

  const cookieIncrement = () => {
    setNumCookies(numCookies + 1);
  };

  const calculateCookiesPerTick = (obj) => {
    let total = 0;
    items.forEach((item) => {
      switch (item.id) {
        case "cursor":
          total = total + purchasedItems.cursor;
          break;
        case "grandma":
          total = total + purchasedItems.grandma * 10;
          break;
        case "farm":
          total = total + purchasedItems.farm * 80;
          break;
        default:
          total = 0;
      }
    });
    return total;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
    setCookiesPerSecond(numOfGeneratedCookies);
  }, 1000);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{cookiesPerSecond}</strong> cookies per second
        </Indicator>
        <Button onClick={cookieIncrement}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>
      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => {
          return (
            <Item
              item={item}
              // firstName={firstName}
              purchasedItems={purchasedItems}
              handleClick={handleClick}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
