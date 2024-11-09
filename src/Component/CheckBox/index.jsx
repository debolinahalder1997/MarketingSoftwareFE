import React from 'react'

function CheckBox({Label,onChange}) {
  return (
    <div className="flex-wrap mt-1">
      <label className="text-pos-cen">
        <input
          type="checkbox"
          placeholder="Show Password"
          onChange={onChange}
          className='mt-2'
        />
        <span className="small">{`  ${Label}`}</span>
      </label>
    </div>
  );
}

export default CheckBox