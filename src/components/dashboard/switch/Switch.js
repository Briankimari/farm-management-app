import styled from '@emotion/styled';
import React, { useState } from 'react';

export default function Switch({toggled,onClick,label}) {
  const [isToggled, toggle] =useState(toggled);
 const [paid, setPaid] = useState(true)
  const callback= ()=> {
    toggle(!isToggled)
    onClick(!isToggled)
  } 
  return (
    <SwitchStyled>
    <label>
      <input type='checkbox' onClick={() => setPaid(!paid)} defaultChecked={isToggled}/>
        <span/>
        <strong>
        {paid  && (
          <div>Paid</div>
          
        )}
        
        </strong>
    </label>
    </SwitchStyled>
  );
}
const SwitchStyled= styled.div`

label{
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}
input {
  opacity:0;
  width:0;
  height:0;
}
span{
  position:absolute;
  cursor: pointer;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:red;
  transition: 0.3s;
  border-radius: 30px;
}
span:before {
  position: absolute;
  content: "";
  height: 25px;
  width:28px;
  left: 3px;
  bottom: 2.6px;
  background-color: #fff;
  border-radius: 50%;
  transition: 0.3s;
}
input:checked + span {
  background-color: #00c853;
}
input:checked + span:before {
  transform: translateX(29px);
}
strong {
  position: absolute;
  left: 130%;
  width: max-content;
  line-height: 30px;
  margin-left: 10px;
  cursor: pointer;
  font-weight: 900;
  font-size: 2rem

}

`;
