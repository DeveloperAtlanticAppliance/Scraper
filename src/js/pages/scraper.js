const { dataFromReliableParts } = require('../utils/ReliableParts/reliableParts_Parts')

function tt() {

    return (
        <p>{dataFromReliableParts("5304513033")}</p>
    );
    //console.log(dataFromReliableParts("5304513033"))
}

export default tt

