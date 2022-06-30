const strengthMeter=document.getElementById('strength-meter');
const pwInput=document.getElementById('password-input');
const reasonsContainer=document.getElementById('reasons');

pwInput.addEventListener('input', updateStrengthMeter);
updateStrengthMeter();
function updateStrengthMeter(){
    const weaknesses=calculatePasswordStrength(pwInput.value);
    let strength=100;
    reasonsContainer.innerHTML='';
    weaknesses.forEach(weakness=>{
        if(weakness==null)return;
strength-=weakness.deduction;
const msgEle=document.createElement('div');
msgEle.innerText=weakness.message;
reasonsContainer.appendChild(msgEle);
    })
    strengthMeter.style.setProperty('--strength', strength);
}
function calculatePasswordStrength(password){
    const weaknesses=[];
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(lowerCaseweakness(password));
    weaknesses.push(upperCaseweakness(password));
    weaknesses.push(numberWeakness(password));
    weaknesses.push(specialCharacters(password));
    weaknesses.push(repeatCharacterWeakness(password));
    return weaknesses;
}
function numberWeakness(password){
    const matches=password.match(/[0-9]/g)||[];
    if(matches.length===0)return{
        message:'your password has no numbers',
        deduction:'20'
    } 
    
    if(matches.length<2)return{
        message:'your password could use more numbers',
        deduction:'5'
    }
}
function specialCharacters(password){
    const matches=password.match(/[^0-9a-zA-Z\s]/g)||[];
    if(matches.length===0)return{
        message:'your password has no special characters',
        deduction:'20'
    } 
    
    if(matches.length<2)return{
        message:'your password could use more special characters',
        deduction:'5'
    }
}
function repeatCharacterWeakness(password){
    const matches=password.match(/(.)\1/g)||[];
    if(matches.length>0){
        return {
            message:'your password has repeated characters',
            deduction:matches.length*10
        }
    }
}
function lengthWeakness(password){
    const length=password.length;
    if(length===0)return{
        message:'type your password',
        deduction:100
    }
    if(length<=5){
        return{
            message:'your password is too short',
            deduction:40
        }
    }
    if(length<=10){
        return{
            message:'your password could be longer',
            deduction:15
        }
    }
}
function upperCaseweakness(password){
    const matches= password.match(/[A-Z]/g)||[];
   if(matches.length===0){
    return{
        message:'your password has no upper case characters',
        deduction:20
    }
   }
   if(matches.length<2){
    return{
        message:'your password could use more uppercase characters',
        deduction:5
    }
   }
}
function lowerCaseweakness(password){
   const matches= password.match(/[a-z]/g)||[];
   if(matches.length===0){
    return{
        message:'your password has no lower case characters',
        deduction:20
    }
   }
   if(matches.length<2){
    return{
        message:'your password could use more lowercase characters',
        deduction:5
    }
   }
}