import dayjs from 'dayjs';

export class CountDownTimer {

    constructor() {
        this.nowDayjs = dayjs(0);
    }

    getRemainingTime(timestampMs, reset = false, pause = false) {
        if (reset === true) this.nowDayjs = dayjs(0)
        const timestampDayjs = dayjs(timestampMs);
        // console.log('this.nowDayjs: ' + this.nowDayjs);
        // console.log('timestampDayjs: ' + timestampDayjs);
        if (timestampDayjs < this.nowDayjs) {
            return {
                seconds: '00',
                minutes: '00',
                hours: '00'
            }
        }

        const remainingSeconds = this.getRemainingSeconds(this.nowDayjs, timestampDayjs);
        const remainingMins = this.getRemainingMinutes(this.nowDayjs, timestampDayjs);
        const remainingHrs = this.getRemainingHours(this.nowDayjs, timestampDayjs);

        if (!pause && !reset) {
            this.nowDayjs += 1000;
        }

        return {
            seconds: remainingSeconds,
            minutes: remainingMins,
            hours: remainingHrs
        }
    }

    getRemainingSeconds(nowDayjs, timestampDayjs) {
        const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
        return this.padWithZero(seconds, 2);
    }

    getRemainingMinutes(nowDayjs, timestampDayjs) {
        const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
        return this.padWithZero(minutes, 2);
    }

    getRemainingHours(nowDayjs, timestampDayjs) {
        const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24;
        return this.padWithZero(hours, 2);
    }

    padWithZero(number, minLength) {
        const numberString = number.toString();
        if (numberString.length >= minLength) {
            return numberString;
        }
        return "0".repeat(minLength - numberString.length) + numberString;
    }
}

// let nowDayjs = dayjs(0);

// export function getRemainingTime(timestampMs, reset = false, pause = false) {
//     if (reset === true) nowDayjs = dayjs(0)
//     const timestampDayjs = dayjs(timestampMs);
//     // console.log('nowDayjs: ' + nowDayjs);
//     // console.log('timestampDayjs: ' + timestampDayjs);
//     if (timestampDayjs < nowDayjs) {
//         return {
//             seconds: '00',
//             minutes: '00',
//             hours: '00'
//         }
//     }

//     const remainingSeconds = getRemainingSeconds(nowDayjs, timestampDayjs);
//     const remainingMins = getRemainingMinutes(nowDayjs, timestampDayjs);
//     const remainingHrs = getRemainingHours(nowDayjs, timestampDayjs);

//     if (!pause && !reset) {
//         nowDayjs += 1000;
//     }

//     return {
//         seconds: remainingSeconds,
//         minutes: remainingMins,
//         hours: remainingHrs
//     }
// }

// function getRemainingSeconds(nowDayjs, timestampDayjs) {
//     const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
//     return padWithZero(seconds, 2);
// }

// function getRemainingMinutes(nowDayjs, timestampDayjs) {
//     const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
//     return padWithZero(minutes, 2);
// }

// function getRemainingHours(nowDayjs, timestampDayjs) {
//     const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24;
//     return padWithZero(hours, 2);
// }

// function padWithZero(number, minLength) {
//     const numberString = number.toString();
//     if (numberString.length >= minLength) {
//         return numberString;
//     }
//     return "0".repeat(minLength - numberString.length) + numberString;
// }