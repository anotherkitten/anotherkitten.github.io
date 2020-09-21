export function formatNum(num: number, digits?: number): string {
  const useDefault = (digits === null);

  if (num < 1e6) {
    return num.toFixed(useDefault ? digits : 1);
  } else {
    return num.toExponential(useDefault ? digits : 2);
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
