export const validateCallDetails = (callDetails) => {
  const patt = new RegExp(/^\+[1-9]{1}[0-9]{3,14}$/);
  if (!callDetails.callerName || !callDetails.calleeName) {
    return "Empty data. Kindly enter name";
  }
  if (!callDetails.callerNumber || !callDetails.calleeNumber) {
    return "Empty phone number. Kindly enter phone numbers";
  } else if (
    !patt.test(callDetails.callerNumber) ||
    !patt.test(callDetails.calleeNumber)
  ) {
    return "Invalid phone number format. Kindly enter correct format (Example: +918000800080)";
  }
  return "";
};

export const makeApiCall = (body) => {
  fetch("api/v1/call", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => console.log({ data }));
};
