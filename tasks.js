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

//4

function findMissing(list) {
    let diffs = [];
    for (let i = 1; i < list.length; i++) {
        diffs.push(list[i] - list[i - 1]);
    }

    let d = Math.min(...diffs);

    for (let i = 0; i < diffs.length; i++) {
        if (diffs[i] !== d) {
            return list[i] + d;
        }
    }
}

//5

function primeFactors(n) {
    let factors = new Map();
    let num = n;

    while (num % 2 === 0) {
        factors.set(2, (factors.get(2) || 0) + 1);
        num /= 2;
    }

    let factor = 3;
    while (factor <= Math.sqrt(num)) {
        while (num % factor === 0) {
            factors.set(factor, (factors.get(factor) || 0) + 1);
            num /= factor;
        }
        factor += 2;
    }

    if (num > 2) {
        factors.set(num, (factors.get(num) || 0) + 1);
    }

    let result = "";
    for (let [prime, count] of [...factors.entries()].sort((a, b) => a[0] - b[0])) {
        result += count === 1 ? `(${prime})` : `(${prime}**${count})`;
    }

    return result;
}

//6

function toWeirdCase(string) {
    return string
        .split(' ')
        .map(word =>
            [...word]
                .map((char, i) => i % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
                .join('')
        )
        .join(' ');
}

//7

function wave(str) {
    let result = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') continue;

        let chars = str.split('');

        chars[i] = chars[i].toUpperCase();

        result.push(chars.join(''));
    }

    return result;
}

//8
function expandedForm(num) {
    const digits = String(num).split('');
    const length = digits.length;
    const parts = [];

    for (let i = 0; i < length; i++) {
        if (digits[i] !== '0') {
            let zeros = length - i - 1;
            parts.push(digits[i] + '0'.repeat(zeros));
        }
    }

    return parts.join(' + ');
}
