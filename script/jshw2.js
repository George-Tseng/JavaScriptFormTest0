function checkAccount() {
    let accountObjValue = document.getElementById("account").value;
    let accountSpan = document.getElementById("accountSpan");

    let accountIsOk = true;
    let accountStr;

    if (accountObjValue == "" || accountObjValue.length == 0) {
        accountStr = "帳號不可為空白";
        accountIsOk = false;
    } else if (accountObjValue.length == 1) {
        accountStr = "帳號長度不足";
        accountIsOk = false;
    } else {
        const charCountBegin = 0;
        const charChineseWordCountBegin = 0x4e00;
        const charChineseWordCountEnd = 0x9fff;
        for (let charIndex = charCountBegin; charIndex < accountObjValue.length; charIndex++) {
            let accountChar = accountObjValue.charCodeAt(charIndex);

            if (accountChar < charChineseWordCountBegin || accountChar > charChineseWordCountEnd) {
                accountIsOk = false;
            }
            if (!accountIsOk) {
                break;
            }
        }
        accountStr = (!accountIsOk) ? "帳號含有非中文" : "帳號有效";
    }

    if(!accountIsOk) {
        accountSpan.innerHTML = "<i class='material-icons' style='font-size:18px;color:red'>cancel</i>" + accountStr;
        accountSpan.style.color = "red";
        accountSpan.style.fontStyle = "italic";
    }
    else {
        accountSpan.innerHTML = "<i class='material-icons' style='font-size:18px;color:green'>check_circle</i>" + accountStr;
        accountSpan.style.color = "black";
        accountSpan.style.fontStyle = "normal";
    }
}

function checkPassword() {
    let passwordObjValue = document.getElementById("password").value;
    let passwordSpan = document.getElementById("passwordSpan");

    let hasLetter = false, hasNumber = false, hasSpecial = false, passwordIsOk;
    let passwordStr;

    if (passwordObjValue == "" || passwordObjValue.length == 0) {
        passwordStr = "密碼不可為空白";
        passwordIsOk = false;
    } else if (passwordObjValue.length < 6){
        passwordStr = "密碼長度不足";
        passwordIsOk = false;
    } else if (passwordObjValue.length >= 6){
        const charCountBegin = 0;
        const asciiStartPoint1 = 33, asciiEndPoint1 = 47, asciiStartPoint2 = 58, asciiEndPoint2 = 64;
        const asciiStartPoint3 = 91, asciiEndPoint3 = 96, asciiStartPoint4 = 123, asciiEndPoint4 = 126;
        for (let charIndex = charCountBegin; charIndex < passwordObjValue.length; charIndex++) {
            let passwordChar = passwordObjValue.charAt(charIndex).toUpperCase();

            if (passwordChar >= 'A' && passwordChar <= 'Z') {
                hasLetter = true;
            }
            if (passwordChar >= 0 && passwordChar <= 9) {
                hasNumber = true;
            }
            //ASCII
            if (passwordObjValue.charCodeAt(charIndex) >= asciiStartPoint1 && passwordObjValue.charCodeAt(charIndex) <= asciiEndPoint1) {
                hasSpecial = true;
            } else if(passwordObjValue.charCodeAt(charIndex) >= asciiStartPoint2 && passwordObjValue.charCodeAt(charIndex) <= asciiEndPoint2) {
                hasSpecial = true;
            } else if(passwordObjValue.charCodeAt(charIndex) >= asciiStartPoint3 && passwordObjValue.charCodeAt(charIndex) <= asciiEndPoint3) {
                hasSpecial = true;
            } else if(passwordObjValue.charCodeAt(charIndex) >= asciiStartPoint4 && passwordObjValue.charCodeAt(charIndex) <= asciiEndPoint4) {
                hasSpecial = true;
            } 

            if (hasLetter && hasNumber && hasSpecial) {
                break;
            }
        }

        if (hasLetter && hasNumber && hasSpecial) {
            passwordStr = "密碼有效";
            passwordIsOk = true;
        } else if (!hasSpecial){
            passwordStr = "密碼不含任何特殊字元";
            passwordIsOk = false;
        } else if (!hasNumber){
            passwordStr = "密碼不含任何數字";
            passwordIsOk = false;
        } else if (!hasLetter){
            passwordStr = "密碼不含任何英文字母";
            passwordIsOk = false;
        }
    }
    
    if (!passwordIsOk) {
        passwordSpan.innerHTML = "<i class='material-icons' style='font-size:18px;color:red'>cancel</i>" + passwordStr;
        passwordSpan.style.color = "red";
        passwordSpan.style.fontStyle = "italic";
    } else {
        passwordSpan.innerHTML = "<i class='material-icons' style='font-size:18px;color:green'>check_circle</i>" + passwordStr;
        passwordSpan.style.color = "black";
        passwordSpan.style.fontStyle = "normal";
    }
}

function checkDate() {
    let dateObjValue = document.getElementById("date").value;
    let dateSpan = document.getElementById("dateSpan");

    const dateNow = new Date();
    let dateIsOk;
    let dateStr;
    const firstMonth = 1, lastMonth = 12, firstDay = 1, lastDay = 31, lastDay2Special = 29;
    const monthShort = [4, 6, 9, 11];

    if (dateObjValue == "" || dateObjValue.length == 0) {
        dateStr = "日期不可為空白";
        dateIsOk = false;
    } else if(dateObjValue.length < 8) {
        dateStr = "日期資訊長度不正確";
        dateIsOk = false;
    } else if(dateObjValue.length > 10) {
        dateStr = "日期資訊長度不正確";
        dateIsOk = false;
    } else {
        let dateInfo = dateObjValue.split("/");
        console.log(dateInfo[0]);
 
        if(parseInt(dateInfo[0]) > dateNow.getFullYear()) {
            dateStr = "無效的年份";
            dateIsOk = false;
        }
        if(parseInt(dateInfo[1]) > lastMonth || parseInt(dateInfo[1]) < firstMonth) {
            dateStr = "無效的月份";
            dateIsOk = false;
        }
        if(parseInt(dateInfo[2]) > lastDay || parseInt(dateInfo[2]) < firstDay) {
            dateStr = "無效的日期";
            dateIsOk = false;
        } else {
            if(monthShort.includes(parseInt(dateInfo[1])) && parseInt(dateInfo[2]) == lastDay) {
                dateStr = "無效的日期";
                dateIsOk = false;
            } else if (parseInt(dateInfo[1]) == 2 && parseInt(dateInfo[2]) > lastDay2Special) {
                dateStr = "無效的日期";
                dateIsOk = false;
            } else if (checkYear(parseInt(dateInfo[0])) == false && parseInt(dateInfo[1]) == 2 && parseInt(dateInfo[2]) == lastDay2Special) {
                dateStr = "無效的日期";
                dateIsOk = false;
            } else {
                dateStr = "有效的日期";
                dateIsOk = true;
            }
        }
    }

    if(!dateIsOk) {
        dateSpan.innerHTML = "<i class='material-icons' style='font-size:18px;color:red'>cancel</i>" + dateStr;
        dateSpan.style.color = "red";
        dateSpan.style.fontStyle = "italic";
    } else {
        dateSpan.innerHTML = "<i class='material-icons' style='font-size:18px;color:green'>check_circle</i>" + dateStr;
        dateSpan.style.color = "black";
        dateSpan.style.fontStyle = "normal";
    }
}

function checkYear(year) {
    const yearConst1 = 80000, yearConst2 = 3200, yearConst3 = 400, yearConst4 = 100, yearConst5 = 4;
    if (year % yearConst1 == 0) {
        return true;
    } else if (year % yearConst2 == 0) {
        return false;
    } else if (year % yearConst3 == 0) {
        return true;
    } else if (year % yearConst4 == 0) {
        return false;
    } else if(year % yearConst5 == 0) {
        return true;
    } else {
        return false;
    }
}