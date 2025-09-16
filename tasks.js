//1

function hasTwoCubeSums(n) {
    const sums = new Map();
    const limit = Math.floor(Math.cbrt(n)) + 1;

    for (let a = 1; a < limit; a++) {
        const a3 = a ** 3;
        if (a3 >= n) break;

        for (let b = a + 1; b < limit; b++) {
            const sum = a3 + b ** 3;
            if (sum > n) break;
            if (sum === n) {
                if (!sums.has(sum)) {
                    sums.set(sum, [[a, b]]);
                } else {
                    for (const [c, d] of sums.get(sum)) {
                        const uniqueNums = new Set([a, b, c, d]);
                        if (uniqueNums.size === 4) {
                            return true;
                        }
                    }
                    sums.get(sum).push([a, b]);
                }
            }
        }
    }
    return false;
}

//2

function ipv4Parser(ip, mask) {
    const ipParts = ip.split('.').map(Number);
    const maskParts = mask.split('.').map(Number);

    if (ipParts.length !== 4 || maskParts.length !== 4) {
        throw new Error('uncorrected mask');
    }

    const networkParts = [];
    const hostParts = [];

    for (let i = 0; i < 4; i++) {
        networkParts.push(ipParts[i] & maskParts[i]);
        hostParts.push(ipParts[i] & (~maskParts[i] & 0xFF));
    }

    return [networkParts.join('.'), hostParts.join('.')];

}

//3

function whatCentury(yearStr) {
    const year = Number(yearStr);
    let century = Math.ceil(year / 100)

    return century + getSuffix(century);
}

function getSuffix(num) {
    const rem100 = num % 100;
    if (rem100 >= 11 && rem100 <= 13) {
        return 'th';
    }
    switch (num % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}