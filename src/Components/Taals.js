import React from 'react'
import TaalTable from './TaalTable';

const Tintaal = ()=>{
    let bol = ['Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Tin', 'Tin', 'Ta', 'Ta', 'Dhin', 'Dhin', 'Dha'];
    return <TaalTable noOfCols = {16} bol={bol}/>
}

const Jhaptaal = () => {
    let bol = ['Dhi', 'Na', 'Dhi', 'Dhi', 'Na', 'Ti', 'Na', 'Dhi', 'Dhi', 'Na']
    return <TaalTable noOfCols={10} bol={bol} />;
};
const Dadra = () => {
    let bol = ['Dha', 'Dhi', 'Na', 'Dha', 'Ti', 'Na']
    return <TaalTable noOfCols={6} bol={bol} />;
};
const Kaherwa = ()=>{
    let bol = ['Dha', 'Ge', 'Na', 'Ti', 'Na', 'Ka', 'Dhi', 'Na'];
    return <TaalTable noOfCols={8} bol={bol}/>
}

const Taals = {Tintaal, Jhaptaal, Dadra, Kaherwa};
export default Taals;