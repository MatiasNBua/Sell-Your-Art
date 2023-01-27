function validateDate (birth){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(birth)) {
        return -1;
    }
    let parts = birth.split('-');
    let now = new Date();
    let year = parseInt(parts[0], 10);
    let currentYear = now.getFullYear();
    let month = ( parts[1][0] === '0') ? parseInt(parts[1][1], 10) : parseInt(parts[1], 10);
    let day = ( parts[2][0] === '0') ? parseInt(parts[2][1], 10) : parseInt(parts[2], 10);

    if(year >= currentYear) {
        return -1;
    }
    if( (currentYear - year) < 18 || (currentYear - year) > 80) {
        return -1;
    }
    if( month < 1 || month > 12) {
        return -1;
    }
    if( day < 1 || day > 31 ) {
        return -1;
    }
    return 0;
};

module.exports = validateDate