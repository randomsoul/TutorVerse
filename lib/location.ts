export type CapturedLocation = {
  latitude: number;
  longitude: number;
  accuracy_m: number;
};

export const MAX_ACCEPTABLE_ACCURACY_M = 5000;

export function getAccurateLocation(): Promise<CapturedLocation> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Your browser does not provide location access.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const accuracy = Math.round(position.coords.accuracy);
        if (!Number.isFinite(accuracy) || accuracy > MAX_ACCEPTABLE_ACCURACY_M) {
          reject(new Error(`Location accuracy is too low (${Math.round(accuracy / 100) / 10} km). Please enable precise location and try again, or enter your area manually.`));
          return;
        }
        resolve({
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
          accuracy_m: accuracy,
        });
      },
      error => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error('Location permission was not granted. Please allow precise location access or enter the area manually.'));
        } else if (error.code === error.TIMEOUT) {
          reject(new Error('Location could not be obtained in time. Please try again with precise location enabled.'));
        } else {
          reject(new Error('Location could not be obtained. Please try again or enter the area manually.'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  });
}
