import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
import './NewPlace.css';

const formReducer = (state,action) =>{
     switch (action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true
            for(const inputID in state.inputs){
                if(inputID === action.inputID){
                    formIsValid = formIsValid && action.isValid
                }
                else{
                    formIsValid = formIsValid && state.inputs[inputID].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputID]:{value:action.value,isValid:action.isValid}
                },
                isValid:formIsValid
            }
        default:
            return state;
     }
}


const NewPlace = () => {
    const [formState,dispatch] = useReducer(formReducer,{
        inputs:{
            title:{
                value:'',
                isValid:false
            },
            description:{
                value:'',
                isValid:false
            }
        },
        isValid:false
    })
    const titleInputHandler = useCallback((id,value,isValid) =>{
        dispatch({type:'INPUT_CHANGE',value:value,isValid:isValid,inputID:id})
    },[])

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
    }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input id='title' element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText='please enter a valid text' onInput={titleInputHandler}/>
      <Input id='address' element="input" label="Address" validators={[VALIDATOR_MINLENGTH(5)]} errorText='please enter a valid address' onInput={titleInputHandler}/>
      <Input id='description' element="textare" label="Description" validators={[VALIDATOR_MINLENGTH(5)]} errorText='please enter a valid description' onInput={titleInputHandler}/>
      <Button type='submit' disabled={!formState.isValid}> ADD PLACE</Button>
    </form>
  );
};

export default NewPlace;