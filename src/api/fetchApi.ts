async function PalmApiFecth(location: string, destination: string) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    prompt: {
      context: "act like you are a ai trip planner.",
      examples: [],
      messages: [
        {
          content: `plan a trip to ${location} to ${destination}.`,
        },
        {
          content: "NEXT REQUEST",
        },
      ],
    },
    temperature: 0.25,
    top_k: 40,
    top_p: 0.95,
    candidate_count: 1,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

 return fetch(
   `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${
     import.meta.env.palmkey
   }`,
   requestOptions
 )
   .then((response) => response.text())
   .then((result) => JSON.parse(result).candidates[0].content)
   .catch((error) => console.log("error", error));
}
export default PalmApiFecth;
