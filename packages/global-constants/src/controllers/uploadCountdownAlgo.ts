function convertTo24HourFormat(arrivalTime: string): number {
  const ampm: string = arrivalTime.slice(-2);
  let hour: number = parseInt(arrivalTime);

  if (ampm === 'am' && hour === 12) {
    hour = 0;
  } else if (ampm === 'pm' && hour < 12) {
    hour += 12;
  }

  return hour;
}

interface CountDownReturnType {
  text: string,
  state: 'available' | 'counting'
}

export function getUploadCountdown(orderDate: string, arrivalTime: string, orderDurationHours: number): CountDownReturnType {
  // Convert orderDate and arrivalTime to JavaScript Date objects
  const orderDateTime: Date = new Date(orderDate);
  const now: Date = new Date();

  const arrivalHour: number = convertTo24HourFormat(arrivalTime);
  orderDateTime.setHours(arrivalHour);

  // Calculate the end time of the order
  const endTime: Date = new Date(orderDateTime.getTime() + orderDurationHours * 60 * 60 * 1000);

  // Calculate the time remaining until the end time
  let timeRemaining: number = endTime.getTime() - now.getTime();

  if (timeRemaining <= 0) {
    // If the order has already ended, return a message indicating that uploading is available
    return {
      text: 'Uploading is available now',
      state: 'available'
    };
  } else {
    // Calculate the time components (days, hours, minutes, seconds)
    const days: number = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes: number = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Construct the countdown string
    let countdownString: string = 'Uploading will be available in ';
    if (days > 0) {
      countdownString += days + ' Days, ';
    }

    if (hours > 0) {
      countdownString += hours + 'H : ';
    }
    if (minutes > 0) {
      countdownString += minutes + 'M : ';
    }
    countdownString += seconds + 'S';

    return {
      text: countdownString,
      state: "counting"
    };
  }
}