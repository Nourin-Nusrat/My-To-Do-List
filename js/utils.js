
// function formatDateTime(dt) {

//   const date = new Date(dt);

//   const time = date.toLocaleTimeString([], {

//     hour: "2-digit",

//     minute: "2-digit"

//   });


//   const day = date.getDate();

//   const month =
//     date.toLocaleString("en-US", {
//       month: "short"
//     });

//   const year = date.getFullYear();


//   return {

//     time,

//     date: `${day} ${month} ${year}`

//   };

// }


// function getRemainingTime(endDate){

//   const now = new Date();

//   const end = new Date(endDate);

//   const diff = end - now;


//   if(diff <= 0){
//     return "Expired";
//   }


//   const hours =
//     Math.floor(diff / (1000 * 60 * 60));

//   const minutes =
//     Math.floor(
//       (diff % (1000 * 60 * 60))
//       / (1000 * 60)
//     );


//   return `${hours}h ${minutes}m`;

// }

function formatDateTime(dt) {

  const date = new Date(dt);

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const day = date.getDate();

  const month =
    date.toLocaleString("en-US", {
      month: "short"
    });

  const year = date.getFullYear();

  return {

    time,

    date: `${day} ${month} ${year}`

  };

}



function getRemainingTime(endDate){

  const now = new Date();

  const end = new Date(endDate);

  const diff = end - now;

  if(diff <= 0){
    return "Expired";
  }

  const hours =
    Math.floor(diff / (1000 * 60 * 60));

  const minutes =
    Math.floor(
      (diff % (1000 * 60 * 60))
      / (1000 * 60)
    );

  return `${hours}h ${minutes}m`;

}
