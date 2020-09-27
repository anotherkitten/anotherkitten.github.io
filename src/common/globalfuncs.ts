export function formatNum(num: number): string {
  if (num < 10) {
    return num.toFixed(1)
  } if (num < 1e6) {
    return num.toFixed();
  } else {
    return num.toExponential(2);
  }
}

export function formatTime(num: number): string {
    let suffix = "s";
    let remainingTime = Math.floor(num / 1e3);

    if (remainingTime >= 60) {
      suffix = "m";
      remainingTime = Math.floor(remainingTime / 60);
    }

    if (remainingTime >= 60) {
      suffix = "h";
      remainingTime = Math.floor(remainingTime / 60);
    }

    return `${remainingTime}${suffix}`;
  }
