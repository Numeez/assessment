function isEmailValid(email) {
   
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
function isMobileNumberValid(num) {
    
    const regex = /^(?:\(\d{3}\)|\d{3})(?:[-.\s]?)\d{3}(?:[-.\s]?)\d{4}$/;
    return regex.test(num);
  }

module.exports={
    isEmailValid,
    isMobileNumberValid
}