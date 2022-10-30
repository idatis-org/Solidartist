import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import PieceDetail from 'components/PieceDetail';
import "./Art_Detail.css"

export default function Art_Detail() {
    let { id } = useParams();


    return (
        <PieceDetail idPiece={id} />
    )
}