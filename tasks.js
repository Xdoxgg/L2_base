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
//9

function solution(str) {
    if (str.length % 2 !== 0) {
        str += '_';
    }
    let result = [];
    for (let i = 0; i < str.length; i += 2) {
        result.push(str.slice(i, i + 2));
    }
    return result;

}


//10

function bingo(ticket, win) {
    let miniWins = 0;

    for (const [str, num] of ticket) {
        if ([...str].some(char => char.charCodeAt(0) === num)) {
            miniWins++;
        }
    }

    return miniWins >= win ? 'Winner!' : 'Loser!';
}

//11

function domainName(url) {
    url = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    let domain = url.split('/')[0];
    return domain.split('.')[0];
}

//12

function longest(arr, n) {
    const mapped = arr.map((str, index) => ({ str, length: str.length, index }));

    mapped.sort((a, b) => {
        if (b.length !== a.length) {
            return b.length - a.length;
        }
        return a.index - b.index;
    });

    return mapped[n - 1].str;
}

//13

function hexStringToRGB(hexString) {
    const hex = hexString.replace(/^#/, '').toLowerCase();

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

//14


function isCircleSorted(arr) {
    let countDrops = 0;
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        if (arr[i] > arr[(i + 1) % n]) {
            countDrops++;
            if (countDrops > 1) return false;
        }
    }

    return true;
}

//15
function howManyTimes(time1, time2) {
    const start = new Date(time1);
    const end = new Date(time2);
    let strikes = 0;

    function strikesAt(date) {
        const minutes = date.getMinutes();
        const hours24 = date.getHours();
        if (minutes === 0) {
            return hours24 % 12 === 0 ? 12 : hours24 % 12;
        } else if (minutes === 30) {
            return 1;
        }
        return 0;
    }

    let firstStrike = new Date(start);
    firstStrike.setSeconds(0, 0);
    const startMinutes = firstStrike.getMinutes();
    if (startMinutes % 30 !== 0) {
        const addMinutes = 30 - (startMinutes % 30);
        firstStrike.setMinutes(firstStrike.getMinutes() + addMinutes);
    }

    for (
        let strikeTime = new Date(firstStrike);
        strikeTime < end;
        strikeTime.setMinutes(strikeTime.getMinutes() + 30)
    ) {
        const count = strikesAt(strikeTime);
        if (count === 0) continue;

        const strikeStart = strikeTime.getTime();
        const strikeEnd = strikeStart + count * 1000;

        const intervalStart = Math.max(strikeStart, start.getTime());
        const intervalEnd = Math.min(strikeEnd, end.getTime());

        if (intervalEnd > intervalStart) {
            strikes += Math.floor((intervalEnd - intervalStart) / 1000);
        }
    }

    return strikes;
}

//16

Array.prototype.square = function() {
    return this.map(x => x * x);
};

Array.prototype.cube = function() {
    return this.map(x => x * x * x);
};

Array.prototype.sum = function() {
    return this.reduce((acc, val) => acc + val, 0);
};

Array.prototype.average = function() {
    return this.length === 0 ? NaN : this.sum() / this.length;
};

Array.prototype.even = function() {
    return this.filter(x => x % 2 === 0);
};

Array.prototype.odd = function() {
    return this.filter(x => x % 2 !== 0);
};

//17

function cache(fn) {
    const cacheMap = new Map();

    return function(...args) {
        const key = JSON.stringify(args);

        if (cacheMap.has(key)) {
            return cacheMap.get(key);
        }

        const result = fn.apply(this, args);
        cacheMap.set(key, result);
        return result;
    };
}

//18

function createPhoneNumber(numbers) {
    return `(${numbers.slice(0, 3).join('')}) ${numbers.slice(3, 6).join('')}-${numbers.slice(6).join('')}`;
}

