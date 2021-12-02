const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes  } = require('./iss');

const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }


//   console.log('It worked! Returned IP:', ip);
// })



// fetchCoordsByIP('99.243.115.83', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned Coords:', data);
// });

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});