import React,{ useState, useEffect} from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled  from 'styled-components';

import { initMerkelArray, constructMerkleArray } from './../utils/merkleUtils';
import { getPersonalData } from './../utils/hashUtils';

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 10px;
  display: inline-block;
  border: 1px solid red;
  font-size: 5px;
`;

const RecursiveMerkle = (props) => {
    return (
        <>
            {props.merkleArray && (props.merkleArray.length > 0) && ((2 * props.i) + 2 < props.merkleArray.length) && (
                <TreeNode label={<StyledNode>{props.merkleArray[props.i]}</StyledNode>}>
                    <RecursiveMerkle merkleArray={props.merkleArray} i={2 * props.i + 2} />
                    <RecursiveMerkle merkleArray={props.merkleArray} i={2 * props.i + 1} />
                </TreeNode>
            )}
            {props.merkleArray && (props.merkleArray.length > 0) && !((2 * props.i) + 2 < props.merkleArray.length) && (
                <TreeNode label={<StyledNode>{props.merkleArray[props.i]}</StyledNode>} />
            )}
        </>
    );
}

const CompleteMerkleTree = () => {
    const [merkleArray, setMerkleArray] = useState([]);
    
    useEffect(() => {
        const personalData = getPersonalData();
        let initialArray = initMerkelArray(personalData);
        let temp = constructMerkleArray(initialArray);
        setMerkleArray(temp);
    }, []);
    
    return (
        <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<StyledNode>{merkleArray[0]}</StyledNode>}
        >
            {merkleArray.length > 0 && (<RecursiveMerkle merkleArray={merkleArray} i={1} />)}
            {merkleArray.length > 0 && (<RecursiveMerkle merkleArray={merkleArray} i={2} />)}
        </Tree>
    );
}

export default CompleteMerkleTree;