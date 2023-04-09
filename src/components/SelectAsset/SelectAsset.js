import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const SelectAsset = () => {
    const [assetType, setAssetType] = useState("")
  return (
    <div className='sort'>
      <form className='--flex-start'> 
      <select value={assetType} onChange={(e)=> setAssetType(e.target.value)}>
        <option value="">--select--</option>
          <option value=",machine "> Machine </option>
            <option value="tractor"> Tractor </option>
                <option value="plow"> Plow </option>
                  <option value="leveler"> Leveler </option>
                    <option value="planters"> Planters </option>
                      <option value="sprayers"> Sprayers </option>
                        <option value="spreaders"> Spreaders </option>
                          <option value= "seeders"> Seeders </option>
                            <option value="others">Others</option>


      </select>
      <button className='--btn --btn-primary'>
        <FaCheck size={15} />
      </button>

      </form>
    </div>
  );
}

export default SelectAsset;
