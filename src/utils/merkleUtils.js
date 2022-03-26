import { hashString } from './hashUtils';

export const initMerkelArray = (identityObject) => {
    const temp = [];
    for (let key in identityObject) {
        temp.push(identityObject[key]);
    }
    let nearestPowerOf2 = 1;
    while (nearestPowerOf2 < temp.length) nearestPowerOf2 <<= 1;
    let lastElement = temp[temp.length - 1];
    for (let i = temp.length; i < nearestPowerOf2; i++) {
        temp.push(lastElement);
    }
    return temp;
}

export const constructMerkleArray = (merkleArray) => {
    let temp = merkleArray;
    let currLevelLen = 0, startIndex = 0;
    let len = temp.length;
    
    while (true) {        
        len = temp.length;
        currLevelLen = len - startIndex;

        // we have found root hash
        if (currLevelLen === 1) break;
        
        for (let i = startIndex; i < len; i += 2) {
            const concatString = temp[i] + temp[i + 1];
            const resultHash = hashString(concatString);
            temp.push(resultHash);
        }
        startIndex = len;
    }
    return temp.reverse();
}