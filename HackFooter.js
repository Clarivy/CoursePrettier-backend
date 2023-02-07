try {
  for (let i = 0; i < table0.marshalContents.length; i = i + 1) {
    let element = table0.marshalContents[i];
    if (element === undefined) {
      console.log("\n");
    } else {
      console.log(String(element));
    }
  }
  // file written successfully
} catch (err) {
  console.error(err);
}
