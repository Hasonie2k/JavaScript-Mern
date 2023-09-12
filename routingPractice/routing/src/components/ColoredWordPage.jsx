import React from "react";
import { useParams } from "react-router-dom";

const ColoredWordPage = () => {
const { word, color, backgroundColor } = useParams();

const style = {
    color: color,
    backgroundColor: backgroundColor,
};

return <h1 style={style}>{word}</h1>;
};

export default ColoredWordPage;
