export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    resolve(location);
                },
                (error) => reject(error),
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
};

